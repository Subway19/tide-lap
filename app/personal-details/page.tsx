'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getApplicationIdFromUrl, loadSavedApplication, updateApplicationProgress } from '../utils/applicationUtils';

export default function PersonalDetails() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    panNumber: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    emailAddress: '',
    addressLine1: '',
    addressLine2: '',
    pinCode: '',
    city: '',
    state: '',
    residenceType: '',
    yearsAtAddress: '',
    verificationMethod: 'aadhaar',
    hasCoOwner: false
  });

  const [verificationStatus, setVerificationStatus] = useState({
    pan: false,
    mobile: false,
    email: false
  });

  useEffect(() => {
    const id = getApplicationIdFromUrl();
    setApplicationId(id);

    if (id) {
      const savedData = loadSavedApplication(id);
      if (savedData?.formData?.personalDetails) {
        setFormData(savedData.formData.personalDetails);
        if (savedData.formData.personalDetails.verificationStatus) {
          setVerificationStatus(savedData.formData.personalDetails.verificationStatus);
        }
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleVerify = (type: 'pan' | 'mobile' | 'email') => {
    // Handle verification logic
    console.log(`Verifying ${type}...`);
    setVerificationStatus(prev => ({
      ...prev,
      [type]: true
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!applicationId) return;

    // Update application progress with personal details
    updateApplicationProgress(
      applicationId,
      'Review',
      90,
      { 
        personalDetails: {
          ...formData,
          verificationStatus,
          submittedAt: new Date().toISOString()
        }
      }
    );

    // Navigate to application review page
    router.push(`/application-review?applicationId=${applicationId}`);
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
              { number: 5, label: 'Verification', active: true, completed: true },
              { number: 6, label: 'Offers', active: true, completed: true },
              { number: 7, label: 'Documentation', active: true }
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
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-dark mb-2">
            Personal Details
          </h1>
          <p className="text-lg text-text-light">
            Provide your personal information as the primary loan applicant
          </p>
        </div>

        {/* Documentation Tabs */}
        <div className="bg-background-light rounded-lg p-2 mb-8">
          <div className="flex space-x-4">
            <button className="bg-primary text-white px-8 py-3 rounded-md font-semibold">
              Personal Details
            </button>
            <button className="text-text-light px-8 py-3 rounded-md hover:bg-white">
              Legal Documentation
            </button>
            <button className="text-text-light px-8 py-3 rounded-md hover:bg-white">
              Insurance Requirements
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-lg p-8">
          {/* Personal Identity Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Personal Identity</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Full Name (as per PAN)*
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="relative">
                <label className="block text-text-dark font-semibold mb-2">
                  PAN Number*
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    className={`px-4 py-3 rounded-md ${
                      verificationStatus.pan
                        ? 'bg-green-500 text-white'
                        : 'bg-primary text-white hover:bg-primary-light'
                    }`}
                    onClick={() => handleVerify('pan')}
                  >
                    {verificationStatus.pan ? 'Verified' : 'Verify'}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-text-dark font-semibold mb-2">
                  Date of Birth*
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Gender*
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Contact Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative">
                <label className="block text-text-dark font-semibold mb-2">
                  Mobile Number*
                </label>
                <div className="flex space-x-2">
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    className={`px-4 py-3 rounded-md ${
                      verificationStatus.mobile
                        ? 'bg-green-500 text-white'
                        : 'bg-primary text-white hover:bg-primary-light'
                    }`}
                    onClick={() => handleVerify('mobile')}
                  >
                    {verificationStatus.mobile ? 'Verified' : 'Verify'}
                  </button>
                </div>
              </div>

              <div className="relative">
                <label className="block text-text-dark font-semibold mb-2">
                  Email Address*
                </label>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    className={`px-4 py-3 rounded-md ${
                      verificationStatus.email
                        ? 'bg-green-500 text-white'
                        : 'bg-primary text-white hover:bg-primary-light'
                    }`}
                    onClick={() => handleVerify('email')}
                  >
                    {verificationStatus.email ? 'Verified' : 'Verify'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Residential Address Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Residential Address</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Address Line 1*
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
                  Address Line 2
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
                    PIN Code*
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
                    City*
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
                    State*
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
                    {/* Add more states */}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-dark font-semibold mb-2">
                    Residence Type*
                  </label>
                  <select
                    name="residenceType"
                    value={formData.residenceType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Type</option>
                    <option value="owned">Owned</option>
                    <option value="rented">Rented</option>
                    <option value="leased">Leased</option>
                  </select>
                </div>

                <div>
                  <label className="block text-text-dark font-semibold mb-2">
                    Years at Current Address*
                  </label>
                  <select
                    name="yearsAtAddress"
                    value={formData.yearsAtAddress}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Years</option>
                    {Array.from({ length: 30 }, (_, i) => i + 1).map(year => (
                      <option key={year} value={year}>{year} {year === 1 ? 'Year' : 'Years'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Identity Verification Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Identity Verification</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <button
                type="button"
                className={`p-6 rounded-lg border-2 ${
                  formData.verificationMethod === 'aadhaar'
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 hover:border-primary'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, verificationMethod: 'aadhaar' }))}
              >
                <h3 className="text-lg font-bold mb-2">Aadhaar-based eKYC</h3>
                <p className="text-sm">Fast & Secure Verification</p>
              </button>

              <button
                type="button"
                className={`p-6 rounded-lg border-2 ${
                  formData.verificationMethod === 'manual'
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 hover:border-primary'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, verificationMethod: 'manual' }))}
              >
                <h3 className="text-lg font-bold mb-2">Alternative ID Verification</h3>
                <p className="text-sm">Upload ID Proof Manually</p>
              </button>
            </div>

            {/* Co-Owner Information */}
            <div className="bg-background-light rounded-lg p-6">
              <h3 className="text-lg font-bold text-text-dark mb-4">Is this property jointly owned?</h3>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="hasCoOwner"
                    checked={formData.hasCoOwner}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary"
                  />
                  <span className="text-text-dark">Yes, add co-owner details</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="hasCoOwner"
                    checked={!formData.hasCoOwner}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary"
                  />
                  <span className="text-text-dark">No</span>
                </label>
              </div>
            </div>
          </div>

          {/* Data Privacy Note */}
          <div className="bg-background-light rounded-lg p-4 mb-8">
            <p className="text-text-light">
              Your personal information is secure and will only be used for loan processing. View our Privacy Policy for details.
            </p>
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
              Continue →
            </button>
          </div>
        </form>
      </main>
    </div>
  );
} 