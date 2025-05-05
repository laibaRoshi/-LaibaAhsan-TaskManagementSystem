import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // For now, simply navigate to login
    navigate("/login");
  }, [navigate]);
  
  return null;
};

export default Index;