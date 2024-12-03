from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PatientViewSet, PharmacistViewSet,
    ReportViewSet, SupportTicketViewSet, PatientDiagnosisViewSet,
    AppointmentViewSet, MedicineInventoryViewSet, ContactViewSet, DoctorProfileViewSet,
    DoctorRegisterView, DoctorLoginView, PharmacistRegisterView, PharmacistLoginView,
    get_doctors_count, get_patients_count, get_pharmacists_count, get_counts
)

router = DefaultRouter()
router.register(r'patients', PatientViewSet)
# router.register(r'doctors', DoctorViewSet)
router.register(r'pharmacists', PharmacistViewSet)
router.register(r'reports', ReportViewSet)
router.register(r'support-tickets', SupportTicketViewSet)
router.register(r'contacts', ContactViewSet)
router.register(r'patient-diagnosis', PatientDiagnosisViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'medicines', MedicineInventoryViewSet)
router.register(r'doctorprofiles', DoctorProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('doctors/count/', get_doctors_count, name='doctors_count'),
    path('patients/count/', get_patients_count, name='patients_count'),
    path('pharmacists/count/', get_pharmacists_count, name='pharmacists_count'),
    path('counts/', get_counts, name='all_counts'),
    path("register/doctor", DoctorRegisterView.as_view(), name="register-doctor"),
    path("login/doctor", DoctorLoginView.as_view(), name="login-doctor"),
    path('register/pharmacist/', PharmacistRegisterView.as_view(), name='register_pharmacist'),
    path('login/pharmacist/', PharmacistLoginView.as_view(), name='login_pharmacist'),
]

