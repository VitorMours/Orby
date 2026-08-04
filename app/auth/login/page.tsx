"use client";

import { Navbar } from "@/components";
import Link from "next/link";

export default function LoginPage() {

    return(
        <>
            <Navbar />
        
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="card w-1/4 h-1/2 shadow-sm rounded-lg bg-base-100">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-2xl font-bold mb-4">Login</h2>
                        <form className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full"
                            />
                            <Link href="/auth/signup" className="text-sm text-primary hover:underline self-end">
                                Don't have an account? Sign up
                            </Link>
                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-4"
                            >
                                Log in
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        
        </>

    );

}