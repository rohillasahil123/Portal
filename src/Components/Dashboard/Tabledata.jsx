import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../Context/Context";

const App = () => {
  const [lender, setLender] = useState(null);
  const lenderdata = useContext(ThemeContext);

  useEffect(() => {
    console.log("Context Data:", lenderdata);
    if (lenderdata && lenderdata.allData) {
      setLender(lenderdata.allData);
      console.log("Setting Lender Data:", lenderdata.allData);
    }
  }, [lenderdata]); 
   

  const handleEdit = (id) => {
    console.log("Edit item with id:", id);
    console.log("A" + 1);
  };

  const handleDelete = (id) => {
    if (lender) {
      const updatedPartners = lender.partners.filter((item) => item.id !== id);
      setLender({ ...lender, partners: updatedPartners });
    }
  };

  return (
    <div className="p-4 text-[12px] from-neutral-400">
      <h1 className="text-2xl font-bold mb-4">Latest user</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 min-w-[600px]">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">
                Phone
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">
                Partner Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">
                Created At
              </th>
          
            </tr>
          </thead>
          <tbody>
            {lender && lender.partners ? (
              lender.partners.map((item, index) => (
                <tr key={index} className="text-center text-sm md:text-base">
                  <td className="border border-gray-300 px-2 py-1">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.phone}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.partnerStatus}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {item.createdAt}
                  </td>
           
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 px-2 py-1 text-center"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
