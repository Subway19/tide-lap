'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Calculator() {
  const router = useRouter();
  const [propertyValue, setPropertyValue] = useState(10000000);
  const [loanAmount, setLoanAmount] = useState(7000000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [tenure, setTenure] = useState(5);

  const calculateEMI = () => {
    const P = loanAmount;
    const R = interestRate / 12 / 100;
    const N = tenure * 12;
    const EMI = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalInterest = (EMI * N) - P;
    const processingFee = P * 0.01;
    const totalAmount = P + totalInterest + processingFee;

    return {
      emi: Math.round(EMI),
      totalInterest: Math.round(totalInterest),
      processingFee: Math.round(processingFee),
      totalAmount: Math.round(totalAmount)
    };
  };

  const results = calculateEMI();

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
            <Link href="/application-drafts" className="text-white hover:text-gray-200 flex items-center">
              <span>My Applications</span>
              <span className="ml-2 bg-primary-light text-xs px-2 py-0.5 rounded-full">4</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            <a href="#" className="text-white hover:text-gray-200">Login</a>
            <button className="bg-primary-light text-white px-6 py-2 rounded-full font-semibold hover:bg-[#8855bb]">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div>
          <h1 className="text-3xl font-bold text-text-dark mb-4">
            Loan Against Property Calculator
          </h1>
          <p className="text-lg text-text-light">
            Estimate your loan amount, EMI, and tenure based on your property value
          </p>
        </div>

        {/* Calculator Widget */}
        <div className="bg-background-light rounded-lg p-8 mt-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Inputs */}
            <div className="space-y-8">
              {/* Property Value */}
              <div>
                <h2 className="text-xl font-bold text-text-dark mb-4">Property Value</h2>
                <div className="bg-white border border-gray-300 rounded-md p-4">
                  <span className="text-text-dark">₹</span>
                  <input
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="text-text-dark text-lg ml-2 w-full outline-none"
                  />
                </div>
              </div>

              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-text-dark">Loan Amount</h2>
                  <span className="text-text-light">LTV: 70%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={propertyValue * 0.7}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
                <div className="bg-white border border-gray-300 rounded-md p-4 mt-2">
                  <span className="text-text-dark">₹</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="text-text-dark text-lg ml-2 w-full outline-none"
                  />
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <h2 className="text-xl font-bold text-text-dark mb-4">Interest Rate</h2>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
                <div className="bg-white border border-gray-300 rounded-md p-4 mt-2">
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="text-text-dark text-lg w-full outline-none"
                  />
                  <span className="text-text-dark">%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <h2 className="text-xl font-bold text-text-dark mb-4">Loan Tenure</h2>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15].map((year) => (
                    <button
                      key={year}
                      onClick={() => setTenure(Number(year))}
                      className={`p-3 rounded-md ${
                        tenure === year
                          ? 'bg-primary text-white'
                          : 'bg-white border border-gray-300 text-text-dark'
                      }`}
                    >
                      {year} Years
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="bg-white border-2 border-primary rounded-lg p-8">
              <h2 className="text-2xl font-bold text-text-dark mb-8">Your Loan Summary</h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-text-light">Monthly EMI</p>
                  <p className="text-2xl font-bold text-text-dark">{formatCurrency(results.emi)}</p>
                </div>

                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-text-light">Principal Amount</span>
                    <span className="text-text-dark">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-light">Total Interest</span>
                    <span className="text-text-dark">{formatCurrency(results.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-light">Processing Fee (1%)</span>
                    <span className="text-text-dark">{formatCurrency(results.processingFee)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between">
                    <span className="text-text-light font-bold">Total Amount Payable</span>
                    <span className="text-text-dark font-bold">{formatCurrency(results.totalAmount)}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => router.push('/eligibility')}
                className="w-full btn-primary mt-8"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 