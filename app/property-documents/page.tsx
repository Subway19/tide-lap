'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApplicationStore } from '../store/applicationStore';
import { getApplicationIdFromUrl, loadSavedApplication, updateApplicationProgress } from '../utils/applicationUtils';

interface PropertyFiles {
  titleDeed: File | null;
  taxReceipts: File[];
  exteriorPhotos: File[];
  interiorPhotos: File[];
  additionalDocs: File[];
}

type MultipleFileTypes = 'taxReceipts' | 'exteriorPhotos' | 'interiorPhotos' | 'additionalDocs';
type SingleFileTypes = 'titleDeed';
type FileTypes = MultipleFileTypes | SingleFileTypes;

export default function PropertyDocuments() {
  const router = useRouter();
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [files, setFiles] = useState<PropertyFiles>({
    titleDeed: null,
    taxReceipts: [],
    exteriorPhotos: [],
    interiorPhotos: [],
    additionalDocs: []
  });

  useEffect(() => {
    const id = getApplicationIdFromUrl();
    setApplicationId(id);

    if (id) {
      const savedData = loadSavedApplication(id);
      if (savedData?.formData?.files) {
        const savedFiles = savedData.formData.files;
        if (
          typeof savedFiles === 'object' &&
          'titleDeed' in savedFiles &&
          'taxReceipts' in savedFiles &&
          'exteriorPhotos' in savedFiles &&
          'interiorPhotos' in savedFiles &&
          'additionalDocs' in savedFiles
        ) {
          setFiles(savedFiles as PropertyFiles);
        }
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: FileTypes) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    if (type === 'titleDeed') {
      setFiles(prev => ({
        ...prev,
        [type]: selectedFiles[0]
      }));
    } else {
      const fileType = type as MultipleFileTypes;
      const newFiles = Array.from(selectedFiles) as File[];
      setFiles(prev => ({
        ...prev,
        [fileType]: prev[fileType].concat(newFiles)
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, type: FileTypes) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;

    if (type === 'titleDeed') {
      setFiles(prev => ({
        ...prev,
        [type]: droppedFiles[0]
      }));
    } else {
      const fileType = type as MultipleFileTypes;
      const newFiles = Array.from(droppedFiles) as File[];
      setFiles(prev => ({
        ...prev,
        [fileType]: prev[fileType].concat(newFiles)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (applicationId) {
      // Update application progress
      updateApplicationProgress(
        applicationId,
        'Verification Scheduling',
        60,
        { files }
      );
      
      // Navigate to next page
      router.push(`/verification-scheduling?applicationId=${applicationId}`);
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
              { number: 4, label: 'Property Documents', active: true },
              { number: 5, label: 'Verification', active: false },
              { number: 6, label: 'Offers', active: false },
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-dark mb-2">
            Property Documents
          </h1>
          <p className="text-lg text-text-light">
            Upload documents related to your property for ownership verification and valuation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-lg p-8">
          {/* Document Requirements Note */}
          <div className="bg-background-light rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-text-dark mb-2">Document Requirements:</h3>
            <p className="text-text-light">
              • File formats: PDF, JPG, PNG (max 10MB per file) • Ensure documents are clear and all pages are included • All documents must be self-attested
            </p>
          </div>

          {/* Title Deed Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">Title Deed*</h2>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'titleDeed')}
            >
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-background-light rounded-lg flex items-center justify-center">
                  <span className="text-4xl">📄</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-dark mb-2">Upload Title Deed</h3>
                  <p className="text-text-light mb-4">Drag and drop file here or click to browse</p>
                  <div className="flex space-x-4">
                    <label className="btn-primary cursor-pointer">
                      Browse Files
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'titleDeed')}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </label>
                    <button type="button" className="btn-outline">
                      Take Photo
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-text-light">Document showing legal ownership of the property</p>
                    <button type="button" className="text-primary hover:text-primary-light">
                      View Sample
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property Tax Receipts Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">Property Tax Receipts (Last 3 Years)*</h2>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'taxReceipts')}
            >
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-background-light rounded-lg flex items-center justify-center">
                  <span className="text-4xl">📄</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text-dark mb-2">Upload Property Tax Receipts</h3>
                  <p className="text-text-light mb-4">Drag and drop files here or click to browse</p>
                  <div className="flex space-x-4">
                    <label className="btn-primary cursor-pointer">
                      Browse Files
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => handleFileChange(e, 'taxReceipts')}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </label>
                    <button type="button" className="btn-outline">
                      Take Photo
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-text-light">Recent property tax payment proofs</p>
                    <button type="button" className="text-primary hover:text-primary-light">
                      View Sample
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Property Photographs Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-dark mb-4">Property Photographs (Exterior and Interior)*</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Exterior Photos */}
              <div>
                <h3 className="text-lg font-bold text-text-dark mb-4">Exterior Photos</h3>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 h-[200px] flex items-center justify-center"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'exteriorPhotos')}
                >
                  <span className="text-4xl">🏢</span>
                </div>
              </div>

              {/* Interior Photos */}
              <div>
                <h3 className="text-lg font-bold text-text-dark mb-4">Interior Photos</h3>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 h-[200px] flex items-center justify-center"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'interiorPhotos')}
                >
                  <span className="text-4xl">🏠</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-text-dark mb-2">Photo Guidelines:</h3>
              <ul className="list-disc list-inside text-text-light space-y-1">
                <li>Clear, well-lit photos of all sides of the property</li>
                <li>Interior photos of main rooms</li>
                <li>Photos showing condition of property</li>
              </ul>
              <button type="button" className="btn-primary mt-4">
                Take/Upload Photos
              </button>
            </div>
          </div>

          {/* Additional Documents Section */}
          <div 
            className="mb-8"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'additionalDocs')}
          >
            <h2 className="text-2xl font-bold text-text-dark mb-4">Additional Documents (if applicable)</h2>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select Document Type</option>
                  <option value="noc">NOC from Housing Society</option>
                  <option value="lease">Lease Agreement</option>
                  <option value="other">Other Documents</option>
                </select>
              </div>
              <button type="button" className="btn-primary">
                Upload
              </button>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-indigo-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-primary mb-2">Need help with your documents?</h3>
            <p className="text-primary">Contact our property experts at 1800-123-4567</p>
          </div>

          {/* Save Progress Message */}
          <div className="bg-indigo-50 rounded-lg p-4 flex items-center justify-between mb-8">
            <p className="text-primary">Your progress is being saved automatically</p>
            <span className="text-primary">✓</span>
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-6">
            <button
              type="button"
              className="btn-outline flex-1"
              onClick={() => router.back()}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Continue to Verification Scheduling →
            </button>
          </div>
        </form>
      </main>
    </div>
  );
} 