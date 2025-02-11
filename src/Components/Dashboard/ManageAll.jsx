import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { ThemeContext } from "../../Context/Context";
import axios from "axios";
import Cookies from "js-cookie";

const PartnerTable = () => {
  const PartnerData = useContext(ThemeContext);
  const [dataPartner, setDataPartner] = useState([]);
  const [buttonStates, setButtonStates] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    if (PartnerData?.partnerShow) {
      setDataPartner(PartnerData.partnerShow);
    }
  }, [PartnerData]);

  const handleEdit = (id) => {
    alert("Edit functionality is not implemented yet.");
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Invalid Partner ID");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this partner?");
    if (!confirmed) return;

    try {
      const response = await axios.delete(`http://localhost:3000/delete-profile/${id}`);
      if (response.data.message === "success") {
        setDataPartner((prevState) => prevState.filter((partner) => partner._id !== id));
        toast.success("Partner deleted successfully");
      } else {
        throw new Error(response.data.message || "Failed to delete partner");
      }
    } catch (error) {
      toast.error("Failed to delete partner. Please try again.");
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
          </tr>
        </thead>
        <tbody className="text-center">
          {dataPartner.map((partner) => (
            <tr key={partner._id}>
              <td className="px-4 py-2">{partner.name}</td>
              <td className="px-4 py-2">{partner.desinationType}</td>
              <td className="px-4 py-2">{partner.partnerStatus}</td>
              <td className="px-4 py-2">{partner.phone}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(partner._id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(partner._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartnerTable;