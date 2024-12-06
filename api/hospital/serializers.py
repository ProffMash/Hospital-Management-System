from rest_framework import serializers
from .models import (
    Patient, MedDoctor, Pharmacist, Report, SupportTicket, Admin,
    PatientDiagnosis, Appointment, MedicineInventory,Contact, DoctorProfile, Support, Appointments
)
from django.contrib.auth import authenticate

# class AdminSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Admin
#         fields = ['id', 'email', 'name', 'password']
#         extra_kwargs = {'password': {'write_only': True}}

#     def create(self, validated_data):
#         return Admin.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data['email']
        password = data['password']

        # First, check if the user exists in the Doctor model
        try:
            doctor = MedDoctor.objects.get(email=email)
            if doctor.check_password(password):  # Using check_password to validate the password
                return doctor
        except MedDoctor.DoesNotExist:
            pass  # If doctor does not exist, move to the next check

        # Check if the user exists in the Pharmacist model
        try:
            pharmacist = Pharmacist.objects.get(email=email)
            if pharmacist.check_password(password):  # Using check_password to validate the password
                return pharmacist
        except Pharmacist.DoesNotExist:
            pass  # If pharmacist does not exist, raise an error below

        raise serializers.ValidationError("Invalid credentials")


# class DoctorRegistrationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Doctor
#         fields = ['name', 'specialization', 'phone', 'email', 'status']


# class PharmacistRegistrationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Pharmacist
#         fields = ['name', 'specialization', 'phone', 'email', 'status']
        
    
class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['email', 'name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return Admin.objects.create_user(**validated_data)


class DoctorRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedDoctor
        fields = ['name', 'specialization', 'phone', 'email', 'status', 'password']

    def create(self, validated_data):
        # Hash the password before saving
        doctor = MedDoctor(**validated_data)
        doctor.set_password(validated_data['password'])  # Hash the password
        doctor.save()
        return doctor


class PharmacistRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pharmacist
        fields = ['name', 'specialization', 'phone', 'email', 'status']

    def create(self, validated_data):
        return Pharmacist.objects.create(**validated_data)
        
        
        
        
        

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
        model = MedDoctor
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