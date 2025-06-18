import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { mockLeaveBalances } from '@/mockData/employeeDashboardData'; // Reusing from dashboard
import { BarChart2 } from 'lucide-react';

export default function LeaveBalanceViewer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center"><BarChart2 className="mr-2 h-5 w-5"/> Leave Balances</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {mockLeaveBalances.map(lb => (
            <li key={lb.leaveType} className="flex justify-between items-center">
              <span className="text-sm font-medium">{lb.leaveType}</span>
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">{lb.balance}</span> days available
              </span>
            </li>
          ))}
          <li className="flex justify-between items-center pt-2 border-t">
             <span className="text-sm font-medium">Total Used (All Types)</span>
             <span className="text-sm text-muted-foreground">
                {mockLeaveBalances.reduce((acc, curr) => acc + curr.used, 0)} days
             </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
