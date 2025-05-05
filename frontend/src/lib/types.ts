
export interface AppTask {
    id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    priority: "low" | "medium" | "high";
    assignedTo?: { name: string };
    dueDate: string;
  }
  
  export interface TaskFormData {
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    priority: "low" | "medium" | "high";
    dueDate: string;
  }
  
  export interface TaskStats {
    totalTasks: number;
    pendingTasks: number;
    inProgressTasks: number;
    completedTasks: number;
  }
  
  export interface User {
    name: string;
    role: "admin" | "user";
    email: string;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  