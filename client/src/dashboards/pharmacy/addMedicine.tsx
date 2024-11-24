import React from 'react';
import { FaSave, FaTimes, FaPrescriptionBottle, FaCalendarAlt, FaTags, FaBox, FaDollarSign, FaBuilding } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const MedicineForm: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className="p-10 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">Add New Medicine</h2>

        <form className="bg-white p-8 rounded-2xl shadow-2xl space-y-6">
          {/* Medicine Name */}
          <div className="flex items-center border border-blue-300 rounded-full shadow-md hover:shadow-lg transition duration-300">
            <FaPrescriptionBottle className="p-3 text-blue-600" />
            <input
              type="text"
              placeholder="Medicine Name"
              className="p-3 w-full rounded-r-full outline-none text-gray-700 placeholder-gray-500"
              required
            />
          </div>

          {/* Category */}
          <div className="flex items-center border border-blue-300 rounded-full shadow-md hover:shadow-lg transition duration-300">
            <FaTags className="p-3 text-blue-600" />
            <input
              type="text"
              placeholder="Category (e.g., Pain Relief)"
              className="p-3 w-full rounded-r-full outline-none text-gray-700 placeholder-gray-500"
              required
            />
          </div>

          {/* Quantity */}
          <div className="flex items-center border border-blue-300 rounded-full shadow-md hover:shadow-lg transition duration-300">
            <FaBox className="p-3 text-blue-600" />
            <input
              type="number"
              placeholder="Quantity"
              className="p-3 w-full rounded-r-full outline-none text-gray-700 placeholder-gray-500"
              required
            />
          </div>

          {/* Price */}
          <div className="flex items-center border border-blue-300 rounded-full shadow-md hover:shadow-lg transition duration-300">
            <FaDollarSign className="p-3 text-blue-600" />
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              className="p-3 w-full rounded-r-full outline-none text-gray-700 placeholder-gray-500"
              required
            />
          </div>

          {/* Expiration Date */}
          <div className="flex items-center border border-blue-300 rounded-full shadow-md hover:shadow-lg transition duration-300">
            <FaCalendarAlt className="p-3 text-blue-600" />
            <input
              type="date"
              className="p-3 w-full rounded-r-full outline-none text-gray-700"
              required
            />
          </div>

          {/* Manufacturer */}
          <div className="flex items-center border border-blue-300 rounded-full shadow-md hover:shadow-lg transition duration-300">
            <FaBuilding className="p-3 text-blue-600" />
            <input
              type="text"
              placeholder="Manufacturer"
              className="p-3 w-full rounded-r-full outline-none text-gray-700 placeholder-gray-500"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
          <button
  type="button"
  onClick={() => {
    navigate('/medicine');
  }}
  className="flex items-center bg-gray-500 text-white py-2 px-5 rounded-full shadow-md hover:bg-gray-600 transition duration-300 transform hover:scale-105"
>
  <FaTimes />
  <span className="ml-2">Cancel</span>
</button>
            <button
              type="submit"
              className="flex items-center bg-green-600 text-white py-2 px-5 rounded-full shadow-md hover:bg-green-700 transition duration-300 transform hover:scale-105"
            >
              <FaSave />
              <span className="ml-2">Save Medicine</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicineForm;
