import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Users, ClipboardCheck, TrendingUp, FileText } from 'lucide-react'; // Icons

// Import Lead Widgets
import TeamLeaveApprovalWidget from '@/components/lead/TeamLeaveApprovalWidget';
import AssignTaskWidget from '@/components/lead/AssignTaskWidget';
import TeamHikeInfoWidget from '@/components/lead/TeamHikeInfoWidget';
import SubmitWorkStatusWidget from '@/components/lead/SubmitWorkStatusWidget';

const LeadDashboard: React.FC = () => {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl font-bold tracking-tight">Lead Dashboard</h1>
        {/* Optional: Add a quick action button or date range filter here if needed in future */}
      </div>

      <Alert className="bg-sky-50 border-sky-200 text-sky-700 dark:bg-sky-900/30 dark:border-sky-700 dark:text-sky-300">
        <Info className="h-5 w-5 text-sky-600 dark:text-sky-400" />
        <AlertTitle className="font-semibold text-sky-700 dark:text-sky-300">Employee Portal Access</AlertTitle>
        <AlertDescription>
          As a Lead, you also have access to all Employee Portal functionalities (e.g., My Profile, Payslips, Holidays) via the sidebar.
        </AlertDescription>
      </Alert>

      {/* Main Grid for Widgets */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">

        {/* Column 1: Often for primary actions or larger widgets */}
        <div className="space-y-6 xl:col-span-2"> {/* AssignTaskWidget and TeamLeaveApprovalWidget can span more if needed or be grouped */}
          <AssignTaskWidget />
          <TeamLeaveApprovalWidget />
        </div>

        {/* Column 2 (or 3 on xl): Secondary info or smaller widgets */}
        <div className="space-y-6 xl:col-span-1">
          <TeamHikeInfoWidget />
          <SubmitWorkStatusWidget />
          {/* Placeholder for more widgets like 'Team Performance Overview' or 'Quick Links' */}
          <div className="p-4 bg-muted/40 rounded-lg border border-dashed">
            <h3 className="text-lg font-semibold text-muted-foreground flex items-center"><Users className="mr-2 h-5 w-5" />Team Overview</h3>
            <p className="text-sm text-muted-foreground mt-1">Future widget: Quick stats about your team.</p>
          </div>
        </div>
      </div>

      {/* Example of a full-width widget if needed below the grid */}
      {/*
      <div className="mt-6">
        <Card>
          <CardHeader><CardTitle>Team Calendar/Timeline</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Full-width widget placeholder for team events or project timelines.</p>
          </CardContent>
        </Card>
      </div>
      */}
    </div>
  );
};

export default LeadDashboard;
