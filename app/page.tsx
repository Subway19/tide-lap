'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApplicationStore } from './store/applicationStore';

export default function Home() {
  const router = useRouter();
  const applicationDrafts = useApplicationStore((state) => state.applicationDrafts);

  const handleApplyNow = (loanType: string) => {
    if (loanType === 'Loan Against Property') {
      router.push('/calculator');
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
            <Link href="/application-drafts" className="text-white hover:text-gray-200 flex items-center">
              <span>My Applications</span>
              {applicationDrafts.length > 0 && (
                <span className="ml-2 bg-primary-light text-xs px-2 py-0.5 rounded-full">{applicationDrafts.length}</span>
              )}
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

      {/* Hero Section */}
      <section className="bg-background-light py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-text-dark mb-4">
                Business Financing Solutions
              </h2>
              <p className="text-2xl text-text-light mb-8">
                Find the right funding option for your business needs
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-lg text-text-dark">
                  • Tailored business loan products with competitive rates
                </li>
                <li className="flex items-center text-lg text-text-dark">
                  • Quick application process with minimal documentation
                </li>
                <li className="flex items-center text-lg text-text-dark">
                  • Dedicated relationship manager for personalized support
                </li>
              </ul>
            </div>
            <div className="bg-gray-300 rounded-lg h-[280px] flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop" 
                alt="Business Finance" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-dark mb-4">Our Loan Products</h2>
            <p className="text-lg text-text-light">Select a loan product to explore your options</p>
          </div>

          {/* First Row of Products */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Loan Against Property */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-background-light p-8 text-center">
                <span className="text-2xl mb-4 block">🏢</span>
                <h3 className="text-2xl font-bold text-primary mb-2">Loan Against Property</h3>
                <p className="text-text-light">Unlock the value of your property</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="text-text-dark">• Up to 70% of property value</li>
                  <li className="text-text-dark">• Loan amount: ₹25L to ₹5Cr</li>
                  <li className="text-text-dark">• Tenure: Up to 15 years</li>
                  <li className="text-text-dark">• Interest rates from 10.5% p.a.</li>
                  <li className="text-text-dark">• Minimal documentation</li>
                </ul>
                <button 
                  className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-light transition-colors"
                  onClick={() => handleApplyNow('Loan Against Property')}
                >
                  Apply Now
                </button>
              </div>
            </div>

            {/* Business Loan */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-background-light p-8 text-center">
                <span className="text-2xl mb-4 block">💼</span>
                <h3 className="text-2xl font-bold text-primary mb-2">Business Loan</h3>
                <p className="text-text-light">Quick funds for business growth</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="text-text-dark">• Unsecured business financing</li>
                  <li className="text-text-dark">• Loan amount: ₹5L to ₹75L</li>
                  <li className="text-text-dark">• Tenure: Up to 5 years</li>
                  <li className="text-text-dark">• Interest rates from 12% p.a.</li>
                  <li className="text-text-dark">• Approval in 3-5 business days</li>
                </ul>
                <button 
                  className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-light transition-colors"
                  onClick={() => handleApplyNow('Business Loan')}
                >
                  Apply Now
                </button>
              </div>
            </div>

            {/* Working Capital Loan */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-background-light p-8 text-center">
                <span className="text-2xl mb-4 block">💰</span>
                <h3 className="text-2xl font-bold text-primary mb-2">Working Capital Loan</h3>
                <p className="text-text-light">Manage cash flow effectively</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="text-text-dark">• Flexible overdraft facility</li>
                  <li className="text-text-dark">• Credit limit: ₹2L to ₹50L</li>
                  <li className="text-text-dark">• Interest on utilized amount only</li>
                  <li className="text-text-dark">• Interest rates from 13% p.a.</li>
                  <li className="text-text-dark">• Renews annually</li>
                </ul>
                <button 
                  className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-light transition-colors"
                  onClick={() => handleApplyNow('Working Capital Loan')}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {/* Second Row of Products */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Equipment Financing */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-background-light p-8 text-center">
                <span className="text-2xl mb-4 block">⚙️</span>
                <h3 className="text-2xl font-bold text-primary mb-2">Equipment Financing</h3>
                <p className="text-text-light">Upgrade your business equipment</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="text-text-dark">• Finance up to 90% of equipment value</li>
                  <li className="text-text-dark">• Loan amount: ₹1L to ₹1Cr</li>
                  <li className="text-text-dark">• Tenure: Up to 7 years</li>
                  <li className="text-text-dark">• Interest rates from 11% p.a.</li>
                  <li className="text-text-dark">• Equipment serves as collateral</li>
                </ul>
                <button 
                  className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-light transition-colors"
                  onClick={() => handleApplyNow('Equipment Financing')}
                >
                  Apply Now
                </button>
              </div>
            </div>

            {/* Supply Chain Financing */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-background-light p-8 text-center">
                <span className="text-2xl mb-4 block">🔄</span>
                <h3 className="text-2xl font-bold text-primary mb-2">Supply Chain Financing</h3>
                <p className="text-text-light">Optimize your supply chain</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="text-text-dark">• Early payments to suppliers</li>
                  <li className="text-text-dark">• Financing limit based on invoices</li>
                  <li className="text-text-dark">• Extended payment terms</li>
                  <li className="text-text-dark">• Interest rates from 10% p.a.</li>
                  <li className="text-text-dark">• Strengthen supplier relationships</li>
                </ul>
                <button 
                  className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-light transition-colors"
                  onClick={() => handleApplyNow('Supply Chain Financing')}
                >
                  Apply Now
                </button>
              </div>
            </div>

            {/* Project Financing */}
            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-background-light p-8 text-center">
                <span className="text-2xl mb-4 block">🏗️</span>
                <h3 className="text-2xl font-bold text-primary mb-2">Project Financing</h3>
                <p className="text-text-light">Fund major business initiatives</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="text-text-dark">• Finance specific business projects</li>
                  <li className="text-text-dark">• Loan amount: ₹50L to ₹10Cr</li>
                  <li className="text-text-dark">• Tenure: Based on project timeline</li>
                  <li className="text-text-dark">• Interest rates from 11.5% p.a.</li>
                  <li className="text-text-dark">• Structured repayment options</li>
                </ul>
                <button 
                  className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-light transition-colors"
                  onClick={() => handleApplyNow('Project Financing')}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
