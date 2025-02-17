import React, { useEffect, useState ,useContext     } from "react";
import axios from "axios";
import { ThemeContext } from "../../Context/Context";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, 
  PieChart, Pie, Cell, LineChart, Line 
} from "recharts";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Charts = () => {
const { leads , approve, reject } =useContext(ThemeContext);
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("bar");

  useEffect(()=>{
    console.log(leads)
  })

  

  useEffect(() => {
    const fetchLeads = async () => {
      const userId = Cookies.get("userId");
      try {
        const response = await axios.get("http://localhost:3000/getSizeData1", {
          params: { uploaderId: userId },
        });
        const records = response.data?.records || [];
        const processedData = [
          {
            name: "Approved",
            value: approve,
          },
          {
            name: "Rejected",
            value: reject,
          },
        ];
  
        console.log(response.data);
        setChartData(processedData);
      } catch (error) {
        console.error(error);
        setChartData([]);
      }
    };
  
    fetchLeads();
  }, [approve, reject]); 
    
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ml-[13%] bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Leads Analytics</h2>


        <div className="flex justify-center gap-3 mb-6">
          {["bar", "pie", "line"].map((type) => (
            <button
              key={type}
              className={`px-5  py-2 text-sm font-medium rounded-lg transition-all 
                ${
                  chartType === type
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              onClick={() => setChartType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Chart
            </button>
          ))}
        </div>

        {/* Chart Display */}
        <div className="flex justify-center bg-gray-50 p-3 rounded-lg shadow-md">
          {chartType === "bar" && (
            <BarChart width={400} height={400} data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4F46E5" radius={[5, 5, 0, 0]} />
            </BarChart>
          )}

          {chartType === "pie" && (
            <PieChart width={400} height={400}>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#4F46E5">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}

          {chartType === "line" && (
            <LineChart width={700} height={300} data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          )}
        </div>


        <div className="mt-6 flex justify-center">
          <Link to="/myleads">
            <button className="px-5 py-2 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transition-all">
              Back to Leads
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Charts;
