// import React, { useState } from "react";
// import { MdPerson, MdSubject, MdMessage, MdSend } from "react-icons/md";

// interface ReportsFormProps {
//   onSubmit: (report: { name: string; subject: string; message: string }) => void;
// }

// const ReportsForm: React.FC<ReportsFormProps> = ({ onSubmit }) => {
//   const [name, setName] = useState("");
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (name && subject && message) {
//       onSubmit({ name, subject, message });
//       setName("");
//       setSubject("");
//       setMessage("");
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
//       <h3 className="mb-6 text-xl font-semibold text-gray-800 border-b pb-2">Submit a Report</h3>
//       <form onSubmit={handleFormSubmit} className="space-y-4">
//         {/* Name Input */}
//         <div className="flex items-center border-b pb-2">
//           <MdPerson size={20} className="text-gray-600 mr-4" />
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your name"
//             className="w-full max-w-md p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
        
//         {/* Subject Input */}
//         <div className="flex items-center border-b pb-2">
//           <MdSubject size={20} className="text-gray-600 mr-4" />
//           <input
//             type="text"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             placeholder="Enter subject"
//             className="w-full max-w-md p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Message Input */}
//         <div className="flex items-start border-b pb-2">
//           <MdMessage size={20} className="text-gray-600 mr-4" />
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Enter message"
//             className="w-full max-w-md p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows={4}
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 text-sm"
//         >
//           <MdSend size={20} className="mr-2" />
//           Submit Report
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ReportsForm;










import React, { useState } from "react";
import { MdPerson, MdSubject, MdMessage, MdSend } from "react-icons/md";
import { createReport } from "../../api/reportApi";

interface ReportsFormProps {
  onSubmit: (report: { name: string; subject: string; message: string }) => void;
}

const ReportsForm: React.FC<ReportsFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [error, setError] = useState<string | null>(null); // Error state for API call

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && subject && message) {
      try {
        setLoading(true);
        setError(null);

        // Call the API to create the report (You should adjust the doctor_id as needed)
        const doctorId = 1; // Replace with the actual doctor ID logic
        const reportData = { doctor_id: doctorId, subject, message };

        // Call the API function
        await createReport(reportData);

        // On success, trigger the onSubmit prop and reset form
        onSubmit({ name, subject, message });
        setName("");
        setSubject("");
        setMessage("");
      } catch (err) {
        console.error("Error creating report:", err);
        setError("There was an error submitting the report.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h3 className="mb-6 text-xl font-semibold text-gray-800 border-b pb-2">Submit a Report</h3>
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
        
        {/* Subject Input */}
        <div className="flex items-center border-b pb-2">
          <MdSubject size={20} className="text-gray-600 mr-4" />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject"
            className="w-full max-w-md p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Message Input */}
        <div className="flex items-start border-b pb-2">
          <MdMessage size={20} className="text-gray-600 mr-4" />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message"
            className="w-full max-w-md p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 text-sm"
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <span>Loading...</span>
          ) : (
            <>
              <MdSend size={20} className="mr-2" />
              Submit Report
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReportsForm;
