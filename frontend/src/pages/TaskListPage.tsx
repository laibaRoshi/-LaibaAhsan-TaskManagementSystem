
import Layout from "../components/layout/Layout";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../services/taskService";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../components/ui/spinner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import { AppTask } from "../lib/types";
import { Badge } from "../components/ui/badge";

const TaskListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center py-12">
          <Spinner className="h-12 w-12" />
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="bg-red-50 text-red-700 p-4 rounded-md">
          Error loading tasks
        </div>
      </Layout>
    );
  }
  
  const filteredTasks = tasks?.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Tasks</h1>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button onClick={() => navigate('/tasks/new')}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>
        
        {filteredTasks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No tasks found</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task: AppTask) => (
              <div 
                key={task.id}
                className="bg-white border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/tasks/${task.id}`)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{task.title}</h3>
                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-500">Due: </span>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TaskListPage;