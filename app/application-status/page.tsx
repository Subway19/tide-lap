'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getApplicationIdFromUrl, loadSavedApplication, updateApplicationProgress } from '../utils/applicationUtils';

export default function ApplicationStatus() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState<string | null>(null);

  useEffect(() => {
    const id = getApplicationIdFromUrl();
    setApplicationId(id);
  }, []);

  const handleScheduleMeeting = () => {
    if (!applicationId) return;

    // Update application progress
    updateApplicationProgress(
      applicationId,
      'Disbursement',
      100,
      { 
        legalMeeting: {
          scheduledAt: new Date().toISOString(),
          status: 'scheduled'
        }
      }
    );

    // Navigate to disbursement page
    router.push(`/disbursement?applicationId=${applicationId}`);
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
      <div className="bg-background-light py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {[
              { number: 1, label: 'Eligibility', active: true, completed: true },
              { number: 2, label: 'Business Profile', active: true, completed: true },
              { number: 3, label: 'Property Details', active: true, completed: true },
              { number: 4, label: 'Documents', active: true, completed: true },
              { number: 5, label: 'Offers', active: true, completed: true },
              { number: 6, label: 'Documentation', active: true, completed: true },
              { number: 7, label: 'Disbursement', active: false }
            ].map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.completed ? 'bg-green-500 text-white' :
                  step.active ? 'bg-primary text-white' : 'bg-white border-2 border-gray-300 text-gray-500'
                }`}>
                  {step.completed ? '✓' : step.number}
                </div>
                <div className="ml-2 text-center">
                  <p className={`text-sm ${step.active || step.completed ? 'text-text-dark' : 'text-gray-500'}`}>
                    {step.label}
                  </p>
                </div>
                {index < 6 && (
                  <div className={`w-20 h-0.5 mx-2 ${
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
        {/* Success Banner */}
        <div className="bg-green-50 rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mr-6">
              <span className="text-white text-2xl font-bold">✓</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Application Successfully Submitted!
              </h2>
              <p className="text-text-dark">
                Your application is now under review. You can track its progress below.
              </p>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-dark">
            Application Status
          </h1>
        </div>

        {/* Application Reference */}
        <div className="bg-background-light rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <p className="text-text-light">Application ID:</p>
              <p className="font-bold text-text-dark">LAP25050789</p>
            </div>
            <div>
              <p className="text-text-light">Submission Date:</p>
              <p className="font-bold text-text-dark">10-May-2025</p>
            </div>
            <div>
              <p className="text-text-light">Status:</p>
              <p className="font-bold text-primary">In Progress</p>
            </div>
          </div>
        </div>

        {/* Application Timeline */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Application Timeline</h2>
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <div className="relative">
              {/* Timeline Track */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

              {/* Timeline Steps */}
              <div className="space-y-12">
                {/* Application Submitted */}
                <div className="relative pl-16">
                  <div className="absolute left-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-text-dark">Application Submitted</h3>
                      <p className="text-text-light">Your loan application has been successfully received.</p>
                    </div>
                    <p className="text-text-light">10-May-2025, 11:45 AM</p>
                  </div>
                </div>

                {/* Document Verification */}
                <div className="relative pl-16">
                  <div className="absolute left-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-text-dark">Document Verification</h3>
                      <p className="text-text-light">All submitted documents have been verified and approved.</p>
                    </div>
                    <p className="text-text-light">10-May-2025, 02:30 PM</p>
                  </div>
                </div>

                {/* Credit Assessment */}
                <div className="relative pl-16">
                  <div className="absolute left-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-text-dark">Credit Assessment</h3>
                      <p className="text-text-light">Our team is currently evaluating your credit profile and property valuation.</p>
                      <p className="text-text-light mt-1">Estimated completion: 12-May-2025</p>
                    </div>
                    <span className="text-orange-500 font-semibold">In Progress</span>
                  </div>
                </div>

                {/* Final Approval */}
                <div className="relative pl-16">
                  <div className="absolute left-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-500">Final Approval</h3>
                      <p className="text-gray-400">Final approval of your loan application by our loan committee.</p>
                      <p className="text-gray-400 mt-1">Estimated completion: 15-May-2025</p>
                    </div>
                    <span className="text-gray-500">Pending</span>
                  </div>
                </div>

                {/* Disbursement */}
                <div className="relative pl-16">
                  <div className="absolute left-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-500">Disbursement</h3>
                      <p className="text-gray-400">Loan amount will be disbursed to your designated account.</p>
                      <p className="text-gray-400 mt-1">Estimated completion: 20-May-2025</p>
                    </div>
                    <span className="text-gray-500">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Additional Information</h2>

          {/* Required Action */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-orange-600 mb-2">
                  Action Required: Legal Documentation
                </h3>
                <p className="text-text-dark">
                  You need to schedule a meeting with our legal team to complete documentation.
                </p>
              </div>
              <button
                className="btn-primary"
                onClick={handleScheduleMeeting}
              >
                Schedule Meeting
              </button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-background-light rounded-lg p-6">
            <h3 className="text-lg font-bold text-text-dark mb-4">Next Steps</h3>
            <ol className="list-decimal list-inside space-y-2 text-text-dark">
              <li>Complete the legal documentation process by attending the scheduled meeting</li>
              <li>Once approved, review and sign the final loan agreement for disbursement</li>
            </ol>
          </div>
        </section>

        {/* Contact Support */}
        <div className="bg-primary/5 rounded-lg p-6">
          <h3 className="text-lg font-bold text-primary mb-2">
            Need assistance with your application?
          </h3>
          <p className="text-text-dark">
            Contact your dedicated loan officer: Rahul Sharma | rahul.sharma@tide.com | +91 98765 43210
          </p>
        </div>
      </main>
    </div>
  );
} 