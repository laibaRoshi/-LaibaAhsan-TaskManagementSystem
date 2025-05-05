

import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">TaskManagement</h1>
          <p className="mt-2 text-gray-600">Sign in to manage your tasks</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;