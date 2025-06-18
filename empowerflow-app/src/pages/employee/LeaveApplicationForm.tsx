import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { leaveTypes } from '@/mockData/leaveData';
import { toast } from 'sonner';
import { UploadCloud } from 'lucide-react'; // Removed CalendarIcon as native date input is used

export default function LeaveApplicationForm() {
  // Removed state for startDate and endDate as native inputs handle their own state directly
  // In a real form, you'd likely get these values on submit e.g. from e.target.elements

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Example: Accessing form data (consider using FormData or react-hook-form for real apps)
    const formData = new FormData(e.currentTarget);
    const leaveType = formData.get('leaveType');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const reason = formData.get('reason');
    // const attachment = formData.get('attachment'); // File handling is more complex

    console.log({ leaveType, startDate, endDate, reason }); // Mock logging

    toast.success('Leave application submitted!', {
      description: `Type: ${leaveType}, Start: ${startDate}, End: ${endDate}. Your request is pending approval.`
    });
    // e.currentTarget.reset(); // Optionally reset form
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for Leave</CardTitle>
        <CardDescription>Fill out the form below to request time off.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="leaveType">Leave Type</Label>
              <Select name="leaveType" required>
                <SelectTrigger id="leaveType"><SelectValue placeholder="Select leave type" /></SelectTrigger>
                <SelectContent>{leaveTypes.map(lt => (<SelectItem key={lt.id} value={lt.id}>{lt.name}</SelectItem>))}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              {/* Placeholder for a potential 'Remaining Balance' display based on type */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="startDate">Start Date</Label>
              <Input type="date" id="startDate" name="startDate" required className="block w-full"/>
              <p className="text-xs text-muted-foreground">(Using standard date input. ShadCN DatePicker not available)</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="endDate">End Date</Label>
              <Input type="date" id="endDate" name="endDate" required className="block w-full"/>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="reason">Reason</Label>
            <Textarea id="reason" name="reason" placeholder="Enter reason for leave (optional)" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="attachment">Attachment (e.g., Medical Certificate)</Label>
            <Input id="attachment" name="attachment" type="file" />
            <p className='text-xs text-muted-foreground'>Mock file upload UI. Actual upload not implemented.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full md:w-auto">Submit Application</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
