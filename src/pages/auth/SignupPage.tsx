import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../../contexts/AuthContext'; // Added useAuth
// Using alert for now, sonner can be integrated later if needed.

const stepTitles = ['Account Details', 'Role Selection'];
const totalSteps = stepTitles.length;

// Define keyframes for fade-in animation (can be moved to a global CSS if used widely)
const fadeInOutAnimation = `
  @keyframes fadeInStep {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeOutStep {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(-20px); }
  }
  .animate-fadeInStep {
    animation: fadeInStep 0.3s ease-out forwards;
  }
  .animate-fadeOutStep { // Not directly used but useful for transitions if steps unmount
    animation: fadeOutStep 0.3s ease-in forwards;
  }
`;


const SignupPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { login } = useAuth(); // Get login function
  const navigate = useNavigate(); // For navigation

  // Step 1: Account Details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Step 2: Role Selection & Confirm Password
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleNext = () => {
    if (currentStep === 1) {
      if (!name || !email || !password) {
        alert('Please fill in all account details.');
        return;
      }
      // Basic email validation
      if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      // Basic password strength (e.g., min length)
      if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
      }
    }
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (!selectedRole) {
        alert('Please select a role.');
        return;
    }
    console.log('Signup Data:', { name, email, password, selectedRole });
    // Call login from AuthContext
    login(selectedRole);
    alert('Account creation successful! Logging you in...');
    navigate('/'); // Navigate to root, which will redirect based on role
  };

  // Memoize step content to avoid re-rendering of all steps on state change
  // This also helps with applying animations correctly when step changes
  const StepContent = useMemo(() => {
    const commonInputClass = "peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600";
    const commonLabelClass = "absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-indigo-600 peer-focus:text-sm";

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fadeInStep">
            <div className="relative">
              <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder=" " className={commonInputClass} required />
              <Label htmlFor="name" className={commonLabelClass}>Full Name</Label>
            </div>
            <div className="relative">
              <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " className={commonInputClass} required />
              <Label htmlFor="email" className={commonLabelClass}>Email Address</Label>
            </div>
            <div className="relative">
              <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " className={commonInputClass} required />
              <Label htmlFor="password" className={commonLabelClass}>Password</Label>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fadeInStep">
            <div className="relative">
              <Input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder=" " className={commonInputClass} required />
              <Label htmlFor="confirmPassword" className={commonLabelClass}>Confirm Password</Label>
            </div>
            <div>
              <Label htmlFor="role" className="text-sm text-gray-600">Select Your Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger id="role" className="w-full mt-1 h-10 border-b-2 border-gray-300 focus:border-indigo-600">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      default:
        return null;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, name, email, password, confirmPassword, selectedRole]); // Added missing dependencies to satisfy exhaustive-deps, though for this specific use case it might be fine without if values are only read when step changes.


  return (
    <>
      <style>{fadeInOutAnimation}</style>
      <div className="flex h-screen w-screen">
        {/* Image Carousel Section */}
        <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center p-4">
          <Carousel
            className="w-full max-w-md"
            plugins={Carousel.plugins && Carousel.plugins.autoplay ? [Carousel.plugins.autoplay({ delay: 5500 })] : undefined}
            opts={{ loop: true }}
          >
            <CarouselContent>
              <CarouselItem><img src="https://source.unsplash.com/random/800x600?collaboration" alt="Collaboration" className="h-full w-full object-cover rounded-lg shadow-lg" /></CarouselItem>
              <CarouselItem><img src="https://source.unsplash.com/random/800x600?community" alt="Community" className="h-full w-full object-cover rounded-lg shadow-lg" /></CarouselItem>
              <CarouselItem><img src="https://source.unsplash.com/random/800x600?growth" alt="Growth" className="h-full w-full object-cover rounded-lg shadow-lg" /></CarouselItem>
              <CarouselItem><img src="https://source.unsplash.com/random/800x600?innovation" alt="Innovation" className="h-full w-full object-cover rounded-lg shadow-lg" /></CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
          </Carousel>
        </div>

        {/* Signup Form Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white overflow-y-auto">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Create Your Account</h1>
              <p className="text-muted-foreground">Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 min-h-[250px]">
              {StepContent}

              <div className="flex justify-between pt-4">
                {currentStep > 1 && (
                  <Button type="button" onClick={handlePrevious} variant="outline">
                    Previous
                  </Button>
                )}
                {currentStep < totalSteps && (
                  <Button type="button" onClick={handleNext} className="ml-auto">
                    Next
                  </Button>
                )}
                {currentStep === totalSteps && (
                  <Button type="submit" className="ml-auto">
                    Create Account
                  </Button>
                )}
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
