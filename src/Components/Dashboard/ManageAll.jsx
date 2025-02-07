import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { ThemeContext } from "../../Context/Context";

const PartnerTable = () => {
  const PartnerData = useContext(ThemeContext);
  const [dataPartner, setDataPartner] = useState(null); // Initialize as null

  useEffect(() => {
    if (PartnerData && PartnerData.allData && PartnerData.allData.partners) {
      setDataPartner(PartnerData.allData);
      console.log(dataPartner)
    }
  }, [PartnerData]);

  const [buttonStates, setButtonStates] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleEdit = (id) => {
    alert("Edit functionality is not implemented yet.");
  };

  const handleUpgrade = (id) => {
    setButtonStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    toast.success("Upgrade");
  };

  const handleDelete = (id) => {
    if (dataPartner && dataPartner.partners) {
      const updatedPartners = dataPartner.partners.filter(
        (partner) => partner.id !== id
      );
      setDataPartner({ ...dataPartner, partners: updatedPartners });
      toast.success("Partner deleted");
    }
  };

  return (
    <div className="container mx-auto py-3 ml-64 w-[96%] sm:w-[79%]">
      <h1 className="font-semibold sm:font-bold text-xl sm:text-2xl text-center">
        All User Data
      </h1>
      <div className="mb-4 flex justify-between items-center">
        <select
          className="p-2 border rounded"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <table className="w-full">
        <thead className="w-full">
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Assigned</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">Upgrade</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {dataPartner && dataPartner.partners && dataPartner.partners.slice(0, itemsPerPage).map((partner) => (
            <tr key={partner.id} className="ml-6 border-b">
              <td className="px-4 py-2">{partner.name}</td>
              <td className="px-4 py-2">{partner.desinationType}</td>
              <td className="px-4 py-2">{partner.partnerStatus}</td>
              <td className="px-4 py-2">{partner.phone}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(partner.id)}
                  className="bg-white text-black border hover:bg-gray-300 shadow-md px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
                  className="bg-white text-black border shadow-md hover:bg-gray-300 px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
              <td>
                {buttonStates[partner.id] ? (
                  <button
                    onClick={() => handleUpgrade(partner.id)}
                    className="bg-gray-500 shadow-sm text-white px-2 py-1 rounded"
                  >
                    {partner.desinationType}
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgrade(partner.id)}
                    className="bg-white text-black border hover:bg-gray-300 shadow-sm px-2 py-1 rounded"
                  >
                 {partner.desinationType}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartnerTable;
