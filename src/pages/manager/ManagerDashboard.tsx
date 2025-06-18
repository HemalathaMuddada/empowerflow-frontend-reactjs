import React from 'react';

const ManagerDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Manager Dashboard</h1>
      <p className="text-lg text-muted-foreground text-center">
        Content coming soon! This dashboard will be tailored for Managers with oversight tools.
      </p>
      {/* Placeholder for future content */}
      <div className="mt-8 flex justify-center">
        <div className="p-4 bg-gray-100 rounded-lg w-1/2 text-center">
          <p className="text-sm text-gray-500">Future department analytics and team performance metrics will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
