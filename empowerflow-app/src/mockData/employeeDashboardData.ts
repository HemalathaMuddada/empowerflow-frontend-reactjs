export const mockHolidays = [
  { name: 'New Year\'s Day', date: '2024-01-01', type: 'National' },
  { name: 'Spring Festival', date: '2024-02-10', type: 'National' },
  { name: 'Good Friday', date: '2024-03-29', type: 'Optional' },
  { name: 'Labor Day', date: '2024-05-01', type: 'National' },
  { name: 'Christmas Day', date: '2024-12-25', type: 'National' },
];

export const mockLeaveBalances = [
  { leaveType: 'Annual Leave', total: 20, used: 5, balance: 15 },
  { leaveType: 'Sick Leave', total: 10, used: 2, balance: 8 },
  { leaveType: 'Casual Leave', total: 7, used: 7, balance: 0 },
];

export const mockTasks = [
  { id: 'task1', title: 'Complete Q1 Performance Review', status: 'pending', dueDate: '2024-03-15' },
  { id: 'task2', title: 'Submit Expense Report', status: 'in-progress', dueDate: '2024-03-10' },
  { id: 'task3', title: 'Update Training Modules', status: 'completed', dueDate: '2024-02-28' },
];

export const mockPerformanceStatus = {
  rating: 4.5,
  reviewPeriod: 'Q4 2023',
  highlights: ['Exceeded targets in sales', 'Mentored junior team members'],
  goals: ['Improve project management skills', 'Lead one cross-functional project'],
};

export const mockRecentPayslips = [
  { id: 'pay1', period: 'February 2024', amount: 5000, downloadLinkPlaceholder: '#' },
  { id: 'pay2', period: 'January 2024', amount: 5000, downloadLinkPlaceholder: '#' },
];
