'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApplicationStore, ApplicationDraft } from '../store/applicationStore';

export default function ApplicationDrafts() {
  const router = useRouter();
  const { applicationDrafts, deleteDraft } = useApplicationStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleContinue = (applicationId: string, stage: string) => {
    // Navigate to the appropriate stage based on the application status
    let route = '';
    switch(stage.toLowerCase()) {
      case 'eligibility':
        route = '/eligibility';
        break;
      case 'eligibility results':
        route = '/eligibility-results';
        break;
      case 'business profile':
        route = '/business-profile';
        break;
      case 'property details':
        route = '/property-details';
        break;
      case 'offers':
        route = '/offers';
        break;
      case 'documentation':
        route = '/legal-documents';
        break;
      case 'verification':
        route = '/verification-scheduling';
        break;
      case 'legal completion':
        route = '/legal-completion';
        break;
      case 'disbursement':
        route = '/disbursement';
        break;
      case 'review':
        route = '/review';
        break;
      case 'insurance requirements':
        route = '/insurance-requirements';
        break;
      default:
        route = '/calculator';
    }
    router.push(`${route}?applicationId=${applicationId}`);
  };

  const handleDelete = (applicationId: string) => {
    if (window.confirm('Are you sure you want to delete this application draft?')) {
      deleteDraft(applicationId);
    }
  };

  const filteredApplications = applicationDrafts.filter(app => 
    app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#0C169A] text-white h-20 flex items-center px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold font-montserrat cursor-pointer" onClick={() => router.push('/')}>Tide</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-purple-200">Products</a>
              <a href="#" className="hover:text-purple-200">Business</a>
              <a href="#" className="hover:text-purple-200">Resources</a>
              <a href="#" className="hover:text-purple-200">About Us</a>
              <Link href="/application-drafts" className="text-white font-semibold flex items-center border-b-2 border-white pb-1">
                <span>My Applications</span>
                <span className="ml-2 bg-[#9966cc] text-xs px-2 py-0.5 rounded-full">{applicationDrafts.length}</span>
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <span>Hi, Rajesh</span>
            <div className="w-10 h-10 rounded-full bg-[#9966cc] flex items-center justify-center">
              <span className="font-bold">R</span>
            </div>
            <Link href="/dashboard" className="bg-[#9966cc] px-4 py-1.5 rounded-full text-sm font-bold">
              My Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-10">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 font-montserrat mb-2">My Saved Applications</h1>
          <p className="text-lg text-gray-600">Continue where you left off with your loan applications</p>
        </div>

        {/* Search Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8 flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by application ID..."
              className="bg-white border border-[#663399] text-gray-600 rounded-full px-4 py-1.5 pr-10 w-full md:w-80 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center px-3 text-[#663399]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-100 p-4 grid grid-cols-1 md:grid-cols-5 gap-4 font-bold text-gray-800">
            <div>Application Type</div>
            <div>Last Updated</div>
            <div>Application ID</div>
            <div>Completion Status</div>
            <div>Action</div>
          </div>

          {/* Table Rows */}
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app) => (
              <div key={app.id} className="border-t border-gray-200 p-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div>
                  <p className="font-bold text-gray-800">{app.type}</p>
                  <p className="text-gray-600">{app.amount}</p>
                </div>
                
                <div>
                  <p className="text-gray-800">{app.lastUpdated.date}</p>
                  <p className="text-gray-600">{app.lastUpdated.time}</p>
                </div>
                
                <div className="text-gray-800">{app.id}</div>
                
                <div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                    <div 
                      className="bg-[#663399] h-2.5 rounded-full" 
                      style={{ width: `${app.status.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-600">{app.status.stage} ({app.status.percentage}%)</p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleContinue(app.id, app.status.stage)}
                    className="bg-[#663399] text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                  >
                    Continue
                  </button>
                  <button 
                    onClick={() => handleDelete(app.id)}
                    className="border border-gray-300 px-2 py-2 rounded hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-xl">⋮</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-600">
              No saved applications found
            </div>
          )}

          {/* End of Applications Message */}
          <div className="bg-gray-100 p-4 text-center text-gray-600">
            End of saved applications
          </div>
        </div>

        {/* Start New Application Section */}
        <div className="bg-[#e6e6ff] p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-[#663399] font-montserrat mb-4">Start a New Loan Application</h2>
          <p className="text-gray-800 mb-6">Choose from our range of business financing solutions tailored to your needs.</p>
          
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Link href="/" className="bg-[#663399] text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">
              Explore Products
            </Link>
            <p className="text-gray-800">For guidance on which product is right for you, call us at 1800-123-4567.</p>
          </div>
        </div>
      </main>
    </div>
  );
} 