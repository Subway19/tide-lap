'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getApplicationIdFromUrl, loadSavedApplication, updateApplicationProgress } from '../utils/applicationUtils';

export default function Offers() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);

  useEffect(() => {
    const id = getApplicationIdFromUrl();
    setApplicationId(id);

    if (id) {
      const savedData = loadSavedApplication(id);
      if (savedData?.formData?.selectedOffer) {
        setSelectedOffer(savedData.formData.selectedOffer);
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

  const handleOfferSelect = (offerId: string) => {
    if (!applicationId) return;

    const offerDetails = {
      recommended: {
        type: 'Optimal Business Growth Plan',
        amount: 7000000,
        interestRate: 10.5,
        tenure: 10,
        emi: 92578,
        processingFee: 70000,
        ltvRatio: 67
      },
      'short-term': {
        type: 'Short-Term Advantage',
        amount: 5000000,
        interestRate: 10.0,
        tenure: 5,
        emi: 106066,
        processingFee: 50000,
        ltvRatio: 48
      },
      'long-term': {
        type: 'Long-Term Flexibility',
        amount: 7000000,
        interestRate: 11.0,
        tenure: 15,
        emi: 79833,
        processingFee: 70000,
        ltvRatio: 67
      }
    };

    setSelectedOffer(offerId);
    
    // Update application progress with selected offer details
    updateApplicationProgress(
      applicationId,
      'Personal Details',
      85,
      { 
        selectedOffer: {
          id: offerId,
          ...offerDetails[offerId as keyof typeof offerDetails]
        }
      }
    );

    // Navigate to personal details page
    router.push(`/personal-details?applicationId=${applicationId}`);
  };

  const handleCustomize = () => {
    // Handle offer customization
    console.log('Customize offer');
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
              { number: 6, label: 'Offers', active: true },
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
        {/* Success Message */}
        <div className="bg-green-50 rounded-lg p-6 mb-8 flex items-start">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mr-6">
            <span className="text-2xl text-white">✓</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Property Valuation Complete</h2>
            <p className="text-text-dark">
              Based on your property details and verification, we have prepared personalized loan offers for you.
            </p>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-dark mb-2">
            Your Personalized Loan Offers
          </h1>
          <p className="text-lg text-text-light">
            Select the loan option that best meets your business needs
          </p>
        </div>

        {/* Property Valuation Summary */}
        <div className="bg-background-light rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-bold text-text-dark">Final Property Valuation:</h3>
              <p className="text-2xl font-bold text-text-dark">{formatCurrency(10500000)}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-dark">Maximum Eligible Loan (70% LTV):</h3>
              <p className="text-2xl font-bold text-text-dark">{formatCurrency(7350000)}</p>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm text-text-light">
            <p>Property verification completed on May 8, 2025 | Valuation Report #VR78904</p>
            <button className="text-primary hover:text-primary-light">View Detailed Report</button>
          </div>
        </div>

        {/* Recommended Offer */}
        <div className="border-2 border-primary rounded-lg p-8 mb-12 relative">
          <div className="absolute -top-5 left-8 bg-primary text-white px-4 py-1 rounded-md text-sm font-bold">
            RECOMMENDED
          </div>
          
          <h2 className="text-2xl font-bold text-text-dark mb-6">Optimal Business Growth Plan</h2>
          
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-background-light p-4 rounded-lg">
              <p className="text-text-light mb-2">Loan Amount</p>
              <p className="text-xl font-bold text-text-dark">{formatCurrency(7000000)}</p>
            </div>
            <div className="bg-background-light p-4 rounded-lg">
              <p className="text-text-light mb-2">Interest Rate</p>
              <p className="text-xl font-bold text-text-dark">10.5% p.a.</p>
            </div>
            <div className="bg-background-light p-4 rounded-lg">
              <p className="text-text-light mb-2">Tenure</p>
              <p className="text-xl font-bold text-text-dark">10 Years</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-background-light p-4 rounded-lg">
              <p className="text-text-light mb-2">Monthly EMI</p>
              <p className="text-xl font-bold text-text-dark">{formatCurrency(92578)}</p>
            </div>
            <div className="bg-background-light p-4 rounded-lg">
              <p className="text-text-light mb-2">Processing Fee</p>
              <p className="text-xl font-bold text-text-dark">{formatCurrency(70000)} (1%)</p>
            </div>
            <div className="bg-background-light p-4 rounded-lg">
              <p className="text-text-light mb-2">Loan-to-Value Ratio</p>
              <p className="text-xl font-bold text-text-dark">67%</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button
              className="btn-primary"
              onClick={() => handleOfferSelect('recommended')}
            >
              Select This Offer
            </button>
            <button
              className="text-primary hover:text-primary-light"
              onClick={handleCustomize}
            >
              Customize This Offer
            </button>
          </div>
        </div>

        {/* Alternative Offers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Alternative Offers</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Short-Term Advantage */}
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-4">Short-Term Advantage</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-text-light mb-1">Loan Amount</p>
                  <p className="text-lg font-bold text-text-dark">{formatCurrency(5000000)}</p>
                </div>
                <div>
                  <p className="text-text-light mb-1">Interest Rate</p>
                  <p className="text-lg font-bold text-text-dark">10.0% p.a.</p>
                </div>
                <div>
                  <p className="text-text-light mb-1">Tenure</p>
                  <p className="text-lg font-bold text-text-dark">5 Years</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-text-light mb-1">Monthly EMI</p>
                  <p className="text-lg font-bold text-text-dark">{formatCurrency(106066)}</p>
                </div>
                <div>
                  <p className="text-text-light mb-1">Processing Fee</p>
                  <p className="text-lg font-bold text-text-dark">{formatCurrency(50000)} (1%)</p>
                </div>
                <div>
                  <p className="text-text-light mb-1">LTV Ratio</p>
                  <p className="text-lg font-bold text-text-dark">48%</p>
                </div>
              </div>

              <button
                className="btn-outline w-full"
                onClick={() => handleOfferSelect('short-term')}
              >
                Select Offer
              </button>
            </div>

            {/* Long-Term Flexibility */}
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="text-xl font-bold text-text-dark mb-4">Long-Term Flexibility</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-text-light mb-1">Loan Amount</p>
                  <p className="text-lg font-bold text-text-dark">{formatCurrency(7000000)}</p>
                </div>
                <div>
                  <p className="text-text-light mb-1">Interest Rate</p>
                  <p className="text-lg font-bold text-text-dark">11.0% p.a.</p>
                </div>
                <div>
                  <p className="text-text-light mb-1">Tenure</p>
                  <p className="text-lg font-bold text-text-dark">15 Years</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-text-light mb-1">Monthly EMI</p>
                  <p className="text-lg font-bold text-text-dark">{formatCurrency(78914)}</p>
                </div>
                <div>
                  <p className="text-text-light mb-1">Processing Fee</p>
                  <p className="text-lg font-bold text-text-dark">{formatCurrency(70000)} (1%)</p>
                </div>
                <div>
                  <p className="text-text-light mb-1">LTV Ratio</p>
                  <p className="text-lg font-bold text-text-dark">67%</p>
                </div>
              </div>

              <button
                className="btn-outline w-full"
                onClick={() => handleOfferSelect('long-term')}
              >
                Select Offer
              </button>
            </div>
          </div>
        </div>

        {/* LAP-Specific Terms */}
        <div className="bg-background-light rounded-lg p-6">
          <h3 className="text-lg font-bold text-text-dark mb-4">LAP-Specific Terms</h3>
          <div className="flex justify-between text-text-light">
            <div>
              <p>• Property insurance required</p>
              <p>• Property charge creation process will be initiated after offer acceptance</p>
            </div>
            <div>
              <p>• Flexible prepayment terms</p>
              <p>• View full terms and conditions</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 