
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { loginUser } from "../services/authService";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await loginUser(formData);

      toast("Login successful", {
        description: `Welcome back, ${user.name}!`,
      });

      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast("Login failed", {
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">TaskManagement</h1>
          <p className="mt-2 text-gray-600">Sign in to manage your tasks</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            <Button className="w-full mt-2" disabled={isLoading} type="submit">
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signup");
                }}
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;