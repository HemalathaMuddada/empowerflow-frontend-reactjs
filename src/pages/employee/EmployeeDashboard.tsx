import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockHolidays, mockLeaveBalances, mockTasks, mockPerformanceStatus, mockRecentPayslips } from '@/mockData/employeeDashboardData';
// Updated lucide-react import
import { Award, BarChart, CalendarDays, CheckCircle, ClipboardList, Download, ExternalLink, FileText, ListChecks, Target, Wallet, Gift } from 'lucide-react';
import { toast } from 'sonner'; // Added toast import

// Helper to format date strings (very basic)
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employee Dashboard</h1>
        {/* Birthday API Trigger Button Added Here */}
        <Button variant="outline" size="sm" onClick={() => toast.success('Birthday wishes sent to relevant API! (Mocked)', {icon: <Gift className="h-4 w-4 text-pink-500" />})}><Gift className="mr-2 h-4 w-4 text-pink-400" /> Birthday API Trigger</Button>
      </div>

      {/* Quick Stats / Overview Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Holiday</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockHolidays[1].name}</div>
            <p className="text-xs text-muted-foreground">on {formatDate(mockHolidays[1].date)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Leave Balance</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLeaveBalances.find(lb => lb.leaveType === 'Annual Leave')?.balance} Days</div>
            <p className="text-xs text-muted-foreground">out of {mockLeaveBalances.find(lb => lb.leaveType === 'Annual Leave')?.total} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTasks.filter(t => t.status === 'pending').length}</div>
            <p className="text-xs text-muted-foreground">{mockTasks.length} total tasks assigned</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* My Tasks Section */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center"><ListChecks className="mr-2 h-5 w-5" /> My Tasks</CardTitle>
            <CardDescription>Overview of your assigned tasks.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              {mockTasks.slice(0, 3).map(task => (
                <li key={task.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <span className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>{task.title}</span>
                    <p className="text-xs text-muted-foreground">Due: {formatDate(task.dueDate)} - Status: <span className={`font-semibold ${
                      task.status === 'pending' ? 'text-orange-500' : task.status === 'in-progress' ? 'text-blue-500' : 'text-green-500'
                    }`}>{task.status}</span></p>
                  </div>
                  <Button variant="outline" size="sm">View <ExternalLink className="ml-1 h-3 w-3" /></Button>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">View All Tasks</Button>
          </CardFooter>
        </Card>

        {/* Performance Status Section */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center"><Award className="mr-2 h-5 w-5" /> Performance Status</CardTitle>
            <CardDescription>Summary of your latest review ({mockPerformanceStatus.reviewPeriod}).</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-3">
              <span className="text-lg font-semibold">Overall Rating: {mockPerformanceStatus.rating} / 5</span>
            </div>
            <h4 className="font-medium mb-1">Highlights:</h4>
            <ul className="list-disc list-inside text-sm space-y-1 mb-3">
              {mockPerformanceStatus.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
             <h4 className="font-medium mb-1">Next Goals:</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {mockPerformanceStatus.goals.map((g, i) => <li key={i}>{g}</li>)}
            </ul>
          </CardContent>
           <CardFooter>
            <Button variant="secondary" className="w-full">View Detailed Review</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Holidays Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><CalendarDays className="mr-2 h-5 w-5" /> Upcoming Holidays</CardTitle>
            <CardDescription>Company holiday calendar.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {mockHolidays.slice(0, 4).map(holiday => (
                <li key={holiday.name} className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-muted">
                  <span>{holiday.name} ({holiday.type})</span>
                  <span className="text-muted-foreground">{formatDate(holiday.date)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">View Full Calendar</Button>
          </CardFooter>
        </Card>

        {/* Recent Payslips Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Wallet className="mr-2 h-5 w-5" /> Recent Payslips</CardTitle>
            <CardDescription>Access your latest payslip records.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockRecentPayslips.map(payslip => (
                <li key={payslip.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                  <div>
                    <span className="text-sm font-medium">Payslip - {payslip.period}</span>
                    <p className="text-xs text-muted-foreground">Amount: ${payslip.amount}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-1 h-3 w-3" /> Download
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">View All Payslips</Button>
          </CardFooter>
        </Card>
      </div>

    </div>
  );
}
