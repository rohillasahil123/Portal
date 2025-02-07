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
    { path: "/individual", label: "Create Lead", showFor: ["admin", "DSA", "individual"] },
    { path: "/eli", label: "Eligibility Checker", showFor: ["admin", "DSA", "individual"] },
    { path: "/EmiCalculator", label: "EMI Calculator", showFor: ["admin", "DSA", "individual"] },
    { path: "/myleads", label: "My Leads", showFor: ["admin", "individual", "DSA"] },
    { path: "/admin", label: "Admin Dashboard", showFor: ["admin"] },
    { path: "/manage/Partner", label: "Manage Partners", showFor: ["admin"] },
    { path: "/profile", label: "Profile", showFor: ["admin", "individual" , "DSA"] },
  ];

  if (!isLoggedIn) return null;

  return (
    <div className="h-screen fixed flex text-[12px] font-semibold">
      <div
        className={`fixed md:relative top-0 left-0 h-full w-62 bg-white shadow-xl border-r transition-all ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-700 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <FiX size={24} /> 
        </button>

        <h1 className="text-2xl font-bold text-center mt-6 text-gray-800">
          Dashboard
        </h1>

        <nav className="mt-8 px-4">
          <ul className="space-y-1">
            {menuItems
              .filter((item) => item.showFor.includes(role))
              .map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="block py-2 px-4 rounded-lg text-md font-semibold hover:bg-gradient-to-r from-blue-400 to-purple-500 hover:text-white transition-all duration-300 ease-in-out"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 right-4 w-full flex justify-center">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Menu Button for Mobile */}
      <button
        className="p-1 h-[12vh] bg-gray-800 text-white rounded-md m-2 md:hidden"
        onClick={() => setIsOpen(true)}
      >
        <FiMenu size={24} />
      </button>

    </div>
  );
};

export default Dashboard;
