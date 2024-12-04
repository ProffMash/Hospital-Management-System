from rest_framework import serializers
from .models import (
    Patient, Doctor, Pharmacist, Report, SupportTicket,
    PatientDiagnosis, Appointment, MedicineInventory, Contact, DoctorProfile, Support, Appointments
)


class AppointmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointments
        fields = ['appointment_id', 'patient_name', 'date', 'time']  


class SupportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Support
        fields = '__all__'

class DoctorProfileSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)  # Add doctor's name
    doctor_phone = serializers.CharField(source='doctor.phone', read_only=True)  # Add doctor's phone
    doctor_email = serializers.EmailField(source='doctor.email', read_only=True)  # Add doctor's email

    class Meta:
        model = DoctorProfile
        fields = ['id', 'doctor', 'doctor_name', 'doctor_phone', 'doctor_email', 'address']

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
        fields = ['id', 'patient', 'patient_name', 'diagnosis', 'prescribed_medicine', 'dosage']

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'date', 'time'] 

class MedicineInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicineInventory
        fields = '__all__'

class CountSerializer(serializers.Serializer):
    count = serializers.IntegerField()