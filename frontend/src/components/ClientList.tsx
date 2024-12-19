import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockClients } from '../data/mockData';

export default function ClientList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState(mockClients);
  const navigate = useNavigate();

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.cases.some(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleStatusChange = (clientId: string, caseId: string, newStatus: 'active' | 'pending' | 'archived') => {
    setClients(prevClients => 
      prevClients.map(client => {
        if (client.id === clientId) {
          return {
            ...client,
            cases: client.cases.map(case_ => 
              case_.id === caseId ? { ...case_, status: newStatus } : case_
            )
          };
        }
        return client;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search clients, phone numbers or cases..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredClients.map((client) => (
            <li key={client.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-indigo-600">{client.name}</h3>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-gray-500">{client.phone}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm text-gray-500">{client.email}</div>
                  <div className="mt-2 space-y-2">
                    {client.cases.map((case_) => (
                      <div key={case_.id} className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/clients/${client.id}/cases/${case_.id}`)}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                        >
                          {case_.title}
                        </button>
                        <div className="relative inline-block text-left group">
                          <button
                            type="button"
                            className={`inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium ${
                              case_.status === 'active' ? 'bg-green-100 text-green-800' :
                              case_.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {case_.status}
                            <ChevronDown className="ml-1 h-4 w-4" />
                          </button>
                          <div className="hidden group-hover:block absolute z-10 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1" role="menu">
                              {['active', 'pending', 'archived'].map((status) => (
                                <button
                                  key={status}
                                  onClick={() => handleStatusChange(client.id, case_.id, status as 'active' | 'pending' | 'archived')}
                                  className={`block w-full text-left px-4 py-2 text-sm ${
                                    case_.status === status ? 'bg-gray-100' : 'hover:bg-gray-50'
                                  }`}
                                >
                                  {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}