import React, { useState, useEffect } from 'react';
import { FaHeartbeat, FaTooth, FaEye, FaCalendarAlt } from 'react-icons/fa';

const Counter: React.FC<{ target: number }> = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = target / 100;
    let currentCount = 0;

    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.ceil(currentCount));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [target]);

  return <span>{count}</span>;
};

const LandingPage: React.FC = () => {
  return (
    <>
      {/* Add smooth scrolling style */}
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
        `}
      </style>

      <div className="font-sans text-gray-700">
        {/* Navbar */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <div className="text-2xl font-bold text-blue-900">Medinik 💊</div>
            <nav className="hidden md:flex space-x-6 text-gray-600">
              <a href="#home" className="hover:text-blue-600">
                Home
              </a>
              <a href="#about" className="hover:text-blue-600">
                About
              </a>
              <a href="#services" className="hover:text-blue-600">
                Services
              </a>
              <a href="#experience" className="hover:text-blue-600">
                Experience
              </a>
              <a href="#contact" className="hover:text-blue-600">
                Contact
              </a>
            </nav>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 text-sm">
              Free Consultation
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div
          id="home"
          className="bg-gradient-to-r from-blue-50 via-white to-blue-50 px-8 py-16"
        >
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">
                Your Health Is <br /> Our Top Priority
              </h1>
              <p className="text-gray-500 mb-6">
              Medinik offers comprehensive, patient-focused healthcare services tailored to meet 
              your unique needs. Experience medical care like never before.
              </p>
              <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700">
                Meet Our Specialist
              </button>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <img
                src="https://i.pinimg.com/736x/dd/40/50/dd40509960ebe444518919fc5530104b.jpg"
                alt="Nurse"
                className="w-full max-w-sm rounded-lg shadow-lg"
              />
              <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md">
                <p className="text-green-600 font-medium flex items-center">
                  <FaCalendarAlt className="mr-2" /> Regular Checkup
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center gap-8 text-center">
            <div>
              <p className="text-2xl font-semibold text-blue-900">
                <Counter target={262000} />+
              </p>
              <p className="text-gray-500">Recovered Patients</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-blue-900">
                <Counter target={94} />%
              </p>
              <p className="text-gray-500">Satisfaction Rate</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-blue-900">
                <Counter target={86} />+
              </p>
              <p className="text-gray-500">Expert Doctors</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-8">About Us</h2>
            <p className="text-gray-500 text-lg">
              At Medinik, we combine modern technology with personalized care to deliver
              world-class medical services. Our mission is to ensure every patient receives the
              attention they deserve.
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div id="services" className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-8">Services For Your Health</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white rounded-lg text-center shadow-md hover:shadow-lg">
                <FaHeartbeat className="text-blue-600 text-4xl mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-blue-900">Cardiology</h3>
                <p className="text-gray-500 text-sm mt-2">
                Advanced diagnostics and treatments for cardiovascular health, tailored to 
                minimize risks and improve quality of life.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg text-center shadow-md hover:shadow-lg">
                <FaCalendarAlt className="text-blue-600 text-4xl mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-blue-900">Monthly Checkup</h3>
                <p className="text-gray-500 text-sm mt-2">
                Routine health assessments to monitor your overall well-being and prevent 
                potential issues before they arise.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg text-center shadow-md hover:shadow-lg">
                <FaTooth className="text-blue-600 text-4xl mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-blue-900">Dental Care</h3>
                <p className="text-gray-500 text-sm mt-2">
                Comprehensive dental services, from preventive cleanings to advanced procedures 
                for a brighter, healthier smile.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg text-center shadow-md hover:shadow-lg">
                <FaEye className="text-blue-600 text-4xl mx-auto mb-4" />
                <h3 className="font-semibold text-lg text-blue-900">Ophthalmology</h3>
                <p className="text-gray-500 text-sm mt-2">
                Cutting-edge eye care solutions for clear vision and effective treatment of eye 
                disorders.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div id="experience" className="py-16 bg-gradient-to-r from-white via-blue-50 to-white">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h3 className="text-xl font-bold text-blue-900 mb-4">25+ Years of Experience</h3>
              <h2 className="text-3xl font-bold text-blue-900 mb-6">
                We Always Ensure <br /> Best Medical Treatment For Your Health
              </h2>
              <p className="text-gray-500 mb-6">
              Our decades of experience combined with innovative techniques ensure the best 
              outcomes for our patients.
              </p>
              <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700">
                Learn More
              </button>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
              <img
                src="https://i.pinimg.com/736x/f6/74/91/f67491f2ca95f80844b6474dd26505ed.jpg"
                alt="Doctors"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-8">Contact Us</h2>
            <p className="text-gray-500">
              For any inquiries or to schedule an appointment, reach out to us today. We're here
              to help!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
