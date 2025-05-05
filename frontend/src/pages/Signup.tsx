
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner";
import { registerUser } from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call your API
      await registerUser({
        name: form.name,
        email: form.email,
        password: form.password
      });
      
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">TaskManagement</h1>
          <p className="mt-2 text-gray-600">Create your account</p>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <Button className="w-full" disabled={isLoading} type="submit">
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
              
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                >
                  Log in
                </a>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
