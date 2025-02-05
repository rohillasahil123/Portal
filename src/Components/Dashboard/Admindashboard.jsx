import { Link } from "react-router-dom";
import { MdGroups } from "react-icons/md";
import { SiReactivex } from "react-icons/si";
import { FaHandshake, FaUser } from "react-icons/fa";
import Tabledata from "./Tabledata"; // Ensure correct import

const AdminDashboard = () => {
  return (
    <div className="bg-gray-200 w-[97%] sm:w-full min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="h-auto md:h-[10vh] flex flex-col md:flex-row justify-between w-full md:w-[95%] mx-auto items-center">
        <div className="text-xl md:text-3xl font-bold text-blue-500">Admin DashBoard</div>
        <div className="flex space-x-2 mt-3 md:mt-0">
          {[
            { path: "/create_user", label: "Add Partner", bg: "bg-sky-400", hover: "hover:bg-sky-700" },
            { path: "/create_manager", label: "Add Manager", bg: "bg-green-400", hover: "hover:bg-green-700" },
            { path: "/create_vis", label: "Add Individual", bg: "bg-yellow-400", hover: "hover:bg-yellow-700" },
          ].map((btn, index) => (
            <Link
              key={index}
              to={btn.path}
              className={`${btn.bg} ${btn.hover} h-[30px] px-3 flex items-center text-white text-sm md:text-md rounded-md`}
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Online Users */}
      <h1 className="text-green-500 text-lg md:text-xl font-bold mt-6 ml-4">Online Users</h1>
      <div className="h-auto sm:h-[13vh] bg-white flex items-center p-4 w-full md:w-[95%] mx-auto rounded-md shadow-md">
        <div className="w-[34%] sm:w-[23%] bg-gray-100 h-[90%] sm:h-[100%] py-1 px-2 border rounded-md">
          <h1 className="font-bold text-md">Admin</h1>
          <h5 className="text-sm">Time</h5>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-[95%] mx-auto">
        {[
          { icon: <MdGroups size={40} color="blue" />, label: "Total User", value: "1", color: "text-blue-800" },
          { icon: <SiReactivex size={40} color="green" />, label: "Active User", value: "1", color: "text-green-800" },
          { icon: <FaHandshake size={40} color="red" />, label: "Partner", value: "1", color: "text-red-500" },
          { icon: <FaUser size={30} color="yellow" />, label: "Individuals", value: "1", color: "text-yellow-500" },
        ].map((stat, index) => (
          <div key={index} className="h-[15vh] flex flex-col items-center justify-center bg-white rounded-md shadow-md p-4">
            {stat.icon}
            <h1 className="text-lg font-bold mt-2">{stat.label}</h1>
            <h1 className={`${stat.color} text-3xl`}>{stat.value}</h1>
          </div>
        ))}
      </div>

      {/* Table Data */}
      <div className="mt-6 bg-white w-full md:w-[97%] mx-auto rounded-md shadow-md p-4">
        <Tabledata />
      </div>
    </div>
  );
};

export default AdminDashboard;
