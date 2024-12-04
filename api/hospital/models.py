from django.db import models
from django.http import JsonResponse

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

# Doctor Model
class Doctor(models.Model):
    doctor_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    status = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
###### DoctorProfile Model #############
class DoctorProfile(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    address = models.TextField()  # Doctor's address

    def __str__(self):
        return self.doctor.name

# Pharmacist Model
class Pharmacist(models.Model):
    pharmacist_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    status = models.CharField(max_length=50)

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
    support_id = models.AutoField(primary_key=True),
    name = models.CharField(max_length=100)
    email = models.EmailField()
    description = models.TextField()

    def __str__(self):
        return self.support_id

#Contacts Model
class Contact(models.Model):
    contact_id= models.AutoField(primary_key=True),
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