import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CalendarClock } from 'lucide-react'; // Icons

const SubmitWorkStatusWidget: React.FC = () => {
  // Mocked dates for display purposes
  const lastSubmittedDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); // e.g., 2 days ago
  const nextReportDueDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }); // e.g., Tomorrow

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <CardTitle>My Work Status Report</CardTitle>
        </div>
        <CardDescription>Submit your daily or periodic work status report to your manager.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Keep your manager informed about your progress, accomplishments, and any blockers.
        </p>
        <div className="text-xs text-muted-foreground space-y-1">
            <p className="flex items-center">
                <CalendarClock className="h-3.5 w-3.5 mr-1.5 text-sky-600" />
                Last Submitted: <span className="font-medium ml-1">{lastSubmittedDate}</span>
            </p>
            <p className="flex items-center">
                <CalendarClock className="h-3.5 w-3.5 mr-1.5 text-amber-600" />
                Next Report Due: <span className="font-medium ml-1">{nextReportDueDate}</span> (Approx.)
            </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to="/employee/work-status">
            Submit / View My Status Report
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SubmitWorkStatusWidget;
