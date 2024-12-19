import React, { useState } from 'react';
import { Users, Briefcase, FileText, Clock } from 'lucide-react';
import NewClientForm from './NewClientForm';
import NewCaseForm from './NewCaseForm';
import { mockClients } from '../data/mockData';

const stats = [
  { name: 'Total Clients', value: '128', icon: Users },
  { name: 'Active Cases', value: '86', icon: Briefcase },
  { name: 'Documents', value: '2,345', icon: FileText },
  { name: 'Pending Tasks', value: '42', icon: Clock },
];

const recentActivity = [
  {
    id: 1,
    title: 'Case Update: Johnson vs. Smith',
    description: 'New document uploaded',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    title: 'New Client: Sarah Williams',
    description: 'Client profile created',
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    title: 'Case Status Changed',
    description: 'Davis case marked as closed',
    timestamp: '1 day ago',
  },
];

export default function Dashboard() {
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [showNewCaseForm, setShowNewCaseForm] = useState(false);

  const handleNewClient = (clientData: { name: string; email: string; phone: string }) => {
    // In a real app, this would make an API call
    console.log('New client:', clientData);
    alert('Client added successfully!');
  };

  const handleNewCase = (caseData: { title: string; clientId: string; status: 'active' | 'pending' }) => {
    // In a real app, this would make an API call
    console.log('New case:', caseData);
    alert('Case added successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-medium">{activity.title}</h3>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                    <p className="text-xs text-gray-400">{activity.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Quick Actions
            </h3>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            {[
              { name: 'New Client', icon: Users, onClick: () => setShowNewClientForm(true) },
              { name: 'New Case', icon: Briefcase, onClick: () => setShowNewCaseForm(true) },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.name}
                  onClick={action.onClick}
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:text-indigo-500 transition-colors duration-200"
                >
                  <Icon className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">{action.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {showNewClientForm && (
        <NewClientForm
          onClose={() => setShowNewClientForm(false)}
          onSubmit={handleNewClient}
        />
      )}

      {showNewCaseForm && (
        <NewCaseForm
          onClose={() => setShowNewCaseForm(false)}
          onSubmit={handleNewCase}
        />
      )}
    </div>
  );
}