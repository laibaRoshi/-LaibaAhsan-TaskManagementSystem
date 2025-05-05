
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTask, updateTask, getTaskById, getUsers } from "../../services/taskService";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

interface TaskFormProps {
  taskId?: string;
}

export default function TaskForm({ taskId }: TaskFormProps) {
  const navigate = useNavigate();
  const isEditMode = !!taskId;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Fetch task if in edit mode
  const { data: taskData, isLoading: taskLoading } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(taskId!),
    enabled: !!taskId,
  });

  // Fetch user list for dropdown
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Pre-fill form on edit
  useEffect(() => {
    if (taskData) {
      Object.entries(taskData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) setValue(key, value);
        if (key === "assignedTo" && typeof value === "object" && value.id) {
          setValue("assignedToId", value.id);
        }
      });
    }
  }, [taskData, setValue]);

  // Mutations
  const mutation = useMutation({
    mutationFn: (data: any) => (isEditMode ? updateTask(taskId!, data) : createTask(data)),
    onSuccess: () => {
      toast.success(`Task ${isEditMode ? "updated" : "created"} successfully`);
      navigate("/tasks");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  if (taskLoading || usersLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
      {/* Title */}
      <div>
        <Label>Title</Label>
        <Input {...register("title", { required: "Title is required" })} />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message?.toString()}</p>}
      </div>

      {/* Description */}
      <div>
        <Label>Description</Label>
        <Textarea {...register("description", { required: "Description is required" })} />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message?.toString()}</p>}
      </div>

      {/* Due Date */}
      <div>
        <Label>Due Date</Label>
        <Input type="date" {...register("dueDate", { required: "Due date is required" })} />
        {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message?.toString()}</p>}
      </div>

      {/* Category */}
      <div>
        <Label>Category</Label>
        <Input {...register("category", { required: "Category is required" })} />
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message?.toString()}</p>}
      </div>

      {/* Priority */}
      <div>
        <Label>Priority</Label>
        <Select
          onValueChange={(val) => setValue("priority", val)}
          defaultValue={watch("priority") || ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div>
        <Label>Status</Label>
        <Select
          onValueChange={(val) => setValue("status", val)}
          defaultValue={watch("status") || ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In-Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Assigned To */}
      <div>
        <Label>Assign To</Label>
        <Select
          onValueChange={(val) => setValue("assignedToId", val)}
          defaultValue={watch("assignedToId") || ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user: any) => (
              <SelectItem key={user.id} value={user.id}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submit */}
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : isEditMode ? "Update Task" : "Create Task"}
      </Button>
    </form>
  );
};
