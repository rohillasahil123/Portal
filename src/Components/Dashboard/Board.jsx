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

const Userform = () => {
  const [data, setData] = useState("");

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
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3000/api/total-count");
        console.log(result.data.totalCount);
        setData(result.data.totalCount);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    console.log("Updated data:", data);
  }, [data]);

  return (
    <div className="bg-gray-200 w-[100%]  ">
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

      <div className="flex h-[11vh] w-full space-x-2 mt-2 ">
        <div className="h-[100%] border ml-3 shadow-lg bg-white w-[24%] rounded-md flex justify-between items-center ">
          <div>
            {" "}
            <h1 className="text-lg ml-3 mt-2 text-gray-500 ">
              Total Leads
            </h1>{" "}
            <h1 className="font-bold ml-3 text-3xl">{data}</h1>
          </div>
          <div className="  text-center mt-1 h-10 bg-blue-100 border items-center w-[14%] rounded-full mr-3">
            <MdGroups size={28} className="text-blue-500 ml-[10%]   mt-1" />
          </div>
        </div>
        <div className="h-[100%] border ml-3 shadow-lg bg-white w-[24%] rounded-md flex justify-between items-center ">
          <div>
            {" "}
            <h1 className="text-lg ml-3 mt-2 text-gray-500  ">
              Today Leads
            </h1>{" "}
            <h1 className="font-bold ml-3 text-3xl">1</h1>
          </div>
          <div className="  text-center mt-1 h-10 bg-green-100 border items-center w-[14%] rounded-full mr-3">
            <BsSendArrowUpFill
              size={20}
              className="text-green-500 ml-[16%] mt-[24%]"
            />
          </div>
        </div>

        <div className="h-[100%] border ml-3 shadow-lg bg-white w-[24%] rounded-md flex justify-between items-center ">
          <div>
            {" "}
            <h1 className="text-lg ml-3 mt-2 text-gray-500  ">
              Conversion Rate
            </h1>{" "}
            <h1 className="font-bold ml-3 text-3xl">1</h1>
          </div>
          <div className="  text-center mt-1 h-10 bg-yellow-100 border items-center w-[14%] rounded-full mr-3">
            <FaPercent
              size={16}
              className="text-yellow-500 ml-[26%]   mt-[29%]"
            />
          </div>
        </div>
        <div className="h-[100%] border ml-3 shadow-lg bg-white w-[24%] rounded-md flex justify-between items-center">
          <div>
            {" "}
            <h1 className="text-lg ml-3 mt-2 text-gray-500  ">
              Approval Leads
            </h1>{" "}
            <h1 className="font-bold ml-3 text-3xl">1</h1>
          </div>
          <div className="  text-center mt-1 h-10 bg-sky-100 border items-center w-[14%] rounded-full mr-3">
            <FaCheckCircle
              size={20}
              className="text-sky-500 ml-[22%]   mt-[20%]"
            />
          </div>
        </div>
      </div>

      <div className="flex h-[10vh] space-x-4 mt-6 ">
        <div className="h-[100%] border ml-3 shadow-lg bg-white w-[16%] rounded-md flex justify-between items-center ">
          <div>
            {" "}
            <h1 className="text-md ml-3 mt-2 text-gray-500 ">Reject</h1>{" "}
            <h1 className="font-bold ml-3 text-3xl">1</h1>
          </div>
          <div className="  text-center mt-1 h-10 bg-blue-100 border items-center w-[19%] rounded-full mr-3">
            <FaFile size={20} className="text-sky-500 ml-[23%]   mt-[23%]" />
          </div>
        </div>
        <div className="h-[100%] border ml-3 shadow-lg bg-white w-[16%] rounded-md flex justify-between items-center ">
          <div>
            {" "}
            <h1 className="text-md ml-3 mt-2 text-gray-500  ">Approved</h1>{" "}
            <h1 className="font-bold ml-3 text-3xl">1</h1>
          </div>
          <div className="  text-center mt-1 h-10 bg-blue-100 border items-center w-[19%] rounded-full mr-3">
            <IoMdCheckboxOutline
              size={20}
              className="text-green-500 ml-[23%] mt-[25%] "
            />
          </div>
        </div>

        <div className="h-[100%] border ml-3 shadow-lg bg-white w-[16%] rounded-md flex justify-between items-center ">
          <div>
            {" "}
            <h1 className="text-md ml-3 mt-2 text-gray-500 ">
              Inprogress
            </h1>{" "}
            <h1 className="font-bold ml-3 text-3xl">1</h1>
          </div>
          <div className="  text-center mt-1 h-10 bg-blue-100 border items-center w-[19%] rounded-full mr-3">
            <FaFile size={20} className="text-sky-500 ml-[23%]   mt-[23%]" />
          </div>
        </div>
        <div className="h-[100%] border ml-3 shadow-lg bg-white w-[16%] rounded-md flex justify-between items-center ">
          <div>
            {" "}
            <h1 className="text-lg ml-3 mt-2 text-gray-500 ">Disbursed</h1>{" "}
            <h1 className="font-bold ml-3 text-3xl">1</h1>
          </div>
          <div className="  text-center mt-1 h-10 bg-blue-100 border items-center w-[19%] rounded-full mr-3">
            <FaFile size={20} className="text-sky-500 ml-[23%]   mt-[23%]" />
          </div>
        </div>
        <div className="h-[100%] border ml-3 shadow-lg bg-white w-[16%] rounded-md flex justify-between items-center ">
          <div>
            {" "}
            <h1 className="text-md ml-3 mt-2 text-gray-500 ">New Leads</h1>{" "}
            <h1 className="font-bold ml-3 text-3xl">1</h1>
          </div>
          <div className="  text-center mt-1 h-10 bg-blue-100 border items-center w-[19%] rounded-full mr-3">
            <FaFile size={20} className="text-sky-500 ml-[23%]   mt-[23%]" />
          </div>
        </div>
      </div>

      <div className="w-full h-[14vh] mt-[2%] bg-white flex items-center space-x-5 px-4">
        {PartnerData.map((item) => (
          <div
            key={item.id}
            className="w-[20%] h-[80%] shadow flex flex-col items-center"
          >
            <div className="flex justify-between w-full mt-2 ">
              <div className="text-center text-gray-700 font-medium ml-2">
                {item.partner}:
              </div>
              <div className="mr-3 border bg-teal-400 w-[14%] text-white font-bold rounded-md">
                {item.Number}%
              </div>
            </div>
            <div className="w-[97%] bg-gray-300 h-2 rounded mt-4">
              <div
                className="bg-green-500 h-2 rounded "
                style={{
                  width: `${item.Number}%`,
                  transition: "width 0.5s ease",
                }}
              ></div>
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
