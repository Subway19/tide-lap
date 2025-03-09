'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LegalCompletion() {
  const router = useRouter();

  const handleProceedToDisbursement = () => {
    router.push('/disbursement');
  };

  const handleDownloadReceipts = () => {
    // Handle receipt download logic
    console.log('Downloading receipts...');
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
                Legal Process Completed!
              </h2>
              <p className="text-text-dark">
                All legal requirements for your Loan Against Property have been completed successfully.
              </p>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-dark mb-2">
            Legal Completion Confirmation
          </h1>
          <p className="text-lg text-text-light">
            Application ID: LAP25050789
          </p>
        </div>

        {/* Legal Requirements Status */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Legal Requirements Status</h2>
          <div className="bg-background-light rounded-lg p-6">
            <div className="space-y-6">
              {/* Mortgage Deed Execution */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-dark">Mortgage Deed Execution</h3>
                  </div>
                </div>
                <p className="text-text-light">Completed on: 17-May-2025</p>
              </div>

              {/* Property Registration */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-dark">Property Registration</h3>
                  </div>
                </div>
                <p className="text-text-light">Completed on: 18-May-2025</p>
              </div>

              {/* Stamp Duty Payment */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-dark">Stamp Duty Payment</h3>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-text-light">Completed on: 18-May-2025</p>
                  <p className="text-text-light">Receipt #SD7865432</p>
                </div>
              </div>

              {/* Original Document Submission */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-dark">Original Document Submission</h3>
                  </div>
                </div>
                <p className="text-text-light">Completed on: 19-May-2025</p>
              </div>

              {/* Insurance Policy Activation */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-dark">Insurance Policy Activation</h3>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-text-light">Completed on: 19-May-2025</p>
                  <p className="text-text-light">Policy #INS4567890</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Property & Loan Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Property & Loan Summary</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Property Information */}
            <div className="bg-background-light rounded-lg p-6">
              <div className="space-y-6">
                <div>
                  <p className="font-bold text-text-dark mb-2">Property Address:</p>
                  <p className="text-text-dark">123 Main Street, Andheri West</p>
                  <p className="text-text-dark">Mumbai - 400053</p>
                </div>
                <div>
                  <p className="font-bold text-text-dark mb-2">Registration Number:</p>
                  <p className="text-text-dark">REG78569023</p>
                </div>
                <div>
                  <p className="font-bold text-text-dark mb-2">Property Charge:</p>
                  <p className="text-text-dark">First Charge</p>
                </div>
              </div>
            </div>

            {/* Loan Information */}
            <div className="bg-background-light rounded-lg p-6">
              <div className="space-y-6">
                <div>
                  <p className="font-bold text-text-dark mb-2">Loan Amount:</p>
                  <p className="text-text-dark">₹ 70,00,000</p>
                </div>
                <div>
                  <p className="font-bold text-text-dark mb-2">Tenure:</p>
                  <p className="text-text-dark">10 Years</p>
                </div>
                <div>
                  <p className="font-bold text-text-dark mb-2">Interest Rate:</p>
                  <p className="text-text-dark">10.5% p.a.</p>
                </div>
                <div>
                  <p className="font-bold text-text-dark mb-2">Monthly EMI:</p>
                  <p className="text-text-dark">₹ 92,578</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Note */}
        <div className="bg-primary/5 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-primary mb-2">Important Note:</h3>
          <p className="text-text-dark">
            Original property documents will be held securely by Tide until the loan is fully repaid. 
            A detailed receipt of all documents in our custody has been emailed to you. 
            These documents will be returned upon full repayment of the loan.
          </p>
        </div>

        {/* Next Steps */}
        <div className="bg-background-light rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-text-dark mb-2">Next Step: Loan Disbursement</h3>
              <p className="text-text-light">
                Your loan amount will be disbursed to your account within 1-2 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-6">
          <button
            className="btn-primary flex-1"
            onClick={handleProceedToDisbursement}
          >
            Proceed to Disbursement
          </button>
          <button
            className="btn-outline flex-1"
            onClick={handleDownloadReceipts}
          >
            Download Receipts
          </button>
        </div>
      </main>
    </div>
  );
} 