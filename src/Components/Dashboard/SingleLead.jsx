import React, { useEffect, useState } from "react";

const SingleLead = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    dob: "",
    loanAmount: "",
    pincode: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div className="h-[100vh] flex items-center justify-center bg-gray-100 ml-64 ">
      <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Loan Application Form
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              First Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-6">
            <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

          {/* DOB */}
          <div className="mb-6">
            <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

          {/* Loan Amount */}
          <div className="mb-6">
            <label htmlFor="loanAmount" className="block text-gray-700 font-semibold mb-2">
              Loan Amount
            </label>
            <input
              type="number"
              id="loanAmount"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              placeholder="Enter loan amount"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

          {/* Pincode */}
          <div className="mb-6">
            <label htmlFor="pincode" className="block text-gray-700 font-semibold mb-2">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter your pincode"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 transform hover:scale-105"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleLead;
