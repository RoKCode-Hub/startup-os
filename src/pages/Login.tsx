import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/authStore";

const Login = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await register(email, password);
        if (error) {
          toast.error(error);
        } else {
          toast.success("Sign up successful! Check your email to confirm.");
          setIsSignUp(false);
        }
      } else {
        const success = await login(email, password);
        if (success) {
          toast.success("Login successful!");
          navigate("/");
        } else {
          toast.error("Invalid credentials");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold mb-6 text-center">
              {isSignUp ? "Create Account" : "Login"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (isSignUp ? "Signing up..." : "Logging in...") : isSignUp ? "Sign Up" : "Login"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <button
                className="underline"
                onClick={() => setIsSignUp((v) => !v)}
              >
                {isSignUp ? "Have an account? Login" : "New here? Create an account"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
