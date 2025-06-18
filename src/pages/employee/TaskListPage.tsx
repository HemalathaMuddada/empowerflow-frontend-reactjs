import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockTasks as allMockTasks } from '@/mockData/employeeDashboardData'; // Using dashboard data
import { ListChecks, ExternalLink, SlidersHorizontal } from 'lucide-react';
import { toast } from 'sonner';

type TaskStatus = 'all' | 'pending' | 'in-progress' | 'completed';

export default function TaskListPage() {
  const [statusFilter, setStatusFilter] = useState<TaskStatus>('all');

  const filteredTasks = allMockTasks.filter(task => {
    if (statusFilter === 'all') return true;
    return task.status === statusFilter;
  });

  const handleStatusUpdate = (taskId: string, newStatus: string) => {
    // Mock update
    toast.info(`Task ${taskId} status updated to ${newStatus} (mock).`);
    // In a real app, you'd update the state here or refetch.
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">My Task List</h1>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground"/>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as TaskStatus)}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        {filteredTasks.length > 0 ? filteredTasks.map(task => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle className={`text-lg ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>{task.title}</CardTitle>
              <CardDescription>Due: {new Date(task.dueDate).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">Status: <span className={`font-semibold ${
                task.status === 'pending' ? 'text-orange-500' : task.status === 'in-progress' ? 'text-blue-500' : 'text-green-500'
              }`}>{task.status}</span></p>
              {/* Add more task details here if available */}
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Select
                defaultValue={task.status}
                onValueChange={(newStatus) => handleStatusUpdate(task.id, newStatus)}
              >
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Update status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">Details <ExternalLink className="ml-1 h-3 w-3" /></Button>
            </CardFooter>
          </Card>
        )) : (
          <Card><CardContent className="text-center py-8 text-muted-foreground">No tasks match the current filter.</CardContent></Card>
        )}
      </div>
    </div>
  );
}
