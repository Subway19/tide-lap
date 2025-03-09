'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApplicationStore } from '../store/applicationStore';
import { getApplicationIdFromUrl, loadSavedApplication, updateApplicationProgress } from '../utils/applicationUtils';

export default function BusinessProfile() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    businessName: 'ABC Enterprises Pvt. Ltd.',
    businessType: 'Private Limited Company',
    registrationNumber: '',
    incorporationDate: '',
    address: '',
    addressLine2: '',
    pinCode: '',
    city: '',
    state: '',
    growthRate: '',
    bankingRelationship: '',
    outstandingLoans: '',
    majorClients: ''
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
        'Property Details',
        45,
        formData
      );
      
      // Navigate to next page
      router.push(`/property-details?applicationId=${applicationId}`);
    }
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
              { number: 2, label: 'Business Profile', active: true },
              { number: 3, label: 'Property Details', active: false },
              { number: 4, label: 'Offers', active: false },
              { number: 5, label: 'Documentation', active: false },
              { number: 6, label: 'Verification', active: false },
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
            Business Profile
          </h1>
          <p className="text-lg text-text-light">
            Provide details about your business to help us understand your loan requirements better
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-lg p-8">
          {/* Basic Business Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Basic Business Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Business Legal Name*
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-background-light border border-gray-300 rounded-md text-text-light"
                  disabled
                />
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Business Type*
                </label>
                <input
                  type="text"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-background-light border border-gray-300 rounded-md text-text-light"
                  disabled
                />
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Business Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Date of Incorporation
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="incorporationDate"
                    value={formData.incorporationDate}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-3 text-text-light">📅</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Business Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
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
            </div>

            {/* Map Integration */}
            <div className="mt-6 bg-background-light rounded-lg p-6">
              <div className="h-[180px] flex items-center justify-center text-text-light">
                Map Location Verification
              </div>
              <button
                type="button"
                className="mt-4 border-2 border-primary text-primary px-6 py-2 rounded-md font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                Verify Location
              </button>
            </div>
          </div>

          {/* Additional Business Information */}
          <div>
            <h2 className="text-2xl font-bold text-text-dark mb-6">Additional Business Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Business Growth Rate (YoY)
                </label>
                <select
                  name="growthRate"
                  value={formData.growthRate}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Growth Rate</option>
                  <option value="0-10">0-10%</option>
                  <option value="10-20">10-20%</option>
                  <option value="20-30">20-30%</option>
                  <option value="30+">30%+</option>
                </select>
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Primary Banking Relationship
                </label>
                <select
                  name="bankingRelationship"
                  value={formData.bankingRelationship}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Bank</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="axis">Axis Bank</option>
                </select>
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Current Outstanding Loans
                </label>
                <input
                  type="number"
                  name="outstandingLoans"
                  value={formData.outstandingLoans}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Major Clients/Customers
                </label>
                <input
                  type="text"
                  name="majorClients"
                  value={formData.majorClients}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-sm text-text-light mt-1">Optional - For B2B businesses</p>
              </div>
            </div>
          </div>

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
              Continue →
            </button>
          </div>
        </form>
      </main>
    </div>
  );
} 