import { useState , useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

const CreateInd = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
   const [userId , setUserId] = useState("");
  
  const navigate =  useNavigate()


    useEffect(()=>{
      const uploaderId = Cookies.get("userId") 
      setUserId(uploaderId)
    })
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const response =await axios.post("http://localhost:3000/admin/create-partner",{
      name: formData.name,
      email: formData.email,
      password: formData.password,
      desinationType:"individual",
      uploaderId :userId
    })
    console.log(response)
    if(response.status === 201){
      navigate("/admin")
      toast.success("Partner Created Successfully!");
    }
     console.log("Form Data:", formData);
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="flex justify-center  w-full items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Create  Individual</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            Create  Individual
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateInd;