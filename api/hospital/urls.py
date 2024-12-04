from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PatientViewSet, DoctorViewSet, PharmacistViewSet,
    ReportViewSet, SupportTicketViewSet, PatientDiagnosisViewSet,
    AppointmentViewSet, MedicineInventoryViewSet, ContactViewSet, DoctorProfileViewSet, SupportViewSet
    
)

router = DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'doctors', DoctorViewSet)
router.register(r'pharmacists', PharmacistViewSet)
router.register(r'reports', ReportViewSet)
router.register(r'support-tickets', SupportTicketViewSet)
router.register(r'contacts', ContactViewSet)
router.register(r'patient-diagnosis', PatientDiagnosisViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'medicines', MedicineInventoryViewSet)
router.register(r'doctorprofiles', DoctorProfileViewSet)
router.register(r'supports', SupportViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/patients/count/', PatientViewSet.as_view({'get': 'get_patient_count'}), name='patient-count'),
    path('api/doctors/count/', DoctorViewSet.as_view({'get': 'get_doctor_count'}), name='doctor-count'),
]