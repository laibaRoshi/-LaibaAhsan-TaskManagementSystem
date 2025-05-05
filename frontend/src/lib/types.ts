
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AppTask {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  category: string;
  assignedTo: {
    id: string;
    name: string;
  };
}

export interface TaskFormData {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  category: string;
  assignedToId?: string;
}

export interface TaskStats {
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
}