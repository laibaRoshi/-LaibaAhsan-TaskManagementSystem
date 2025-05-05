import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-6">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Button 
          onClick={() => navigate("/")}
          className="w-full"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;