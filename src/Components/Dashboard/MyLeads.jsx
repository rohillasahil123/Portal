import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const MyLeads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage, setLeadsPerPage] = useState(10);

  // Date range state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const uploaderId = Cookies.get("userId");

    if (!uploaderId) {
      setError("Uploader ID not found in cookies");
      setLoading(false);
      return;
    }

    const fetchLeads = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/get-leads-by-uploader-id`,
          {
            params: { uploaderId },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const updatedLeads = response.data.leads[0].leads.map((lead) => ({
          ...lead,
          pending: lead.pending.toString(),
        }));
        setLeads(updatedLeads);
        setFilteredLeads(updatedLeads);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError(err.message || "Failed to fetch leads");
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  useEffect(() => {
    if (Array.isArray(leads)) {
      const filtered = leads.filter((lead) => {
        return Object.values(lead).some((value) => {
          // Convert both the value and search term to string for comparison
          if (value && typeof value === "string") {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          }
          if (value && typeof value === "number") {
            return value.toString().includes(searchTerm);
          }
          return false;
        });
      });
      setFilteredLeads(filtered);
    }
  }, [leads, searchTerm]);

  // Handle date range filter
  const handleDateSearch = () => {
    if (startDate && endDate) {
      const filtered = leads.filter((lead) => {
        const leadDate = new Date(lead.date); // Assuming 'date' field is in the lead object
        return (
          leadDate >= new Date(startDate) && leadDate <= new Date(endDate)
        );
      });
      setFilteredLeads(filtered);
    }
  };

  // Calculate current leads for the page
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const isLeadsValid = Array.isArray(filteredLeads) && filteredLeads.length > 0;

  const downloadCSV = () => {
    const headers = Object.keys(filteredLeads[0])
      .filter((key) => key !== "_id") // Exclude _id from headers
      .join(",");
    const rows = filteredLeads
      .map((lead) =>
        Object.values(lead)
          .filter((_, idx) => Object.keys(lead)[idx] !== "_id") // Exclude _id from rows
          .map((value) => `"${value || "N/A"}"`)
          .join(",")
      )
      .join("\n");

    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  // Handle Next Page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredLeads.length / leadsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle Previous Page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle Leads per Page change
  const handleLeadsPerPageChange = (e) => {
    setLeadsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  if (loading) return <p>Loading leads...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="overflow-x-auto w-[70%] mb-6 ml-64">
      <h2 className="text-2xl font-bold mb-4">My Leads</h2>

      <div className="flex justify-between sticky">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
          />
        </div>

        <div className="mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={downloadCSV}
            disabled={!isLeadsValid}
          >
            Download CSV
          </button>
        </div>

        {/* Leads per page dropdown */}
        <div className="mb-4">
          <select
            value={leadsPerPage}
            onChange={handleLeadsPerPageChange}
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* Date Range Inputs */}
      <div className="flex mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mr-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 mr-2"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleDateSearch}
        >
          Search
        </button>
      </div>

      {/* Leads Table */}
      {isLeadsValid ? (
        <>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-left">
                  Index
                </th>
                {Object.keys(filteredLeads[0])
                  .filter((key) => key !== "_id")
                  .map((key) => (
                    <th
                      key={key}
                      className="px-4 py-2 border border-gray-300 bg-gray-100 text-left"
                    >
                      {key}
                    </th>
                  ))}
                <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentLeads.map((lead, index) => (
                <tr key={index}>
                  {/* Add Index Column */}
                  <td className="px-4 py-2 border border-gray-300">
                    {index + 1 + indexOfFirstLead}
                  </td>
                  {Object.entries(lead)
                    .filter(([key]) => key !== "_id") // Exclude _id from rows
                    .map(([key, value], idx) => (
                      <td key={idx} className="px-4 py-2 border border-gray-300">
                        {value || "N/A"}
                      </td>
                    ))}
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => {
                        const updatedLeads = [...filteredLeads];
                        updatedLeads.splice(index, 1);
                        setFilteredLeads(updatedLeads);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={previousPage}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {Math.ceil(filteredLeads.length / leadsPerPage)}
            </span>
            <button
              onClick={nextPage}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              disabled={currentPage === Math.ceil(filteredLeads.length / leadsPerPage)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No leads to display. Please upload a CSV file.</p>
      )}
    </div>
  );
};

export default MyLeads;
