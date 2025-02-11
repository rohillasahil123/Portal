import React, { useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { ThemeContext } from "../../../Context/Context"

const LoginUserPage = () => {
  const { setFetchTrigger } = useContext(ThemeContext); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data);
      if (response.data.message === "success") {
        const token = response.data.token;
        const role = "DSA";
        const userId = response.data.partner.id;

        Cookies.set("role", role, { secure: true, sameSite: "Strict", expires: 1 });
        Cookies.set("userId", userId, { secure: true, sameSite: "Strict", expires: 1 });
        Cookies.set("userToken", token, { secure: true, sameSite: "Strict", expires: 1 });

        toast.success("Login successful!");
        setFetchTrigger(true);

        navigate("/board");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Partner Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

        
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
          <div>
            <p className="text-md text-gray-500 text-center mt-2">If you are not Partner so Login <span className="text-blue-600 font-semibold hover:cursor-pointer"> <Link to='/loginInd'>Individual</Link></span></p>
          </div>
    
        </form>
      </div>
    </div>
  );
};

export default LoginUserPage;
