'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getApplicationIdFromUrl, loadSavedApplication, updateApplicationProgress } from '../utils/applicationUtils';

export default function Disbursement() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState('tide');
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: ''
  });

  useEffect(() => {
    const id = getApplicationIdFromUrl();
    setApplicationId(id);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCompleteDisbursement = () => {
    if (!applicationId) return;

    // Update application progress
    updateApplicationProgress(
      applicationId,
      'Completed',
      100,
      { 
        disbursement: {
          completedAt: new Date().toISOString(),
          status: 'completed',
          selectedOption,
          bankDetails
        }
      }
    );

    // Navigate to disbursement success page
    router.push(`/disbursement-success?applicationId=${applicationId}`);
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
              { number: 7, label: 'Disbursement', active: true }
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
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-dark mb-2">
            Loan Disbursement
          </h1>
          <p className="text-lg text-text-light">
            Select your disbursement preferences and confirm details
          </p>
        </div>

        {/* Loan Approval Banner */}
        <div className="bg-green-50 rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mr-6">
              <span className="text-white text-2xl font-bold">✓</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                Loan Approved!
              </h2>
              <p className="text-text-dark mb-2">
                Your Loan Against Property for ₹ 70,00,000 has been approved. Please review and confirm the disbursement details below.
              </p>
              <p className="text-text-dark">
                Application ID: LAP25050789 | Approval Date: 19-May-2025
              </p>
            </div>
          </div>
        </div>

        {/* Disbursement Options */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Disbursement Options</h2>

          {/* Tide Account Option */}
          <div className={`rounded-lg p-6 mb-6 ${
            selectedOption === 'tide' 
              ? 'bg-primary/5 border-2 border-primary' 
              : 'bg-background-light border border-gray-300'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedOption === 'tide' ? 'bg-primary' : 'bg-white border-2 border-gray-300'
                }`}>
                  {selectedOption === 'tide' && (
                    <span className="text-white font-bold">✓</span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-dark">Tide Business Account</h3>
                  <p className="text-text-light">Instant disbursement to your linked Tide account</p>
                  <p className="text-text-light mt-1">Account: XXXX XXXX 5678 | TIDE456987</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-primary text-white px-3 py-1 rounded text-sm font-semibold">FASTEST</span>
                <span className="text-text-light">~2 Hours</span>
              </div>
            </div>
          </div>

          {/* External Account Option */}
          <div className={`rounded-lg p-6 ${
            selectedOption === 'external' 
              ? 'bg-primary/5 border-2 border-primary' 
              : 'bg-background-light border border-gray-300'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedOption === 'external' ? 'bg-primary' : 'bg-white border-2 border-gray-300'
                }`}>
                  {selectedOption === 'external' && (
                    <span className="text-white font-bold">✓</span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-dark">External Bank Account</h3>
                  <p className="text-text-light">Transfer to another bank account</p>
                </div>
              </div>
              <span className="text-text-light">1-2 Business Days</span>
            </div>

            {/* Bank Account Details Form */}
            {selectedOption === 'external' && (
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-text-dark mb-2">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={bankDetails.accountHolderName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter account holder name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-dark mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={bankDetails.bankName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter bank name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-dark mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={bankDetails.accountNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter account number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-text-dark mb-2">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={bankDetails.ifscCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter IFSC code"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Repayment Method */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Repayment Method</h2>
          <div className="bg-background-light rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <p className="text-text-dark">
                I authorize Tide to set up auto-debit from my account for monthly EMI payments of ₹ 92,578.
              </p>
            </div>
          </div>
        </section>

        {/* Repayment Schedule */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-text-dark mb-4">Repayment Schedule</h2>
          <div className="bg-background-light rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-text-dark">First EMI Due Date:</p>
                <p className="text-text-dark">20-Jun-2025</p>
              </div>
              <div>
                <p className="font-bold text-text-dark">Monthly EMI Amount:</p>
                <p className="text-text-dark">₹ 92,578</p>
              </div>
              <button className="text-primary font-semibold hover:underline">
                View Full Schedule
              </button>
            </div>
          </div>
        </section>

        {/* Disbursement Action */}
        <div className="flex items-center justify-between">
          <button
            className="btn-primary"
            onClick={handleCompleteDisbursement}
          >
            Complete Disbursement
          </button>
          <div className="bg-background-light rounded-lg px-6 py-3">
            <p className="text-text-dark">
              Expected disbursement timeline: 20-May-2025 | Funds available by: 2:00 PM
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 