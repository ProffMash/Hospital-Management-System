// src/api/diagnosisApi.ts
import axiosInstance from '../utils/axiosInstance';

export const createDiagnosis = async (diagnosisData: {
  patient_id: number;
  patient_name: string;
  diagnosis: string;
  prescribed_medicine: string;
  dosage: string;
  next_checkup: string;
}) => {
  try {
    const response = await axiosInstance.post('diagnosis/', diagnosisData);
    return response.data;
  } catch (error) {
    console.error('Error creating diagnosis:', error);
    throw error;
  }
};

export const getDiagnoses = async () => {
  try {
    const response = await axiosInstance.get('diagnosis/');
    return response.data;
  } catch (error) {
    console.error('Error fetching diagnoses:', error);
    throw error;
  }
};

export const updateDiagnosis = async (id: number, diagnosisData: object) => {
  try {
    const response = await axiosInstance.put(`diagnosis/${id}/`, diagnosisData);
    return response.data;
  } catch (error) {
    console.error('Error updating diagnosis:', error);
    throw error;
  }
};

export const deleteDiagnosis = async (id: number) => {
  try {
    await axiosInstance.delete(`diagnosis/${id}/`);
  } catch (error) {
    console.error('Error deleting diagnosis:', error);
    throw error;
  }
};
