import React, { useState, useEffect } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa"; // Icons for edit, save, and cancel
import { getDoctorProfiles, updateDoctorProfile } from "../../api/doctorProfileApi";

const Settings: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [tempProfileData, setTempProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getDoctorProfiles();
        // Assuming the data contains a list of profiles, and we fetch the first one for simplicity
        const doctorProfile = data[0]; // Adjust logic if necessary
        setProfileData(doctorProfile);
        setTempProfileData(doctorProfile);
      } catch (error) {
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempProfileData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save
  const handleSave = async () => {
    if (profileData.id) {
      try {
        await updateDoctorProfile(profileData.id, {
          address: tempProfileData.address,
        });
        setProfileData(tempProfileData);
        setEditMode(false);
      } catch (error) {
        setError("Error updating profile");
      }
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setTempProfileData(profileData);
    setEditMode(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/150" // Static placeholder, replace with dynamic URL if available
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{profileData.doctor_name}</h2>
            <p className="text-gray-600">{profileData.doctor_email}</p>
          </div>
        </div>
        <button
          onClick={() => setEditMode(true)}
          className="text-blue-500 flex items-center space-x-2"
        >
          <FaEdit size={18} />
          <span>Edit</span>
        </button>
      </div>

      {/* Profile Form */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 mb-2">Doctor Name</label>
            {editMode ? (
              <input
                type="text"
                name="doctor_name"
                value={tempProfileData.doctor_name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-700">{profileData.doctor_name}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Phone</label>
            {editMode ? (
              <input
                type="text"
                name="doctor_phone"
                value={tempProfileData.doctor_phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-700">{profileData.doctor_phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 mb-2">Time Zone</label>
            {editMode ? (
              <input
                type="text"
                name="timeZone"
                value={tempProfileData.timeZone || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-700">{profileData.timeZone || "N/A"}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Phone</label>
            {editMode ? (
              <input
                type="text"
                name="doctor_phone"
                value={tempProfileData.doctor_phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-700">{profileData.doctor_phone}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-600 mb-2">Address</label>
          {editMode ? (
            <textarea
              name="address"
              value={tempProfileData.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          ) : (
            <p className="text-gray-700">{profileData.address}</p>
          )}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        {editMode && (
          <>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center space-x-2"
            >
              <FaTimes size={16} />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center space-x-2"
            >
              <FaSave size={16} />
              <span>Save</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
