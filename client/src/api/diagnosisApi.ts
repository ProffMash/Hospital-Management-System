// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api/', 
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Create a new diagnosis
// export const createDiagnosis = async (diagnosisData: {
//   patient: number;
//   patient_name: string;
//   diagnosis: string;
//   prescribed_medicine: string;
//   dosage: string;
// }) => {
//   try {
//     const response = await axiosInstance.post('patient-diagnosis/', diagnosisData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating diagnosis:', error);
//     throw error;
//   }
// };

// // Fetch all diagnoses
// export const getDiagnoses = async () => {
//   try {
//     const response = await axiosInstance.get('patient-diagnosis/');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching diagnoses:', error);
//     throw error;
//   }
// };

// // Update a diagnosis by ID
// export const updateDiagnosis = async (id: number, diagnosisData: {
//   patient?: number;
//   patient_name?: string;
//   diagnosis?: string;
//   prescribed_medicine?: string;
//   dosage?: string;
// }) => {
//   try {
//     const response = await axiosInstance.put(`patient-diagnosis/${id}/`, diagnosisData);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating diagnosis:', error);
//     throw error;
//   }
// };

// // Delete a diagnosis by ID
// export const deleteDiagnosis = async (id: number) => {
//   try {
//     await axiosInstance.delete(`patient-diagnosis/${id}/`);
//   } catch (error) {
//     console.error('Error deleting diagnosis:', error);
//     throw error;
//   }
// };





import axios from 'axios';

// Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Type definition for diagnosis data
export interface DiagnosisData {
  patient: number; // Backend expects "patient" as the ForeignKey ID
  patient_name: string; // Patient's name
  diagnosis: string; // Diagnosis description
  prescribed_medicine: string; // Medicines prescribed
  dosage: string; // Dosage instructions
}

// Fetch all diagnoses
export const getDiagnoses = async (): Promise<DiagnosisData[]> => {
  try {
    const response = await axiosInstance.get('patient-diagnosis/');
    return response.data; // Returns an array of diagnoses
  } catch (error) {
    const err = error as any;
    console.error('Error fetching diagnoses:', err.response?.data || err.message);
    throw error;
  }
};

// Create a new diagnosis
export const createDiagnosis = async (diagnosisData: DiagnosisData): Promise<DiagnosisData> => {
  try {
    const response = await axiosInstance.post('patient-diagnosis/', diagnosisData);
    return response.data; // Returns the newly created diagnosis
  } catch (error) {
    const err = error as any;
    console.error('Error creating diagnosis:', err.response?.data || err.message);
    throw error;
  }
};

// Update an existing diagnosis by ID
export const updateDiagnosis = async (
  id: number,
  diagnosisData: Partial<DiagnosisData> // Partial allows updating only specific fields
): Promise<DiagnosisData> => {
  try {
    const response = await axiosInstance.put(`patient-diagnosis/${id}/`, diagnosisData);
    return response.data; // Returns the updated diagnosis
  } catch (error) {
    const err = error as any;
    console.error('Error updating diagnosis:', err.response?.data || err.message);
    throw error;
  }
};

// Delete a diagnosis by ID
export const deleteDiagnosis = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`patient-diagnosis/${id}/`);
  } catch (error) {
    const err = error as any;
    console.error('Error deleting diagnosis:', err.response?.data || err.message);
    throw error;
  }
};
