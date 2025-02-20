import { useContext } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { ThemeContext } from "../../Context/Context";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const AdminChart = () => {
  const { allData, adminRejected, adminSuccess } = useContext(ThemeContext);

  const chartData = {
    labels: ["Total Data", "Success", "Rejected"],
    datasets: [
      {
        label: "Admin Statistics",
        data: [allData, adminSuccess, adminRejected],
        backgroundColor: ["blue", "green", "red"],
        borderColor: ["darkblue", "darkgreen", "darkred"],
        borderWidth: 2,
      },
    ],
  };


  const pieData = {
    labels: ["Success", "Rejected"],
    datasets: [
      {
        data: [adminSuccess, adminRejected],
        backgroundColor: ["green", "red"],
      },
    ],
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      <div className="w-[60%] h-[50vh]">
        <h2 className="text-lg font-bold text-center">Bar Chart</h2>
        <Bar data={chartData} />
      </div>
      <div className="w-[60%] h-[90vh]">
        <h2 className="text-lg font-bold text-center">Line Chart</h2>
        <Line data={chartData} />
      </div>
      <div className="w-80 h-80">
        <h2 className="text-lg font-bold text-center">Pie Chart</h2>
        <Pie data={pieData} />
      </div>
     
    </div>
  );
};

export default AdminChart;
