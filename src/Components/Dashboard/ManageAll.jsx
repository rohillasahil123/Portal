import React, { useState } from 'react';

const PartnerTable = () => {
  const [partners, setPartners] = useState([
    { id: 1, username: 'JohnDoe', type: 'Admin', partner: 'Partner1', status: 'Active', lastLogin: '2025-01-20' },
    { id: 2, username: 'JaneSmith', type: 'User', partner: 'Partner2', status: 'Inactive', lastLogin: '2025-01-18' },
    { id: 3, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2022-01-22' },
    { id: 4, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2022-01-22' },
    { id: 5, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2025-01-24' },
    { id: 6, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2021-01-23' },
    { id: 6, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2025-01-09' },
    { id: 7, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2022-01-02' },
    { id: 8, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2025-01-20' },
    { id: 9, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2023-01-11' },
    { id: 10, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2024-01-21' },
    { id: 11, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2025-01-15' },
    { id: 12, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2025-01-22' },
    { id: 13, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2025-01-22' },
    { id: 14, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2025-01-22' },
    { id: 15, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2020-01-22' },
    { id: 16, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2025-01-22' },
    { id: 17, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2020-01-22' },


    { id: 3, username: 'MarkJohnson', type: 'Admin', partner: 'Partner3', status: 'Active', lastLogin: '2025-01-22' },

    // Add more data as needed
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter partners based on the search query
  const filteredPartners = partners.filter((partner) =>
    partner.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete action
  const handleDelete = (id) => {
    setPartners(partners.filter((partner) => partner.id !== id));
  };

  // Handle edit action
  const handleEdit = (id) => {
    alert('Edit functionality is not implemented yet.');
    // You can implement edit functionality here, like opening a modal or navigating to an edit page
  };

  return (
    <div className="container mx-auto p-4 ml-64 w-[84%]">
      <div className="flex justify-between mb-4">
        {/* Add Partner Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Partner</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Add Individual Partner</button>
      </div>

      {/* Search and Select Dropdown */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search Partner..."
          className="p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
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

      {/* Table */}
      <table className="w-[100%]">
        <thead className='w-[80%]'>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Assigned </th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Last Login</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className='text-center'  >
          {filteredPartners.slice(0, itemsPerPage).map((partner) => (
            <tr key={partner.id} className="ml-6 border-b">
              <td className="px-4  py-2">{partner.username}</td>
              <td className="px-4 py-2">{partner.type}</td>
              <td className="px-4 py-2">{partner.partner}</td>
              <td className="px-4 py-2">{partner.status}</td>
              <td className="px-4 py-2">{partner.lastLogin}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(partner.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
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
