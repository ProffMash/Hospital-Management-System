import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getMedicines, deleteMedicine } from '../../api/medicineInventoryApi';

const MedicineInventory: React.FC = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredMedicines, setFilteredMedicines] = useState<any[]>([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const data = await getMedicines();
        setMedicines(data);
        setFilteredMedicines(data);
      } catch (error) {
        console.error('Error fetching medicines:', error);
      }
    };
    fetchMedicines();
  }, []);

  // Handle medicine deletion
  const handleDelete = async (id: number) => {
    try {
      await deleteMedicine(id);
      const updatedMedicines = medicines.filter((medicine) => medicine.id !== id);
      setMedicines(updatedMedicines);
      setFilteredMedicines(updatedMedicines);
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  // Handle search query change
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = medicines.filter(
      (medicine) =>
        medicine.name.toLowerCase().includes(query) ||
        medicine.category.toLowerCase().includes(query)
    );
    setFilteredMedicines(filtered);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen">
      <h2 className="text-4xl font-extrabold text-blue-900 mb-8">Medicine Inventory</h2>

      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center border border-blue-300 rounded-full shadow-lg overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search medicine..."
            className="p-3 w-72 outline-none text-gray-600 placeholder-gray-400"
          />
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
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((medicine) => (
                <tr key={medicine.id} className="transition duration-150 hover:bg-blue-50">
                  <td className="p-4 font-semibold text-gray-600">{medicine.id}</td>
                  <td className="p-4 font-semibold text-gray-600">{medicine.name}</td>
                  <td className="p-4 text-gray-500">{medicine.category}</td>
                  <td className="p-4 text-gray-500">{medicine.quantity}</td>
                  <td className="p-4 text-gray-500">${medicine.price}</td>
                  <td className="p-4 flex space-x-3">
                    <button
                      className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition duration-200"
                      onClick={() =>
                        navigate('/pharmacy/edit-medicine', { state: { medicine } })
                      }
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(medicine.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-200"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineInventory;
