'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApplicationStore } from '../store/applicationStore';
import { getApplicationIdFromUrl, loadSavedApplication, updateApplicationProgress } from '../utils/applicationUtils';

export default function PropertyDetails() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('location');
  const [formData, setFormData] = useState({
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    pinCode: '',
    city: '',
    state: '',
    coordinates: '12.9716° N, 77.5946° E'
  });

  useEffect(() => {
    const id = getApplicationIdFromUrl();
    setApplicationId(id);

    if (id) {
      const savedData = loadSavedApplication(id);
      if (savedData?.formData) {
        setFormData(prev => ({
          ...prev,
          ...savedData.formData
        }));
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (applicationId) {
      // Update application progress
      updateApplicationProgress(
        applicationId,
        'Property Documents',
        50,
        formData
      );
      
      // Navigate to next page
      router.push(`/property-documents?applicationId=${applicationId}`);
    }
  };

  const tabs = [
    { id: 'location', label: 'Location' },
    { id: 'property-documents', label: 'Property Documents' },
    { id: 'verification', label: 'Verification Scheduling' }
  ];

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
              { number: 3, label: 'Property Details', active: true },
              { number: 4, label: 'Property Documents', active: false },
              { number: 5, label: 'Verification', active: false },
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
            Property Details
          </h1>
          <p className="text-lg text-text-light">
            Provide comprehensive information about your property for accurate valuation
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-background-light rounded-lg p-1 mb-8">
          <div className="flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-6 rounded-md font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-text-light hover:text-text-dark'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-lg p-8">
          {/* Location Information */}
          {activeTab === 'location' && (
            <div>
              <h2 className="text-2xl font-bold text-text-dark mb-6">Property Location Details</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-text-dark font-semibold mb-2">
                    Property Address Line 1
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-text-dark font-semibold mb-2">
                    Property Address Line 2
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-text-dark font-semibold mb-2">
                      Landmark
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-text-dark font-semibold mb-2">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-text-dark font-semibold mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-text-dark font-semibold mb-2">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select State</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="delhi">Delhi</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="gujarat">Gujarat</option>
                    <option value="tamilnadu">Tamil Nadu</option>
                  </select>
                </div>
              </div>

              {/* Map Integration */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-text-dark mb-2">Verify Property Location on Map</h3>
                <p className="text-text-light mb-4">Drag the pin to mark the exact location of your property</p>
                
                <div className="bg-background-light rounded-lg p-6">
                  <div className="h-[400px] flex items-center justify-center text-text-light relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 bg-primary rounded-full border-4 border-white"></div>
                    </div>
                    Google Maps Interface
                  </div>
                  
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      type="button"
                      className="border-2 border-primary text-primary px-6 py-2 rounded-md font-semibold hover:bg-primary hover:text-white transition-colors"
                    >
                      Search
                    </button>
                    <button
                      type="button"
                      className="bg-primary text-white px-6 py-2 rounded-md font-semibold hover:bg-primary-light transition-colors"
                    >
                      Confirm Location
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-text-dark font-semibold mb-2">
                    Coordinates (Auto-filled)
                  </label>
                  <input
                    type="text"
                    name="coordinates"
                    value={formData.coordinates}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-background-light border border-gray-300 rounded-md text-text-light"
                    disabled
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save Progress Message */}
          <div className="mt-8 bg-indigo-50 rounded-lg p-4 flex items-center justify-between">
            <p className="text-primary">Your progress is being saved automatically</p>
            <span className="text-primary">✓</span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-6 mt-8">
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
              Next →
            </button>
          </div>
        </form>
      </main>
    </div>
  );
} 