import TaskForm from "../components/tasks/TaskForm";
import Layout from "../components/layout/Layout";

export default function NewTaskPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Create New Task</h1>
        <TaskForm />
      </div>
    </Layout>
  );
}