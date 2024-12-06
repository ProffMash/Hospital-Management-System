from rest_framework import viewsets
from .models import (
    Patient, MedDoctor, Pharmacist, Report, SupportTicket,
    PatientDiagnosis, Appointment, MedicineInventory,Contact, DoctorProfile, Support, Appointments,
    Admin
)
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from .serializers import (
    PatientSerializer, DoctorSerializer, PharmacistSerializer, ContactSerializer,
    ReportSerializer, SupportTicketSerializer, PatientDiagnosisSerializer,
    AppointmentSerializer, MedicineInventorySerializer, CountSerializer, 
    DoctorProfileSerializer, SupportSerializer, AppointmentsSerializer,
     AdminSerializer, LoginSerializer,
    DoctorRegistrationSerializer, PharmacistRegistrationSerializer
)

from rest_framework.decorators import action
from rest_framework.response import Response

class AdminRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AdminSerializer(data=request.data)
        if serializer.is_valid():
            admin = serializer.save()
            token, _ = Token.objects.get_or_create(user=admin)
            return Response({
                "message": "Admin registered successfully",
                "token": token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data  # This will be either a Doctor or Pharmacist instance
            
            # Generate a token for Doctor or Pharmacist
            if isinstance(user, MedDoctor):
                token, _ = Token.objects.get_or_create(user=user)  # Token creation
                return Response({
                    "message": "Doctor login successful",
                    "token": token.key
                }, status=status.HTTP_200_OK)
            
            elif isinstance(user, Pharmacist):
                token, _ = Token.objects.get_or_create(user=user)  # Token creation
                return Response({
                    "message": "Pharmacist login successful",
                    "token": token.key
                }, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# class DoctorRegistrationView(APIView):
#     def post(self, request):
#         serializer = DoctorRegistrationSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({
#                 "message": "Doctor registered successfully"
#             }, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class PharmacistRegistrationView(APIView):
#     def post(self, request):
#         serializer = PharmacistRegistrationSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({
#                 "message": "Pharmacist registered successfully"
#             }, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AdminSerializer(data=request.data)
        if serializer.is_valid():
            admin = serializer.save()  # This saves the admin data to Admin model
            token, _ = Token.objects.get_or_create(user=admin)
            return Response({
                "message": "Admin registered successfully",
                "token": token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DoctorRegistrationView(APIView):
    def post(self, request):
        serializer = DoctorRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # This saves the doctor data to Doctor model
            return Response({
                "message": "Doctor registered successfully"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PharmacistRegistrationView(APIView):
    def post(self, request):
        serializer = PharmacistRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # This saves the pharmacist data to Pharmacist model
            return Response({
                "message": "Pharmacist registered successfully"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)











class AppointmentsViewSet(viewsets.ModelViewSet):
    queryset = Appointments.objects.all()  # Fetch all appointments
    serializer_class = AppointmentsSerializer  # Use the serializer

class SupportViewSet(viewsets.ModelViewSet):
    queryset = Support.objects.all()
    serializer_class = SupportSerializer

class DoctorProfileViewSet(viewsets.ModelViewSet):
    queryset = DoctorProfile.objects.all()
    serializer_class = DoctorProfileSerializer

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = MedDoctor.objects.all()
    serializer_class = DoctorSerializer

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

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = MedDoctor.objects.all()
    serializer_class = DoctorSerializer

    @action(detail=False, methods=['get'], url_path='count')
    def get_doctor_count(self, request):
        """
        Returns the total count of doctors.
        """
        count = MedDoctor.objects.count()
        # Use the CountSerializer to return the count
        return Response(CountSerializer({'count': count}).data)