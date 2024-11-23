import React, { useState, useEffect } from "react";
import { FaHeartbeat, FaTooth, FaEye, FaCalendarAlt, FaTimes, FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleModalToggle = () => setIsModalOpen(!isModalOpen);
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Appointment scheduled for ${appointmentDate} at ${appointmentTime}`);
    setIsModalOpen(false);
    setAppointmentDate("");
    setAppointmentTime("");
  };

  return (
    <>
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .modal {
            background: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}
      </style>

      <div className="font-sans text-gray-700">
        {/* Navbar */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            <div className="text-2xl font-bold text-blue-900">Medinik 💊</div>
            <nav className="hidden md:flex space-x-6 text-gray-600">
              <a href="#home" className="hover:text-blue-600">Home</a>
              <a href="#about" className="hover:text-blue-600">About</a>
              <a href="#services" className="hover:text-blue-600">Services</a>
              <a href="#experience" className="hover:text-blue-600">Experience</a>
              <a href="#contact" className="hover:text-blue-600">Contact</a>
            </nav>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 text-sm">
              Staff Portal
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
              <div
                className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-md cursor-pointer"
                onClick={handleModalToggle}
              >
                <p className="text-green-600 font-medium flex items-center">
                  <FaCalendarAlt className="mr-2" /> Book Regular Checkup
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

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={handleModalToggle}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Schedule Your Checkup</h2>
                <button onClick={handleModalToggle} className="text-gray-500 hover:text-gray-700">
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleFormSubmit} className="mt-4">
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">Select Date</label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">Select Time</label>
                  <input
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Confirm Appointment
                </button>
              </form>
            </div>
          </div>
        )}

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
      <div id="contact" className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 px-8">
          {/* Contact Form on the Left */}
          <div className="w-full lg:w-1/2 bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Contact Us</h2>
            <p className="text-gray-500 mb-6">
              Have a question, concern, or feedback? We'd love to hear from you. Fill out the form below, and we'll get back to you shortly.
            </p>
            <form>
              <div className="mb-4">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <FaUser className="text-gray-500 mr-3" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full outline-none text-gray-700"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <FaEnvelope className="text-gray-500 mr-3" />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full outline-none text-gray-700"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-start border border-gray-300 rounded-lg px-3 py-2">
                  <FaCommentDots className="text-gray-500 mt-1 mr-3" />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full outline-none text-gray-700 resize-none"
                    required
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Medical Content on the Right */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Your Health is Our Priority</h3>
            <p className="text-gray-500 mb-6">
              At Medinik, we combine modern technology with compassionate care to ensure your health and
              well-being are in safe hands. Our team of experts is here to provide world-class medical
              solutions tailored to your needs.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <FaHeartbeat className="text-red-500 text-4xl" />
              <div>
                <h4 className="text-lg font-semibold text-blue-900">Heart Health</h4>
                <p className="text-gray-500">
                  Advanced diagnostics and personalized treatment plans for optimal heart care.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <FaTooth className="text-yellow-500 text-4xl" />
              <div>
                <h4 className="text-lg font-semibold text-blue-900">Dental Care</h4>
                <p className="text-gray-500">
                  Comprehensive dental services to keep your smile bright and healthy.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaEye className="text-blue-500 text-4xl" />
              <div>
                <h4 className="text-lg font-semibold text-blue-900">Eye Care</h4>
                <p className="text-gray-500">
                  Cutting-edge solutions for all your ophthalmological needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LandingPage;
