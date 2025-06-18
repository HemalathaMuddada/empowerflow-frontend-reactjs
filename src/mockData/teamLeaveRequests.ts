import { mockTeamMembers } from './leadTeamData'; // To link to actual team members

export interface TeamLeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: string; // e.g., 'Annual Leave', 'Sick Leave', 'Casual Leave'
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedDate: string; // YYYY-MM-DD
  reviewedBy?: string; // Lead/Manager ID who reviewed
  reviewDate?: string; // YYYY-MM-DD
  reviewNotes?: string; // Notes from the reviewer
}

export const mockTeamLeaveRequests: TeamLeaveRequest[] = [
  {
    id: 'LR001',
    employeeId: mockTeamMembers[0].id, // Alice Johnson
    employeeName: mockTeamMembers[0].name,
    leaveType: 'Annual Leave',
    startDate: '2024-07-15',
    endDate: '2024-07-20',
    reason: 'Family vacation to the mountains.',
    status: 'pending',
    requestedDate: '2024-06-20',
  },
  {
    id: 'LR002',
    employeeId: mockTeamMembers[1].id, // Bob Williams
    employeeName: mockTeamMembers[1].name,
    leaveType: 'Sick Leave',
    startDate: '2024-06-28',
    endDate: '2024-06-28',
    reason: 'Feeling unwell, doctor appointment.',
    status: 'approved',
    requestedDate: '2024-06-27',
    reviewedBy: 'LD001', // Assuming a Lead ID
    reviewDate: '2024-06-27',
    reviewNotes: 'Approved. Get well soon!',
  },
  {
    id: 'LR003',
    employeeId: mockTeamMembers[2].id, // Carol Davis
    employeeName: mockTeamMembers[2].name,
    leaveType: 'Casual Leave',
    startDate: '2024-07-05',
    endDate: '2024-07-05',
    reason: 'Personal appointment.',
    status: 'pending',
    requestedDate: '2024-07-01',
  },
  {
    id: 'LR004',
    employeeId: mockTeamMembers[0].id, // Alice Johnson
    employeeName: mockTeamMembers[0].name,
    leaveType: 'Annual Leave',
    startDate: '2024-08-01',
    endDate: '2024-08-05',
    reason: 'Extended weekend trip.',
    status: 'approved',
    requestedDate: '2024-07-10',
    reviewedBy: 'LD001',
    reviewDate: '2024-07-11',
    reviewNotes: 'Enjoy your trip!',
  },
  {
    id: 'LR005',
    employeeId: mockTeamMembers[3].id, // David Brown
    employeeName: mockTeamMembers[3].name,
    leaveType: 'Sick Leave',
    startDate: '2024-07-02',
    endDate: '2024-07-03',
    reason: 'Recovering from a cold.',
    status: 'rejected',
    requestedDate: '2024-07-01',
    reviewedBy: 'LD001',
    reviewDate: '2024-07-01',
    reviewNotes: 'Please provide a doctor\'s note for sick leave exceeding 1 day as per policy.',
  },
  {
    id: 'LR006',
    employeeId: mockTeamMembers[4].id, // Eve Miller
    employeeName: mockTeamMembers[4].name,
    leaveType: 'Work From Home', // Could be another type
    startDate: '2024-07-10',
    endDate: '2024-07-12',
    reason: 'Plumbing work at home, prefer to be available.',
    status: 'pending',
    requestedDate: '2024-07-08',
  }
];
