import React, { useState } from 'react';
import { FaSave, FaTimes, FaTags, FaBox, FaDollarSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { createMedicine } from '../../api/medicineInventoryApi';

const ItemForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    price: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === 'quantity' || id === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMedicine(formData);
      navigate('/pharmacy/medicine'); // Redirect after successful creation
    } catch (error) {
      console.error('Error saving item:', error);
      setError('Failed to save item. Please try again.');
    }
  };

  return (
    <div className="p-10 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">Add New Item</h2>

        <form className="bg-white p-8 rounded-2xl shadow-2xl space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
              <FaTags className="mr-2 text-blue-600" />
              Item Name
            </label>
            <div className="flex items-center border border-blue-300 rounded-full shadow-md hover:shadow-lg transition duration-300">
              <input
                id="name"
                type="text"
                placeholder="Item Name"
                className="p-3 w-full rounded-r-full outline-none text-gray-700 placeholder-gray-500"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-gray-700 flex items-center">
              <FaTags className="mr-2 text-blue-600" />
              Category
            </label>
            <div className="flex items-center border border-blue-300 rounded-full shadow-md hover:shadow-lg transition duration-300">
              <input
                id="category"
                type="text"
                placeholder="Category"
                className="p-3 w-full rounded-r-full outline-none text-gray-700 placeholder-gray-500"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Quantity */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700 flex items-center">
              <FaBox className="mr-2 text-blue-600" />
              Quantity
            </label>
            <div className="flex items-center border border-blue-300 rounded-full shadow-md hover:shadow-lg transition duration-300">
              <input
                id="quantity"
                type="number"
                placeholder="Quantity"
                className="p-3 w-full rounded-r-full outline-none text-gray-700 placeholder-gray-500"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col space-y-2">
            <label htmlFor="price" className="text-sm font-medium text-gray-700 flex items-center">
              <FaDollarSign className="mr-2 text-blue-600" />
              Price
            </label>
            <div className="flex items-center border border-blue-300 rounded-full shadow-md hover:shadow-lg transition duration-300">
              <input
                id="price"
                type="number"
                step="0.01"
                placeholder="Price"
                className="p-3 w-full rounded-r-full outline-none text-gray-700 placeholder-gray-500"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/pharmacy/medicine')}
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
              <span className="ml-2">Save Item</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
