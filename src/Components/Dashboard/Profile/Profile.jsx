import React from 'react';
import profile from "../../../assets/Profile.jpeg"
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="flex p-8 ml-[20%] mt-8 justify-center font-sans space-x-6">
     
      <div className="bg-white border border-gray-300 rounded-lg p-6 mr-8 w-72 text-center shadow-lg">
        <img
          src={profile}
          alt="Profile"
          className="w-36 h-36 rounded-full mx-auto mb-6"
        />
        <div className="space-y-4">
          <div>
            <label className="block text-left">Name:</label>
            <input
              type="text"
              value="Sahil Rohilla"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-left">Password</label>
            <input
              type="text"
              value="*********"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md w-full">
            <Link to="/list">
            Watch Your Lander List 
            </Link>
          </button>
        </div>
      </div>

      <div className="flex-1 mt-[5%]">
        <h2 className="text-2xl font-bold mb-2">Sahil Rohilla</h2>
        <p className="text-gray-600 mb-4">Ratings: ⭐⭐⭐⭐⭐</p>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
          <p className="text-gray-700">Address: 023, B-Block, West Mambalam, Chennai</p>
          <p className="text-gray-700">Phone: +91-9676543210</p>
          <p className="text-gray-700">Email : example@gmail.com </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Basic Information</h3>
          <p className="text-gray-700">Birthday: 04 March 2022</p>
          <p className="text-gray-700">Gender: Male</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;