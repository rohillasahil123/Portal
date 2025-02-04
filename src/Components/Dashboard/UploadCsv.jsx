import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import uploadImage from "../../assets/UploadCsv.png";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const UploadCsv = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [uploaderId, setUploaderId] = useState("");

  useEffect(() => {
    const userId = Cookies.get("userId"); 
    console.log("User ID from Cookies:", userId);
    setUploaderId(userId);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccessMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setSuccessMessage("Please select a file before uploading.");
      return;
    }
    if (uploaderId) {
      console.log("UploaderId and UserId are equal:", uploaderId);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("uploaderId", uploaderId);

      const response = await axios.post("http://localhost:3000/file-uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        Papa.parse(file, {
          header: true,
          complete: (result) => {
            onUpload(result.data);
            setSuccessMessage("CSV file uploaded successfully!");
          },
          error: () => {
            setSuccessMessage("Error while parsing the file. Please try again.");
          },
        });
      } else {
        setSuccessMessage("Failed to upload file. Please try again.");
      }
    } catch (error) {
      console.error("File upload error:", error);
      setSuccessMessage("Error while uploading the file. Please try again.");
    }
  }else{
    setSuccessMessage("UploaderId is not set. Please try again.");
  }
  };

  return (
    <div className="flex justify-center items-center  bg-gray-300 min-h-screen">
 
      <div className="bg-white p-5 rounded-lg shadow-lg  max-w-3xl">

      <div className="sm:px-4   sm:py-2 px-1 py-1  h-7 sm:h-9 w-12 sm:w-16 bg-green-500 text-white font-semibold text-center rounded-md cursor-pointer hover:bg-green-600">
      <Link to="/individual"><h6 className="text-sm text-center">Single</h6> </Link>
          </div>
          
        <div className="flex items-center justify-center mb-8">
          <img src={uploadImage} alt="Logo" className="sm:h-[40%] sm:w-[40%] h-[62%] w-[62%] mr-4" />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Choose a CSV file:
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-gray-700 border border-gray-300 rounded px-4 py-3"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Upload
        </button>

        {successMessage && (
          <div
            className={`mt-6 text-center h-7 rounded-lg text-lg w-[60%] font-medium mx-auto ${
              successMessage.includes("successfully")
                ? "text-green-700 bg-green-200"
                : "text-red-600 bg-red-200"
            }`}
          >
            {successMessage}
          </div>
        )}

        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>
            Powered by <strong>CredMantra</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadCsv;
