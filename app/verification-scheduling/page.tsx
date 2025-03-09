'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getApplicationIdFromUrl, loadSavedApplication, updateApplicationProgress } from '../utils/applicationUtils';

export default function VerificationScheduling() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    contactName: '',
    contactNumber: '',
    specialInstructions: ''
  });

  useEffect(() => {
    const id = getApplicationIdFromUrl();
    setApplicationId(id);

    if (id) {
      const savedData = loadSavedApplication(id);
      if (savedData?.formData?.verification) {
        const { contactName, contactNumber, specialInstructions } = savedData.formData.verification;
        setFormData({ contactName, contactNumber, specialInstructions });
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (applicationId) {
      // Update application progress with verification details
      updateApplicationProgress(
        applicationId,
        'Offers',
        75,
        { 
          verification: {
            ...formData,
            appointmentDate: selectedDate,
            appointmentTime: selectedTime,
            status: 'scheduled'
          }
        }
      );
      router.push(`/offers?applicationId=${applicationId}`);
    }
  };

  const handleSkip = () => {
    if (applicationId) {
      // Update application progress without verification details
      updateApplicationProgress(
        applicationId,
        'Offers',
        75,
        { 
          verification: {
            status: 'skipped'
          }
        }
      );
      router.push(`/offers?applicationId=${applicationId}`);
    }
  };

  const timeSlots = {
    morning: [
      { time: '9:00 AM', available: true },
      { time: '10:00 AM', available: false },
      { time: '11:00 AM', available: true }
    ],
    afternoon: [
      { time: '1:00 PM', available: true },
      { time: '2:00 PM', available: true },
      { time: '3:00 PM', available: true }
    ],
    evening: [
      { time: '4:00 PM', available: true },
      { time: '5:00 PM', available: false },
      { time: '6:00 PM', available: true }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-primary h-20">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <h1 className="text-white text-2xl font-bold cursor-pointer" onClick={() => router.push('/')}>Tide</h1>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-gray-200">Products</a>
            <a href="#" className="text-white hover:text-gray-200">Business</a>
            <a href="#" className="text-white hover:text-gray-200">Resources</a>
            <a href="#" className="text-white hover:text-gray-200">About Us</a>
          </nav>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-white hover:text-gray-200">Login</a>
            <button className="bg-primary-light text-white px-6 py-2 rounded-full font-semibold hover:bg-[#8855bb]">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-background-light py-4 overflow-x-auto">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between min-w-[1000px] max-w-[1200px] mx-auto">
            {[
              { number: 1, label: 'Eligibility', active: true, completed: true },
              { number: 2, label: 'Business Profile', active: true, completed: true },
              { number: 3, label: 'Property Details', active: true, completed: true },
              { number: 4, label: 'Documents', active: true, completed: true },
              { number: 5, label: 'Verification', active: true },
              { number: 6, label: 'Offers', active: false },
              { number: 7, label: 'Disbursement', active: false }
            ].map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-green-500 text-white' :
                    step.active ? 'bg-primary text-white' : 'bg-white border-2 border-gray-300 text-gray-500'
                  }`}>
                    {step.completed ? '✓' : step.number}
                  </div>
                  <div className="text-center mt-1 w-20">
                    <p className={`text-xs ${step.active || step.completed ? 'text-text-dark' : 'text-gray-500'}`}>
                      {step.label}
                    </p>
                  </div>
                </div>
                {index < 6 && (
                  <div className={`w-12 h-0.5 mx-1 ${
                    step.completed ? 'bg-green-500' :
                    step.active ? 'bg-primary' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-dark mb-2">
            Schedule Property Verification
          </h1>
          <p className="text-lg text-text-light">
            Select a convenient date and time for our verification team to visit and inspect your property
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-lg p-8">
          {/* Verification Process Information */}
          <div className="bg-background-light rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-text-dark mb-4">What to Expect During Property Verification</h2>
            <ul className="list-disc list-inside text-text-light space-y-2">
              <li>Our team will visit your property at the scheduled time (verification takes approximately 30-45 minutes)</li>
              <li>They will verify property details, take photographs, and measure the area as needed for valuation</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <div>
              <h2 className="text-2xl font-bold text-text-dark mb-4">Select Preferred Date</h2>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-background-light p-4 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-text-dark">May 2025</h3>
                  <div className="flex space-x-4">
                    <button className="text-primary hover:text-primary-light">◀</button>
                    <button className="text-primary hover:text-primary-light">▶</button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <div key={day} className="text-center text-text-light">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <button
                        key={day}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          day === 8 ? 'bg-primary text-white' : 'text-text-dark hover:bg-background-light'
                        }`}
                        onClick={() => setSelectedDate(new Date(2025, 4, day))}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Time Slots Section */}
            <div>
              <h2 className="text-2xl font-bold text-text-dark mb-4">Select Time Slot</h2>
              <div className="mb-6">
                <p className="text-lg text-text-dark">Thursday, May 8, 2025</p>
                <p className="text-text-light">Select a convenient time</p>
              </div>

              {/* Morning Slots */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-text-dark mb-3">Morning</h3>
                <div className="grid grid-cols-3 gap-4">
                  {timeSlots.morning.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`p-3 rounded-md border-2 ${
                        slot.available
                          ? selectedTime === slot.time
                            ? 'bg-primary text-white border-primary'
                            : 'border-primary text-primary hover:bg-primary hover:text-white'
                          : 'border-gray-300 text-gray-300 cursor-not-allowed'
                      }`}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      {slot.time}
                      {!slot.available && <span className="block text-xs text-orange-500">Booked</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Afternoon Slots */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-text-dark mb-3">Afternoon</h3>
                <div className="grid grid-cols-3 gap-4">
                  {timeSlots.afternoon.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`p-3 rounded-md border-2 ${
                        slot.available
                          ? selectedTime === slot.time
                            ? 'bg-primary text-white border-primary'
                            : 'border-primary text-primary hover:bg-primary hover:text-white'
                          : 'border-gray-300 text-gray-300 cursor-not-allowed'
                      }`}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      {slot.time}
                      {!slot.available && <span className="block text-xs text-orange-500">Booked</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Evening Slots */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-text-dark mb-3">Evening</h3>
                <div className="grid grid-cols-3 gap-4">
                  {timeSlots.evening.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`p-3 rounded-md border-2 ${
                        slot.available
                          ? selectedTime === slot.time
                            ? 'bg-primary text-white border-primary'
                            : 'border-primary text-primary hover:bg-primary hover:text-white'
                          : 'border-gray-300 text-gray-300 cursor-not-allowed'
                      }`}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      {slot.time}
                      {!slot.available && <span className="block text-xs text-orange-500">Booked</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Person Information */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Contact Person Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Contact Person Name*
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Contact Number*
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-text-dark font-semibold mb-2">
                Special Instructions (if any)
              </label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-24"
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-6">
            <button
              type="button"
              className="btn-outline flex-1"
              onClick={() => router.back()}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Confirm Appointment
            </button>
            <button
              type="button"
              className="btn-outline flex-1"
              onClick={handleSkip}
            >
              Skip for Now
            </button>
          </div>
        </form>
      </main>
    </div>
  );
} 