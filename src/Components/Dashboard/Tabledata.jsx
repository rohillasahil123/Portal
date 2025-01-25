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
      {
        id: 4,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        partnerStatus: 'Active',
        createdAt: '2025-01-20',
        time: '10:00 AM',
      },
      {
        id: 5,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        partnerStatus: 'Active',
        createdAt: '2025-01-20',
        time: '10:00 AM',
      },
      {
        id: 6,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        partnerStatus: 'Active',
        createdAt: '2025-01-20',
        time: '10:00 AM',
      },
      {
        id: 7,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        partnerStatus: 'Active',
        createdAt: '2025-01-20',
        time: '10:00 AM',
      },
      {
        id: 8,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        partnerStatus: 'Active',
        createdAt: '2025-01-20',
        time: '10:00 AM',
      },
      {
        id: 9,
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
      <h1 className="text-2xl font-bold mb-4">User Table</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Partner Status</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Time</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.email}</td>
                <td className="border border-gray-300 px-4 py-2">{item.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{item.partnerStatus}</td>
                <td className="border border-gray-300 px-4 py-2">{item.createdAt}</td>
                <td className="border border-gray-300 px-4 py-2">{item.time}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mx-1 hover:bg-blue-600"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded mx-1 hover:bg-red-600"
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
