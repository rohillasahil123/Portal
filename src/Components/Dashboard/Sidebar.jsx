import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FiMenu, FiX } from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = Cookies.get("userToken");
    const userRole = Cookies.get("role") || "";
    
    if (userToken) {
      setRole(userRole);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      if (location.pathname !== "/loginInd" && location.pathname !== "/loginPartner") {
        navigate("/");
      }
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    Cookies.remove("userToken");
    Cookies.remove("role");
    setIsLoggedIn(false);
    navigate("/");
  };

  const menuItems = [
    { path: "/board", label: "Board", showFor: ["admin", "Partner", "individual"] },
    { path: "/individual", label: "Create Lead", showFor: ["admin", "Partner", "individual"] },
    { path: "/eli", label: "Eligibility Checker", showFor: ["admin", "Partner", "individual"] },
    { path: "/EmiCalculator", label: "EMI Calculator", showFor: ["admin", "Partner", "individual"] },
    { path: "/myleads", label: "My Leads", showFor: ["admin", "Partner", "individual"] },
    { path: "/admin", label: "Admin Dashboard", showFor: ["admin"] },
    { path: "/manage/Partner", label: "Manage All Partners", showFor: ["admin"] },
    { path: "/profile", label: "Profile", showFor: ["admin", "individual"] }, 
  ];

  if (!isLoggedIn) return null

  return (
    <div className="" >
      <button
        className="p-3 bg-gray-800 text-white rounded-md m-2 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
    
      <div 
        className={`fixed md:relative top-0 left-0 h-full w-64 bg-gray-900 text-white md:translate-x-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:flex md:flex-col`}
      >
        <button
          className="absolute top-4 right-4 text-white md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <FiX size={24} />
        </button>

        <div className="flex p-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <h1 className="text-2xl font-bold mb-6 ml-3">Dashboard</h1>
        <nav>
          <ul>
            {menuItems
              .filter((item) => item.showFor.includes(role))
              .map((item, i) => (
                <li key={i} className="mb-4 ml-3">
                  <Link to={item.path} className="hover:text-blue-400">
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
