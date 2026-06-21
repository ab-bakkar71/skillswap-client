"use client";

import { authClient } from '@/lib/auth-client';
import { Button, Description, FieldError, Form, Input, Label, Select, SelectItem, TextField } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handelRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        console.log(userData);

        if (userData.password !== userData.confirmPassword) {
            toast.error("Passwords do not match!");
            setIsLoading(false)
            return
        }
        const { data, error } = await authClient.signUp.email({
            name: userData.name,
            email: userData.email,
            password: userData.password,
            image: userData.image,
            role: userData.role
        });
        console.log(data);
        setIsLoading(false)

        if (error) {
            toast.error(error.message)
        } else {
            toast.success('Registration successful ✅');
            router.push("/login");
        }
    }

    const handelGoogleRegister = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    }



    return (

        <div className='min-h-screen bg-black text-white flex justify-center items-center p-4 relative overflow-hidden'>

            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#D470FF]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className='w-full max-w-lg p-6 sm:p-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl relative z-10 animate-in fade-in zoom-in duration-300'>

                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                        Create Your Account
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">Join thousands of professionals worldwide.</p>
                </div>

                <div className='flex flex-col gap-3 mb-4'>
                    <Button
                        onClick={handelGoogleRegister}
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

                <Form onSubmit={handelRegister} className="flex flex-col gap-4">

                    {/* Name Field */}
                    <TextField isRequired name="name" className="w-full">
                        <Label className="text-zinc-400 text-xs font-medium">Full Name</Label>
                        <Input placeholder="Enter Your Name" className="bg-zinc-900/60 border border-zinc-800 text-white rounded-xl" />
                        <FieldError className="text-rose-400 text-xs mt-1" />
                    </TextField>

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
                        <Label className="text-zinc-400 text-xs font-medium">Email</Label>
                        <Input placeholder="Enter your email" className="bg-zinc-900/60 border border-zinc-800 text-white rounded-xl" />
                        <FieldError className="text-rose-400 text-xs mt-1" />
                    </TextField>

                    {/* Image URL Field */}
                    <TextField isRequired name="image" type="text">
                        <Label className="text-zinc-400 text-xs font-medium">Image URL</Label>
                        <Input placeholder="https://example.com/avatar.jpg" className="bg-zinc-900/60 border border-zinc-800 text-white rounded-xl" />
                        <FieldError className="text-rose-400 text-xs mt-1" />
                    </TextField>

                    {/* Role Selection Dropdown Field */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-zinc-400 text-xs font-medium">I want to join as a</label>
                        <select
                            name="role"
                            className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-400 focus:text-white focus:outline-none cursor-pointer appearance-none"
                            defaultValue=""
                            required
                        >
                            <option value="" disabled className="bg-zinc-950 text-zinc-600">Select your role</option>
                            <option value="freelancer" className="bg-zinc-950 text-white">Freelancer (Looking for jobs)</option>
                            <option value="client" className="bg-zinc-950 text-white">Client (Hiring talent)</option>
                        </select>
                    </div>

                    {/* Password & Confirm Password Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TextField
                            isRequired
                            name="password"
                            type={showPassword ? "text" : "password"}
                            validate={(value) => {
                                if (value.length < 8) return "Password must be at least 8 characters";
                                if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                                if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                                return null;
                            }}
                        >
                            <Label className="text-zinc-400 text-xs font-medium">Password</Label>
                            <div className="relative flex items-center">
                                <Input placeholder="••••••••" className="bg-zinc-900/60 border border-zinc-800 text-white rounded-xl w-full pr-10" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 text-zinc-400 hover:text-white transition-colors focus:outline-none z-20 cursor-pointer"
                                >
                                    {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                                </button>
                            </div>
                            <FieldError className="text-rose-400 text-xs mt-1" />
                        </TextField>

                        {/* Confirm Password Field */}
                        <TextField isRequired name="confirmPassword" type={showConfirmPassword ? "text" : "password"}>
                            <Label className="text-zinc-400 text-xs font-medium">Confirm Password</Label>
                            <div className="relative flex items-center">
                                <Input placeholder="••••••••" className="bg-zinc-900/60 border border-zinc-800 text-white rounded-xl w-full pr-10" />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 text-zinc-400 hover:text-white transition-colors focus:outline-none z-20 cursor-pointer"
                                >
                                    {showConfirmPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
                                </button>
                            </div>
                            <FieldError className="text-rose-400 text-xs mt-1" />
                        </TextField>

                    </div>

                    <Description className="text-zinc-500 text-[11px] mt-1">
                        Must be at least 8 characters with 1 uppercase and 1 number
                    </Description>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 mt-4">
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className='w-full bg-brand-accent hover:bg-violet-600 text-white py-2.5 rounded-xl font-medium shadow-lg shadow-violet-500/20 transition-all duration-200 cursor-pointer'
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>  
                    </div>
                </Form>

                <p className="text-center mt-6 text-xs text-zinc-400">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;