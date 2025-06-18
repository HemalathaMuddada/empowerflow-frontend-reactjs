export const concernCategories = [
  { id: 'workplace', name: 'Workplace Issue' },
  { id: 'hr_policy', name: 'HR Policy' },
  { id: 'it_support', name: 'IT Support' },
  { id: 'payroll', name: 'Payroll Discrepancy' },
  { id: 'other', name: 'Other' },
];

export const documentCategories = [
  { id: 'hr_policies', name: 'HR Policies' },
  { id: 'forms', name: 'Forms & Templates' },
  { id: 'training', name: 'Training Materials' },
  { id: 'insurance', name: 'Insurance Documents' },
];

export const mockDocuments = [
  { id: 'doc1', name: 'Employee Handbook 2024', category: 'HR Policies', uploadDate: '2024-01-15', link: '#' },
  { id: 'doc2', name: 'Leave Application Form', category: 'Forms', uploadDate: '2023-12-01', link: '#' },
  { id: 'doc3', name: 'Security Awareness Training', category: 'Training Materials', uploadDate: '2024-02-10', link: '#' },
  { id: 'doc4', name: 'Code of Conduct', category: 'HR Policies', uploadDate: '2024-01-10', link: '#' },
  { id: 'doc5', name: 'Health Insurance Policy 2024', category: 'Insurance Documents', uploadDate: '2024-03-01', link: '#' },
];

export const mockHikeInfo = {
  currentGrade: 'SDE II',
  lastHikeDate: '2023-04-01',
  nextReviewDate: '2024-09-30',
  pastHikes: [
    { date: '2023-04-01', designation: 'SDE II', salary: 'XXX,XXX', notes: 'Annual Increment' },
    { date: '2022-04-01', designation: 'SDE I', salary: 'YYY,YYY', notes: 'Promotion + Increment' },
  ],
};

// mockTasks from employeeDashboardData.ts will be reused and extended if needed.
// For IT/FBP, mock data for financial years.
export const financialYears = [
  { id: 'fy24-25', name: 'FY 2024-2025' },
  { id: 'fy23-24', name: 'FY 2023-2024' },
  { id: 'fy22-23', name: 'FY 2022-2023' },
];
