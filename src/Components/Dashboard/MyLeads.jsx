import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { CSVLink } from "react-csv";
import { ThemeContext } from "../../Context/Context";
import moment from "moment";

const MyLeads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leadsPerPage, setLeadPerPage] = useState(40);
  const totalLeadData = useContext(ThemeContext);


  const fetchLeads = async (page = 1) => {
    setLoading(true);
    try {
      const uploaderId = Cookies.get("userId");
      if (!uploaderId) {
        setError("User ID not found.");
        setLoading(false);
        return;
      }
      const response = await axios.get("http://localhost:3000/get-leads", {
        headers: { "Content-Type": "application/json" },
        params: { uploaderId, page, limit: leadsPerPage },
      });
      const leadsData =
        response?.data?.data?.map((lead) => ({
          ...lead,
          approvalStatus: lead.accounts?.some(
            (acc) => acc.status === "Accepted"
          )
            ? "Accepted"
            : "Rejected",
        })) || [];

      setLeads(leadsData);
      setTotalPages(response?.data?.totalPages || 0);
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to fetch leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(currentPage);
  }, [currentPage]);

  const filteredLeads = leads.filter((lead) => {
    Object.values(lead).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const leadDate = moment(lead.createdAt).format("YYYY-MM-DD");
    return (
      (!startDate || leadDate >= startDate) &&
      (!endDate || leadDate <= endDate) &&
      Object.values(lead).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Lead?")) return;
    try {
      const response = await axios.delete(
        `http://localhost:3000/delete-lead/${id}`
      );
      if (response.data.message === "success") {
        setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== id));
        toast.success("Lead deleted successfully");
      } else {
        throw new Error(response.data.message || "Failed to delete lead");
      }
    } catch (error) {
      toast.error("Failed to delete lead. Please try again.");
    }
  };

  const csvData = filteredLeads.map((lead, index) => ({
    "#": (currentPage - 1) * leadsPerPage + index + 1,
    Name: lead.name || "N/A",
    Phone: lead.phone || "N/A",
    Email: lead.email || "N/A",
    Status: lead.approvalStatus || "N/A",
  }));

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return (
      <div className="flex justify-center mt-4">
        {pages.map((page, index) => (
          <button
            key={index}
            className={`px-3 py-1 mx-1 border rounded ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            }`}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            disabled={typeof page !== "number"}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="w-[82%] p-4 ml-[15%]">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">My Leads</h2>
        <p>Total leads are {totalLeadData.allData} </p>
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-1 mb-4 w-[30%]"
        />

        <div className="flex w-[40%]">
          <input
            type="date"
            placeholder="Search date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-3 py-1 mb-4 w-[45%]"
          />
          <p className="font-bold">To</p>
          <input
            type="date"
            placeholder="Search date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-3 py-1 mb-4 w-[45%]"
          />
        </div>

        <select
    className="border px-2 py-2 rounded-md w-[6%] h-10"
    value={leadsPerPage}  
    onChange={(e) => {
      const selectedValue = e.target.value === "all" ? "all" : Number(e.target.value);
      setLeadPerPage(selectedValue);
    }}
  >
    <option value={10}>10</option>
    <option value={20}>20</option>
    <option value={40}>40</option>
    <option value="all">All</option>
  </select>
        <CSVLink
          data={csvData}
          filename="MyLeads.csv"
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Download CSV
        </CSVLink>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">Loading...</div>
      ) : filteredLeads.length > 0 ? (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">#</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Created At</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => (
                <tr key={lead._id} className="border-t text-center">
                  <td className="border p-2">
                    {(currentPage - 1) * leadsPerPage + index + 1}
                  </td>
                  <td className="border p-2">{lead.name || "N/A"}</td>
                  <td className="border p-2">{lead.phone || "N/A"}</td>
                  <td className="border p-2">{lead.email || "N/A"}</td>
                  <td className="border p-2">{lead.approvalStatus || "N/A"}</td>
                  <td className="border p-2">
                    {lead.createdAt
                      ? (() => {
                          const date = new Date(lead.createdAt);
                          const mm = String(date.getMonth() + 1).padStart(
                            2,
                            "0"
                          );
                          const dd = String(date.getDate()).padStart(2, "0");
                          const yyyy = date.getFullYear();
                          return `${mm}/${dd}/${yyyy}`;
                        })()
                      : "N/A"}
                  </td>
                  <td className="border p-2">
                    <button
                      className="bg-white text-black px-2 py-1 rounded shadow-md"
                      onClick={() => handleDelete(lead._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {renderPagination()}
        </>
      ) : (
        <p>No leads found.</p>
      )}
    </div>
  );
};

export default MyLeads;
