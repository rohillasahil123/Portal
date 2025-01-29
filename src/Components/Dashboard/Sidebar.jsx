import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Sidebar = ({ isAdmin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();



  const handleLogin = () => {
    navigate("/Login");
  };

  const handleLogout = () => {
    Cookies.remove("userToken");
    if (!Cookies.get("usertoken")) {
      navigate("/Login");
    }
  };


 

  return (
    <div className="fixed top-0 left-0 h-screen w-64 shadow-xl rounded-r-xl">
      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/" className="text-lg hover:text-blue-400">
                Board
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/uploadcsv" className="text-lg hover:text-blue-400">
                Upload CSV
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin" className="text-lg hover:text-blue-400">
                Admin DashBoard
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/individual" className="text-lg hover:text-blue-400">
                Individual Lead
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/eli" className="text-lg hover:text-blue-400">
                Eligibility Checker
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/EmiCalculator" className="text-lg hover:text-blue-400">
                EMI Calculator
              </Link>
            </li>
            {isAdmin && (
              <>
                <li className="mb-4">
                  <Link to="/admin/dashboard" className="text-lg hover:text-blue-400">
                    Admin Dashboard
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/manage/partner" className="text-lg hover:text-blue-400">
                    Manage All Partners
                  </Link>
                </li>
              </>
            )}
            <li className="mb-4">
              <Link to="/myleads" className="text-lg hover:text-blue-400">
                My Leads
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-auto mb-6 p-6 bg-white text-gray-800 rounded-t-xl shadow-md">
        
      {Cookies.get("userToken") ? (
          <>
            <button
              type="button"
              onClick={handleLogout}
              className="font-bold  text-xl border w-[100px] h-7 rounded-lg hover:cursor-pointer" style={{zIndex:100}}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleLogin}
              type="button"
              className="font-bold  text-xl border w-[100px]  h-7 rounded-lg  hover:cursor-pointer" style={{zIndex:100}}
            >
              Login
            </button>
          </>
        )}
        </div>
    </div>
  );
};

export default Sidebar;
