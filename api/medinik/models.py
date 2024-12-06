from django.db import models

# Create your models here.
from django.db import models
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# User Manager
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

# Custom Admin Model
class Admin(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Specify unique related names for groups and user_permissions
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='admin_user_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='admin_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email






# Patient Model
class Patient(models.Model):
    patient_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
class Doctor(models.Model):
    doctor_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    status = models.CharField(max_length=50)
    password = models.CharField(max_length=255)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.name
    
###### DoctorProfile Model #############
class DoctorProfile(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    address = models.TextField()  # Doctor's address

    def __str__(self):
        return self.doctor.name

 #Custom Admin Model
class Admin(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=128)  # Add password field
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Specify unique related names for groups and user_permissions
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='admin_user_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='admin_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

# Pharmacist Model
class Pharmacist(models.Model):
    pharmacist_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    status = models.CharField(max_length=50)
    password = models.CharField(max_length=128)  # Add password field

    def __str__(self):
        return self.name

# Reports Model
class Report(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)  # Reference to Doctor
    subject = models.CharField(max_length=255)
    message = models.TextField()


    def __str__(self):
        return self.subject

# Support Tickets Model
class SupportTicket(models.Model):
    ticket_id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    description = models.TextField()

    def __str__(self):
        return self.ticket_id
    
# Support Model
class Support(models.Model):
    support_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    description = models.TextField()

    def __str__(self):
        return self.support_id

#Contacts Model
class Contact(models.Model):
    contact_id= models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name

# Patient Diagnosis Model
class PatientDiagnosis(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    diagnosis = models.TextField()
    prescribed_medicine = models.TextField()
    dosage = models.CharField(max_length=50)
    # next_checkup = models.DateField()

    def __str__(self):
        return f"Diagnosis for {self.patient.name}"

# Appointments Model
class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return f"Appointment for {self.patient.name} on {self.date}"
    
class Appointments(models.Model):
    appointment_id = models.AutoField(primary_key=True)  # Auto-generated unique ID
    patient_name = models.CharField(max_length=255)  # Patient's name
    date = models.DateField()  # Appointment date
    time = models.TimeField()  # Appointment time

    def __str__(self):
        return f"Appointment {self.appointment_id} for {self.patient_name} on {self.date} at {self.time}"


# Medicine Inventory Model
class MedicineInventory(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name
    
def get_doctors_count(request):
    count = Doctor.objects.count()
    return JsonResponse({'count': count})

def get_patients_count(request):
    count = Patient.objects.count()
    return JsonResponse({'count': count})