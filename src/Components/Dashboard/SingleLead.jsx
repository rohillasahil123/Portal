import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pincode: "",
    dob: "",
    salary: "",
    age: "",
    gender: "",
    phone: ""
  });
  const [userrole, setUserrole] = useState(null);
  const [user, setUser] = useState(null);
  const [responsedata, setResponsedata] = useState("");

  useEffect(() => {
    const getrole = Cookies.get("role");
    const uploaderId = Cookies.get("userId");
    setUser(uploaderId);
    setUserrole(getrole);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/singleUserLead", {
      uploaderId: user,
      ...formData,
    });
    setResponsedata(response.data);
    setFormData("")
    alert("Lead submitted successfully!");
  };

  return (
    <div className="min-h-[95vh] flex flex-col ml-0 sm:ml-[12%] items-center justify-center p-4">
      {userrole === "admin" || userrole === "DSA" ? (
        <div className="flex space-x-2 absolute top-4 right-4 z-10">
          <div className="px-4 py-2 h-10 bg-green-500 text-white font-semibold text-center rounded-md cursor-pointer hover:bg-green-600 transition duration-300">
            <h6 className="text-sm">Single</h6>
          </div>
          <Link
            to="/uploadcsv"
            className="px-4 py-2 h-10 bg-red-500 text-white font-semibold text-center rounded-md cursor-pointer hover:bg-red-700 transition duration-300"
          >
            <h6 className="text-sm">Bulk</h6>
          </Link>
        </div>
      ) : null}

      <div className="bg-white shadow-lg rounded-lg p-3 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Single Lead Form
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-6">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                required
              />
            </div>
            <div className="w-1/2">
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                required
              />
            </div>
          </div>

          {/* Pincode and Date of Birth in one row */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="pincode" className="block text-gray-700 font-semibold mb-2">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                maxLength={6}
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter your pincode"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                required
              />
            </div>
          </div>

          {/* Salary and Age in one row */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="salary" className="block text-gray-700 font-semibold mb-2">
                Salary
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Enter your salary"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                required
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="age" className="block text-gray-700 font-semibold mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                required
              />
            </div>
          </div>

          {/* Phone in one row */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                maxLength={10}
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                required
              />
            </div>
            <div className="w-1/2">
  <label htmlFor="gender" className="block text-gray-700 font-semibold mb-2">
    Gender
  </label>
  <select
    id="gender"
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
    required
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div>

          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition duration-300"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
