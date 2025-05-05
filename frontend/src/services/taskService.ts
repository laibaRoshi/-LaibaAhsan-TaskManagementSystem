
import api from './api';
import { AppTask, TaskFormData, TaskStats } from '../lib/types';

// Fetch all tasks
export const getTasks = async (): Promise<AppTask[]> => {
  const response = await api.get('/tasks');
  return response.data;
};

// Fetch a single task by ID
export const getTaskById = async (taskId: string): Promise<AppTask> => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data;
};

// Create a new task
export const createTask = async (taskData: TaskFormData): Promise<AppTask> => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

// Update an existing task by ID
export const updateTask = async (taskId: string, taskData: TaskFormData): Promise<AppTask> => {
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

// Delete a task by ID
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

// Fetch task statistics
export const getTaskStats = async (): Promise<TaskStats> => {
  const response = await api.get('/tasks/stats');
  return response.data;
};

// Mock function to get users until the endpoint is available
export const getUsers = async (): Promise<{id: string, name: string}[]> => {
  return [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" }
  ];
};