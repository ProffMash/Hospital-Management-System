import React, { useEffect, useState } from 'react';

const LandingPage = () => {
  const [hospitalCount, setHospitalCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);

  // Counter animation
  useEffect(() => {
    const incrementCounter = (setter: React.Dispatch<React.SetStateAction<number>>, target: number) => {
      let count = 0;
      const interval = setInterval(() => {
        count += Math.ceil(target / 100); // Increment step
        if (count >= target) {
          setter(target);
          clearInterval(interval);
        } else {
          setter(count);
        }
      }, 20); // Interval speed
    };

    incrementCounter(setHospitalCount, 1000);
    incrementCounter(setDoctorCount, 4000);
  }, []);

  return (
    <div className="bg-gradient-to-r from-teal-100 to-teal-50 min-h-screen p-8 flex flex-col items-center">
      <div className="max-w-6xl w-full">
        {/* Health Facilities Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Get convenience for your health facilities.
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            We help you to access health services easily anytime and anywhere.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition">
              Try for free
            </button>
            <button className="text-teal-500 border border-teal-500 py-2 px-6 rounded-lg hover:bg-teal-100 transition">
              Sign in
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg bg-white">
            <div className="text-4xl text-teal-500 mb-4">🏥</div>
            <h3 className="font-bold text-lg text-gray-800">Hospitals</h3>
            <p className="text-2xl font-bold text-teal-600 mt-2">{hospitalCount}+</p>
            <p className="text-gray-600 mt-2">
              More than {hospitalCount} hospitals across Asia provide top-notch healthcare services.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg bg-white">
            <div className="text-4xl text-teal-500 mb-4">👨‍⚕️</div>
            <h3 className="font-bold text-lg text-gray-800">Doctors</h3>
            <p className="text-2xl font-bold text-teal-600 mt-2">{doctorCount}+</p>
            <p className="text-gray-600 mt-2">
              {doctorCount}+ certified doctors ready to assist with your medical needs.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-lg bg-white">
            <div className="text-4xl text-teal-500 mb-4">🩺</div>
            <h3 className="font-bold text-lg text-gray-800">Patient Safety</h3>
            <p className="text-gray-600 mt-2">
              We prioritize the security and privacy of your health data.
            </p>
          </div>
        </div>

        {/* Appointment Booking Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Book an Appointment
            </h2>
            <form className="space-y-4">
              <select className="w-full border border-gray-300 p-2 rounded-lg">
                <option>Select a Doctor</option>
                <option>Dr. Smith</option>
                <option>Dr. Johnson</option>
                <option>Dr. Brown</option>
              </select>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
              <input
                type="date"
                className="w-full border border-gray-300 p-2 rounded-lg"
              />
              <button
                type="submit"
                className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition w-full"
              >
                Book Now ✈️
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-teal-600 mb-4">
              Medical Departments
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {['Cardiology', 'Orthopedics', 'Pediatrics', 'Ophthalmology'].map(
                (department, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 p-4 rounded-lg bg-white text-center"
                  >
                    {department}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Happy Clients Section */}
        <div className="mt-16">
          <h2 className="text-center text-3xl font-bold text-teal-600 mb-8">
            Happy Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: 'Angela Jolie',
                role: 'Designer',
                feedback:
                  'The doctors and services here are outstanding. Highly recommend!',
                image:
                  'https://randomuser.me/api/portraits/women/44.jpg',
              },
              {
                name: 'John Doe',
                role: 'Engineer',
                feedback:
                  'I had a great experience with their patient-centered care.',
                image:
                  'https://randomuser.me/api/portraits/men/32.jpg',
              },
            ].map((client, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white p-6 rounded-lg shadow-lg flex items-center"
              >
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold">{client.name}</h3>
                  <p className="text-sm">{client.role}</p>
                  <p className="text-sm mt-2">{client.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
