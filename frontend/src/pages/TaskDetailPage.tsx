
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getTaskById, deleteTask } from "../services/taskService";
import { Spinner } from "../components/ui/spinner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import Layout from "../components/layout/Layout";
import { Edit, Trash2, Calendar, User, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: task, isLoading, error } = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTaskById(id!)
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onSuccess: () => {
      toast.success("Task deleted successfully");
      navigate("/tasks");
    },
    onError: () => {
      toast.error("Failed to delete task");
    }
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteMutation.mutate(id!);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center py-12"><Spinner className="h-12 w-12" /></div>
      </Layout>
    );
  }

  if (error || !task) {
    return (
      <Layout>
        <div className="p-4 text-red-600 bg-red-50 rounded">Failed to load task details.</div>
      </Layout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate("/tasks")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tasks
          </Button>
        </div>
        
        <div className="flex flex-wrap justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-1">{task.title}</h1>
            <div className="flex gap-2 mb-4">
              <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
              <Badge variant="outline">{task.category}</Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/tasks/edit/${id}`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              className="text-red-500 hover:text-red-700 hover:bg-red-50" 
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Task Details</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="mt-1">{task.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
                <p className="mt-1 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  {new Date(task.dueDate).toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Assigned To</h3>
                <p className="mt-1 flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  {task.assignedTo?.name || "Unassigned"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}