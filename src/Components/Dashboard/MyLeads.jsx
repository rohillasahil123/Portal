import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { CSVLink } from "react-csv";
import toast from "react-hot-toast";
import { ThemeContext } from "../../Context/Context";
import { Link } from "react-router-dom";

const MyLeads = () => {
  const [data, setData] = useState([]);
  const [totalLead, setTotalLead] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("All");
  const { setFetchTrigger, fetchTrigger , leads , reject ,approve} = useContext(ThemeContext);

  const [limit, setLimit] = useState(40);
  const totalPages = Math.ceil(totalLead / limit);
  useEffect(() => {
    const fetchLeads = async () => {
      const userId = Cookies.get("userId");
      try {
        const response = await axios.get("http://localhost:3000/getSizeData1", {
          params: {
            page: currentPage,
            size: limit,
            uploaderId: userId,
            search: searchTerm,
            startDate,
            endDate,
            filterType: approvalFilter, 
          },
        });
  
        const records = response.data?.records || [];
        const totalLeads = response.data?.totalLeads || 0;
  
        const updatedRecords = records.map((item) => ({
          ...item,
          approvalStatus: item.accounts?.some((acc) => acc.status === "Accepted") ? "Accepted" : "Rejected",
        }));
  
        setData(updatedRecords);
        setTotalLead(totalLeads);
        applyFilters(updatedRecords);
      } catch (error) {
        console.error(error);
        setData([]);
        setFilteredData([]);
      }
    };
  
    fetchLeads();
  }, [currentPage, searchTerm, startDate, endDate, approvalFilter, limit]);
  
  const applyFilters = (records) => {
    let filtered = records;
    if (approvalFilter !== "All") {
      filtered = filtered.filter(
        (item) => item.approvalStatus === approvalFilter
      );
    }
    setFilteredData(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Lead?")) return;

    try {
      await axios.delete(`http://localhost:3000/delete-lead/${id}`);
      setData((prevData) => prevData.filter((item) => item._id !== id));
      setFilteredData((prevFilteredData) =>
        prevFilteredData.filter((item) => item._id !== id)
      );
      toast.success("Lead deleted successfully");
      setFetchTrigger(true);
    } catch (error) {
      toast.error("Failed to delete lead. Please try again.");
    }
  };

  useEffect(() => {
    applyFilters(data);
  }, [approvalFilter]);

  const totalAccepted = data.filter(
    (item) => item.approvalStatus === "Accepted"
  ).length;
  const totalRejected = data.filter(
    (item) => item.approvalStatus === "Rejected"
  ).length;

  const csvHeaders = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Status", key: "approvalStatus" },
    { label: "Created At", key: "updatedAt" },
  ];

  return (
    <div className="container mx-auto p-5 ml-[14%]">
      <div className="flex justify-between mb-2 h-9 gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-1/4"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded-md"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded-md"
        />

        <div className="flex gap-2">
          <button
            className={`px-3 py-1 h- rounded-md border ${
              approvalFilter === "Accepted"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setApprovalFilter("Accepted")}
          >
            Accepted
          </button>
          <button
            className={`px-4 py-1 rounded-md border ${
              approvalFilter === "Rejected"
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setApprovalFilter("Rejected")}
          >
            Rejected
          </button>
          <button
            className={`px-4 py-1 rounded-md border ${
              approvalFilter === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setApprovalFilter("All")}
          >
            All
          </button>
        </div>

        <select
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value))}
          className="px-1 py-1 border rounded-md"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={40}>40</option>
        </select>

        <CSVLink
          data={filteredData.length > 0 ? filteredData : []}
          headers={csvHeaders}
          filename={"leads.csv"}
          className="px-4 py-1 bg-green-500 text-white rounded-md"
        >
          Export
        </CSVLink>

        <button className="px-4 py-1 rounded-md border shadow-md">
          <Link to="/chart">Chart</Link>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr className="text-center">
              <th className="py-3 px-6 text-left">Index</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item.id || index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{item.name}</td>
                  <td className="py-3 px-6">{item.email}</td>
                  <td
                    className={`py-3 px-6 ${
                      item.approvalStatus === "Accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.approvalStatus}
                  </td>
                  <td className="py-3 px-6">
                    {new Date(item.updatedAt).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="bg-white shadow-md  text-black px-3 py-1 rounded hover:bg-gray-200"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center my-4 space-x-2">
        <button
          className={`px-4 py-2 rounded-md border ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <button
          className={`px-4 py-2 rounded-md border ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyLeads;
