import Link from "next/link";

export default function Navbar() {
    return (
        <div className="navbar bg-base-200 shadow-sm">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">daisyUI</Link>
            </div>
            <div className="flex flex-none p-3 gap-3">
                <Link href="/auth/signup" className="rounded-md px-4 py-2 
                                                transition-all duration-200 ease-in-out 
                                                hover:bg-base-100">
                    Sign up
                </Link>
                <Link
                    href="/auth/login"
                    className="rounded-md px-4 py-2 
                               transition-all duration-200 ease-in-out 
                               hover:bg-base-100"
                >
                    Log in
                </Link>
            </div>
        </div>
    );
}