import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ThemeProvider from './contexts/ThemeProvider';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';
import CommonComponentsPage from './pages/CommonComponentsPage';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import LeaveManagementPage from './pages/employee/LeaveManagementPage';
import PayslipsPage from './pages/employee/PayslipsPage';
import HolidaysPage from './pages/employee/HolidaysPage';
import AttendancePage from './pages/employee/AttendancePage';
import WorkStatusPage from './pages/employee/WorkStatusPage';
// Added imports for new pages
import RaiseConcernPage from './pages/employee/RaiseConcernPage';
import DocumentCenterPage from './pages/employee/DocumentCenterPage';
import HikeInfoPage from './pages/employee/HikeInfoPage';
import TaskListPage from './pages/employee/TaskListPage';
import DeclarationsPage from './pages/employee/DeclarationsPage';
import { Toaster, toast } from 'sonner';
import { Button } from './components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"


function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to EmpowerFlow</h1>
      <p className="mb-4">This is a placeholder home page. (You are seeing this if Navigate failed or direct access)</p>
      <div className="flex space-x-2">
        <Button onClick={() => toast.success('Event has been created!', { description: 'Monday, January 23, 2023 at 9:00 AM' })}>
          Show Success Toast
        </Button>
        <Button variant="destructive" onClick={() => toast.error('Event has failed!', { description: 'Please try again.'})}>
          Show Error Toast
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Modal</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Modal Title</DialogTitle>
              <DialogDescription>
                This is a sample modal dialog. You can put any content here.
              </Description>
            </DialogHeader>
            <p>Modal content goes here...</p>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Close</Button>
              </DialogClose>
              <Button type="button">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <MainContent>
              <Routes>
                <Route path="/" element={<Navigate to="/employee/dashboard" replace />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/common-components" element={<CommonComponentsPage />} />
                <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
                <Route path="/employee/leave" element={<LeaveManagementPage />} />
                <Route path="/employee/payslips" element={<PayslipsPage />} />
                <Route path="/employee/holidays" element={<HolidaysPage />} />
                <Route path="/employee/attendance" element={<AttendancePage />} />
                <Route path="/employee/work-status" element={<WorkStatusPage />} />
                {/* Updated routes for new pages */}
                <Route path="/employee/concerns" element={<RaiseConcernPage />} />
                <Route path="/employee/documents" element={<DocumentCenterPage />} />
                <Route path="/employee/hike-info" element={<HikeInfoPage />} />
                <Route path="/employee/tasks" element={<TaskListPage />} />
                <Route path="/employee/declarations" element={<DeclarationsPage />} />
              </Routes>
            </MainContent>
          </div>
          <Toaster richColors />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
