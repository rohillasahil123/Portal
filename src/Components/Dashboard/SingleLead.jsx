import React, { useState } from "react";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pincode: "",
    dob: "",
    salary: "",
    age: "",
    gender: "",
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
    <div className="h-[80vh] flex  items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Single Lead Form</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

          
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
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

          
          <div className="mb-6">
            <label htmlFor="pincode" className="block text-gray-700 font-semibold mb-2">Pincode</label>
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

          
          <div className="mb-6">
            <label htmlFor="dob" className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
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

          
          <div className="mb-3  ">
            <label htmlFor="salary" className="block text-gray-700 font-semibold mb-2">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter your salary"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

          
          <div className="mb-6">
            <label htmlFor="age" className="block text-gray-700 font-semibold mb-2">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              required
            />
          </div>

          
          <div className="mb-6 col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Gender</label>
            <div className="flex space-x-6">
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  checked={formData.gender === "Male"}
                  className="h-4 w-4 text-blue-500"
                />
                <label htmlFor="male" className="ml-2">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  checked={formData.gender === "Female"}
                  className="h-4 w-4 text-pink-500"
                />
                <label htmlFor="female" className="ml-2">Female</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="Other"
                  onChange={handleChange}
                  checked={formData.gender === "Other"}
                  className="h-4 w-4 text-purple-500"
                />
                <label htmlFor="other" className="ml-2">Other</label>
              </div>
            </div>
          </div>

    
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 transform hover:scale-105"
          >
            Submit Form
          </button>
    
        </form>
      </div>
    </div>
  );
};

export default LeadForm;
