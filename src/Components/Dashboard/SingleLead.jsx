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
    phone:""
  });
  const [userrole, setUserrole] = useState(null);
  const [user, setUser] = useState(null);
  const [responsedata ,setResponsedata ] = useState("")
  


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
    console.log(response, "Response");
    alert(JSON.stringify(formData, null, 2));
    setResponsedata(response.data)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {userrole === "admin" || userrole === "DSA" ? (
        <div className="flex space-x-2 absolute top-4 right-6">
          <div className="sm:px-4 sm:py-2 py-1 h-7 sm:h-9 w-12 sm:w-16 bg-green-500 text-white font-semibold text-center rounded-md cursor-pointer hover:bg-green-600">
           <h6 className="text-sm text-center">Single</h6>
          </div>
          <Link
            to="/uploadcsv"
            className="sm:px-4 sm:py-2 py-1 h-7 sm:h-9 w-12 sm:w-16 bg-sky-500 text-white font-semibold text-center rounded-md cursor-pointer hover:bg-sky-600"
          >
           <h6 className="text-sm text-center">Bulk</h6>
          </Link>
        </div>
      ) : null}

<div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
  <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
    Single Lead Form
  </h2>
  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      { label: "Name", type: "text", id: "name" },
      { label: "Email", type: "email", id: "email" },
      { label: "Pincode", type: "text", id: "pincode" },
      { label: "Date of Birth", type: "date", id: "dob" },
      { label: "Salary", type: "number", id: "salary" },
      { label: "Age", type: "number", id: "age" },
      { label: "Phone", type: "tel", id: "phone" },
    ].map(({ label, type, id }) => (
      <div key={id}>
        <label htmlFor={id} className="block text-gray-700 font-semibold mb-1">
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={id}
          value={formData[id]}
          onChange={handleChange}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          required
        />
      </div>
    ))}

    {/* Salary Type Select Dropdown */}
    <div>
      <label htmlFor="salaryType" className="block text-gray-700 font-semibold mb-1">
        Salary Type
      </label>
      <select
        id="salaryType"
        name="salaryType"
        value={formData.salaryType}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
        required
      >
        <option value="">Select Salary Type</option>
        <option value="self-employed">Self-Employed</option>
        <option value="salaried">Salaried</option>
      </select>
    </div>

    {/* Gender Selection */}
    <div className="md:col-span-2">
      <label className="block text-gray-700 font-semibold mb-1">Gender</label>
      <div className="flex space-x-4">
        {["Male", "Female", "Other"].map((gender) => (
          <div key={gender} className="flex items-center">
            <input
              type="radio"
              id={gender.toLowerCase()}
              name="gender"
              value={gender}
              onChange={handleChange}
              checked={formData.gender === gender}
              className="h-4 w-4 text-blue-500"
            />
            <label htmlFor={gender.toLowerCase()} className="ml-2">
              {gender}
            </label>
          </div>
        ))}
      </div>
    </div>

    <div className="md:col-span-2">
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition duration-300"
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
