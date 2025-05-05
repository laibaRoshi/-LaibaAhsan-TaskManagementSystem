
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "../components/layout/Layout";
import { Spinner } from "../components/ui/spinner";
import { Button } from "../components/ui/button";

// Mock function to fetch admin stats
const fetchAdminStats = async () => {
  // Simulated data - replace with actual API call
  return {
    totalUsers: 24,
    totalTasks: 156,
    tasksThisWeek: 32,
    completedTasksThisWeek: 18,
  };
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'tasks'>('overview');
  
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: fetchAdminStats
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your system</p>
        </div>

        <div className="flex space-x-1 border-b">
          <Button 
            variant={activeTab === 'overview' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button 
            variant={activeTab === 'users' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('users')}
          >
            Users
          </Button>
          <Button 
            variant={activeTab === 'tasks' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('tasks')}
          >
            Tasks
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner className="h-12 w-12" />
          </div>
        ) : (
          <div className="mt-6">
            {activeTab === 'overview' && (
              <div className="grid gap-6 md:grid-cols-4">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-medium">Total Users</h3>
                  <p className="text-3xl font-bold mt-2">{stats?.totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-medium">Total Tasks</h3>
                  <p className="text-3xl font-bold mt-2">{stats?.totalTasks}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-medium">Tasks This Week</h3>
                  <p className="text-3xl font-bold mt-2">{stats?.tasksThisWeek}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-medium">Completed This Week</h3>
                  <p className="text-3xl font-bold mt-2">{stats?.completedTasksThisWeek}</p>
                </div>
              </div>
            )}
            {activeTab === 'users' && (
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-medium mb-4">User Management</h3>
                <p className="text-gray-500">User management interface will be implemented here.</p>
              </div>
            )}
            {activeTab === 'tasks' && (
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-medium mb-4">Task Management</h3>
                <p className="text-gray-500">Task management interface will be implemented here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;