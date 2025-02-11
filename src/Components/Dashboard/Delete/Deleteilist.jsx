import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from "../../../Context/Context";

const Deleteilist = () => {
  const [partners, setPartners] = useState([]);
  const deleteData = useContext(ThemeContext);

  useEffect(() => {
    if (deleteData && deleteData.allData && deleteData.allData.partners) {
      const fetchedPartners = deleteData.allData.partners;
      console.log(fetchedPartners);
      const deletedPartners = fetchedPartners.filter(partner => partner.delete === true);
      setPartners(deletedPartners);
    }
  }, [deleteData]);

  return (
    <div className='ml-[15%] h-[94vh] mt-3 w-[82%] py-3 shadow-md'>
      <h1 className='text-center font-semibold text-xl'>Deleted User</h1>
      <div className='py-'>
        <table className="table-auto w-full border-collapse border border-gray-300 min-w-[600px]">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Phone</th>
              <th className="border border-gray-300 px-4 py-2 text-sm md:text-base">Action</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner, index) => (
              <tr key={index} className='text-center text-sm sm:text-base'>
                <td className='border px-4 py-2'>{partner.name}</td>
                <td className='border px-4 py-2'>{partner.email}</td>
                <td className='border px-4 py-2'>{partner.phone}</td>
                <td className='border px-4 py-2'>
                  <button className='bg-red-500 text-white px-2 py-1 rounded'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deleteilist;
