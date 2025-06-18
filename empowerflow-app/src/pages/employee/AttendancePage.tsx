import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, LogIn, LogOut, Hourglass } from 'lucide-react';
import { toast } from 'sonner';

export default function AttendancePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [punchInTime, setPunchInTime] = useState<Date | null>(null);
  const [punchOutTime, setPunchOutTime] = useState<Date | null>(null);
  const [totalHours, setTotalHours] = useState<string | null>(null);
  const [isPunchedIn, setIsPunchedIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePunchIn = () => {
    const now = new Date();
    setPunchInTime(now);
    setPunchOutTime(null); // Reset punch out time
    setTotalHours(null); // Reset total hours
    setIsPunchedIn(true);
    toast.success('Punched In successfully!', { description: now.toLocaleTimeString() });
  };

  const handlePunchOut = () => {
    if (!punchInTime) return;
    const now = new Date();
    setPunchOutTime(now);
    setIsPunchedIn(false);

    const durationMs = now.getTime() - punchInTime.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    setTotalHours(`${hours} hrs ${minutes} mins`);
    toast.success('Punched Out successfully!', { description: now.toLocaleTimeString() });
  };

  const todayDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Attendance Tracker</h1>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center"><Clock className="mr-2 h-5 w-5" /> Manual Punch In/Out</CardTitle>
          <CardDescription>Today: {todayDate}</CardDescription>
          <p className="text-2xl font-bold text-center py-2">{currentTime.toLocaleTimeString()}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Button
              onClick={handlePunchIn}
              disabled={isPunchedIn}
              className="w-full"
            >
              <LogIn className="mr-2 h-4 w-4" /> Punch In
            </Button>
            <Button
              onClick={handlePunchOut}
              disabled={!isPunchedIn}
              variant="destructive"
              className="w-full"
            >
              <LogOut className="mr-2 h-4 w-4" /> Punch Out
            </Button>
          </div>
          {punchInTime && (
            <div className="p-3 bg-muted rounded-md text-sm">
              <p><strong>Punched In:</strong> {punchInTime.toLocaleTimeString()}</p>
              {punchOutTime && <p><strong>Punched Out:</strong> {punchOutTime.toLocaleTimeString()}</p>}
              {totalHours && <p className="mt-2 pt-2 border-t"><strong>Total Hours:</strong> <span className='font-semibold text-green-600 dark:text-green-400'>{totalHours}</span></p>}
            </div>
          )}
        </CardContent>
        <CardFooter className='text-xs text-muted-foreground'>
            <Hourglass className='mr-1 h-3 w-3'/> This is a manual tracker. Official times may vary.
        </CardFooter>
      </Card>
      {/* Placeholder for future: Display list of today's punches or recent attendance history */}
    </div>
  );
}
