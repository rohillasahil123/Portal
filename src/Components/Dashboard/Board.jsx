import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../Context/Context";
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
import { FaUsers, FaDollarSign, FaCheckCircle, FaUser } from "react-icons/fa";
import Tabledata from "./Tabledata";
import bgImage from "../../assets/bg.jpg";

const Dashboard = () => {
  const { user, leads, progress, approve, reject, fetchTrigger, setFetchTrigger } = useContext(ThemeContext);
  
  const [chartData, setChartData] = useState([]); // state for the chart data

  useEffect(() => {
    setFetchTrigger(false);
    console.log(fetchTrigger, "r");

   
    const fetchedData = [
      { name: "Jan", sales: leads },
      { name: "Feb", sales: leads },
      { name: "Mar", sales: leads },
      { name: "Apr", sales: leads },
      { name: "May", sales: leads },
      { name: "Jun", sales: leads },
      { name: "Jul", sales: leads },
      { name: "Aug", sales: leads },
      { name: "Sep", sales: leads },
      { name: "Oct", sales: leads },
      { name: "Nov", sales: leads },
      { name: "Dec", sales: leads },
    ];
    setChartData(fetchedData);
  }, [fetchTrigger, leads]);

  const data = chartData;

  const approvePercentage = ((approve / leads) * 100).toFixed(2);
  const rejectPercentage = ((reject / leads) * 100).toFixed(2);

  return (
    <div
      className="p-8 min-h-screen bg-cover bg-center bg-no-repeat ml-0 sm:ml-[12%]"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 mb-8">
        <MetricCard title="Total Leads" value={leads} icon={<FaUsers />} />
        <MetricCard title="Progress soon" value={progress} icon={<FaDollarSign />} />
        <MetricCard title="Approval" value={approve} icon={<FaCheckCircle />} />
        <MetricCard title="Rejected" value={reject} icon={<GiCrossMark />} />
        <MetricCard title="Single Leads" value={user} icon={<FaUser />} />
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
              <li>Rejected Leads = {reject}</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow sm:max-w-md h-[100%] w-[44%] sm:w-[65%] sm:mx-auto">
            <h3 className="text-xl font-semibold mb-4">Today Leads</h3>
            <ul className="space-y-1">
              <li>Disbursed: {approve} ({approvePercentage}%)</li>
              <li>Rejected: {reject} ({rejectPercentage}%)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-4 w-[100%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-[100%]">
          <div className="bg-white p-6 rounded-lg shadow w-[100%] mx-auto">
            <Tabledata />
          </div>

          <div className="bg-white p-6 rounded-lg shadow w-full max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4">Expenses Status</h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={data}>
                <Line type="monotone" dataKey="sales" stroke="#ff7300" />
                <XAxis dataKey="name" />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-center text-green-500 font-semibold mt-4">
              On Track
            </p>
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

export default Dashboard;
