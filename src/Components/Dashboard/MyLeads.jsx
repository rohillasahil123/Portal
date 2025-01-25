import React, { useEffect } from 'react';

const MyLeads = ({ leads }) => {
  const isLeadsValid = Array.isArray(leads) && leads.length > 0;
  useEffect(()=>{
    console.log(leads , "try")  
  })
  return (
    <div className="overflow-x-auto mb-6 ml-64">
      <h2 className="text-2xl font-bold mb-4">My Leads</h2>
      {isLeadsValid ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {Object.keys(leads[0]).map((key) => (
                <th key={key} className="px-4 py-2 border border-gray-300 bg-gray-100 text-left">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index}>
                {Object.values(lead).map((value, idx) => (
                  <td key={idx} className="px-4 py-2 border border-gray-300">
                    {value || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No leads to display. Please upload a CSV file.</p>
      )}
    </div>
  );
};

export default MyLeads;
