import React from 'react';
import { Line } from 'react-chartjs-2';
import { CircularProgress } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const AdminDashboard = () => {
  const chartData = {
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'DSA Partner',
        data: [100, 200, 300, 400, 300, 200, 100, 500],
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Individual Partner',
        data: [500, 400, 300, 200, 300, 400, 500, 200],
        borderColor: 'green',
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
          <h2 className="text-2xl font-bold">23</h2>
          <p>DSA Partner</p>
        </div>
        <div className="w-[20%] bg-gray-100 h-[18vh] p-6 text-center rounded-md mb-4">
          <h2 className="text-2xl font-bold">123</h2>
          <p>Individual Partner</p>
        </div>
        <div className="w-[20%] bg-gray-100 h-[18vh]  p-6 text-center rounded-md mb-4">
          <h2 className="text-[15px] font-bold">Delete Partner List </h2>
          <button className=" h-[50%] mt-1 bg-white text-orange-400 py-1 px-2 rounded">Watch List</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-wrap justify-between">
        {/* Visitor Statistics */}
        <div className="w-3/5 mb-4">
          <h3 className="text-xl font-bold mb-2">Login Details</h3>
          <Line data={chartData} />
        </div>

        <div className="w-1/3 mt-16 bg-gray-100 text-center rounded-md p-4">
      <h3 className="text-lg font-bold mt-2 mb-4">Tasks</h3>
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
          value={80}
          size={140}
          thickness={5}
          sx={{ color: "Gray" }} 
        />
        <p className="mt-2 text-2xl font-bold">100%</p>
      </div>
    </div>
      </div>

      {/* Meet-Up Invite */}
      <div className="bg-gray-100 p-6 rounded-md mt-6">
        <h3 className="text-xl font-bold mb-2">Invite to Office Meet-up</h3>
        <p>Due date: December 23, 2018</p>
        <p>Rebecca Moore</p>
        <div className="mt-4 flex gap-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Call</button>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded">Edit</button>
          <button className="bg-red-500 text-white py-2 px-4 rounded">Ended</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard