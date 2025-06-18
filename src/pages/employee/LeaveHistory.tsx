import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockLeaveHistory } from '@/mockData/leaveData';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-CA'); // YYYY-MM-DD for consistency

export default function LeaveHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave History</CardTitle>
        <CardDescription>A record of your past leave applications.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Your leave history. For details, contact HR.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Leave Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="text-center">Duration (Days)</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>Approver</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLeaveHistory.map(lh => (
              <TableRow key={lh.id}>
                <TableCell className="font-medium">{lh.leaveType}</TableCell>
                <TableCell>{formatDate(lh.startDate)}</TableCell>
                <TableCell>{formatDate(lh.endDate)}</TableCell>
                <TableCell className="text-center">{lh.duration}</TableCell>
                <TableCell className="text-center">
                  <Badge variant={lh.status === 'Approved' ? 'default' : lh.status === 'Pending' ? 'secondary' : 'destructive'}>
                    {lh.status}
                  </Badge>
                </TableCell>
                <TableCell>{lh.approver || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
