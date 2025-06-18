import { mockTeamMembers } from './leadTeamData'; // To link to actual team members

export interface TeamHikeEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  currentCTC: number;
  proposedHikePercentage: number;
  newCTC: number; // Calculated: currentCTC * (1 + proposedHikePercentage / 100)
  effectiveDate: string; // YYYY-MM-DD
  status: 'pending_approval' | 'approved' | 'rejected' | 'processing';
  requestDate: string; // YYYY-MM-DD, when the hike was proposed/initiated
  approvedBy?: string; // Manager/HR ID
  approvalDate?: string; // YYYY-MM-DD
  comments?: string; // Any comments from lead or approver
}

// Helper to calculate new CTC
const calculateNewCTC = (currentCTC: number, hikePercentage: number): number => {
  return Math.round(currentCTC * (1 + hikePercentage / 100));
};

export const mockTeamHikeInfo: TeamHikeEntry[] = [
  {
    id: 'HIKE001',
    employeeId: mockTeamMembers[0].id, // Alice Johnson
    employeeName: mockTeamMembers[0].name,
    currentCTC: 700000,
    proposedHikePercentage: 15,
    newCTC: calculateNewCTC(700000, 15),
    effectiveDate: '2024-08-01',
    status: 'pending_approval',
    requestDate: '2024-07-01',
    comments: 'Alice has shown exceptional performance this cycle.',
  },
  {
    id: 'HIKE002',
    employeeId: mockTeamMembers[1].id, // Bob Williams
    employeeName: mockTeamMembers[1].name,
    currentCTC: 550000,
    proposedHikePercentage: 10,
    newCTC: calculateNewCTC(550000, 10),
    effectiveDate: '2024-08-01',
    status: 'approved',
    requestDate: '2024-06-20',
    approvedBy: 'MG001', // Manager ID
    approvalDate: '2024-06-28',
    comments: 'Standard performance hike.',
  },
  {
    id: 'HIKE003',
    employeeId: mockTeamMembers[3].id, // David Brown
    employeeName: mockTeamMembers[3].name,
    currentCTC: 680000,
    proposedHikePercentage: 12,
    newCTC: calculateNewCTC(680000, 12),
    effectiveDate: '2024-09-01',
    status: 'pending_approval',
    requestDate: '2024-07-05',
    comments: 'Consistent performer, meets expectations.',
  },
  {
    id: 'HIKE004',
    employeeId: mockTeamMembers[4].id, // Eve Miller
    employeeName: mockTeamMembers[4].name,
    currentCTC: 720000,
    proposedHikePercentage: 0, // Example: No hike proposed, or for correction
    newCTC: calculateNewCTC(720000, 0),
    effectiveDate: '2024-08-01',
    status: 'processing', // Could mean it's under discussion or data correction
    requestDate: '2024-07-10',
    comments: 'Performance review discussion pending. Initial data entry.',
  }
];
