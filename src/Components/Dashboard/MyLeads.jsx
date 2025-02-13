import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { CSVLink } from "react-csv";
import { ThemeContext } from "../../Context/Context";
import moment from "moment";

const MyLeads = () => {
  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leadsPerPage, setLeadPerPage] = useState(40);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedLeads, setSelectedLeads] = useState([]);
  const totalLeadData = useContext(ThemeContext);

  const fetchLeads = async (page = 1) => {
    setLoading(true);
    try {
      const uploaderId = Cookies.get("userId");
      if (!uploaderId) {
        toast.error("User  ID not found.");
        setLoading(false);
        return;
      }

      const params = {
        uploaderId,
        page,
        limit: leadsPerPage,
        search: searchTerm,
        startDate,
        endDate,
        approvalStatus: selectedStatus !== "all" ? selectedStatus : undefined,
      };

      const response = await axios.get("http://localhost:3000/get-leads", {
        headers: { "Content-Type": "application/json" },
        params,
      });

      setLeads(response?.data?.data || []);
      setTotalPages(response?.data?.totalPages || 0);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on filter change
      fetchLeads(1); // Fetch leads with updated filters
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, startDate, endDate, selectedStatus, leadsPerPage]);

  useEffect(() => {
    fetchLeads(currentPage);
  }, [currentPage, totalLeadData.fetchTrigger]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Lead?")) return;
    try {
      await axios.delete(`http://localhost:3000/delete-lead/${id}`);
      fetchLeads(currentPage);
      toast.success("Lead deleted successfully");
    } catch (error) {
      toast.error("Failed to delete lead. Please try again.");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedLeads.length || !window.confirm("Delete selected leads?"))
      return;
    try {
      await axios.post("/leads/bulk-delete", { ids: selectedLeads });
      fetchLeads(currentPage);
      setSelectedLeads([]);
      toast.success(`${selectedLeads.length} leads deleted successfully`);
    } catch (error) {
      toast.error("Bulk delete failed");
    }
  };

  const csvData = leads.map((lead, index) => ({
    "#": index + 1,
    Name: lead.name || "N/A",
    Phone: lead.phone || "N/A",
    Email: lead.email || "N/A",
    Status: lead.approvalStatus || "N/A",
    "Created At": lead.createdAt
      ? moment(lead.createdAt).format("MM/DD/YYYY")
      : "N/A",
  }));

  const statusFilters = [
    { label: "All", value: "all", color: "bg-white" },
    { label: "Accepted", value: "Accepted", color: "bg-white" },
    { label: "Rejected", value: "Rejected", color: "bg-white" },
    { label: "Pending", value: "Pending", color: "bg-white" },
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearchTerm =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || lead.approvalStatus === selectedStatus;

    return matchesSearchTerm && matchesStatus;
  });

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-4 gap-2">
        <button
          className={`px-3 py-1 border rounded ${
            currentPage === 1 ? "bg-gray-200" : "bg-white hover:bg-blue-50"
          }`}
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="px-3 py-1">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className={`px-3 py-1 border rounded ${
            currentPage === totalPages
              ? "bg-gray-200"
              : "bg-white hover:bg-blue-50"
          }`}
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="w-[82%] p-4 ml-[15%]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lead Management</h1>
        <div className="flex items-center gap-4">
          <span className="bg-gray-50 text-black px-3 py-1 rounded-md">
            Total Leads: {totalLeadData.allData} 
          </span>
          <CSVLink
            data={csvData}
            filename="MyLeads.csv"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

  
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />


          <div className="flex gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-3 py-2 rounded flex-1"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-3 py-2 rounded flex-1"
            />
          </div>

          <select
            value={leadsPerPage}
            onChange={(e) => setLeadPerPage(Number(e.target.value))}
            className="border w-[20%] px-1 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={40}>40</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-4 ">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => {
                setSelectedStatus(filter.value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-md transition-all border shadow-lg  ${
                selectedStatus === filter.value
                  ? "bg-blue-500 text-white shadow-lg"
                  : `${filter.color} hover:opacity-90`
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {selectedLeads.length > 0 && (
        <div className="bg-yellow-100 p-3 rounded-lg mb-4 flex justify-between items-center">
          <span>{filteredLeads.length} leads found</span>
          <span>{filteredLeads.length} leads found</span>

          <button
            onClick={handleBulkDelete}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 shadow-lg transition-colors"
          >
            Delete Selected
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-4 text-center">Loading leads...</div>
        ) : leads.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedLeads.length === leads.length}
                        onChange={(e) =>
                          setSelectedLeads(
                            e.target.checked ? leads.map((l) => l._id) : []
                          )
                        }
                      />
                    </th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-gray-50 text-center">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(lead._id)}
                          onChange={(e) =>
                            setSelectedLeads(
                              e.target.checked
                                ? [...selectedLeads, lead._id]
                                : selectedLeads.filter((id) => id !== lead._id)
                            )
                          }
                        />
                      </td>
                      <td className="px-4 py-3">{lead.name || "N/A"}</td>
                      <td className="px-4 py-3">{lead.phone || "N/A"}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded ${
                            lead.approvalStatus === "Accepted"
                              ? "bg-green-100 text-green-800"
                              : lead.approvalStatus === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {lead.approvalStatus || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {lead.createdAt
                          ? moment(lead.createdAt).format("MMM D, YYYY")
                          : "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="bg-white shadow-md  text-black px-3 py-1 rounded hover:bg-gray-200"
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
            {renderPagination()}
          </>
        ) : (
          <div className="p-4 text-center">No leads found.</div>
        )}
      </div>
    </div>
  );
};

export default MyLeads;
