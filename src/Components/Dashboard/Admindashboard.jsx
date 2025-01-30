import React from "react";
import { MdGroups } from "react-icons/md";
import { SiReactivex } from "react-icons/si";
import { FaHandshake } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import Tabledata from "./Tabledata";
import { Link } from "react-router-dom";

const Admindashboard = () => {
  return (
    <div className="ml-64 bg-gray-200 w-[83%] h-[90vh] ">
      <div className="h-[10vh] flex justify-between  w-[95%] items-center justify-self-center">
        <div className="text-3xl font-bold  text-blue-500">Admin DashBoard</div>
        <div className="flex space-x-2 item-center">
          <div className="border bg-sky-400 hover:bg-sky-700 hover:cursor-pointer h-[30px]  w-18   text-white rounded-md ">
            <button> <Link to='/create_user' >Add Partner</Link></button>
          </div>
          <div className="border bg-green-400 h-[30px] hover:bg-green-700 hover:cursor-pointer w-18  text-white rounded-md ">
            <button> <Link to='/create_manager' > Add Manager </Link>  </button>
           
          </div>
          <div className="border bg-yellow-400 h-[30px] hover:bg-yellow-700 hover:cursor-pointer w-18 text-white rounded-md ">
            <button> <Link to='/create_vis' >Add Individual</Link></button>
           
          </div>
        </div>
      </div>
      <h1 className="text-green-500 text-xl font-bold ml-8">Online Users</h1>
      <div
        className="h-[13vh] bg-white items-center flex w-[95%]"
        style={{ justifySelf: "center" }}
      >
        <div className="w-[23%] bg-gray-100 h-[70%]  border ml-2 ">
          <h1 className="font-bold text-md ml-2">Admin</h1>
          <h5 className="text-sm ml-2">Time</h5>
        </div>
      </div>

      <div className="mt-7 h-[15vh] flex justify-around">
        <div className="h-[98%] text-lg font-bold text-center rounded bg-white w-[20%] justify-center">
          <MdGroups color="blue" size={40} className="justify-self-center" />
          <h1>Total User</h1>
          <h1 className="text-blue-800 text-3xl">1</h1>
        </div>
        <div className="h-[98%] text-lg font-bold text-center rounded bg-white w-[20%] justify-center">
          <SiReactivex
            color="green"
            size={40}
            className="mt-1 justify-self-center"
          />
          <h1>Active User</h1>
          <h1 className="text-green-800 text-3xl">1</h1>
        </div>
        <div className="h-[98%] text-lg font-bold text-center rounded bg-white w-[20%] justify-center">
          <FaHandshake color="red" size={40} className="justify-self-center" />
          <h1>Partner</h1>
          <h1 className="text-red-500 text-3xl">1</h1>
        </div>
        <div className="h-[98%] text-lg font-bold text-center rounded bg-white w-[20%] justify-center">
          <FaUser
            color="yellow"
            size={30}
            className=" mt-2 justify-self-center"
          />
          <h1>Individuals</h1>
          <h1 className="text-yellow-500 text-3xl">1</h1>
        </div>
      </div>
      <div className="ml-2 mt-[4%] bg-white w-[97%]">
        <Tabledata />
      </div>
    </div>
  );
};

export default Admindashboard;
