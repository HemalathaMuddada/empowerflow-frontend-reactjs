import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockHolidays } from '@/mockData/employeeDashboardData'; // Reusing from dashboard
import { CalendarDays } from 'lucide-react';

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default function HolidaysPage() {
  // Sort holidays by date
  const sortedHolidays = [...mockHolidays].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Company Holidays</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><CalendarDays className="mr-2 h-5 w-5" /> Holiday Calendar {new Date().getFullYear()}</CardTitle>
          <CardDescription>List of approved company holidays.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Official holiday list.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Holiday Name</TableHead>
                <TableHead className="text-center">Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedHolidays.map((holiday) => (
                <TableRow key={holiday.name}>
                  <TableCell className="font-medium">{formatDate(holiday.date)}</TableCell>
                  <TableCell>{holiday.name}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={holiday.type === 'National' ? 'default' : 'secondary'}>
                      {holiday.type}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
