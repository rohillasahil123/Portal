import React from 'react'

const Profile = () => {
      return (
        <div className="min-h-screen bg-gray-100 flex ml-64 justify-center items-center">
          <div className="w-[40%] h-[60vh] max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white text-center">
              <img
                className="w-24 h-24 rounded-full mx-auto border-4 border-white -mt-16"
                src="https://randomuser.me/api/portraits/men/11.jpg"
                alt="Profile"
              />
              <h2 className="mt-4 text-3xl font-semibold">Username</h2>
              <p className="text-lg mt-2"></p>
            </div>
    
            <div className="p-6">
              
    
              <div className="mt-6">
                <p className="text-xl">Email</p>
                <p className="text-xl">phone</p>
              </div>
              <div className="mt-6 text-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };
    

export default Profile