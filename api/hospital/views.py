from rest_framework import viewsets
from rest_framework.views import APIView
from .models import (
    Patient, Doctor, Pharmacist, Report, SupportTicket,
    PatientDiagnosis, Appointment, MedicineInventory, Contact, DoctorProfile
)
from .serializers import (
    PatientSerializer, PharmacistSerializer,
    ReportSerializer, SupportTicketSerializer, PatientDiagnosisSerializer,
    AppointmentSerializer, MedicineInventorySerializer, CountSerializer, ContactSerializer,
    DoctorProfileSerializer, DoctorRegisterSerializer, DoctorLoginSerializer
)
from rest_framework import status
from django.contrib.auth.hashers import check_password, make_password

class DoctorRegisterView(APIView):
    def post(self, request):
        serializer = DoctorRegisterSerializer(data=request.data)
        if serializer.is_valid():
            doctor = serializer.save()
            return Response(
                {"message": "Doctor registered successfully", "doctor": serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DoctorLoginView(APIView):
    def post(self, request):
        serializer = DoctorLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(
                {"message": "Login successful", "doctor": serializer.validated_data},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.decorators import action
from rest_framework.response import Response

class DoctorProfileViewSet(viewsets.ModelViewSet):
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

# class DoctorViewSet(viewsets.ModelViewSet):
#     queryset = Doctor.objects.all()
#     serializer_class = DoctorSerializer



class PharmacistViewSet(viewsets.ModelViewSet):
    queryset = Pharmacist.objects.all()
    serializer_class = PharmacistSerializer

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

class SupportTicketViewSet(viewsets.ModelViewSet):
    queryset = SupportTicket.objects.all()
    serializer_class = SupportTicketSerializer

class PatientDiagnosisViewSet(viewsets.ModelViewSet):
    queryset = PatientDiagnosis.objects.all()
    serializer_class = PatientDiagnosisSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()  # Get all appointments
    serializer_class = AppointmentSerializer  # Use the modified serializer

class MedicineInventoryViewSet(viewsets.ModelViewSet):
    queryset = MedicineInventory.objects.all()
    serializer_class = MedicineInventorySerializer


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    @action(detail=False, methods=['get'], url_path='count')
    def get_patient_count(self, request):
        """
        Returns the total count of patients.
        """
        count = Patient.objects.count()
        # Use the CountSerializer to return the count
        return Response(CountSerializer({'count': count}).data)

# class DoctorViewSet(viewsets.ModelViewSet):
#     queryset = Doctor.objects.all()
#     serializer_class = DoctorSerializer

    @action(detail=False, methods=['get'], url_path='count')
    def get_doctor_count(self, request):
        """
        Returns the total count of doctors.
        """
        count = Doctor.objects.count()
        # Use the CountSerializer to return the count
        return Response(CountSerializer({'count': count}).data)
    
    
# A dictionary to store hashed passwords for demonstration purposes
password_store = {}

# Register Pharmacist
class PharmacistRegisterView(APIView):
    def post(self, request):
        try:
            # Extract data from request
            name = request.data.get('name')
            specialization = request.data.get('specialization')
            phone = request.data.get('phone')
            email = request.data.get('email')
            status_ = request.data.get('status')
            password = request.data.get('password')

            # Hash the password
            hashed_password = make_password(password)

            # Create Pharmacist
            pharmacist = Pharmacist.objects.create(
                name=name,
                specialization=specialization,
                phone=phone,
                email=email,
                status=status_,
            )

            # Use pharmacist_id instead of id
            password_store[pharmacist.pharmacist_id] = hashed_password

            return Response(
                {
                    "message": "Pharmacist registered successfully",
                    "pharmacist": {
                        "name": pharmacist.name,
                        "specialization": pharmacist.specialization,
                        "phone": pharmacist.phone,
                        "email": pharmacist.email,
                        "status": pharmacist.status,
                    },
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )            
            
# Login Pharmacist
class PharmacistLoginView(APIView):
    def post(self, request):
        try:
            # Extract email and password from request
            email = request.data.get('email')
            password = request.data.get('password')

            # Check if Pharmacist exists
            pharmacist = Pharmacist.objects.get(email=email)

            # Use pharmacist_id instead of id
            hashed_password = password_store.get(pharmacist.pharmacist_id)
            if not hashed_password:
                return Response(
                    {"error": "Pharmacist password not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            # Verify password
            if not check_password(password, hashed_password):
                return Response(
                    {"error": "Invalid password"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            # Return success response
            return Response(
                {
                    "message": "Login successful",
                    "pharmacist": {
                        "name": pharmacist.name,
                        "specialization": pharmacist.specialization,
                        "phone": pharmacist.phone,
                        "email": pharmacist.email,
                        "status": pharmacist.status,
                    },
                },
                status=status.HTTP_200_OK,
            )
        except Pharmacist.DoesNotExist:
            return Response(
                {"error": "Pharmacist not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )