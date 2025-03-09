'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApplicationStore } from '../store/applicationStore';

export default function Eligibility() {
  const router = useRouter();
  const { addDraft } = useApplicationStore();
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    industry: '',
    yearsInOperation: '',
    monthlyTurnover: '',
    loanPurpose: '',
    propertyType: '',
    propertyOwnership: '',
    propertyAge: '',
    propertyLocation: '',
    propertyArea: '',
    propertyValue: '',
    existingLoan: 'no'
  });

  const generateApplicationId = () => {
    const currentDate = new Date();
    return `LAP${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}${String(currentDate.getDate()).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  };

  const saveApplication = (shouldContinue: boolean = false) => {
    const currentDate = new Date();
    const newApplicationId = generateApplicationId();
    
    addDraft({
      id: newApplicationId,
      type: 'Loan Against Property',
      amount: formData.propertyValue ? new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(Number(formData.propertyValue)) : '₹ 0',
      lastUpdated: {
        date: currentDate.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric'
        }),
        time: currentDate.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        })
      },
      status: {
        stage: 'Eligibility',
        percentage: 20
      },
      formData
    });

    if (shouldContinue) {
      router.push(`/eligibility-results?applicationId=${newApplicationId}`);
    } else {
      router.push('/application-drafts');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveApplication(true);
  };

  const handleSaveAndExit = () => {
    saveApplication(false);
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
              { number: 1, label: 'Eligibility', active: true, completed: false },
              { number: 2, label: 'Business Profile', active: false, completed: false },
              { number: 3, label: 'Property Details', active: false, completed: false },
              { number: 4, label: 'Offers', active: false, completed: false },
              { number: 5, label: 'Documentation', active: false, completed: false },
              { number: 6, label: 'Verification', active: false, completed: false },
              { number: 7, label: 'Disbursement', active: false, completed: false }
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
          <h1 className="text-3xl font-bold text-text-dark mb-4">
            Check Your Loan Eligibility
          </h1>
          <p className="text-lg text-text-light">
            Enter your business and property details to check your eligibility for a Loan Against Property
          </p>
          <p className="text-base text-text-light">
            Estimated time to complete: 3 minutes
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-lg p-8">
          {/* Business Information Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Business Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Business Legal Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Business Type
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Business Type</option>
                  <option value="proprietorship">Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="llp">LLP</option>
                  <option value="private">Private Limited</option>
                </select>
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Industry Category
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Industry</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="trading">Trading</option>
                  <option value="services">Services</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Years in Operation
                </label>
                <select
                  name="yearsInOperation"
                  value={formData.yearsInOperation}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Years</option>
                  {[1,2,3,4,5,6,7,8,9,10].map(year => (
                    <option key={year} value={year}>{year} {year === 1 ? 'Year' : 'Years'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Average Monthly Turnover
                </label>
                <input
                  type="number"
                  name="monthlyTurnover"
                  value={formData.monthlyTurnover}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Loan Purpose
                </label>
                <select
                  name="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Purpose</option>
                  <option value="expansion">Business Expansion</option>
                  <option value="working">Working Capital</option>
                  <option value="equipment">Equipment Purchase</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 my-8"></div>

          {/* Property Information Section */}
          <div>
            <h2 className="text-2xl font-bold text-text-dark mb-6">Property Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Property Ownership Type
                </label>
                <select
                  name="propertyOwnership"
                  value={formData.propertyOwnership}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Type</option>
                  <option value="freehold">Freehold</option>
                  <option value="leasehold">Leasehold</option>
                </select>
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Property Age
                </label>
                <select
                  name="propertyAge"
                  value={formData.propertyAge}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Age</option>
                  {[1,2,3,4,5,6,7,8,9,10].map(year => (
                    <option key={year} value={year}>{year} {year === 1 ? 'Year' : 'Years'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Property Location (City)
                </label>
                <input
                  type="text"
                  name="propertyLocation"
                  value={formData.propertyLocation}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Approximate Property Area (sq. ft.)
                </label>
                <input
                  type="number"
                  name="propertyArea"
                  value={formData.propertyArea}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Estimated Market Value (₹)
                </label>
                <input
                  type="number"
                  name="propertyValue"
                  value={formData.propertyValue}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-text-dark font-semibold mb-2">
                  Any Existing Loans Against This Property?
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="existingLoan"
                      value="yes"
                      checked={formData.existingLoan === 'yes'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-text-dark">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="existingLoan"
                      value="no"
                      checked={formData.existingLoan === 'no'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-text-dark">No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm text-text-light italic mb-6">
              This eligibility check does not affect your credit score.
            </p>
            
            <div className="flex items-center space-x-6">
              <button
                type="submit"
                className="btn-primary px-8"
              >
                Check Eligibility
              </button>
              <button
                type="button"
                className="text-primary hover:text-primary-light"
                onClick={handleSaveAndExit}
              >
                Save & Continue Later
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
} 