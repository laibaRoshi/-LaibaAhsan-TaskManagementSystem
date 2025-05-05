import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../services/taskService";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PlusCircle, Search, Filter } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../ui/card";
import { Badge } from "../ui/badge";



export default function TaskList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-md">
        Error loading tasks
      </div>
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
          {filteredTasks.map((task) => (
            <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/tasks/${task.id}`)}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                </div>
                <CardDescription className="line-clamp-2">{task.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{task.category}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-between">
                <div className="text-sm">
                  Assigned to: <span className="font-medium">{task.assignedTo.name}</span>
                </div>
                <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}