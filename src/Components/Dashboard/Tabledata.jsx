import React, { useState } from 'react';

const App = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      partnerStatus: 'Active',
      createdAt: '2025-01-20',
      time: '10:00 AM',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '9876543210',
      partnerStatus: 'Inactive',
      createdAt: '2025-01-21',
      time: '11:00 AM',
    },
    {
        id: 3,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        partnerStatus: 'Active',
        createdAt: '2025-01-20',
        time: '10:00 AM',
      },
     
  ]);

  const handleEdit = (id) => {
    console.log('Edit item with id:', id);
    console.log("A"+1)
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Latest Leads</h1>
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300 min-w-[600px]">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Phone</th>
            <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Partner Status</th>
            <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Created At</th>
            <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-center text-sm md:text-base">
              <td className="border border-gray-300 px-2 py-1">{item.name}</td>
              <td className="border border-gray-300 px-2 py-1">{item.phone}</td>
              <td className="border border-gray-300 px-2 py-1">{item.partnerStatus}</td>
              <td className="border border-gray-300 px-2 py-1">{item.createdAt}</td>
              <td className="border border-gray-300 px-2 py-1">
                <button
                  className="bg-blue-500 text-white text-xs md:text-sm px-2 py-1 rounded mx-1 hover:bg-blue-600"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white text-xs md:text-sm px-2 py-1 rounded mx-1 hover:bg-red-600"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default App;
