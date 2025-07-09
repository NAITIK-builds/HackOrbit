import {
  AlertCircle,
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Chrome,
  ArrowRight,
  Key,
  User,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";


export default function Login() {
  const { signIn, signInWithProvider, user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const { data, error } = await signIn(formData.email, formData.password);
      
      if (!error && data?.user) {
        // Success is handled by the auth context
        navigate('/profile');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed', {
        description: 'Please try again'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    setSocialLoading(provider);
    try {
      const { error } = await signInWithProvider(provider);
      if (error) {
        // Error is already handled in the hook with toast
        console.error(`${provider} login error:`, error);
      } else {
        // Success will be handled by auth context
        toast.success(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login initiated`, {
          description: 'Please complete the authentication in the popup window.'
        });
      }
    } catch (error) {
      console.error('Social login error:', error);
      toast.error(`${provider} login failed`, {
        description: 'Please try again or use email/password login.'
      });
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <LogIn className="h-12 w-12 text-primary animate-pulse" />
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full blur-lg" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your HackOrbit account
          </p>
        </div>

        {/* Login Card */}
        <Card className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2">
              <User className="h-5 w-5" />
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Login */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin("google")}
                disabled={socialLoading !== null}
              >
                {socialLoading === 'google' ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                ) : (
                  <Chrome className="h-4 w-4 mr-2" />
                )}
                {socialLoading === 'google' ? 'Connecting...' : 'Continue with Google'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin("github")}
                disabled={socialLoading !== null}
              >
                {socialLoading === 'github' ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                ) : (
                  <Github className="h-4 w-4 mr-2" />
                )}
                {socialLoading === 'github' ? 'Connecting...' : 'Continue with GitHub'}
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@psit.ac.in"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, rememberMe: !!checked })
                    }
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Signing in...
                  </div>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Sign In
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-border/30">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/join"
                  className="text-primary hover:underline font-medium"
                >
                  Join HackOrbit
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* OAuth Setup Notice */}
        <Card className="mt-4 bg-blue-50/50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                OAuth Setup Required
              </span>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              Google and GitHub login require additional setup in Supabase Dashboard. Use email/password for now.
            </p>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="mt-6 bg-primary/5 border-primary/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Secure Login</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your data is protected with enterprise-grade security
            </p>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 bg-orange-50/50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Key className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-800 dark:text-orange-300">
                Demo Credentials
              </span>
            </div>
            <div className="space-y-1 text-xs text-orange-700 dark:text-orange-400">
              <p>Email: admin@hackorbit.com (Admin Access)</p>
              <p>Email: demo@psit.ac.in (Regular User)</p>
              <p>Password: password123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}