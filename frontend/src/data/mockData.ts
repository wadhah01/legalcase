export const mockClients = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    cases: [
      {
        id: '1',
        title: 'Property Dispute Case',
        status: 'active',
        clientId: '1',
        createdAt: new Date('2024-01-15'),
        documents: [
          {
            id: '1',
            title: 'Property Deed.pdf',
            type: 'application/pdf',
            uploadedAt: new Date('2024-01-15'),
          },
          {
            id: '2',
            title: 'Survey Report.pdf',
            type: 'application/pdf',
            uploadedAt: new Date('2024-01-20'),
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 987-6543',
    cases: [
      {
        id: '2',
        title: 'Contract Review',
        status: 'pending',
        clientId: '2',
        createdAt: new Date('2024-02-01'),
        documents: [
          {
            id: '3',
            title: 'Contract Draft v1.docx',
            type: 'application/docx',
            uploadedAt: new Date('2024-02-01'),
          }
        ]
      }
    ]
  }
];