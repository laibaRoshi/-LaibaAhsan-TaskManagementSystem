import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { toast } from "sonner";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with your actual API call
    toast.success("Signup successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md space-y-4 w-full max-w-md">
        <h2 className="text-xl font-bold">Create an Account</h2>

        <div>
          <Label htmlFor="username">Username</Label>
          <Input name="username" value={form.username} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" value={form.email} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" value={form.password} onChange={handleChange} />
        </div>

        <Button type="submit" className="w-full">Sign Up</Button>
      </form>
    </div>
  );
}
