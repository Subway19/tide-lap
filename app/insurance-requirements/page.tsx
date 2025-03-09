'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InsuranceRequirements() {
  const router = useRouter();
  const [selectedCoverage, setSelectedCoverage] = useState<'basic' | 'comprehensive' | 'premium'>('comprehensive');
  const [paymentOption, setPaymentOption] = useState<'pay-now' | 'add-to-loan' | 'pay-later'>('pay-now');

  const handleCoverageSelect = (coverage: 'basic' | 'comprehensive' | 'premium') => {
    setSelectedCoverage(coverage);
  };

  const handlePaymentOptionSelect = (option: 'pay-now' | 'add-to-loan' | 'pay-later') => {
    setPaymentOption(option);
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
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-dark mb-2">
            Insurance Requirements
          </h1>
          <p className="text-lg text-text-light">
            Select property insurance options to protect your property during the loan period
          </p>
        </div>

        {/* Documentation Tabs */}
        <div className="bg-background-light rounded-lg p-2 mb-8">
          <div className="flex space-x-4">
            <button className="text-text-light px-8 py-3 rounded-md hover:bg-white">
              Personal Details
            </button>
            <button className="text-text-light px-8 py-3 rounded-md hover:bg-white">
              Legal Documentation
            </button>
            <button className="bg-primary text-white px-8 py-3 rounded-md font-semibold">
              Insurance Requirements
            </button>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="bg-background-light rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-text-dark mb-4">Why Property Insurance is Required</h2>
          <ul className="space-y-2 text-text-light">
            <li>• Protects your property against damage from fire, natural disasters, and other risks</li>
            <li>• Ensures the security of your collateral throughout the loan tenure</li>
            <li>• Required for all property-backed loans as per banking regulations</li>
          </ul>
        </div>

        {/* Property Details Summary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Property Insurance</h2>
          
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-text-dark mb-2">Property Address:</p>
                <p className="text-text-light">123 Main Street, Andheri West, Mumbai - 400053</p>
              </div>
              <div>
                <p className="font-semibold text-text-dark mb-2">Property Value:</p>
                <p className="text-text-light">₹ 1,05,00,000</p>
              </div>
              <div>
                <p className="font-semibold text-text-dark mb-2">Property Type:</p>
                <p className="text-text-light">Commercial Office Space</p>
              </div>
              <div>
                <p className="font-semibold text-text-dark mb-2">Built-up Area:</p>
                <p className="text-text-light">1,200 sq. ft.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Insurance Options */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Select Insurance Coverage</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Basic Coverage */}
            <div className={`border rounded-lg overflow-hidden ${
              selectedCoverage === 'basic' ? 'border-primary' : 'border-gray-300'
            }`}>
              <div className="bg-background-light p-4">
                <h3 className="text-lg font-bold text-text-dark">Basic Coverage</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-text-light">Coverage Amount:</p>
                    <p className="font-bold text-text-dark">₹ 80,00,000</p>
                  </div>
                  <div>
                    <p className="text-text-light">Annual Premium:</p>
                    <p className="font-bold text-text-dark">₹ 16,000</p>
                  </div>
                  <div>
                    <p className="text-text-light">Tenure:</p>
                    <p className="text-text-dark">1 Year (Renewable)</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="font-semibold text-text-dark mb-2">Covers:</p>
                  <ul className="space-y-2 text-text-light">
                    <li>• Fire and allied perils</li>
                    <li>• Natural disasters</li>
                    <li>• Basic structural damage</li>
                  </ul>
                </div>

                <button
                  className={`w-full py-2 px-4 rounded-full ${
                    selectedCoverage === 'basic'
                      ? 'bg-primary text-white'
                      : 'border-2 border-primary text-primary'
                  }`}
                  onClick={() => handleCoverageSelect('basic')}
                >
                  Select
                </button>
              </div>
            </div>

            {/* Comprehensive Coverage */}
            <div className={`border rounded-lg overflow-hidden ${
              selectedCoverage === 'comprehensive' ? 'border-primary bg-primary/5' : 'border-gray-300'
            }`}>
              <div className="bg-primary p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Comprehensive Coverage</h3>
                  <span className="bg-white text-primary text-xs font-bold px-2 py-1 rounded">
                    RECOMMENDED
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-text-light">Coverage Amount:</p>
                    <p className="font-bold text-text-dark">₹ 1,05,00,000</p>
                  </div>
                  <div>
                    <p className="text-text-light">Annual Premium:</p>
                    <p className="font-bold text-text-dark">₹ 26,250</p>
                  </div>
                  <div>
                    <p className="text-text-light">Tenure:</p>
                    <p className="text-text-dark">1 Year (Renewable)</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="font-semibold text-text-dark mb-2">Covers:</p>
                  <ul className="space-y-2 text-text-light">
                    <li>• All basic coverage items</li>
                    <li>• Theft and burglary</li>
                    <li>• Third-party liability</li>
                    <li>• Additional fixtures and fittings</li>
                  </ul>
                </div>

                <button
                  className={`w-full py-2 px-4 rounded-full ${
                    selectedCoverage === 'comprehensive'
                      ? 'bg-primary text-white'
                      : 'border-2 border-primary text-primary'
                  }`}
                  onClick={() => handleCoverageSelect('comprehensive')}
                >
                  Select
                </button>
              </div>
            </div>

            {/* Premium Coverage */}
            <div className={`border rounded-lg overflow-hidden ${
              selectedCoverage === 'premium' ? 'border-primary' : 'border-gray-300'
            }`}>
              <div className="bg-background-light p-4">
                <h3 className="text-lg font-bold text-text-dark">Premium Coverage</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-text-light">Coverage Amount:</p>
                    <p className="font-bold text-text-dark">₹ 1,25,00,000</p>
                  </div>
                  <div>
                    <p className="text-text-light">Annual Premium:</p>
                    <p className="font-bold text-text-dark">₹ 37,500</p>
                  </div>
                  <div>
                    <p className="text-text-light">Tenure:</p>
                    <p className="text-text-dark">1 Year (Renewable)</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="font-semibold text-text-dark mb-2">Covers:</p>
                  <ul className="space-y-2 text-text-light">
                    <li>• All comprehensive coverage items</li>
                    <li>• Business interruption cover</li>
                    <li>• Electronic equipment protection</li>
                    <li>• Higher liability limits</li>
                  </ul>
                </div>

                <button
                  className={`w-full py-2 px-4 rounded-full ${
                    selectedCoverage === 'premium'
                      ? 'bg-primary text-white'
                      : 'border-2 border-primary text-primary'
                  }`}
                  onClick={() => handleCoverageSelect('premium')}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Payment Options</h2>
          
          <div className="flex space-x-8">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentOption"
                value="pay-now"
                checked={paymentOption === 'pay-now'}
                onChange={() => handlePaymentOptionSelect('pay-now')}
                className="w-5 h-5 text-primary"
              />
              <span className="text-text-dark">
                Pay now <span className="text-green-500">(Get 5% discount on premium)</span>
              </span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentOption"
                value="add-to-loan"
                checked={paymentOption === 'add-to-loan'}
                onChange={() => handlePaymentOptionSelect('add-to-loan')}
                className="w-5 h-5 text-primary"
              />
              <span className="text-text-dark">Add to loan amount</span>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentOption"
                value="pay-later"
                checked={paymentOption === 'pay-later'}
                onChange={() => handlePaymentOptionSelect('pay-later')}
                className="w-5 h-5 text-primary"
              />
              <span className="text-text-dark">Pay later (Before disbursement)</span>
            </label>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-6">
          <button
            className="btn-outline flex-1"
            onClick={() => router.back()}
          >
            ← Back
          </button>
          <button
            className="btn-primary flex-1"
            onClick={() => router.push('/review')}
          >
            Continue to Review →
          </button>
        </div>
      </main>
    </div>
  );
} 