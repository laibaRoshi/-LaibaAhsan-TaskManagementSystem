import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import { Badge } from "../ui/badge";
import { Check, Clock, AlertTriangle } from "lucide-react";

// This would typically be connected to your API
const fetchTasksForAdmin = async () => {
  // Simulated data - replace with actual API call
  return [
    { id: 1, title: "Design new layout", description: "Create wireframes", status: "completed", priority: "high", assignedTo: "John Doe", dueDate: "2023-05-15" },
    { id: 2, title: "Implement authentication", description: "Add JWT auth flow", status: "in-progress", priority: "high", assignedTo: "Alice Smith", dueDate: "2023-05-20" },
    { id: 3, title: "Database migration", description: "Migrate to new schema", status: "pending", priority: "medium", assignedTo: "Bob Johnson", dueDate: "2023-05-25" },
    { id: 4, title: "Testing framework", description: "Setup Jest and write tests", status: "in-progress", priority: "medium", assignedTo: "John Doe", dueDate: "2023-05-18" },
    { id: 5, title: "Deploy to production", description: "Final deployment steps", status: "pending", priority: "high", assignedTo: "Admin User", dueDate: "2023-05-30" },
  ];
};

export const TasksOverview = () => {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['adminTasks'],
    queryFn: fetchTasksForAdmin
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <Check className="h-4 w-4 text-green-600" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-600" />;
      case "pending": return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="rounded-md border">
      <h2 className="text-xl font-semibold p-4">All Tasks</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="py-3 px-4 text-left">Task</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Priority</th>
              <th className="py-3 px-4 text-left">Assigned To</th>
              <th className="py-3 px-4 text-left">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task) => (
              <tr key={task.id} className="border-t hover:bg-muted/50">
                <td className="py-3 px-4">
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-muted-foreground">{task.description}</div>
                </td>
                <td className="py-3 px-4">
                  <Badge className={getStatusClass(task.status)}>
                    <span className="flex items-center">
                      {getStatusIcon(task.status)}
                      <span className="ml-1 capitalize">{task.status}</span>
                    </span>
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge className={getPriorityClass(task.priority)}>
                    {task.priority}
                  </Badge>
                </td>
                <td className="py-3 px-4">{task.assignedTo}</td>
                <td className="py-3 px-4">{new Date(task.dueDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};