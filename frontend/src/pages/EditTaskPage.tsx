import { useParams } from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm";

export default function EditTaskPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <TaskForm taskId={id} />
    </div>
  );
}
