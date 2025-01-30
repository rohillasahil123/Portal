import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Eli = () => {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("https://credmantra.com/api/v1/auth/eli", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob, 
        employmentType: formData.employmentType,  
        amount: formData.amount,  
        income: formData.income,  
        pincode: formData.pincode 
      });
      console.log(response)
     toast.success("Checking eligibleity Please Wait few Sec")
      navigate("/lenderlist")
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
      setLoading(false);
    }
  };





  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    employmentType: "",
    phone: "",
    amount: "",
    pincode: "",
    income: ""
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-[98vh] bg-gray-300 flex items-center justify-center ">
      <div className="w-[98%] max-w-2xl bg-white p-10 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Check Eligibility</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount Required</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                placeholder="Enter pincode"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            >
              <option value="">Select an option</option>
              <option value="Salaried">Salaried</option>
              <option value="Self-employed">Self-employed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Your Income</label>
            <input
              type="text"
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="mt-2 block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              placeholder="Enter your income"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 transform hover:scale-105"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Eli;
