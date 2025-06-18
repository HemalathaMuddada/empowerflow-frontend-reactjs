import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext'; // Added useAuth

// Define keyframes for fade-in animation
const fadeInAnimation = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Get login function from AuthContext
  const navigate = useNavigate(); // For navigation after login

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation (can be enhanced)
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    console.log('Login attempt with:', { email, password });
    // For mock purposes, log in with a default role or a role determined by email (e.g. lead@example.com)
    let role = 'employee'; // Default role
    if (email.startsWith('lead@')) role = 'lead';
    else if (email.startsWith('hr@')) role = 'hr';
    else if (email.startsWith('manager@')) role = 'manager';
    else if (email.startsWith('admin@')) role = 'super_admin';

    login(role); // Call login from AuthContext
    navigate('/'); // Navigate to root, which will redirect based on role
  };

  return (
    <>
      <style>{fadeInAnimation}</style>
      <div className="flex h-screen w-screen">
        {/* Image Carousel Section */}
        <div className="hidden md:flex md:w-1/2 bg-gray-100 items-center justify-center p-4">
          <Carousel className="w-full max-w-md" autoPlay plugins={Carousel.plugins && Carousel.plugins.autoplay ? [Carousel.plugins.autoplay({ delay: 5000 })] : undefined} opts={{ loop: true }}>
            <CarouselContent>
              <CarouselItem>
                <img src="https://source.unsplash.com/random/800x600?office" alt="Office" className="h-full w-full object-cover rounded-lg shadow-lg" />
              </CarouselItem>
              <CarouselItem>
                <img src="https://source.unsplash.com/random/800x600?business" alt="Business" className="h-full w-full object-cover rounded-lg shadow-lg" />
              </CarouselItem>
              <CarouselItem>
                <img src="https://source.unsplash.com/random/800x600?technology" alt="Technology" className="h-full w-full object-cover rounded-lg shadow-lg" />
              </CarouselItem>
              <CarouselItem>
                <img src="https://source.unsplash.com/random/800x600?success" alt="Success" className="h-full w-full object-cover rounded-lg shadow-lg" />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="ml-12" />
            <CarouselNext className="mr-12" />
          </Carousel>
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
          <div className="w-full max-w-sm space-y-6">
            <div className="text-center animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to continue to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field with Floating Label Attempt */}
              <div className="relative animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" " // Required for :placeholder-shown to work
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                  required
                />
                <Label
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-indigo-600 peer-focus:text-sm"
                >
                  Email address
                </Label>
              </div>

              {/* Password Field with Floating Label Attempt */}
              <div className="relative animate-fadeIn" style={{ animationDelay: '0.3s' }}>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" " // Required for :placeholder-shown to work
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                  required
                />
                <Label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-indigo-600 peer-focus:text-sm"
                >
                  Password
                </Label>
              </div>

              <Button type="submit" className="w-full animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                Login
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
