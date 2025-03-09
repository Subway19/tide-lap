'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getApplicationIdFromUrl, loadSavedApplication, updateApplicationProgress } from '../utils/applicationUtils';

export default function ApplicationReview() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [applicationData, setApplicationData] = useState<any>(null);

  useEffect(() => {
    const id = getApplicationIdFromUrl();
    setApplicationId(id);

    if (id) {
      const savedData = loadSavedApplication(id);
      if (savedData) {
        setApplicationData(savedData);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!applicationId) return;

    // Update application progress
    updateApplicationProgress(
      applicationId,
      'Status',
      100,
      { 
        review: {
          reviewedAt: new Date().toISOString(),
          status: 'completed'
        }
      }
    );

    // Navigate to application status page
    router.push(`/application-status?applicationId=${applicationId}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
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
              { number: 7, label: 'Review', active: true }
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
            Application Review
          </h1>
          <p className="text-lg text-text-light">
            Review your loan application details before final submission
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Selected Offer Details */}
          <div className="bg-white border border-gray-300 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Selected Loan Offer</h2>
            {applicationData?.formData?.selectedOffer && (
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-text-light mb-2">Loan Amount</p>
                  <p className="text-xl font-bold text-text-dark">
                    {formatCurrency(applicationData.formData.selectedOffer.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-text-light mb-2">Interest Rate</p>
                  <p className="text-xl font-bold text-text-dark">
                    {applicationData.formData.selectedOffer.interestRate}% p.a.
                  </p>
                </div>
                <div>
                  <p className="text-text-light mb-2">Tenure</p>
                  <p className="text-xl font-bold text-text-dark">
                    {applicationData.formData.selectedOffer.tenure} Years
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Personal Details */}
          <div className="bg-white border border-gray-300 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Personal Details</h2>
            {applicationData?.formData?.personalDetails && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-text-light mb-2">Full Name</p>
                  <p className="text-xl font-bold text-text-dark">
                    {applicationData.formData.personalDetails.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-text-light mb-2">PAN Number</p>
                  <p className="text-xl font-bold text-text-dark">
                    {applicationData.formData.personalDetails.panNumber}
                  </p>
                </div>
                <div>
                  <p className="text-text-light mb-2">Mobile Number</p>
                  <p className="text-xl font-bold text-text-dark">
                    {applicationData.formData.personalDetails.mobileNumber}
                  </p>
                </div>
                <div>
                  <p className="text-text-light mb-2">Email Address</p>
                  <p className="text-xl font-bold text-text-dark">
                    {applicationData.formData.personalDetails.emailAddress}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="bg-white border border-gray-300 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Property Details</h2>
            {applicationData?.formData?.propertyDetails && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-text-light mb-2">Property Address</p>
                  <p className="text-xl font-bold text-text-dark">
                    {applicationData.formData.propertyDetails.address}
                  </p>
                </div>
                <div>
                  <p className="text-text-light mb-2">Property Type</p>
                  <p className="text-xl font-bold text-text-dark">
                    {applicationData.formData.propertyDetails.type}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Legal Documents */}
          <div className="bg-white border border-gray-300 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Legal Documentation</h2>
            {applicationData?.formData?.legalDocuments && (
              <div>
                <p className="text-text-light mb-2">Consultation Type</p>
                <p className="text-xl font-bold text-text-dark mb-4">
                  {applicationData.formData.legalDocuments.consultationType}
                </p>
                <p className="text-text-light mb-2">Scheduled Date</p>
                <p className="text-xl font-bold text-text-dark">
                  {new Date(applicationData.formData.legalDocuments.consultationDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="bg-background-light rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id="terms"
                className="w-5 h-5 text-primary"
              />
              <label htmlFor="terms" className="text-text-dark">
                I confirm that all the information provided is accurate and I agree to the terms and conditions
              </label>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-outline flex-1"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Submit Application →
            </button>
          </div>
        </form>
      </main>
    </div>
  );
} 