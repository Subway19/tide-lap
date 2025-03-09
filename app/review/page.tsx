'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Review() {
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  const handleSubmit = () => {
    if (!termsAccepted || !agreementAccepted) {
      alert('Please accept all terms and conditions before submitting');
      return;
    }
    // Handle application submission
    router.push('/verification-scheduling');
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
            Final Application Review
          </h1>
          <p className="text-lg text-text-light">
            Review your complete loan application details before final submission
          </p>
        </div>

        {/* Application Reference */}
        <div className="bg-background-light rounded-lg p-4 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-text-dark">
              Application Reference: LAP25050789
            </h2>
            <p className="text-text-light">
              Application Date: 08-May-2025
            </p>
          </div>
        </div>

        {/* Loan Details Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-4">Loan Details</h2>
          <div className="bg-background-light rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-text-light">Loan Amount:</p>
                <p className="font-bold text-text-dark">₹ 70,00,000</p>
              </div>
              <div>
                <p className="text-text-light">Interest Rate:</p>
                <p className="font-bold text-text-dark">10.5% p.a.</p>
              </div>
              <div>
                <p className="text-text-light">Loan Tenure:</p>
                <p className="font-bold text-text-dark">10 Years</p>
              </div>
              <div>
                <p className="text-text-light">Monthly EMI:</p>
                <p className="font-bold text-text-dark">₹ 92,578</p>
              </div>
              <div>
                <p className="text-text-light">Processing Fee:</p>
                <p className="font-bold text-text-dark">₹ 70,000 (1%)</p>
              </div>
              <div>
                <p className="text-text-light">Loan-to-Value Ratio:</p>
                <p className="font-bold text-text-dark">67%</p>
              </div>
              <div>
                <p className="text-text-light">Loan Purpose:</p>
                <p className="font-bold text-text-dark">Business Expansion</p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Details Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-4">Business Details</h2>
          <div className="bg-background-light rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-text-light">Business Name:</p>
                <p className="font-bold text-text-dark">ABC Enterprises Pvt. Ltd.</p>
              </div>
              <div>
                <p className="text-text-light">Business Type:</p>
                <p className="font-bold text-text-dark">Private Limited Company</p>
              </div>
              <div>
                <p className="text-text-light">Business Address:</p>
                <p className="font-bold text-text-dark">123 Business Park, Andheri East, Mumbai - 400069</p>
              </div>
              <div>
                <p className="text-text-light">Registration Number:</p>
                <p className="font-bold text-text-dark">U72900MH2015PTC123456</p>
              </div>
              <div>
                <p className="text-text-light">Years in Operation:</p>
                <p className="font-bold text-text-dark">7 Years</p>
              </div>
            </div>
          </div>
        </section>

        {/* Property Details Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-4">Property Details</h2>
          <div className="bg-background-light rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-text-light">Property Address:</p>
                <p className="font-bold text-text-dark">123 Main Street, Andheri West, Mumbai - 400053</p>
              </div>
              <div>
                <p className="text-text-light">Property Type:</p>
                <p className="font-bold text-text-dark">Commercial Office Space</p>
              </div>
              <div>
                <p className="text-text-light">Built-up Area:</p>
                <p className="font-bold text-text-dark">1,200 sq. ft.</p>
              </div>
              <div>
                <p className="text-text-light">Property Value:</p>
                <p className="font-bold text-text-dark">₹ 1,05,00,000</p>
              </div>
              <div>
                <p className="text-text-light">Ownership Type:</p>
                <p className="font-bold text-text-dark">Sole Ownership</p>
              </div>
            </div>
          </div>
        </section>

        {/* Document Status Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-4">Document Status</h2>
          <div className="bg-background-light rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-text-dark">Property Documents:</p>
                    <span className="text-green-500">Complete ✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-text-dark">Business Documents:</p>
                    <span className="text-green-500">Complete ✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-text-dark">Personal KYC:</p>
                    <span className="text-green-500">Complete ✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-text-dark">Legal Documentation:</p>
                    <span className="text-orange-500">In Progress</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-text-dark">Insurance:</p>
                    <span className="text-green-500">Selected ✓</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-text-dark">Technical Verification:</p>
                    <span className="text-green-500">Completed ✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-text-dark">Legal Verification:</p>
                    <span className="text-orange-500">Scheduled</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-text-dark">Final Approval:</p>
                    <span className="text-gray-500">Pending</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-text-dark">Documentation:</p>
                    <span className="text-gray-500">Pending</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-text-dark">Disbursement:</p>
                    <span className="text-gray-500">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Terms and Conditions */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-4">Terms and Conditions</h2>
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <p className="text-text-dark">
                  I have reviewed all the information and confirm that it is accurate and complete.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={agreementAccepted}
                  onChange={(e) => setAgreementAccepted(e.target.checked)}
                  className="mt-1 w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary"
                />
                <p className="text-text-dark">
                  I agree to the Loan Agreement, Mortgage Terms, and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Digital Signature */}
        <div className="flex space-x-6 mb-8">
          <button className="btn-primary flex-1">
            e-Sign Documents
          </button>
          <button className="btn-outline flex-1">
            Download Copy
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            className="btn-outline"
            onClick={() => router.back()}
          >
            ← Back
          </button>
          <div className="flex items-center space-x-6">
            <p className="text-text-light">
              Need assistance? Contact our loan expert at 1800-123-4567
            </p>
            <button
              className="btn-primary"
              onClick={handleSubmit}
            >
              Submit Application
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 