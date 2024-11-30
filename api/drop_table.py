import django
from django.conf import settings
from django.db import connection

# Initialize Django settings
settings.configure(default_settings=django.conf.global_settings, INSTALLED_APPS=['api'])  # Replace 'api' with your actual app name

django.setup()

def drop_table():
    with connection.cursor() as cursor:
        cursor.execute('DROP TABLE IF EXISTS api_appointments;')  # Replace with your actual table name
    print("Table dropped successfully.")

# Run the function
drop_table()
