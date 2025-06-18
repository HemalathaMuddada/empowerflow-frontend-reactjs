export interface TeamMember {
  id: string;
  name: string;
  role: string; // e.g., 'Software Engineer', 'QA Analyst', 'UI/UX Designer'
  avatar?: string; // URL to an avatar image
  email: string;
  phone?: string;
  joiningDate: string; // YYYY-MM-DD
}

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'TM001',
    name: 'Alice Johnson',
    role: 'Software Engineer',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    email: 'alice.johnson@example.com',
    phone: '555-0101',
    joiningDate: '2022-03-15',
  },
  {
    id: 'TM002',
    name: 'Bob Williams',
    role: 'QA Analyst',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    email: 'bob.williams@example.com',
    joiningDate: '2021-07-20',
  },
  {
    id: 'TM003',
    name: 'Carol Davis',
    role: 'UI/UX Designer',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    email: 'carol.davis@example.com',
    phone: '555-0103',
    joiningDate: '2023-01-10',
  },
  {
    id: 'TM004',
    name: 'David Brown',
    role: 'Software Engineer',
    // No avatar for David
    email: 'david.brown@example.com',
    joiningDate: '2022-05-01',
  },
  {
    id: 'TM005',
    name: 'Eve Miller',
    role: 'Software Engineer',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    email: 'eve.miller@example.com',
    phone: '555-0105',
    joiningDate: '2020-11-01',
  }
];
