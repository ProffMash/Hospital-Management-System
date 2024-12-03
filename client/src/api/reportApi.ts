// import axios from "axios";

// // Base URL for your backend API
// const API_URL = "http://localhost:8000/api"; // Replace with your backend API URL

// // Fetch all reports
// export const getReports = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/reports/`);
//     return response.data; // Assuming the response is an array of reports
//   } catch (error) {
//     console.error("Error fetching reports:", error);
//     throw error; // Rethrow the error for handling elsewhere
//   }
// };

// // Fetch a single report by ID
// export const getReport = async (id: number) => {
//   try {
//     const response = await axios.get(`${API_URL}/reports/${id}/`);
//     return response.data; // Return a single report
//   } catch (error) {
//     console.error(`Error fetching report with ID ${id}:`, error);
//     throw error;
//   }
// };

// // Create a new report
// export const createReport = async (reportData: {
//   name: string;
//   subject: string;
//   message: string;
// }) => {
//   try {
//     const response = await axios.post(`${API_URL}/reports/`, reportData);
//     return response.data; // Return the created report
//   } catch (error) {
//     console.error("Error creating report:", error);
//     throw error;
//   }
// };

// // Update an existing report
// export const updateReport = async (
//   id: number,
//   reportData: { name: string; subject: string; message: string }
// ) => {
//   try {
//     const response = await axios.put(`${API_URL}/reports/${id}/`, reportData);
//     return response.data; // Return the updated report
//   } catch (error) {
//     console.error(`Error updating report with ID ${id}:`, error);
//     throw error;
//   }
// };

// export const updateReportStatus = async (id: number, status: string) => {
//   const response = await axios.put(`http://localhost:8000/api/reports/${id}`, { status });
//   return response.data;
// };

// // Delete a report
// export const deleteReport = async (id: number) => {
//   try {
//     await axios.delete(`${API_URL}/reports/${id}/`);
//     return id; // Return the deleted report ID
//   } catch (error) {
//     console.error(`Error deleting report with ID ${id}:`, error);
//     throw error;
//   }
// };








import axios from "axios";

// Base URL for your backend API
const API_URL = "http://localhost:8000/api"; // Replace with your backend API URL

// Fetch all reports
export const getReports = async () => {
  try {
    const response = await axios.get(`${API_URL}/reports/`);
    return response.data; // Assuming the response is an array of reports
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error; // Rethrow the error for handling elsewhere
  }
};

// Fetch a single report by ID
export const getReport = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/reports/${id}/`);
    return response.data; // Return a single report
  } catch (error) {
    console.error(`Error fetching report with ID ${id}:`, error);
    throw error;
  }
};

// Create a new report
export const createReport = async (reportData: {
  doctor_id: number; // Reference to the doctor (doctor_id field in the model)
  subject: string;
  message: string;
}) => {
  try {
    // Construct the data payload with the doctor_id (the doctor field in the model)
    const data = {
      doctor: reportData.doctor_id,  // doctor field should be the doctor_id from the request
      subject: reportData.subject,
      message: reportData.message,
    };

    // Send a POST request to create the report
    const response = await axios.post(`${API_URL}/reports/`, data);
    return response.data; // Return the created report
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};

// Update an existing report
export const updateReport = async (
  id: number,
  reportData: { doctor_id: number; subject: string; message: string }
) => {
  try {
    // Construct the data payload with the doctor_id (the doctor field in the model)
    const data = {
      doctor: reportData.doctor_id,  // doctor field should be the doctor_id from the request
      subject: reportData.subject,
      message: reportData.message,
    };

    // Send a PUT request to update the report
    const response = await axios.put(`${API_URL}/reports/${id}/`, data);
    return response.data; // Return the updated report
  } catch (error) {
    console.error(`Error updating report with ID ${id}:`, error);
    throw error;
  }
};

// Update the status of an existing report
export const updateReportStatus = async (id: number, status: string) => {
  try {
    const response = await axios.put(`${API_URL}/reports/${id}/status/`, { status });
    return response.data; // Return the updated status
  } catch (error) {
    console.error(`Error updating status for report with ID ${id}:`, error);
    throw error;
  }
};

// Delete a report
export const deleteReport = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/reports/${id}/`);
    return id; // Return the deleted report ID
  } catch (error) {
    console.error(`Error deleting report with ID ${id}:`, error);
    throw error;
  }
};
