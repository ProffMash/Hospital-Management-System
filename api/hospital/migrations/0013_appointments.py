# Generated by Django 5.1.3 on 2024-12-04 19:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0012_support'),
    ]

    operations = [
        migrations.CreateModel(
            name='Appointments',
            fields=[
                ('appointment_id', models.AutoField(primary_key=True, serialize=False)),
                ('patient_name', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('time', models.TimeField()),
            ],
        ),
    ]