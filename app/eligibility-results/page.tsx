'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApplicationStore } from '../store/applicationStore';
import { getApplicationIdFromUrl, loadSavedApplication } from '../utils/applicationUtils';

export default function EligibilityResults() {
  const router = useRouter();
  const { updateDraft } = useApplicationStore();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [applicationData, setApplicationData] = useState<any>(null);

  useEffect(() => {
    const id = getApplicationIdFromUrl();
    setApplicationId(id);

    if (id) {
      const data = loadSavedApplication(id);
      if (data) {
        setApplicationData(data);
      }
    }
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSaveResults = () => {
    if (applicationId && applicationData) {
      const currentDate = new Date();
      updateDraft(applicationId, {
        status: {
          stage: 'Eligibility Results',
          percentage: 25
        },
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
        }
      });
      router.push('/application-drafts');
    }
  };

  const handleBeginApplication = () => {
    if (applicationId && applicationData) {
      const currentDate = new Date();
      updateDraft(applicationId, {
        status: {
          stage: 'Business Profile',
          percentage: 30
        },
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
        }
      });
      router.push(`/business-profile?applicationId=${applicationId}`);
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
        {/* Success Message */}
        <div className="bg-green-50 rounded-lg p-6 mb-8 flex items-start">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
            ✓
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Good News! You're Eligible for a Loan Against Property
            </h2>
            <p className="text-text-dark">
              Based on the information provided, your business and property qualify for our Loan Against Property product.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="col-span-2 space-y-8">
            {/* Property Valuation Section */}
            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-text-dark mb-6">Property Valuation</h2>
              
              <div className="bg-background-light rounded-lg p-6">
                <p className="text-text-light mb-2">Estimated Property Value</p>
                <p className="text-2xl font-bold text-text-dark mb-2">
                  {formatCurrency(10000000)} - {formatCurrency(12000000)}
                </p>
                <p className="text-sm text-text-light italic">
                  Subject to physical verification and legal assessment
                </p>
              </div>
            </div>

            {/* Loan Options Section */}
            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-text-dark mb-6">Loan Options</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-text-dark font-semibold mb-2">
                    Eligible Loan Amount (up to 70% of property value)
                  </p>
                  <p className="text-xl text-primary">
                    {formatCurrency(7000000)} - {formatCurrency(8400000)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-text-dark font-semibold mb-2">Interest Rate Range</p>
                    <p className="text-xl text-primary">10.5% - 12.5% p.a.</p>
                  </div>
                  <div>
                    <p className="text-text-dark font-semibold mb-2">Processing Fee</p>
                    <p className="text-xl text-primary">1% of loan amount</p>
                  </div>
                </div>

                <div>
                  <p className="text-text-dark font-semibold mb-4">Available Tenure Options</p>
                  <div className="flex space-x-4">
                    {[5, 10, 15].map((years) => (
                      <button
                        key={years}
                        className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-light"
                      >
                        {years} years
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Required Documents Section */}
            <div className="bg-white border border-gray-300 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-text-dark mb-6">Required Documents</h2>
              
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  Business PAN and Registration Documents
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  Property Title Deed and Chain of Documents
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  Property Tax Receipts (last 3 years)
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  Bank Statements (last 6 months)
                </li>
                <li className="flex items-center">
                  <span className="text-primary mr-2">•</span>
                  Personal and Business KYC Documents
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Next Steps Card */}
            <div className="bg-background-light rounded-lg p-6">
              <h2 className="text-xl font-bold text-text-dark mb-6">Next Steps</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-text-dark mb-1">1. Complete Business Profile</p>
                  <p className="text-sm text-text-light">
                    Share detailed business information to help us understand your financial needs.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-text-dark mb-1">2. Submit Property Details</p>
                  <p className="text-sm text-text-light">
                    Provide comprehensive property information for accurate valuation.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-text-dark mb-1">3. Property Verification</p>
                  <p className="text-sm text-text-light">
                    Our team will schedule a visit to verify your property details.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-text-dark mb-1">4. Select Your Offer</p>
                  <p className="text-sm text-text-light">
                    Choose from personalized loan offers based on your verified details.
                  </p>
                </div>
                <p className="text-sm text-text-light italic">
                  Once you begin the application, our team will guide you through each step.
                </p>
              </div>
            </div>

            {/* Speak to Advisor Card */}
            <div className="bg-indigo-50 border border-primary rounded-lg p-6">
              <h2 className="text-lg font-bold text-text-dark mb-2">Need Help?</h2>
              <p className="text-sm text-text-light mb-4">
                Speak with our property loan expert for personalized guidance.
              </p>
              <button className="w-full border-2 border-primary text-primary px-6 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors">
                Schedule a Call →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="flex space-x-6 mt-8">
          <button 
            className="btn-primary flex-1"
            onClick={handleBeginApplication}
          >
            Begin Application
          </button>
          <button 
            className="btn-outline flex-1"
            onClick={handleSaveResults}
          >
            Save Results
          </button>
        </div>
      </main>
    </div>
  );
} 