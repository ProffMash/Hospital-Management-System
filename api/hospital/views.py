from rest_framework import viewsets
from .models import (
    Patient, Doctor, Pharmacist, Report, SupportTicket,
    PatientDiagnosis, Appointment, MedicineInventory,Contact, DoctorProfile, Support, Appointments
)
from .serializers import (
    PatientSerializer, DoctorSerializer, PharmacistSerializer, ContactSerializer,
    ReportSerializer, SupportTicketSerializer, PatientDiagnosisSerializer,
    AppointmentSerializer, MedicineInventorySerializer, CountSerializer, 
    DoctorProfileSerializer, SupportSerializer, AppointmentsSerializer
)

from rest_framework.decorators import action
from rest_framework.response import Response

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
    queryset = Doctor.objects.all()
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
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    @action(detail=False, methods=['get'], url_path='count')
    def get_doctor_count(self, request):
        """
        Returns the total count of doctors.
        """
        count = Doctor.objects.count()
        # Use the CountSerializer to return the count
        return Response(CountSerializer({'count': count}).data)