import React from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MedicineInventory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <h2 className="text-4xl font-extrabold text-blue-900 mb-8">Medicine Inventory</h2>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center border border-blue-300 rounded-full shadow-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search medicine..."
            className="p-3 w-72 outline-none text-gray-600 placeholder-gray-400"
          />
          <button className="p-3 bg-blue-600 text-white hover:bg-blue-700 transition duration-300">
            <FaSearch />
          </button>
        </div>
        <button
          onClick={() => navigate('/pharmacy/medicine-form')}
          className="flex items-center space-x-2 bg-green-600 text-white py-2 px-5 rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
        >
          <FaPlus />
          <span>Add Medicine</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-blue-200 to-blue-100 text-gray-700">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: '001', name: 'Paracetamol', category: 'Pain Relief', quantity: 200, price: '$5.00' },
              { id: '002', name: 'Ibuprofen', category: 'Pain Relief', quantity: 150, price: '$8.00' },
            ].map((medicine, index) => (
              <tr
                key={medicine.id}
                className={`transition duration-150 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50`}
              >
                <td className="p-4 font-semibold text-gray-600">{medicine.id}</td>
                <td className="p-4 font-semibold text-gray-600">{medicine.name}</td>
                <td className="p-4 text-gray-500">{medicine.category}</td>
                <td className="p-4 text-gray-500">{medicine.quantity}</td>
                <td className="p-4 text-gray-500">{medicine.price}</td>
                <td className="p-4 flex space-x-3">
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition duration-200">
                    <FaEdit />
                  </button>
                  <button className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-200">
                    <FaTrash />
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

export default MedicineInventory;