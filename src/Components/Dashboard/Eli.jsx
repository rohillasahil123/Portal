import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Eli = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    employmentType: "",
    phone: "",
    amount: "",
    pincode: "",
    income: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();




  const validateFields = () => {
    for (const key in formData) {
      if (!formData[key]) {
        toast.error(`Please fill out ${key.replace(/([A-Z])/g, " $1")}`);
        return false;
      }
    }
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      await axios.post("https://credmantra.com/api/v1/auth/eli", formData);
      toast.success("Checking eligibility, Please wait...");
      navigate("/lenderlist");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (formData.name && formData.phone && formData.email && formData.amount) {
      setStep(step + 1);
    } else {
      toast.error("Please fill out all required fields.");
    }
  };

  const handleBack = () => setStep(step - 1);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-xl shadow-xl relative">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Check Eligibility</h1>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Email ID</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                    placeholder="Enter email"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Amount Required</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-32 py-2 bg-white text-black rounded-md border shadow-md hover:bg-gray-200"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                    placeholder="Enter pincode"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Employment Type</label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                >
                  <option value="">Select an option</option>
                  <option value="Salaried">Salaried</option>
                  <option value="Self-employed">Self-employed</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Your Income</label>
                <input
                  type="text"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                  placeholder="Enter your income"
                />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="py-2 px-6 border border-gray-400 text-gray-600 rounded-md hover:bg-gray-100"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Eli;
