"use client"


import { authClient } from '@/lib/auth-client';
import { Button, Form, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { toast } from 'react-toastify';

const loginPage = () => {

    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handelLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries());
        

        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
        })
        setIsLoading(false)
        if (error) {
            toast.error(error.message || "Invalid email or password");
        } else {
            toast.success('Welcome back! Login successful ✅');
            router.push("/")
        }
    }

    const handelGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    }


    return (
        <div className='min-h-screen bg-black text-white flex justify-center items-center p-4 relative overflow-hidden'>
            {/* Background Atmosphere Lights - matching register page */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#D470FF]/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Glassmorphic Form Wrapper */}
            <div className='w-full max-w-md p-6 sm:p-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl relative z-10 animate-in fade-in zoom-in duration-300'>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                        Sign In to HIRE<span className="text-blue-500">LOOP</span>
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">Welcome back! Please enter your credentials.</p>
                </div>

              <div className='flex flex-col gap-3 mb-4'>
                  <Button
                    onClick={handelGoogleSignIn}
                    className="w-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 py-2.5 rounded-xl font-medium transition-all duration-200"
                >
                    <FcGoogle className="w-4 h-4 mr-1 inline" />
                    Sign in with Google
                </Button>

                <div className="flex items-center my-1">
                    <div className="flex-1 h-[1px] bg-zinc-800" />
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest px-3">Or continue with</span>
                    <div className="flex-1 h-[1px] bg-zinc-800" />
                </div>
              </div>

                <Form onSubmit={handelLogin} className="flex flex-col gap-4" >

                    {/* Email Field */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-zinc-400 text-xs font-medium">Email Address</Label>
                        <Input placeholder="name@company.com" className="bg-zinc-900/60 border border-zinc-800 text-white rounded-xl" />
                    </TextField>

                    {/* Password Field */}
                    <TextField isRequired name="password">
                        <div className="flex justify-between items-center w-full">
                            <Label className="text-zinc-400 text-xs font-medium">Password</Label>
                            <Link href="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative flex items-center mt-1">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="bg-zinc-900/60 border border-zinc-800 text-white rounded-xl w-full pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-zinc-400 hover:text-white transition-colors focus:outline-none z-20"
                            >
                                {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                            </button>
                        </div>
                    </TextField>

                    {/* Remember Me Checkbox (Optional Native Layout) */}
                    <div className="flex items-center gap-2 mt-1">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            id="rememberMe"
                            className="w-4 h-4 rounded bg-zinc-900 border-zinc-800 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                        />
                        <label htmlFor="rememberMe" className="text-xs text-zinc-400 select-none cursor-pointer">
                            Remember me for 30 days
                        </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 mt-4">
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className='w-full bg-brand-accent hover:bg-violet-600 text-white py-2.5 rounded-xl font-medium shadow-lg shadow-violet-500/20 transition-all duration-200 cursor-pointer'
                        >
                            {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                    </div>
                </Form>

                <p className="text-center mt-6 text-xs text-zinc-400">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline">
                        Create one free
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default loginPage;