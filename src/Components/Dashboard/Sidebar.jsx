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
      if (
        location.pathname !== "/loginInd" &&
        location.pathname !== "/loginPartner"
      ) {
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
    { path: "/board", label: "Board", showFor: ["admin", "DSA", "individual"] },
    {
      path: "/individual",
      label: "Create Lead",
      showFor: ["admin", "DSA", "individual"],
    },
    {
      path: "/eli",
      label: "Eligibility Checker",
      showFor: ["admin", "DSA", "individual"],
    },
    {
      path: "/EmiCalculator",
      label: "EMI Calculator",
      showFor: ["admin", "DSA", "individual"],
    },
    {
      path: "/myleads",
      label: "My Leads",
      showFor: ["admin", "individual", "DSA"],
    },
    { path: "/admin", label: "Admin Dashboard", showFor: ["admin"] },
    {
      path: "/manage/Partner",
      label: "Manage All Partners",
      showFor: ["admin"],
    },
    { path: "/profile", label: "Profile", showFor: ["admin", "individual"] },
  ];

  if (!isLoggedIn) return null;

  return (
    <div className={`shadow-2xl transition-all duration-300 ease-in-out ${isOpen ? "bg-gray-800 md:bg-transparent border-none" : "border-l-2"}`}>

      {/* Menu Button - Hidden When Open */}
      <button
        className={`p-3 bg-gray-800 text-white rounded-md m-2 md:hidden ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-full w-57 text-blue-600 md:translate-x-0 transform ${
          isOpen ? "translate-x-0 bg-gray-50" : "-translate-x-full bg-transparent"
        } transition-transform duration-300 ease-in-out md:flex md:flex-col`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-black md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <FiX size={24} />
        </button>

        {/* Logout Button */}
        <div className="flex p-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Dashboard Title */}
        <h1 className="text-2xl font-bold mb-6 ml-3">Dashboard</h1>
        
        {/* Navigation Links */}
        <nav>
          <ul>
            {menuItems
              .filter((item) => item.showFor.includes(role))
              .map((item, i) => (
                <li key={i} className="mb-4 ml-3">
                  <Link
                    to={item.path}
                    className="hover:text-blue-400"
                    onClick={() => setIsOpen(false)}
                  >
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
