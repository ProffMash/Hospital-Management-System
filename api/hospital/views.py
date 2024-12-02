from rest_framework import viewsets
from .models import (
    Patient, Doctor, Pharmacist, Report, SupportTicket,
    PatientDiagnosis, Appointment, MedicineInventory
)
from .serializers import (
    PatientSerializer, DoctorSerializer, PharmacistSerializer,
    ReportSerializer, SupportTicketSerializer, PatientDiagnosisSerializer,
    AppointmentSerializer, MedicineInventorySerializer, CountSerializer, ContactsSerializer
)

from rest_framework.decorators import action
from rest_framework.response import Response

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
    
class ContactsViewSet(viewsets.ModelViewSet):
    queryset = SupportTicket.objects.all()
    serializer_class = ContactsSerializer

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