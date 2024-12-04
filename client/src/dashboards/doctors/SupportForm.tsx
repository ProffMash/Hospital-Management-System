import React, { useState } from "react";
import { MdPerson, MdEmail, MdMessage, MdSend } from "react-icons/md";
import { createSupportTicket } from "../../api/SupportApi"; // Assuming you have a createSupportTicket function

const SupportForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && description) {
      try {
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Prepare support data (no subject or message fields needed)
        const supportData = { name, email, description };

        // Call the API function to create a support ticket
        await createSupportTicket(supportData);

        // On success, reset the form and show success message
        setName("");
        setEmail("");
        setDescription("");
        setSuccess("Support ticket submitted successfully.");
      } catch (err) {
        console.error("Error creating support ticket:", err);
        setError("There was an error submitting the support ticket.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please fill out all fields before submitting.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h3 className="mb-6 text-xl font-semibold text-gray-800 border-b pb-2">Submit a Support Ticket</h3>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="flex items-center border-b pb-2">
          <MdPerson size={20} className="text-gray-600 mr-4" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full max-w-md p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Input */}
        <div className="flex items-center border-b pb-2">
          <MdEmail size={20} className="text-gray-600 mr-4" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full max-w-md p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description Input */}
        <div className="flex items-start border-b pb-2">
          <MdMessage size={20} className="text-gray-600 mr-4" />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full max-w-md p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        {/* Success Message */}
        {success && <div className="text-green-500 text-sm mt-2">{success}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 text-sm"
          disabled={loading}
        >
          {loading ? (
            <span>Loading...</span>
          ) : (
            <>
              <MdSend size={20} className="mr-2" />
              Submit Ticket
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SupportForm;
