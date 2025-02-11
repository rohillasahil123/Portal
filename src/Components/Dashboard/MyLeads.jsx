import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const MyLeads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [approve, setApprove] = useState(null);


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const leadsPerPage = 40;







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
    const leadsData = response?.data?.data?.map(lead => ({
      ...lead,
      approvalStatus: lead.accounts?.some(acc => acc.status === "Accepted") ? "Accepted" : "Rejected"
    })) || [];

    const approvalStatuses = leadsData.map(lead => lead.approvalStatus);

    setLeads(leadsData);
    setFilteredLeads(leadsData);
    setTotalPages(response?.data?.totalPages || 0);
    setApprove(approvalStatuses);

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

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    const filtered = leads.filter(
      (lead) =>
        lead.name?.toLowerCase().includes(lowerSearch) ||
        lead.phone?.toLowerCase().includes(lowerSearch) ||
        lead.email?.toLowerCase().includes(lowerSearch) ||
        lead.status?.toLowerCase().includes(lowerSearch)
    );
    setFilteredLeads(filtered);
  }, [searchTerm, leads]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Lead?")) return;
    try {
      const response = await axios.delete(`http://localhost:3000/delete-lead/${id}`);
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

  const handleDownloadCSV = () => {
    if (filteredLeads.length === 0) {
      toast.error("No leads available to download.");
      return;
    }

    const headers = ["Name", "Phone", "Email", "Status"];
    const csvRows = [
      headers.join(","),
      ...filteredLeads.map((lead) =>
        [lead.name || "N/A", lead.phone || "N/A", lead.email || "N/A", lead.status || "N/A"].join(",")
      ),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex justify-center flex-col items-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        <h1 className="font-semibold text-xl">Loading data...</h1>
      </div>
    );
  }

  return (
    <div className="w-[82%] p-4 ml-[15%]">
      <h2 className="text-2xl font-bold mb-4">My Leads</h2>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-md mb-4"
        />
        <button
          className="bg-white mb-2 border py-1 rounded-md font-semibold px-2 hover:bg-gray-200 shadow-md"
          onClick={handleDownloadCSV}
        >
          Download CSV
        </button>
      </div>

      {filteredLeads.length > 0 ? (
        <div className="border border-gray-300 rounded">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">#</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => (
                <tr key={lead._id} className="border-t text-center">
                  <td className="border p-2">{(currentPage - 1) * leadsPerPage + index + 1}</td>
                  <td className="border p-2">{lead.name || "N/A"}</td>
                  <td className="border p-2">{lead.phone || "N/A"}</td>
                  <td className="border p-2">{lead.email || "N/A"}</td>
                  <td className="border p-2">{lead.approve || "N/A"}</td>
                  <td className="border p-2">
                    <button
                      className="bg-white text-black shadow-md hover:bg-gray-200 px-2 py-1 rounded"
                      onClick={() => handleDelete(lead._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No leads found.</p>
      )}

  
      <div className="flex justify-center items-center mt-4">
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="font-bold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyLeads;
