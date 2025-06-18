import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'; // Already added
import { toast } from 'sonner';
import { CheckCircle, CalendarDays } from 'lucide-react';

export default function WorkStatusPage() {
  const [submissionDate, setSubmissionDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD for input type=date
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [formData, setFormData] = useState({
    tasksCompleted: '',
    tasksInProgress: '',
    roadblocks: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open confirmation dialog
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = () => {
    // Mock submission logic
    console.log('Work Status Submitted:', { date: submissionDate, ...formData });
    toast.success('Work status submitted successfully!', {
      description: `For date: ${new Date(submissionDate).toLocaleDateString()}`
    });
    setShowConfirmDialog(false);
    // Optionally clear form:
    // setFormData({ tasksCompleted: '', tasksInProgress: '', roadblocks: ''});
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Work Status Submission</h1>
      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Submit Your Work Status</CardTitle>
            <CardDescription>Provide updates on your tasks and progress.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="submissionDate" className="flex items-center"><CalendarDays className='mr-1 h-4 w-4 text-muted-foreground'/> Submission Date</Label>
              <Input
                type="date"
                id="submissionDate"
                name="submissionDate"
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
                required
                className="block w-full max-w-sm"
              />
              {/* Fallback DatePicker note if needed:
                <p className="text-xs text-destructive">(Note: Using fallback date input. ShadCN DatePicker not available)</p>
              */}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tasksCompleted">Tasks Completed Today</Label>
              <Textarea
                id="tasksCompleted"
                name="tasksCompleted"
                placeholder="List the tasks you've completed..."
                rows={4}
                value={formData.tasksCompleted}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tasksInProgress">Tasks In Progress / Planned for Next Day</Label>
              <Textarea
                id="tasksInProgress"
                name="tasksInProgress"
                placeholder="What are you currently working on or plan to do next?"
                rows={4}
                value={formData.tasksInProgress}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="roadblocks">Roadblocks / Issues (Optional)</Label>
              <Textarea
                id="roadblocks"
                name="roadblocks"
                placeholder="Any challenges or issues encountered?"
                rows={3}
                value={formData.roadblocks}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto">
              <CheckCircle className="mr-2 h-4 w-4" /> Submit Status
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit this work status report for {new Date(submissionDate).toLocaleDateString()}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
            <Button onClick={handleConfirmSubmit}>Confirm & Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
