import {
  UserPlus,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Github,
  Chrome,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Rocket,
  Users,
  Code,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Join() {
  const { signUp, signInWithProvider, user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Step 2: Personal Details
    phone: "",
    year: "",
    branch: "",
    rollNumber: "",
    // Step 3: Preferences
    agreeToTerms: false,
    agreeToUpdates: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (step === 2) {
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
      }
      if (!formData.year) {
        newErrors.year = "Year is required";
      }
      if (!formData.branch) {
        newErrors.branch = "Branch is required";
      }
      if (!formData.rollNumber) {
        newErrors.rollNumber = "Roll number is required";
      }
    }

    if (step === 3) {
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = "You must agree to the terms and conditions";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (validateStep(3)) {
      setIsLoading(true);
      try {
        const { error } = await signUp(formData.email, formData.password, {
          full_name: formData.fullName,
          phone: formData.phone,
          year: formData.year,
          branch: formData.branch,
          roll_number: formData.rollNumber,
        });

        if (error) {
          setErrors({ general: error.message });
        } else {
          navigate('/profile');
        }
      } catch (error) {
        setErrors({ general: 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSocialSignup = async (provider: 'github' | 'google') => {
    try {
      const { error } = await signInWithProvider(provider);
      if (error) {
        setErrors({ general: error.message });
      }
    } catch (error) {
      setErrors({ general: 'Social signup failed' });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />

      <div className="max-w-2xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Rocket className="h-12 w-12 text-primary animate-pulse" />
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full blur-lg" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4">
            Join HackOrbit
          </h1>
          <p className="text-muted-foreground">
            Become part of PSIT's premier tech community
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step <= currentStep
                    ? "bg-gradient-to-r from-primary to-blue-600 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  step
                )}
              </div>
              <div className="text-xs mt-2 text-center">
                {step === 1 && "Basic Info"}
                {step === 2 && "Details"}
                {step === 3 && "Preferences"}
              </div>
              {step < 3 && (
                <div
                  className={`hidden md:block w-full h-0.5 mt-4 transition-all duration-300 ${
                    step < currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Registration Card */}
        <Card className="bg-card/50 backdrop-blur-sm border border-border/50 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2">
              <UserPlus className="h-5 w-5" />
              Step {currentStep} of 3
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error Display */}
            {errors.general && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
              </div>
            )}

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Social Signup */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialSignup("google")}
                  >
                    <Chrome className="h-4 w-4 mr-2" />
                    Sign up with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSocialSignup("github")}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Sign up with GitHub
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

                {/* Basic Form */}
                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className={`pl-10 ${errors.fullName ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-sm text-red-500">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
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

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
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

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personal Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  {/* Year */}
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Select
                      value={formData.year}
                      onValueChange={(value) =>
                        setFormData({ ...formData, year: value })
                      }
                    >
                      <SelectTrigger
                        className={errors.year ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.year && (
                      <p className="text-sm text-red-500">{errors.year}</p>
                    )}
                  </div>

                  {/* Branch */}
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Select
                      value={formData.branch}
                      onValueChange={(value) =>
                        setFormData({ ...formData, branch: value })
                      }
                    >
                      <SelectTrigger
                        className={errors.branch ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science Engineering">
                          Computer Science Engineering
                        </SelectItem>
                        <SelectItem value="Information Technology">
                          Information Technology
                        </SelectItem>
                        <SelectItem value="Electronics & Communication">
                          Electronics & Communication
                        </SelectItem>
                        <SelectItem value="Mechanical Engineering">
                          Mechanical Engineering
                        </SelectItem>
                        <SelectItem value="Civil Engineering">
                          Civil Engineering
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.branch && (
                      <p className="text-sm text-red-500">{errors.branch}</p>
                    )}
                  </div>

                  {/* Roll Number */}
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber">Roll Number</Label>
                    <Input
                      id="rollNumber"
                      placeholder="2022CSE123"
                      value={formData.rollNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, rollNumber: e.target.value })
                      }
                      className={errors.rollNumber ? "border-red-500" : ""}
                    />
                    {errors.rollNumber && (
                      <p className="text-sm text-red-500">
                        {errors.rollNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, agreeToTerms: !!checked })
                      }
                      className={errors.agreeToTerms ? "border-red-500" : ""}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm font-normal cursor-pointer"
                      >
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-primary hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </div>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-red-500">
                      {errors.agreeToTerms}
                    </p>
                  )}

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="updates"
                      checked={formData.agreeToUpdates}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          agreeToUpdates: !!checked,
                        })
                      }
                    />
                    <Label
                      htmlFor="updates"
                      className="text-sm font-normal cursor-pointer"
                    >
                      I want to receive updates about events and opportunities
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Creating Account...
                    </div>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4 mr-2" />
                      Join HackOrbit
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-border/30">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Preview */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-card/30 backdrop-blur-sm text-center p-4">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1">Join Community</h3>
            <p className="text-xs text-muted-foreground">
              Connect with 500+ tech enthusiasts
            </p>
          </Card>
          <Card className="bg-card/30 backdrop-blur-sm text-center p-4">
            <Code className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1">Learn & Build</h3>
            <p className="text-xs text-muted-foreground">
              Access workshops and projects
            </p>
          </Card>
          <Card className="bg-card/30 backdrop-blur-sm text-center p-4">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1">Free Resources</h3>
            <p className="text-xs text-muted-foreground">
              Curated learning materials
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}