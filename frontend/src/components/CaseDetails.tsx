import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Edit, Camera } from 'lucide-react';
import { mockClients } from '../data/mockData';
import DocumentScanner from './DocumentScanner';
import EditCaseForm from './EditCaseForm';

export default function CaseDetails() {
  const { clientId, caseId } = useParams();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [caseData, setCaseData] = useState(() => {
    const client = mockClients.find(c => c.id === clientId);
    const case_ = client?.cases.find(c => c.id === caseId);
    return case_ || null;
  });

  const client = mockClients.find(c => c.id === clientId);
  
  if (!client || !caseData) {
    return <div>Case not found</div>;
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      // Simulate file upload
      setTimeout(() => {
        setIsUploading(false);
        alert('File uploaded successfully!');
      }, 1500);
    }
  };

  const handleScannedDocument = (imageData: string) => {
    setIsUploading(true);
    // Simulate processing and uploading the scanned document
    setTimeout(() => {
      setIsUploading(false);
      alert('Scanned document uploaded successfully!');
    }, 1500);
  };

  const handleEditCase = (updatedData: { title: string; status: string }) => {
    setCaseData(prev => prev ? { ...prev, title: updatedData.title, status: updatedData.status as any } : null);
  };

  return (
    <>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/clients')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Clients
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Case Details
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Case and client information
              </p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => setShowEditForm(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <div className="relative inline-block">
                <button
                  onClick={() => setShowScanner(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-2"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Scan Document
                </button>
                <label className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload File'}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Client Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {client.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {client.phone}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Case Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {caseData.title}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Case Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    caseData.status === 'active' ? 'bg-green-100 text-green-800' :
                    caseData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {caseData.status}
                  </span>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Documents</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                    {caseData.documents.map((doc) => (
                      <li key={doc.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <span className="ml-2 flex-1 w-0 truncate">{doc.title}</span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <div className="text-xs text-gray-500">
                            Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {showScanner && (
        <DocumentScanner
          onCapture={handleScannedDocument}
          onClose={() => setShowScanner(false)}
        />
      )}

      {showEditForm && (
        <EditCaseForm
          initialData={{
            title: caseData.title,
            status: caseData.status,
          }}
          onSubmit={handleEditCase}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  );
}