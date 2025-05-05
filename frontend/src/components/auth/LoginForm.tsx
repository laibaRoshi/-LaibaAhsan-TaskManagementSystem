import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { LoginCredentials, User } from "../../lib/types";
import { loginUser } from "../../services/authService";
import { toast } from "sonner";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginCredentials>({
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
      const user: User = await loginUser(formData);

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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
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
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
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
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
            >
              Sign Up
            </a>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginForm;
