import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, CalendarCheck, FileText, ClipboardList, ShieldAlert, FolderOpen, TrendingUp, ListChecks, FileUp, Users, CalendarDays } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth

// Define navigation items for Employee
const employeeNavItems = [
  { href: '/employee/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/employee/leave', label: 'Leave Management', icon: CalendarCheck },
  { href: '/employee/payslips', label: 'Payslips', icon: FileText },
  { href: '/employee/holidays', label: 'Holidays', icon: CalendarDays },
  { href: '/employee/attendance', label: 'Attendance', icon: ClipboardList },
  { href: '/employee/work-status', label: 'Work Status', icon: ListChecks },
  { href: '/employee/concerns', label: 'Raise Concerns', icon: ShieldAlert },
  { href: '/employee/documents', label: 'Document Center', icon: FolderOpen },
  { href: '/employee/hike-info', label: 'Hike Information', icon: TrendingUp },
  { href: '/employee/tasks', label: 'Task List', icon: ListChecks },
  { href: '/employee/declarations', label: 'IT & FBP Declarations', icon: FileUp },
];

// Define navigation items for Lead by combining specific Lead items and common Employee items
const leadSpecificNavItems = [
  { href: '/lead/dashboard', label: 'Lead Dashboard', icon: LayoutDashboard },
  // Future Lead-specific full-page links can be added here.
  // For example: { href: '/lead/team-performance', label: 'Team Performance', icon: Users }
];

const commonEmployeeLinksForLead = employeeNavItems.filter(
  item => item.href !== '/employee/dashboard' // Exclude the generic employee dashboard
);

const leadNavItems = [...leadSpecificNavItems, ...commonEmployeeLinksForLead];

// Define other roles' nav items as needed: hrNavItems, managerNavItems, superAdminNavItems
// Example for HR (can be expanded later)
const hrNavItems = [
  { href: '/hr/dashboard', label: 'HR Dashboard', icon: LayoutDashboard },
  ...commonEmployeeLinksForLead.filter(item => ![
    // Potentially filter out items not relevant for HR from common list, e.g.
    // '/employee/work-status',
    // '/employee/tasks'
  ].includes(item.href)),
  // Add HR specific links e.g. { href: '/hr/recruitment', label: 'Recruitment', icon: UserPlus }
];


export default function Sidebar() {
  const location = useLocation();
  const { authState } = useAuth(); // Get auth state

  let navItems = employeeNavItems; // Default to employee

  if (authState.userRole === 'lead') {
    navItems = leadNavItems;
  } else if (authState.userRole === 'hr') {
    navItems = hrNavItems; // Example for HR role
  }
  // Add more else if blocks for 'manager', 'super_admin' when their nav items are defined.

  return (
    <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-64 shrink-0 md:sticky md:block overflow-y-auto py-6 pr-6 lg:py-8 border-r">
      {authState.isAuthenticated && authState.userRole && (
        <div className="px-3 py-2 mb-2">
          <span className="text-sm font-semibold text-muted-foreground">
            Role: {authState.userRole.charAt(0).toUpperCase() + authState.userRole.slice(1)}
          </span>
        </div>
      )}
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              'flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
              // Check if current path is exactly item.href or starts with it for parent routes
              (location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href + '/')))
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground'
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Link>
        ))}
        {/* Link to common components showcase for dev purposes - can be removed in production */}
        <Link
            to={'/common-components'}
            className={cn(
              'flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
              location.pathname === '/common-components' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            )}
          >
            Common Components
        </Link>
      </nav>
    </aside>
  );
}
