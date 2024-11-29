from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PatientViewSet, DoctorViewSet, PharmacistViewSet, ReportViewSet,
    SupportTicketViewSet, PatientDiagnosisViewSet, AppointmentViewSet,
    MedicineInventoryViewSet
)

router = DefaultRouter()
router.register(r'patients', PatientViewSet)
router.register(r'doctors', DoctorViewSet)
router.register(r'pharmacists', PharmacistViewSet)
router.register(r'reports', ReportViewSet)
router.register(r'support-tickets', SupportTicketViewSet)
router.register(r'patient-diagnosis', PatientDiagnosisViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'medicine-inventory', MedicineInventoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
