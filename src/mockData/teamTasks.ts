import { mockTeamMembers } from './leadTeamData'; // To link to actual team members

export interface TeamTask {
  id: string;
  title: string;
  description: string;
  assignedToId: string;
  assignedToName: string;
  assignedBy?: string; // Lead/Manager ID who assigned
  dueDate: string; // YYYY-MM-DD
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  createdDate: string; // YYYY-MM-DD
  lastUpdatedDate?: string; // YYYY-MM-DD
  comments?: Array<{ userId: string, comment: string, date: string }>;
}

export const mockTeamTasks: TeamTask[] = [
  {
    id: 'TSK001',
    title: 'Develop Login Feature',
    description: 'Implement the user login functionality with email and password using JWT authentication.',
    assignedToId: mockTeamMembers[0].id, // Alice Johnson
    assignedToName: mockTeamMembers[0].name,
    assignedBy: 'LD001',
    dueDate: '2024-07-20',
    priority: 'high',
    status: 'in-progress',
    createdDate: '2024-07-01',
    lastUpdatedDate: '2024-07-05',
  },
  {
    id: 'TSK002',
    title: 'Write Test Cases for User Module',
    description: 'Prepare comprehensive test cases for all user management APIs.',
    assignedToId: mockTeamMembers[1].id, // Bob Williams
    assignedToName: mockTeamMembers[1].name,
    assignedBy: 'LD001',
    dueDate: '2024-07-25',
    priority: 'medium',
    status: 'pending',
    createdDate: '2024-07-02',
  },
  {
    id: 'TSK003',
    title: 'Design User Profile Page UI',
    description: 'Create mockups and final UI design for the user profile page, including editable fields.',
    assignedToId: mockTeamMembers[2].id, // Carol Davis
    assignedToName: mockTeamMembers[2].name,
    assignedBy: 'LD001',
    dueDate: '2024-07-18',
    priority: 'high',
    status: 'completed',
    createdDate: '2024-06-25',
    lastUpdatedDate: '2024-07-03',
  },
  {
    id: 'TSK004',
    title: 'Refactor API Authentication Layer',
    description: 'Improve the existing API authentication middleware for better performance and security.',
    assignedToId: mockTeamMembers[3].id, // David Brown
    assignedToName: mockTeamMembers[3].name,
    assignedBy: 'LD001',
    dueDate: '2024-08-01',
    priority: 'medium',
    status: 'in-progress',
    createdDate: '2024-07-05',
  },
  {
    id: 'TSK005',
    title: 'Setup CI/CD Pipeline for Frontend',
    description: 'Configure GitHub Actions or Jenkins for automated build and deployment of the frontend application.',
    assignedToId: mockTeamMembers[4].id, // Eve Miller
    assignedToName: mockTeamMembers[4].name,
    assignedBy: 'LD001',
    dueDate: '2024-07-30',
    priority: 'high',
    status: 'pending',
    createdDate: '2024-07-08',
  },
  {
    id: 'TSK006',
    title: 'User Documentation for Feature X',
    description: 'Write user-facing documentation for the newly released Feature X.',
    assignedToId: mockTeamMembers[0].id, // Alice Johnson
    assignedToName: mockTeamMembers[0].name,
    assignedBy: 'LD001',
    dueDate: '2024-08-05',
    priority: 'low',
    status: 'pending',
    createdDate: '2024-07-10',
  },
  {
    id: 'TSK007',
    title: 'Investigate Performance Bottleneck in API Y',
    description: 'Identify and resolve the performance issue reported for API Y under high load.',
    assignedToId: mockTeamMembers[3].id, // David Brown
    assignedToName: mockTeamMembers[3].name,
    assignedBy: 'LD001',
    dueDate: '2024-07-22',
    priority: 'high',
    status: 'blocked',
    createdDate: '2024-07-09',
    comments: [{userId: 'LD001', comment: 'Waiting for server logs from DevOps.', date: '2024-07-10'}]
  }
];
