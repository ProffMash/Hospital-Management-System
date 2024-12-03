from rest_framework import serializers
from .models import (
    Patient, Doctor, Pharmacist, Report, SupportTicket,
    PatientDiagnosis, Appointment, MedicineInventory, Contact, DoctorProfile, DoctorAuth
)
from django.contrib.auth.hashers import make_password, check_password

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

# class DoctorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Doctor
#         fields = '__all__'

class DoctorRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Doctor
        fields = ['name', 'specialization', 'phone', 'email', 'status', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')  # Extract password
        doctor = Doctor.objects.create(**validated_data)  # Create the doctor instance
        doctor_auth = DoctorAuth.objects.create(
            doctor=doctor, 
            email=doctor.email,
            password=password
        )
        doctor_auth.set_password(password)  # Hash the password
        doctor_auth.save()
        return doctor

class DoctorLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            # Fetch the DoctorAuth instance
            doctor_auth = DoctorAuth.objects.get(email=data["email"])
        except DoctorAuth.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password")

        # Check the password
        if not doctor_auth.check_password(data["password"]):
            raise serializers.ValidationError("Invalid email or password")

        # Ensure the associated doctor exists and fetch details
        doctor = doctor_auth.doctor
        if not doctor:
            raise serializers.ValidationError("Associated doctor not found")

        # Return the doctor's details
        return {
            "doctor_id": doctor_auth.id,  # Correctly fetch the DoctorAuth ID
            "name": doctor.name,
            "specialization": doctor.specialization,
            "phone": doctor.phone,
            "email": doctor.email,
            "status": doctor.status,
        }
        
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
