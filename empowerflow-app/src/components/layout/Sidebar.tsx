import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation
import { cn } from '@/lib/utils'; // For conditional classes
import { LayoutDashboard, CalendarCheck, FileText, ClipboardList, ShieldAlert, FolderOpen, TrendingUp, ListChecks, FileUp, Users, CalendarDays } from 'lucide-react'; // Icons (added CalendarDays)

// Define navigation items for Employee
const employeeNavItems = [
  { href: '/employee/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/employee/leave', label: 'Leave Management', icon: CalendarCheck },
  { href: '/employee/payslips', label: 'Payslips', icon: FileText },
  { href: '/employee/holidays', label: 'Holidays', icon: CalendarDays }, // Corrected icon
  { href: '/employee/attendance', label: 'Attendance', icon: ClipboardList },
  { href: '/employee/work-status', label: 'Work Status', icon: ListChecks },
  { href: '/employee/concerns', label: 'Raise Concerns', icon: ShieldAlert },
  { href: '/employee/documents', label: 'Document Center', icon: FolderOpen },
  { href: '/employee/hike-info', label: 'Hike Information', icon: TrendingUp },
  { href: '/employee/tasks', label: 'Task List', icon: ListChecks },
  { href: '/employee/declarations', label: 'IT & FBP Declarations', icon: FileUp },
];

// Basic placeholder for other role items for context - will be expanded later
const leadNavItems = [ ...employeeNavItems, { href: '/lead/team-dashboard', label: 'Team Dashboard', icon: Users }];

export default function Sidebar() {
  const location = useLocation(); // Get current location

  // TODO: Later, determine role and show appropriate nav items
  const navItems = employeeNavItems; // Default to employee for now

  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 md:sticky md:block overflow-y-auto py-6 pr-6 lg:py-8 border-r">
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              'flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
              location.pathname.startsWith(item.href) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground' // Updated condition
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Link>
        ))}
        {/* Link to common components showcase for dev purposes */}
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
