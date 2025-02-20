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
  const { setFetchTrigger, leads, reject, approve } = useContext(ThemeContext);

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
        console.log("1")
      } catch (error) {
        console.error(error);
        setData([]);
        setFilteredData([]);
      }
    };

    fetchLeads();
  }, [currentPage, approvalFilter, limit]);

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

  const handleDate = async (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }else if (name === "searchTerm") {
      setSearchTerm(value);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      const fetchdate = async () => {
        try {
          const response = await axios.get("http://localhost:3000/search-leads", {
            params: {
              startDate,
              endDate,
              searchTerm
            },
          });

          setFilteredData(response?.data?.data || []);
          console.log(filteredData )
       
        } catch (error) {
          console.error("Error fetching leads", error);
        }
      };
      fetchdate();
    }
  }, [startDate, endDate , searchTerm]);

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
    <div className="container w-[87%] mx-auto p-5 ml-[14%]">
      <div className="flex justify-around">
        <p>Total Leads are: <strong>{leads}</strong></p>
        <p>Accepted Leads: <strong>{approve}</strong></p>
        <p>Rejected Leads: <strong>{reject}</strong></p>
      </div>

      <div className="flex justify-between mb-2 h-9 gap-4 mt-4">
        <input
          type="text"
          placeholder="Search..."
          name="searchTerm"
          value={searchTerm}
          onChange={handleDate}
          className="p-2 border rounded-md w-1/4"
        />
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleDate}
          className="p-2 border rounded-md"
        />
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleDate}
          className="p-2 border rounded-md"
        />

        <div className="flex gap-2">
          <button
            className={`px-3 py-1 h- rounded-md border ${
              approvalFilter === "Accepted" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setApprovalFilter("Accepted")}
          >
            Accepted
          </button>
          <button
            className={`px-4 py-1 rounded-md border ${
              approvalFilter === "Rejected" ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setApprovalFilter("Rejected")}
          >
            Rejected
          </button>
          <button
            className={`px-4 py-1 rounded-md border ${
              approvalFilter === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
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
                   <td className="py-3 px-6">{(currentPage - 1) * limit + index + 1}</td>
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
                      className="bg-white shadow-md text-black px-3 py-1 rounded hover:bg-gray-200"
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
    className="px-4 py-2 rounded-md border bg-blue-500 text-white"
    onClick={() => setCurrentPage(1)}
  >
    1
  </button>

  {currentPage > 2 && <span className="px-4 py-2">...</span>} 

  {currentPage > 1 && currentPage !== totalPages && (
    <button
      className="px-4 py-2 rounded-md border bg-blue-500 text-white"
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      {currentPage - 1}
    </button>
  )}

  <button
    className="px-4 py-2 rounded-md border bg-blue-500 text-white"
  >
    {currentPage}
  </button>

  {currentPage < totalPages && (
    <button
      className="px-4 py-2 rounded-md border bg-blue-500 text-white"
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      {currentPage + 1}
    </button>
  )}

  {currentPage < totalPages - 1 && <span className="px-4 py-2">...</span>} 

  <button
    className="px-4 py-2 rounded-md border bg-blue-500 text-white"
    onClick={() => setCurrentPage(totalPages)}
  >
    {totalPages}
  </button>
</div>
    </div>
  );
};

export default MyLeads;
