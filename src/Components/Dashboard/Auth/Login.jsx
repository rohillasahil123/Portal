import React, { useState } from "react";
import axios from "axios";
import { Link , useNavigate  } from "react-router-dom";
import Cookies from "js-cookie"
import toast from "react-hot-toast";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!phone || !password) {
      setError("Both phone and password are required!");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/generate-pass", { phone, password });
      console.log(response.data.message);
      if(response.data.message === "success"){

        const { token, userId,} = response.data;
        
        Cookies.set("userToken", token, {
          secure: true,
          sameSite: "Strict",
          expires: 1, 
        });
        Cookies.set("userId", userId, {
          secure: true,
          sameSite: "Strict",
          expires: 1,
        });
        Cookies.set("role", "admin", {
          secure: true,
          sameSite: "Strict",
          expires: 1,
        });
        navigate("/board");
        toast.success("Login Success")
      } else {
        toast.error(response.data.message || "Failed to verify OTP.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to send OTP. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-6 gap-3 flex ">
          <p className="text-sm text-gray-600">if You are a DSA ?<Link to="/loginPartner" className="text-purple-600 underline ">Login</Link></p>
          <p className="text-sm text-gray-600"> <span ml-3></span> if you are a Individual? <Link  to="/loginInd" className="text-purple-600 underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
