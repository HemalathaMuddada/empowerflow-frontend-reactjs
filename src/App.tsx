import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
import RaiseConcernPage from './pages/employee/RaiseConcernPage';
import DocumentCenterPage from './pages/employee/DocumentCenterPage';
import HikeInfoPage from './pages/employee/HikeInfoPage';
import TaskListPage from './pages/employee/TaskListPage';
import DeclarationsPage from './pages/employee/DeclarationsPage';
import { Toaster } from 'sonner';

import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Import new dashboards
import LeadDashboard from './pages/lead/LeadDashboard';
import HrDashboard from './pages/hr/HrDashboard';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard';

// Layout for authenticated users
const AuthenticatedLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 pt-16"> {/* Add padding-top to account for fixed Header */}
        <Sidebar />
        <MainContent>
          <Outlet /> {/* Nested routes will render here */}
        </MainContent>
      </div>
      <Toaster richColors />
    </div>
  );
};

// Simple component to handle root navigation
const RootRedirector: React.FC = () => {
  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role-based redirection logic
  // This can be expanded with more roles
  switch (authState.userRole) {
    case 'employee':
      return <Navigate to="/employee/dashboard" replace />;
    case 'lead':
      return <Navigate to="/lead/dashboard" replace />;
    case 'hr':
      return <Navigate to="/hr/dashboard" replace />;
    case 'manager':
      return <Navigate to="/manager/dashboard" replace />;
    case 'super_admin':
      return <Navigate to="/admin/dashboard" replace />;
    default:
      // Fallback if role is unknown or not set, though AuthContext should prevent null role when authenticated
      console.warn('Unknown user role:', authState.userRole);
      return <Navigate to="/login" replace />; // Or a generic dashboard
  }
};

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Authenticated routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AuthenticatedLayout />}>
              <Route path="/" element={<RootRedirector />} />
              {/* Employee Routes */}
              <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
              <Route path="/employee/leave" element={<LeaveManagementPage />} />
              <Route path="/employee/payslips" element={<PayslipsPage />} />
              <Route path="/employee/holidays" element={<HolidaysPage />} />
              <Route path="/employee/attendance" element={<AttendancePage />} />
              <Route path="/employee/work-status" element={<WorkStatusPage />} />
              <Route path="/employee/concerns" element={<RaiseConcernPage />} />
              <Route path="/employee/documents" element={<DocumentCenterPage />} />
              <Route path="/employee/hike-info" element={<HikeInfoPage />} />
              <Route path="/employee/tasks" element={<TaskListPage />} />
              <Route path="/employee/declarations" element={<DeclarationsPage />} />

              {/* Other Role Dashboards */}
              <Route path="/lead/dashboard" element={<LeadDashboard />} />
              <Route path="/hr/dashboard" element={<HrDashboard />} />
              <Route path="/manager/dashboard" element={<ManagerDashboard />} />
              <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />

              {/* Common components page - can be kept for dev/testing if needed under authenticated route */}
              <Route path="/common-components" element={<CommonComponentsPage />} />
            </Route>
          </Route>

          {/* Fallback for any other path - could be a 404 page */}
          {/* For now, redirecting to root which will handle auth check */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
