from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)
    name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()
    first_name = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    created = models.DateTimeField()
    user = models.OneToOneField(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'authtoken_token'


class DjangoAdminLog(models.Model):
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    action_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class HospitalAppointment(models.Model):
    date = models.DateField()
    time = models.TimeField()
    patient = models.ForeignKey('HospitalPatient', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'hospital_appointment'


class HospitalContact(models.Model):
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=254)
    message = models.TextField()

    class Meta:
        managed = False
        db_table = 'hospital_contact'


class HospitalDoctor(models.Model):
    doctor_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.CharField(unique=True, max_length=254)
    status = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'hospital_doctor'


class HospitalMedicineinventory(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float

    class Meta:
        managed = False
        db_table = 'hospital_medicineinventory'


class HospitalPatient(models.Model):
    patient_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    phone = models.CharField(max_length=15)
    email = models.CharField(unique=True, max_length=254)
    status = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'hospital_patient'


class HospitalPatientdiagnosis(models.Model):
    diagnosis = models.TextField()
    prescribed_medicine = models.TextField()
    dosage = models.CharField(max_length=50)
    patient = models.ForeignKey(HospitalPatient, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'hospital_patientdiagnosis'


class HospitalPharmacist(models.Model):
    pharmacist_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.CharField(unique=True, max_length=254)
    status = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'hospital_pharmacist'


class HospitalReport(models.Model):
    message = models.TextField()
    doctor = models.ForeignKey(HospitalDoctor, models.DO_NOTHING)
    subject = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'hospital_report'


class HospitalSupportticket(models.Model):
    ticket_id = models.CharField(primary_key=True, max_length=50)
    name = models.CharField(max_length=100)
    email = models.CharField(max_length=254)
    description = models.TextField()

    class Meta:
        managed = False
        db_table = 'hospital_supportticket'
