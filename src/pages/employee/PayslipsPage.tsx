import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { mockPayslipsData } from '@/mockData/payslipsPageData';
import { toast } from 'sonner';

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-CA');

export default function PayslipsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Payslips</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Payslip History</CardTitle>
          <CardDescription>Access and download your monthly payslips.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Official record of your earnings.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Pay Period</TableHead>
                <TableHead>Pay Date</TableHead>
                <TableHead className="text-right">Gross Amount</TableHead>
                <TableHead className="text-right">Net Amount</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPayslipsData.map((payslip) => (
                <TableRow key={payslip.id}>
                  <TableCell className="font-medium">{payslip.period}</TableCell>
                  <TableCell>{formatDate(payslip.payDate)}</TableCell>
                  <TableCell className="text-right">${payslip.grossAmount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${payslip.netAmount.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast.info(`Preview/Download for ${payslip.period} (mock).`, { description: 'Actual download not implemented.'})}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
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
