import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ThemeContext } from "../../Context/Context";
import uploadcsv from "../../assets/uploadcsv.png";
import { FaCloudUploadAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const UploadCsv = () => {
    const { setFetchTrigger } = useContext(ThemeContext);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(""); // File Name State
    const [progress, setProgress] = useState(0);
    const [successMessage, setSuccessMessage] = useState("");
    const [uploaderId, setUploaderId] = useState("");
    const [currentChunk, setCurrentChunk] = useState(0);
    const [totalChunks, setTotalChunks] = useState(0);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        setUploaderId(Cookies.get("userId"));
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setFileName(selectedFile.name); // Store File Name
        setSuccessMessage("");
        setProgress(0);
        setCurrentChunk(0);
        setTotalChunks(Math.ceil(selectedFile.size / (1024 * 100))); // 100KB chunks
    };

    const uploadNextChunk = async () => {
        if (!file || currentChunk >= totalChunks) {
            setUploading(false);
            setSuccessMessage("✅ File uploaded successfully!");
            setFetchTrigger(true);
            return;
        }

        setUploading(true);
        const CHUNK_SIZE = 1024 * 100; // 100KB per chunk
        const start = currentChunk * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);
        const reader = new FileReader();

        reader.onload = async () => {
            let fileContent = reader.result;
            let rows = fileContent.split("\n");
            
            if (rows.length > 0) {
                let headers = rows[0].split(",").map(header => header.trim().toLowerCase());
                
                headers = headers.map(header => {
                    if (["phone", "mobile", "mobile phone"].includes(header)) {
                        return "phone";
                    }
                    return header;
                }); 
                rows[0] = headers.join(",");
                fileContent = rows.join("\n");
            }
        
            const formData = new FormData();
            formData.append("file", new Blob([fileContent], { type: "text/csv" }), `chunk_${currentChunk + 1}.csv`);
            formData.append("uploaderId", uploaderId);
            formData.append("chunkNumber", currentChunk + 1);
            formData.append("totalChunks", totalChunks);
        
            try {
                await axios.post("http://localhost:3000/file-uploads", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
        
                const newChunk = currentChunk + 1;
                setCurrentChunk(newChunk);
                setProgress(Math.round((newChunk / totalChunks) * 100));
        
                uploadNextChunk();
            } catch (error) {
                console.error(`Error uploading chunk ${currentChunk + 1}:`, error);
                setUploading(false);
            }
        };
        

        reader.readAsText(chunk);
    };

    const handleUpload = () => {
        if (!file) {
            setSuccessMessage("⚠️ Please select a CSV file before uploading.");
            return;
        }
        if (!uploaderId) {
            setSuccessMessage("⚠️ UploaderId is missing.");
            return;
        }

        setSuccessMessage("");
        setProgress(0);
        setCurrentChunk(0);
        setUploading(true);
        uploadNextChunk();
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg text-center">
                <motion.img 
                    src={uploadcsv} 
                    alt="Upload CSV" 
                    className="w-24 h-24 mx-auto mb-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload CSV File</h2>
                <p className="text-gray-500 mb-4">Upload your CSV file in chunks for smooth processing.</p>

                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition duration-300">
                    <FaCloudUploadAlt className="text-5xl text-blue-600 mb-2" />
                    <span className="text-gray-700 text-sm">Click to select a file</span>
                    <input 
                        type="file" 
                        accept=".csv" 
                        onChange={handleFileChange} 
                        className="hidden"
                    />
                </label>

                {/* File Name Display */}
                {fileName && (
                    <div className="mt-3 text-gray-700 font-semibold bg-gray-100 px-4 py-2 rounded-md shadow-md">
                        📂 {fileName}
                    </div>
                )}

                <button 
                    onClick={handleUpload} 
                    className={`w-full text-white px-6 py-3 mt-6 rounded-lg transition-all duration-300 shadow-md ${
                        uploading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload CSV"}
                </button>

                {/* Progress Bar */}
                {progress > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-6 mt-6 relative overflow-hidden">
                        <motion.div
                            className="bg-blue-500 h-6 rounded-full text-center text-white text-sm font-semibold leading-6"
                            style={{ width: `${progress}%` }}
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                        >
                            {progress}%
                        </motion.div>
                    </div>
                )}

             
                <div className="mt-2 text-gray-700 text-sm">
                    {progress > 0 && `Uploaded: ${currentChunk} / ${totalChunks} Chunks`}
                </div>

                {/* Success Message */}
                {successMessage && (
                    <motion.div 
                        className="mt-4 text-green-700 bg-green-200 px-4 py-3 rounded-lg text-sm font-semibold shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {successMessage}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default UploadCsv;
