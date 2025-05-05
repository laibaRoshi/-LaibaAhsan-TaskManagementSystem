import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../../services/authService";
import { Spinner } from "../ui/spinner";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated()) {
        setAuthorized(false);
        setLoading(false);
        return;
      }
      
      const userIsAdmin = await isAdmin();
      setAuthorized(userIsAdmin);
      setLoading(false);
    };
    
    checkAuth();
  }, []);
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to dashboard if not admin
  if (!authorized) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;