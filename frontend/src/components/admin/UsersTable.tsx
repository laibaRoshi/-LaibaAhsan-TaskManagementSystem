import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { User } from "lucide-react";

// This would typically be connected to your API
const fetchUsers = async () => {
  // Simulated data - replace with actual API call
  return [
    { id: 1, name: "Admin User", email: "admin@example.com", role: "admin", createdAt: "2023-01-15" },
    { id: 2, name: "John Doe", email: "john@example.com", role: "user", createdAt: "2023-02-10" },
    { id: 3, name: "Alice Smith", email: "alice@example.com", role: "user", createdAt: "2023-03-22" },
    { id: 4, name: "Bob Johnson", email: "bob@example.com", role: "user", createdAt: "2023-04-05" },
  ];
};

export const UsersTable = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: fetchUsers
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-semibold">System Users</h2>
        <Button>
          <User className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Created</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id} className="border-t hover:bg-muted/50">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-right">
                  <Button size="sm" variant="outline" className="mr-2">Edit</Button>
                  <Button size="sm" variant="outline" className="text-red-500">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};