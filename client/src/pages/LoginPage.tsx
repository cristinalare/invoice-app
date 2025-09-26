import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginSchema, type LoginCredentials } from "../schemas";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoggingIn, loginError, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/invoices");
    }
  }, [isAuthenticated, navigate]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getErrorMessage = (error: any): string => {
    if (error?.response?.status === 401) {
      return "Invalid email or password. Please try again.";
    }
    return (
      error?.response?.data?.message ||
      error?.message ||
      "Login failed. Please try again."
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<LoginCredentials> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof LoginCredentials] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    login(formData);
  };

  const handleChange =
    (field: keyof LoginCredentials) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Welcome to your invoice app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {loginError && (
                <div className="text-sm text-red-500 text-center">
                  {getErrorMessage(loginError)}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
