
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import AuthProvider from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";

// Import pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardPage from "./pages/DashboardPage";
import TaskListPage from "./pages/TaskListPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import NewTaskPage from "./pages/NewTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><TaskListPage /></ProtectedRoute>} />
            <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetailPage /></ProtectedRoute>} />
            <Route path="/tasks/new" element={<ProtectedRoute><NewTaskPage /></ProtectedRoute>} />
            <Route path="/tasks/edit/:id" element={<ProtectedRoute><EditTaskPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;