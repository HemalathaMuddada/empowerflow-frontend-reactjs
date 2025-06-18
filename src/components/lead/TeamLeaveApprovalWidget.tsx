import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { mockTeamLeaveRequests, TeamLeaveRequest } from '@/mockData/teamLeaveRequests';
import { Briefcase, CheckCircle, XCircle, MessageSquare } from 'lucide-react'; // Icons

const TeamLeaveApprovalWidget: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<TeamLeaveRequest[]>(mockTeamLeaveRequests);
  const [selectedRequest, setSelectedRequest] = useState<TeamLeaveRequest | null>(null);
  const [notes, setNotes] = useState('');
  const [dialogAction, setDialogAction] = useState<'approve' | 'reject' | null>(null);

  const pendingRequests = leaveRequests.filter(req => req.status === 'pending');

  const openDialog = (request: TeamLeaveRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setDialogAction(action);
    setNotes(''); // Reset notes
  };

  const handleActionConfirm = () => {
    if (!selectedRequest || !dialogAction) return;

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    setLeaveRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === selectedRequest.id
          ? { ...req, status: dialogAction, reviewNotes: notes, reviewedBy: 'Lead User', reviewDate: today }
          : req
      )
    );

    toast.success(`Leave request ${dialogAction}d successfully.`, {
      description: `${selectedRequest.employeeName}'s request for ${selectedRequest.leaveType}.`,
    });

    setSelectedRequest(null);
    setDialogAction(null);
    // DialogClose will be handled by its own trigger if used, or manually close if not.
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <CardTitle>Team Leave Approvals</CardTitle>
          </div>
          <Badge variant="outline">Pending: {pendingRequests.length}</Badge>
        </div>
        <CardDescription>Review and act on pending leave requests from your team.</CardDescription>
      </CardHeader>
      <CardContent>
        {pendingRequests.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No pending leave requests.</p>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{request.employeeName}</h4>
                    <p className="text-sm text-muted-foreground">{request.leaveType}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(request.startDate)} - {formatDate(request.endDate)}
                  </p>
                </div>
                <p className="text-sm my-2 line-clamp-2" title={request.reason}>{request.reason}</p>
                <div className="flex justify-end space-x-2 mt-2">
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => openDialog(request, 'reject')}>
                      <XCircle className="mr-1 h-4 w-4" /> Reject
                    </Button>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={() => openDialog(request, 'approve')}>
                       <CheckCircle className="mr-1 h-4 w-4" /> Approve
                    </Button>
                  </DialogTrigger>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {pendingRequests.length > 0 && (
        <CardFooter className="text-xs text-muted-foreground">
           Showing {pendingRequests.length} of {leaveRequests.filter(r => r.status === 'pending').length} total pending requests.
        </CardFooter>
      )}

      {/* Dialog for Approve/Reject with Notes */}
      <Dialog open={!!selectedRequest && !!dialogAction} onOpenChange={(isOpen) => {
        if (!isOpen) {
          setSelectedRequest(null);
          setDialogAction(null);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogAction === 'approve' ? 'Approve' : 'Reject'} Leave Request
            </DialogTitle>
            <DialogDescription>
              For {selectedRequest?.employeeName} ({selectedRequest?.leaveType})
              <br />
              Dates: {selectedRequest ? `${formatDate(selectedRequest.startDate)} - ${formatDate(selectedRequest.endDate)}` : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
            <Label htmlFor="notes" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
              Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={dialogAction === 'approve' ? "e.g., Approved, please ensure handoff." : "e.g., Rejected due to critical project deadlines."}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleActionConfirm}
              variant={dialogAction === 'reject' ? 'destructive' : 'default'}
            >
              {dialogAction === 'approve' ? 'Confirm Approve' : 'Confirm Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TeamLeaveApprovalWidget;
