'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getApplicationIdFromUrl, loadSavedApplication, updateApplicationProgress } from '../utils/applicationUtils';

export default function LegalDocuments() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState({
    mortgageDeed: true,
    loanAgreement: true,
    propertyDeclaration: true,
    powerOfAttorney: false
  });

  const [consultationType, setConsultationType] = useState<'online' | 'in-person' | null>(null);
  const [consultationDate, setConsultationDate] = useState('');

  useEffect(() => {
    const id = getApplicationIdFromUrl();
    setApplicationId(id);

    if (id) {
      const savedData = loadSavedApplication(id);
      if (savedData?.formData?.legalDocuments) {
        setSelectedDocuments(savedData.formData.legalDocuments.selectedDocuments);
        setConsultationType(savedData.formData.legalDocuments.consultationType);
        setConsultationDate(savedData.formData.legalDocuments.consultationDate);
      }
    }
  }, []);

  const handleDocumentToggle = (document: keyof typeof selectedDocuments) => {
    setSelectedDocuments(prev => ({
      ...prev,
      [document]: !prev[document]
    }));
  };

  const handleConsultationTypeSelect = (type: 'online' | 'in-person') => {
    setConsultationType(type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!applicationId) return;

    // Update application progress with legal documents details
    updateApplicationProgress(
      applicationId,
      'Review',
      95,
      { 
        legalDocuments: {
          selectedDocuments,
          consultationType,
          consultationDate,
          submittedAt: new Date().toISOString()
        }
      }
    );

    // Navigate to application review page
    router.push(`/application-review?applicationId=${applicationId}`);
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
              { number: 6, label: 'Offers', active: true, completed: true },
              { number: 7, label: 'Documentation', active: true }
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-dark mb-2">
            Legal Documentation
          </h1>
          <p className="text-lg text-text-light">
            Review and complete the legal documentation process
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Document Selection */}
          <div className="bg-white border border-gray-300 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Required Documents</h2>
            <div className="space-y-4">
              {Object.entries(selectedDocuments).map(([key, value]) => (
                <div key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => handleDocumentToggle(key as keyof typeof selectedDocuments)}
                    className="w-5 h-5 text-primary"
                  />
                  <label className="ml-3 text-text-dark">{key}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation Scheduling */}
          <div className="bg-white border border-gray-300 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-text-dark mb-6">Legal Consultation</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Consultation Type
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => handleConsultationTypeSelect('online')}
                    className={`px-6 py-3 rounded-lg ${
                      consultationType === 'online'
                        ? 'bg-primary text-white'
                        : 'bg-white border-2 border-primary text-primary'
                    }`}
                  >
                    Online
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConsultationTypeSelect('in-person')}
                    className={`px-6 py-3 rounded-lg ${
                      consultationType === 'in-person'
                        ? 'bg-primary text-white'
                        : 'bg-white border-2 border-primary text-primary'
                    }`}
                  >
                    In-Person
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-text-dark font-semibold mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={consultationDate}
                  onChange={(e) => setConsultationDate(e.target.value)}
                  className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-outline flex-1"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Continue →
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
 