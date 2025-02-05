import React, { useEffect, useState } from "react";
// import StaticChart from "./Chart";
import { MdGroups } from "react-icons/md";
import { BsSendArrowUpFill } from "react-icons/bs";
import { FaPercent } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import Tabledata from "./Tabledata";
import axios from "axios";
import Cookies from "js-cookie";

const Userform = () => {
  const [data, setData] = useState("");
  const [error , setError] = useState(null);
  const [leads , setLeads] = useState(0)
  
  const [user , setUser] = useState(0)

  const PartnerData = [
    {
      id: 1,
      partner: "Fibe",
      Number: "70",
    },
    {
      id: 1,
      partner: "Money",
      Number: "40",
    },
    {
      id: 1,
      partner: "Zype",
      Number: "27",
    },
  ];

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  useEffect(() => {
    const uploaderId = Cookies.get("userId");
    console.log(uploaderId, "1");
    if (!uploaderId) {
      setError("Uploader ID not found in cookies");
      return;
    }
    const fetchLeads = async () => {
     
      try {
        const response = await axios.post(
          "http://localhost:3000/get-leads-by-uploader-id",
          { uploaderId },
          { headers: { "Content-Type": "application/json" } }
        );
     
         setLeads(response.data.totalLeads);
         setUser(response.data.totalUsers);
        const leadsData = response?.data?.leads || [];
  
        const updatedLeads = leadsData.map((lead) => ({
          ...lead,
          pending: lead.pending ? lead.pending.toString() : "false",
        }));
     
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError(
          err?.response?.data?.message || "Failed to fetch leads. Please try again later."
        );
      }
    };
  
    fetchLeads();
  }, []); 


  useEffect(() => {
    console.log("Updated data:", data);
  }, [data]);

  return (
    <div className="bg-gray-200 w-[90%]  sm:w-[100%]">
      <div className="flex justify-between">
        <div className="font -bold ml-3">
          <h1 className="text-3xl ">Welcome Guest</h1>
          <strong>Account Type</strong>
        </div>
        <div className="mr-3">
          <h1 className=" text-gray-600 text-lg">Today Date</h1>
          <p className=" text-lg">{formattedDate}</p>
        </div>
      </div>

      <div className="flex  flex-wrap justify-center sm:justify-around gap-4 mt-2">
  {[
    { title: "Total Leads", value: leads, icon: <MdGroups size={28} className="text-blue-500" />, bgColor: "bg-blue-100" },
    { title: "Total User", value: user, icon: <BsSendArrowUpFill size={20} className="text-green-500" />, bgColor: "bg-green-100" },
    { title: "Conversion Rate", value: "1", icon: <FaPercent size={16} className="text-yellow-500" />, bgColor: "bg-yellow-100" },
    { title: "Approval Leads", value: "1", icon: <FaCheckCircle size={20} className="text-sky-500" />, bgColor: "bg-sky-100" }
  ].map(({ title, value, icon, bgColor }, index) => (
    <div key={index} className="h-[11vh] w-[48%] sm:w-[23%]  bg-white border shadow-lg rounded-md flex justify-between items-center p-4">
      <div>
        <h1 className="text-lg text-gray-500">{title}</h1>
        <h1 className="font-bold text-3xl">{value}</h1>
      </div>
      <div className={`h-10 w-10 flex items-center justify-center rounded-full ${bgColor}`}>
        {icon}
      </div>
    </div>
  ))}
</div>


<div className="w-full h-auto mt-4 bg-white px-4 py-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {PartnerData.map((item) => (
      <div
        key={item.id}
        className="w-full sm:w-[100%]  shadow-md flex flex-col items-center p-4 bg-white rounded-lg"
      >
        <div className="flex justify-between w-full">
          <div className="text-gray-700 font-medium">{item.partner}:</div>
          <div className="bg-teal-400 h-6 w-8 text-white font-semibold rounded-md ">
            {item.Number}%
          </div>
        </div>
        <div className="w-full bg-gray-300 h-2 rounded mt-4">
          <div
            className="bg-green-500 h-2 rounded transition-all duration-500"
            style={{ width: `${item.Number}%` }}
          ></div>
        </div>
      </div>
    ))}
  </div>
</div>

<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-6">
  {[
    { title: "Reject", value: "1", icon: <FaFile size={20} className="text-sky-500" /> },
    { title: "Inprogress", value: "1", icon: <FaFile size={20} className="text-sky-500" /> },
    { title: "Disbursed", value: "1", icon: <FaFile size={20} className="text-sky-500" /> },
    { title: "New Leads", value: "1", icon: <FaFile size={20} className="text-sky-500" /> }
  ].map(({ title, value, icon }, index) => (
    <div key={index} className="h-[10vh] w-[99%] sm:w-[100%]  bg-white border shadow-lg rounded-md flex justify-between items-center p-4">
      <div>
        <h1 className="text-md text-gray-500">{title}</h1>
        <h1 className="font-bold text-3xl">{value}</h1>
      </div>
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
        {icon}
      </div>
    </div>
  ))}
</div>




      <div>
        <Tabledata />
      </div>
    </div>
  );
};

export default Userform;
