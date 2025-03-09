'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getApplicationIdFromUrl, loadSavedApplication, updateApplicationProgress } from '../utils/applicationUtils';

export default function DisbursementSuccess() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState<string | null>(null);

  useEffect(() => {
    const id = getApplicationIdFromUrl();
    setApplicationId(id);
  }, []);

  const handleGoToDashboard = () => {
    if (!applicationId) return;

    // Update application progress
    updateApplicationProgress(
      applicationId,
      'Completed',
      100,
      { 
        finalStatus: {
          completedAt: new Date().toISOString(),
          status: 'completed'
        }
      }
    );

    // Navigate to application drafts page
    router.push('/application-drafts');
  };

  const handleDownloadDocuments = () => {
    // Handle document download logic
    console.log('Downloading documents...');
  };

  const handleViewSchedule = () => {
    // Handle schedule view logic
    console.log('Viewing schedule...');
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

      {/* Journey Complete Indicator */}
      <div className="bg-background-light py-4">
        <div className="container mx-auto px-6">
          <p className="text-center text-xl font-bold text-green-500">
            LOAN JOURNEY COMPLETED
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Success Banner */}
        <div className="bg-green-50 rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mr-6">
              <span className="text-white text-3xl font-bold">✓</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">
                Congratulations!
              </h2>
              <p className="text-xl text-text-dark mb-2">
                Your loan amount of ₹ 70,00,000 has been successfully disbursed to your account.
              </p>
              <p className="text-text-dark">
                Transaction Reference: TR78945623 | Disbursement Date: 20-May-2025
              </p>
            </div>
          </div>
        </div>

        {/* Disbursement Details & Loan Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Disbursement Details */}
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Disbursement Details</h2>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-text-dark">Account Credited:</p>
                <p className="text-text-dark">XXXX XXXX 5678 (Tide Business Account)</p>
              </div>
              <div>
                <p className="font-bold text-text-dark">Amount:</p>
                <p className="text-text-dark">₹ 70,00,000</p>
              </div>
              <div>
                <p className="font-bold text-text-dark">Processing Fee:</p>
                <p className="text-text-dark">₹ 70,000 (Already deducted)</p>
              </div>
              <div>
                <p className="font-bold text-text-dark">Net Amount:</p>
                <p className="text-text-dark">₹ 69,30,000</p>
              </div>
              <div>
                <p className="font-bold text-text-dark">Fund Availability:</p>
                <p className="text-green-500">Immediate</p>
              </div>
            </div>
          </div>

          {/* Loan Summary */}
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Loan Summary</h2>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-text-dark">Loan Amount:</p>
                <p className="text-text-dark">₹ 70,00,000</p>
              </div>
              <div>
                <p className="font-bold text-text-dark">Interest Rate:</p>
                <p className="text-text-dark">10.5% p.a.</p>
              </div>
              <div>
                <p className="font-bold text-text-dark">Tenure:</p>
                <p className="text-text-dark">10 Years</p>
              </div>
              <div>
                <p className="font-bold text-text-dark">EMI Amount:</p>
                <p className="text-text-dark">₹ 92,578</p>
              </div>
              <div>
                <p className="font-bold text-text-dark">First EMI Date:</p>
                <p className="text-text-dark">20-Jun-2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Management Dashboard */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Loan Management Dashboard</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {/* Dashboard Preview Cards */}
            <div className="bg-white border border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-bold text-text-dark mb-4 text-center">Loan Overview</h3>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="bg-white border border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-bold text-text-dark mb-4 text-center">Repayment Schedule</h3>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="bg-white border border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-bold text-text-dark mb-4 text-center">Payment History</h3>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="bg-white border border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-bold text-text-dark mb-4 text-center">Documents</h3>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Reminders */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-text-dark mb-6">Important Reminders</h2>
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-text-dark mb-4">Property Insurance Renewal</h3>
                <ul className="space-y-2 text-text-light">
                  <li>• Your property insurance policy needs to be renewed annually to maintain loan compliance</li>
                  <li>• Next renewal date: 19-May-2026</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-dark mb-4">Property Maintenance Obligations</h3>
                <ul className="space-y-2 text-text-light">
                  <li>• Maintain the property in good condition throughout the loan period</li>
                  <li>• Notify Tide of any significant changes or damages to the property</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-dark mb-4">Restrictions During Loan Period</h3>
                <ul className="space-y-2 text-text-light">
                  <li>• Property cannot be sold or transferred without prior written approval from Tide</li>
                  <li>• Additional loans against the same property require Tide's consent</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-dark mb-4">Pre-Payment Terms</h3>
                <ul className="space-y-2 text-text-light">
                  <li>• You can pre-pay up to 25% of the loan amount each year without penalty</li>
                  <li>• Full pre-payment available after 24 months with minimal charges</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Support Contact */}
        <div className="bg-primary/5 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-primary mb-2">
            Need Assistance with Your Loan?
          </h3>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <p className="text-text-dark">
              Your dedicated loan relationship manager: Rahul Sharma | rahul.sharma@tide.com | +91 98765 43210
            </p>
            <p className="text-text-dark">
              Loan Support: 1800-123-4567 (Mon-Sat, 9AM-6PM)
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-6">
          <button
            className="btn-primary flex-1"
            onClick={handleGoToDashboard}
          >
            Go to Loan Dashboard
          </button>
          <button
            className="btn-outline flex-1"
            onClick={handleDownloadDocuments}
          >
            Download Documents
          </button>
          <button
            className="btn-outline flex-1"
            onClick={handleViewSchedule}
          >
            View Repayment Schedule
          </button>
        </div>
      </main>
    </div>
  );
} 