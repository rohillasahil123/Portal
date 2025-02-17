import React, { useContext , useEffect } from "react";
import { Line } from "react-chartjs-2";
import { CircularProgress } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { ThemeContext } from "../../Context/Context";
import { Link } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const AdminDashboard = () => {
  const { allData, adminRejected, adminSuccess, setFetchTrigger, fetchTrigger } = useContext(ThemeContext);

  useEffect(() => {
    setFetchTrigger(true);  
    console.log(fetchTrigger , "r768676");
  }, [setFetchTrigger]);

  // Dynamically update chartData based on adminSuccess and adminRejected
  const chartData = {
    labels: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "DSA Partner",
        data: [adminSuccess, adminRejected, 300, 400, 300, 200, 100, 500],  // Modify data according to the context values
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Individual Partner",
        data: [500, 400, 300, 200, 300, 400, 500, 200], // Modify data as needed
        borderColor: "green",
        fill: false,
      },
    ],
  };

  return (
    <div className="p-8 w-[82%] ml-0 sm:ml-[16%]">
      {/* Stats Header */}
      <div className="flex flex-wrap justify-between text-[12px]">
        <div className="w-[20%] bg-gray-100 h-[18vh] p-6 text-center rounded-md mb-4">
          <h2 className="text-2xl font-bold">1259</h2>
          <p>Total Partner</p>
        </div>
        <div className="w-[20%] bg-gray-100 h-[18vh] p-6 text-center rounded-md mb-4">
          <h2 className="text-2xl font-bold">{adminSuccess}</h2>
          <p>Total Success</p>
        </div>
        <div className="w-[20%] bg-gray-100 h-[18vh] p-6 text-center rounded-md mb-4">
          <h2 className="text-2xl font-bold">{adminRejected}</h2>
          <p>Total Rejected</p>
        </div>
        <div className="w-[20%] bg-gray-100 h-[18vh]  p-6 text-center rounded-md mb-4">
          <h2 className="text-2xl font-bold">{allData}</h2>
          <h2 className="">Total Leads</h2>
        </div>
      </div>

      <div className="flex flex-wrap justify-between">
        <div className="w-3/5 mb-4">
          <h3 className="text-xl font-bold mb-2">Lead Details</h3>
          <Line data={chartData} />
        </div>

        <div className="w-1/3 mt-16 bg-gray-100 text-center rounded-md p-4">
  <h3 className="text-lg font-bold mt-2 mb-4">Leads</h3>
  <div className="relative flex flex-col items-center">
    <div className="absolute">
   
      <CircularProgress
        variant="determinate"
        value={100}
        size={140}
        thickness={5}
        sx={{ color: "sky" }}
      />
    </div>
   
    <CircularProgress
      variant="determinate"
      value={adminSuccess ? (adminSuccess / allData) * 100 : 0}
      size={140}
      thickness={5}
      sx={{ color: "gray" }}
    />
    <p className="mt-2 text-lg font-bold">
      {adminSuccess ? `${((adminSuccess / allData) * 100).toFixed(2)}%` : "0%"}
      Success
    </p>
  </div>
</div>

   
      </div>

      {/* Meet-Up Invite */}
      <div className="bg-gray-100 p-6 rounded-md mt-6">
        <h3 className="text-xl font-bold mb-2">Create DSA or Individual Partner</h3>
        <div className="mt-4 flex gap-4">
          <button className="bg-white text-black hover:bg-gray-300 border shadow-md py-2 px-4 rounded"><Link to='/create_user'>DSA</Link>  </button>
          <button className="bg-white text-black hover:bg-gray-300 border shadow-md  py-2 px-4 rounded"><Link to='/create_ind'>Individual</Link> </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
