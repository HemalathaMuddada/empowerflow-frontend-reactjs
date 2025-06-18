import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { mockTeamMembers, TeamMember } from '@/mockData/leadTeamData';
import { mockTeamTasks, TeamTask } from '@/mockData/teamTasks'; // Import existing tasks for display (optional part)
import { ClipboardEdit, UserPlus, CalendarIcon, AlertTriangle } from 'lucide-react'; // Icons
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const AssignTaskWidget: React.FC = () => {
  const [selectedMemberId, setSelectedMemberId] = useState<string>('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Local state for tasks, initialized with mock data.
  // In a real app, this would come from context or a data store.
  const [teamTasks, setTeamTasks] = useState<TeamTask[]>(mockTeamTasks);

  const handleAssignTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMemberId) {
      toast.error('Please select a team member.', { icon: <UserPlus className="h-4 w-4" /> });
      return;
    }
    if (!taskTitle.trim()) {
      toast.error('Task title cannot be empty.', { icon: <AlertTriangle className="h-4 w-4" /> });
      return;
    }
    if (!taskDescription.trim()) {
      toast.error('Task description cannot be empty.', { icon: <AlertTriangle className="h-4 w-4" /> });
      return;
    }
    if (!dueDate) {
      toast.error('Please select a due date.', { icon: <CalendarIcon className="h-4 w-4" /> });
      return;
    }

    const selectedMember = mockTeamMembers.find(member => member.id === selectedMemberId);
    if (!selectedMember) {
      toast.error('Selected team member not found.'); // Should not happen if UI is correct
      return;
    }

    const newTask: TeamTask = {
      id: uuidv4(),
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      assignedToId: selectedMember.id,
      assignedToName: selectedMember.name,
      dueDate,
      priority,
      status: 'pending',
      assignedBy: 'Lead User (Mock)', // Mocked Lead User
      createdDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    };

    // Update local task list
    setTeamTasks(prevTasks => [newTask, ...prevTasks]);

    toast.success(`Task "${newTask.title}" assigned to ${selectedMember.name}.`);

    // Reset form
    setSelectedMemberId('');
    setTaskTitle('');
    setTaskDescription('');
    setDueDate('');
    setPriority('medium');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-CA'); // YYYY-MM-DD for input type="date" compatibility
  };

  // Filter for recently assigned tasks for the optional display (e.g., last 5)
  const recentTasks = teamTasks.slice(0, 5);


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <ClipboardEdit className="h-6 w-6 text-primary" />
          <CardTitle>Assign Task to Team Member</CardTitle>
        </div>
        <CardDescription>Fill in the details below to assign a new task.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAssignTask} className="space-y-4">
          <div>
            <Label htmlFor="teamMember">Assign To</Label>
            <Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
              <SelectTrigger id="teamMember" className="w-full">
                <SelectValue placeholder="Select a team member" />
              </SelectTrigger>
              <SelectContent>
                {mockTeamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name} ({member.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="taskTitle">Task Title</Label>
            <Input
              id="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g., Implement user authentication"
            />
          </div>

          <div>
            <Label htmlFor="taskDescription">Task Description</Label>
            <Textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Detailed description of the task requirements..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]} // Minimum date is today
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(value) => setPriority(value as 'low' | 'medium' | 'high')}>
                <SelectTrigger id="priority" className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">Assign Task</Button>
        </form>
      </CardContent>

      {/* Optional: Display recently assigned/team tasks */}
      {recentTasks.length > 0 && (
        <>
          <CardFooter className="flex-col items-start pt-4 border-t mt-4">
             <h3 className="text-lg font-semibold mb-2">Recently Assigned Tasks</h3>
             <div className="space-y-2 w-full">
                {recentTasks.map(task => (
                    <div key={task.id} className="p-2 border rounded-md text-sm">
                        <p className="font-medium">{task.title} <span className={`px-2 py-0.5 text-xs rounded-full ${
                            task.priority === 'high' ? 'bg-red-100 text-red-700' :
                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                        }`}>{task.priority}</span></p>
                        <p className="text-muted-foreground">To: {task.assignedToName} | Due: {formatDate(task.dueDate)} | Status: {task.status}</p>
                    </div>
                ))}
             </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default AssignTaskWidget;
