import React from 'react';

const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Super Admin Dashboard</h1>
      <p className="text-lg text-muted-foreground text-center">
        Content coming soon! This dashboard will provide system-wide administrative controls.
      </p>
      {/* Placeholder for future content */}
      <div className="mt-8 flex justify-center">
        <div className="p-4 bg-gray-100 rounded-lg w-1/2 text-center">
          <p className="text-sm text-gray-500">User management, system settings, and global configurations will be available here.</p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
