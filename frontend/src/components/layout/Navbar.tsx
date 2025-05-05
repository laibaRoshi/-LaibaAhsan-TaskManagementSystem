
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../auth/AuthProvider";
import { logoutUser } from "../../services/authService";
import { Menu, X, Home, CheckSquare, User, LogOut, Settings } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  
  // If no user is logged in, don't render the navbar
  if (!user) {
    return null;
  }
  
  // Base navigation items for all users
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Tasks", href: "/tasks", icon: CheckSquare },
    { name: "Profile", href: "/profile", icon: User },
  ];
  
  // Only add Admin link if user is admin
  if (isAdmin) {
    navigation.push({ name: "Admin", href: "/admin", icon: Settings });
  }

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a href="/dashboard" className="font-bold text-xl text-primary">TaskManagement</a>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navigation.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                    }}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      isActive(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-gray-600 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <ItemIcon className="h-4 w-4 mr-1" />
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="ghost"
              onClick={handleLogout}
              className="hidden md:inline-flex text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const ItemIcon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <div className="flex items-center">
                    <ItemIcon className="h-5 w-5 mr-2" />
                    {item.name}
                  </div>
                </a>
              );
            })}
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 mt-4"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;