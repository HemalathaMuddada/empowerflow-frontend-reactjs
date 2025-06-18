export const leaveTypes = [
  { id: 'annual', name: 'Annual Leave' },
  { id: 'sick', name: 'Sick Leave' },
  { id: 'casual', name: 'Casual Leave' },
  { id: 'unpaid', name: 'Unpaid Leave' },
];

export const mockLeaveHistory = [
  { id: 'lh1', leaveType: 'Annual Leave', startDate: '2024-02-01', endDate: '2024-02-03', duration: 3, status: 'Approved', approver: 'Jane Doe' },
  { id: 'lh2', leaveType: 'Sick Leave', startDate: '2024-01-15', endDate: '2024-01-15', duration: 1, status: 'Approved', approver: 'Jane Doe' },
  { id: 'lh3', leaveType: 'Casual Leave', startDate: '2023-12-20', endDate: '2023-12-22', duration: 3, status: 'Approved', approver: 'Jane Doe' },
  { id: 'lh4', leaveType: 'Annual Leave', startDate: '2024-03-01', endDate: '2024-03-05', duration: 5, status: 'Pending', approver: '' },
];

// Using existing mockLeaveBalances from employeeDashboardData.ts for balances
