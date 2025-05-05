import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm";
import Layout from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditTaskPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(`/tasks/${id}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Task
          </Button>
        </div>
        
        <h1 className="text-2xl font-bold">Edit Task</h1>
        <TaskForm taskId={id} />
      </div>
    </Layout>
  );
}
