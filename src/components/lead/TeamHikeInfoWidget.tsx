import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockTeamHikeInfo, TeamHikeEntry } from '@/mockData/teamHikeInfo';
import { TrendingUp, DollarSign, Percent, CalendarDays, CheckSquare, XSquare, Info } from 'lucide-react'; // Icons

const TeamHikeInfoWidget: React.FC = () => {
  const teamHikes = mockTeamHikeInfo; // In a real app, this would be fetched or from props/context

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getStatusBadgeVariant = (status: TeamHikeEntry['status']): React.ComponentProps<typeof Badge>['variant'] => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending_approval':
        return 'warning';
      case 'rejected':
        return 'destructive';
      case 'processing':
        return 'info';
      default:
        return 'outline';
    }
  };

  const getStatusIcon = (status: TeamHikeEntry['status']) => {
    switch (status) {
      case 'approved':
        return <CheckSquare className="h-4 w-4 text-green-600" />;
      case 'pending_approval':
        return <Info className="h-4 w-4 text-yellow-600" />;
      case 'rejected':
        return <XSquare className="h-4 w-4 text-red-600" />;
      case 'processing':
        return <Info className="h-4 w-4 text-blue-600" />; // Or a different icon for processing
      default:
        return null;
    }
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <CardTitle>Team Hike Information</CardTitle>
        </div>
        <CardDescription>Overview of proposed and approved salary hikes for your team members.</CardDescription>
      </CardHeader>
      <CardContent>
        {teamHikes.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No hike information available for the team.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead className="text-right"><DollarSign className="inline h-4 w-4 mr-1" />Current CTC</TableHead>
                <TableHead className="text-right"><Percent className="inline h-4 w-4 mr-1" />Hike %</TableHead>
                <TableHead className="text-right"><DollarSign className="inline h-4 w-4 mr-1" />New CTC</TableHead>
                <TableHead><CalendarDays className="inline h-4 w-4 mr-1" />Effective Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamHikes.map((hike) => (
                <TableRow key={hike.id}>
                  <TableCell className="font-medium">{hike.employeeName}</TableCell>
                  <TableCell className="text-right">{formatCurrency(hike.currentCTC)}</TableCell>
                  <TableCell className="text-right">{hike.proposedHikePercentage}%</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(hike.newCTC)}</TableCell>
                  <TableCell>{formatDate(hike.effectiveDate)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(hike.status)} className="flex items-center gap-1 capitalize">
                       {getStatusIcon(hike.status)}
                       {hike.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground truncate" title={hike.comments}>
                    {hike.comments ? hike.comments.substring(0, 30) + (hike.comments.length > 30 ? '...' : '') : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamHikeInfoWidget;
