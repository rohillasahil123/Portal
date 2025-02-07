import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"; 
import { GiCrossMark } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { FaDollarSign, FaUsers,  FaCheckCircle } from "react-icons/fa";
import Tabledata from "./Tabledata"
import axios from "axios"
import Cookies from "js-cookie";








const Dashboard = () => {

const [leads, setLeads] = useState(0);
const [user, setUser] = useState(0);
const [success, setSuccess] = useState(0);
const [approve, setApprove] = useState(0);
const [reject, setReject] = useState(0);
const [progress, setProgress] = useState(0);


const data = [
  { name: "Jan", sales: leads },
  { name: "Feb", sales: 6 },
  { name: "Mar", sales: leads },
  { name: "Apr", sales: leads },
  { name: "May", sales: 10 },
  { name: "Jun", sales: 59 },
  { name: "Jul", sales: 80 },
  { name: "Aug", sales: 30 },
  { name: "Sep", sales: 80},
  { name: "Oct", sales: 59},
  { name: "Nov", sales: leads},
  { name: "Dec", sales: 8},
];






useEffect(() => {
  const uploaderId = Cookies.get("userId");
  if (!uploaderId) return;
  
  const fetchLeads = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getAllData/partners/leads");
      setLeads(response.data.totalLeads);
      setUser(response.data.successPercentage);
      setSuccess(response.data.successPercentage);
      setApprove(response.data.successLeads)
      setReject(response.data.rejectedLeads)
      setProgress(response.data.processingLeads)
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  };
  fetchLeads();
}, []);


  return (
    <div className="p-8 bg-gray-100 ml-0 sm:ml-[12%] min-h-screen">

<div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 mb-8">
      <MetricCard title="Total Leads" value={leads} icon={<FaUsers />} />
      <MetricCard title="Progress" value={progress} icon={<FaDollarSign />} />
      <MetricCard title="Approval" value={approve} icon={<FaCheckCircle />} />
      <MetricCard title="Rejected" value={reject} icon={<GiCrossMark />} />
      <MetricCard title="Total User " value={reject} icon={<FaUser />} />
    </div>


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:overflow-hidden">
      
      <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow min-h-[200px]">
        <h3 className="text-xl font-semibold mb-4">Track Lead</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      
      <div className="flex flex-row sm:flex-col text-[12px] gap-6">
      
        <div className="bg-white text-black p-6 rounded-lg shadow-md sm:w-[65%] mx-auto">
          <h3 className="text-xl font-semibold mb-4">Total Leads</h3>
          <p className="text-4xl font-bold">{leads}</p>
          <ul className="mt-4 space-y-1">
            <li>Disbursed in % = {success}</li>
            <li>In progress = {progress}</li>
            <li>Rejected = {reject}</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow sm:max-w-md h-[100%] w-[44%] sm:w-[65%] sm:mx-auto">
          <h3 className="text-xl font-semibold mb-4">Today Leads</h3>
          <ul className="space-y-1">
            <li>Disbursed: {approve}</li>
            <li>Rejected: {reject}</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="flex flex-col lg:flex-row gap-6 px-4 w-[100%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-[100%]">
     
        <div className="bg-white p-6 rounded-lg shadow w-full max-w-md mx-auto">
          <Tabledata />
        </div>

        {/* Expenses Status */}
        <div className="bg-white p-6 rounded-lg shadow w-full max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4">Expenses Status</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={data}>
              <Line type="monotone" dataKey="sales" stroke="#ff7300" />
              <XAxis dataKey="name" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-center text-green-500 font-semibold mt-4">On Track</p>
        </div>
      </div>
    </div>
    </div>
  );
};
const MetricCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white w-full max-w-xs min-h-[14vh] rounded-lg shadow flex justify-around items-center p-4">
      <div className="text-2xl text-gray-500">{icon}</div>
      <div>
        <h3 className="text-[12px] font-semibold">{title}</h3>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;