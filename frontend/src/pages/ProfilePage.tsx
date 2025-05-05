
import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../components/auth/AuthProvider";
import { User } from "../lib/types";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement actual update here
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };

  if (!formData) {
    return (
      <Layout>
        <div className="text-center py-10">
          <p>User data not available</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing || formData.role === 'admin'} // Don't allow email change for admins
                />
              </div>
              
              <div>
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  value={formData.role}
                  disabled={true} // Role can't be changed
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => {
                        setFormData(user);
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </>
                ) : (
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;