from rest_framework import serializers
from .models import (
    Patient, Doctor, Pharmacist, Report, SupportTicket,
    PatientDiagnosis, Appointment, MedicineInventory, Contact
)

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields =  '__all__'

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class PharmacistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacist
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)  

    class Meta:
        model = Report
        fields = ['id', 'subject', 'message', 'doctor', 'doctor_name']

class SupportTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportTicket
        fields = '__all__'
        
class PatientDiagnosisSerializer(serializers.ModelSerializer):
    # Explicitly reference the `name` of the patient related to the diagnosis
    patient_name = serializers.CharField(source='patient.name', read_only=True)

    class Meta:
        model = PatientDiagnosis
        fields = ['id', 'patient', 'patient_name', 'diagnosis', 'prescribed_medicine', 'dosage', 'next_checkup']

class AppointmentSerializer(serializers.ModelSerializer):
    # Add a read-only field for patient_name that gets the patient's name from the Patient model
    patient_name = serializers.CharField(source='patient.name', read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'patient_name', 'date', 'time']  # Include patient_name in the fields

    def __str__(self):
        return f"Appointment for {self.patient.name} on {self.date}"

class MedicineInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicineInventory
        fields = '__all__'

class CountSerializer(serializers.Serializer):
    count = serializers.IntegerField()
