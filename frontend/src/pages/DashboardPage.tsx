import { useQuery } from "@tanstack/react-query";
import { getTaskStats } from "../services/taskService";
import Layout from "../components/layout/Layout";
import { Spinner } from "../components/ui/spinner";
import { CheckCircle, Clock, ClipboardList, AlertTriangle } from "lucide-react";
import React from 'react';

const Dashboard = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['taskStats'],
    queryFn: getTaskStats
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your tasks and progress</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner className="h-12 w-12" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-md">
            Error loading dashboard stats
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white shadow rounded-lg p-4 border-l-4 border-gray-400">
              <div className="flex items-center">
                <div className="bg-gray-100 p-3 rounded-full">
                  <ClipboardList className="h-5 w-5 text-gray-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Total Tasks</h3>
                  <p className="text-3xl font-bold">{stats?.totalTasks || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 border-l-4 border-yellow-400">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Pending</h3>
                  <p className="text-3xl font-bold">{stats?.pendingTasks || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 border-l-4 border-blue-400">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">In Progress</h3>
                  <p className="text-3xl font-bold">{stats?.inProgressTasks || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 border-l-4 border-green-400">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Completed</h3>
                  <p className="text-3xl font-bold">{stats?.completedTasks || 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional dashboard content can go here */}
      </div>
    </Layout>
  );
};

export default Dashboard;