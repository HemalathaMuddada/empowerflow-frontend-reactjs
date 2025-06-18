import React from 'react';
import LeaveApplicationForm from './LeaveApplicationForm';
import LeaveHistory from './LeaveHistory';
import LeaveBalanceViewer from './LeaveBalanceViewer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function LeaveManagementPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Leave Management</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <LeaveBalanceViewer />
        </div>
        <div className="lg:col-span-2">
          <LeaveApplicationForm />
        </div>
      </div>

      <LeaveHistory />
    </div>
  );
}
