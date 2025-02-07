import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const MyLeads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage, setLeadsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const uploaderId = Cookies.get("userId");
    console.log(uploaderId, "1");
    if (!uploaderId) {
      setError("Uploader ID not found in cookies");
      setLoading(false); 
      return;
    }
    const fetchLeads = async () => {
      setLoading(true); 
      try {
        const response = await axios.post(
          "http://localhost:3000/get-leads-by-uploader-id",
          { uploaderId },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(response, "2");
  
        const leadsData = response?.data?.leads || [];
        console.log(leadsData, "tyu1");
  
        const updatedLeads = leadsData.map((lead) => ({
          ...lead,
          pending: lead.pending ? lead.pending.toString() : "false",
        }));
        setLeads(updatedLeads);
        setFilteredLeads(updatedLeads);
      } catch (err) {
        console.error("Error fetching leads:", err);
        setError(
          err?.response?.data?.message || "Failed to fetch leads. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };
  
    fetchLeads();
  }, []); 
  
  useEffect(() => {
    if (Array.isArray(leads) && searchTerm) {
      const filtered = leads.filter((lead) =>
        Object.values(lead).some((value) => {
          if (value && typeof value === "string") {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          }
          if (value && typeof value === "number") {
            return value.toString().includes(searchTerm);
          }
          return false;
        })
      );
      setFilteredLeads(filtered);
    }
  }, [leads, searchTerm]); 

  const handleDateSearch = () => {
    if (startDate && endDate) {
      const filtered = leads.filter((lead) => {
        const leadDate = new Date(lead.date);
        return leadDate >= new Date(startDate) && leadDate <= new Date(endDate);
      });
      setFilteredLeads(filtered);
    }
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const isLeadsValid = filteredLeads.length > 0;

  const downloadCSV = () => {
    if (!isLeadsValid) return;
    
    const headers = Object.keys(filteredLeads[0])
      .filter((key) => key !== "_id" && key !== "v account" && key !== "uploaderId")
      .join(",");
    const rows = filteredLeads
      .map((lead) =>
        Object.entries(lead)
          .filter(([key]) => key !== "_id" && key !== "v account" && key !== "uploaderId")
          .map(([_, value]) => `"${value}"`)
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

  const deleteLead = (index) => {
    const updatedLeads = filteredLeads.filter((_, i) => i !== index);
    setFilteredLeads(updatedLeads);
  };

  if (loading) return <p>Loading leads...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-[82%] p-4 ml-[20%]">
      <h2 className="text-2xl font-bold mb-4">My Leads</h2>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-[87%] gap-4 mb-4">
        <input
          type="text"
          placeholder="Search leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-[90%] md:max-w-md"
        />
        <button
          className="bg-white text-black px-4 border py-2 rounded hover:bg-gray-200 disabled:bg-gray-400"
          onClick={downloadCSV}
          disabled={!isLeadsValid}
        >
          Download CSV
        </button>
       
      </div>

      <div className="flex sm:flex-row gap-2 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto"
        />
        <button
          className="hover:bg-gray-200 text-black  border  px-4 py-2 rounded bg-white"
          onClick={handleDateSearch}
        >
          Search
        </button>
         <select
          value={leadsPerPage}
          onChange={(e) => {
            setLeadsPerPage(Number(e.target.value));
            setCurrentPage(1);}}
          className="border border-gray-300 rounded px-4 py-2">
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {isLeadsValid ? (
        <div className="overflow-x-auto ml-1 ">
          <table className="w-[90%] bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300 bg-gray-100 text-left">
                  Index
                </th>
                {Object.keys(filteredLeads[0])
                  .filter(
                    (key) =>
                      key !== "_id" &&
                      key !== "accounts" &&
                      key !== "uploaderId" &&
                      key !== "__v" &&
                      key !== "index" &&
                      key !== "email" && 
                      key !== "age" &&
                      key !== "pincode" && 
                      key !== "dob" && 
                      key !== "salary" && 
                      key !== "gender" && 
                      key !== "salaryType" &&
                      key !== "Index"
                  )
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
                  <td className="px-4 py-2 border text-[12px] border-gray-300">
                    {index + 1 + indexOfFirstLead}
                  </td>
                  {Object.entries(lead)
                    .filter(
                      ([key]) =>
                        key !== "_id" &&
                        key !== "accounts" &&
                        key !== "uploaderId" &&
                        key !== "__v" &&
                        key !== "index" &&
                        key !== "email" && 
                        key !== "age" &&
                        key !== "pincode" && 
                        key !== "dob" && 
                        key !== "salary" && 
                        key !== "gender" && 
                        key !== "salaryType" &&
                        key !== "Index"
                    )
                    .map(([_, value], idx) => (
                      <td
                        key={idx}
                        className="px-4 py-2 border border-gray-300"
                      >
                        {value || "N/A"}
                      </td>
                    ))}
                  <td className="px-4 py-2 border border-gray-300">
                    <button
                      className="bg-white text-black px-2 py-1 rounded hover:bg-gray-200"
                      onClick={() => deleteLead(index)}
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
        <p>No leads to display.</p>
      )}
    </div>
  );
};

export default MyLeads;
