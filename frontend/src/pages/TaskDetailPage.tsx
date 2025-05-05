import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskById } from "../services/taskService";
import { Spinner } from "../components/ui/spinner";
import { Badge } from "../components/ui/badge";

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data: task, isLoading, error } = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTaskById(id!)
  });

  if (isLoading) {
    return <div className="flex justify-center py-12"><Spinner className="h-12 w-12" /></div>;
  }

  if (error || !task) {
    return <div className="p-4 text-red-600 bg-red-50 rounded">Failed to load task details.</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="text-gray-600">{task.description}</p>
      <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      <p><strong>Category:</strong> {task.title}</p>
      <p><strong>Assigned To:</strong> {task.assignedTo?.name}</p>
      <Badge>{task.status}</Badge>
    </div>
  );
}
