import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateMedicine } from '../../api/medicineInventoryApi';

const EditMedicine: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { medicine } = location.state as { medicine: any };

  const [formData, setFormData] = useState(medicine);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: typeof formData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await updateMedicine(formData.id, formData);
      navigate('/pharmacy/medicine'); // Redirect after saving
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  const handleCancel = () => {
    navigate('/pharmacy/medicine'); // Redirect on cancel
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-blue-900 mb-8">Edit Medicine</h2>
      <form className="space-y-6 w-full max-w-md bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category:</label>
          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="quantity" className="block text-gray-700 font-semibold mb-2">Quantity:</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Price:</label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMedicine;
