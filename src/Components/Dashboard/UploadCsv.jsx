import React, { useState, useEffect , useContext } from "react";
import Papa from "papaparse";
import axios from "axios";
import Cookies from "js-cookie";
import uploadcsv from "../../assets/uploadcsv.png";
import { ThemeContext } from "../../Context/Context"

const UploadCsv = () => {
    const {setFetchTrigger} = useContext(ThemeContext)


    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [successMessage, setSuccessMessage] = useState("");
    const [uploaderId, setUploaderId] = useState("");
    const [uploadedChunks, setUploadedChunks] = useState(0);
    const [totalChunks, setTotalChunks] = useState(0);

    useEffect(() => {
        const userId = Cookies.get("userId");
        setUploaderId(userId);
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setSuccessMessage("");
        setProgress(0);
        setUploadedChunks(0);
        setTotalChunks(Math.ceil(selectedFile.size / (1024 * 100))); // 100KB chunks
    };

    const handleUpload = async () => {
        if (!file) {
            setSuccessMessage("⚠️ Please select a CSV file before uploading.");
            return;
        }
        if (!uploaderId) {
            setSuccessMessage("⚠️ UploaderId is missing.");
            return;
        }

        const CHUNK_SIZE = 1024 * 100; // 100KB per chunk
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        setTotalChunks(totalChunks);

        for (let i = 0; i < totalChunks; i++) {
            const start = i * CHUNK_SIZE;
            const end = start + CHUNK_SIZE;
            const chunk = file.slice(start, end);

            const reader = new FileReader();
            reader.readAsText(chunk);

            reader.onload = async () => {
                const csvChunk = reader.result; 
                const formData = new FormData();
                formData.append("file", new Blob([csvChunk], { type: "text/csv" }), `chunk_${i + 1}.csv`);
                formData.append("uploaderId", uploaderId);
                formData.append("chunkNumber", i + 1);
                formData.append("totalChunks", totalChunks);

                try {
                    await axios.post("http://localhost:3000/file-uploads", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                    setUploadedChunks(i + 1);
                    setProgress(Math.round(((i + 1) / totalChunks) * 100));
                    setFetchTrigger(true)
                } catch (error) {
                    console.error(`Error uploading chunk ${i + 1}:`, error);
                }
            };
        }
        setSuccessMessage(" File uploaded successfully in chunks!");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
                <img src={uploadcsv} alt="Upload" className="w-24 h-24 mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Upload CSV File</h2>

                <input 
                    type="file" 
                    accept=".csv" 
                    onChange={handleFileChange} 
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                <button 
                    onClick={handleUpload} 
                    className="w-full bg-blue-600 text-white px-6 py-2 mt-4 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
                >
                    Upload CSV 
                </button>

                {/* Progress Bar */}
                {progress > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-6 mt-4 relative overflow-hidden">
                        <div
                            className="bg-blue-500 h-6 rounded-full text-center text-white text-sm font-semibold leading-6 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        >
                            {progress}%
                        </div>
                    </div>
                )}

                {/* Progress Info */}
                <div className="mt-2 text-gray-700 text-sm">
                    {progress > 0 && `Uploaded: ${uploadedChunks} / ${totalChunks} Chunks`}
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mt-4 text-green-700 bg-green-200 px-4 py-2 rounded-lg text-sm">
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadCsv;
