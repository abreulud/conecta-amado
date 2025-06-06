import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const user = useTracker(() => Meteor.user());
  const navigate = useNavigate();

  const handleLogout = () => {
    Meteor.logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Admin Dashboard - Welcome {user?.profile?.name}
          </h2>
          <button
            onClick={handleLogout}
            className="auth-button bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admin Features */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">User Management</h3>
            <button className="admin-button">
              View All Users
            </button>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">System Settings</h3>
            <button className="admin-button">
              Configure Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};