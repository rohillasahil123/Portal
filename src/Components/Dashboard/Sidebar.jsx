import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = Cookies.get("role") || "";
    console.log(userRole);
    setRole(userRole);
    console.log(userRole);
  }, []);

  const handleLogout = () => {
    Cookies.remove("userToken");
    Cookies.remove("role");
    navigate("/");
  };

  const menuItems = [
    {
      path: "/board",
      label: "Board",
      showFor: ["admin", "Partner", "individual"],
    },
    {
      path: "/individual",
      label: "Create Lead",
      showFor: ["admin", "Partner", "individual"],
    },
    {
      path: "/eli",
      label: "Eligibility Checker",
      showFor: ["admin", "Partner", "individual"],
    },
    {
      path: "/EmiCalculator",
      label: "EMI Calculator",
      showFor: ["admin", "Partner", "individual"],
    },
    {
      path: "/myleads",
      label: "My Leads",
      showFor: ["admin", "Partner", "individual"],
    },

    { path: "/admin", label: "Admin Dashboard", showFor: ["admin"] },

    {
      path: "/manage/Partner",
      label: "Manage All Partners",
      showFor: ["admin"],
    },
    { path: "/profile", label: "Profile", showFor: ["admin", "individual"] }, // Partner can't see
  ];

  //   useEffect(()=>{
  //     <ul>
  //     {menuItems
  //       .filter((item) => item.showFor.includes(role))
  //       .map((item) => (
  //         <li key={item.path} className="mb-4">
  //           <Link to={item.path} className="hover:text-blue-400">
  //             {item.label}
  //           </Link>
  //         </li>
  //       ))}
  //   </ul>
  //  console.log(menuItems[0])
  //   })

  return (
    <div className=" h-screen ">
      {/* Sidebar */}
      <div className="text-black p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <nav>
          <ul>
            {menuItems
              .filter((item) => item.showFor.includes(role))
              .map((item, i) => (
                <li key={i} className="mb-4">
                  <Link to={item.path} className="hover:text-blue-400">
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome, {role.toUpperCase()}
        </h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
