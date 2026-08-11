import Link from "next/link";
import { PanelLeftOpen } from "lucide-react";


function Navbar() {
    return (
        <header className="navbar bg-base-200 shadow-sm">
            <div className="flex-1 flex flex-row">
                <label htmlFor="dashboard-drawer" aria-label="open sidebar" className="flex md:hidden btn btn-square btn-ghost drawer-button">
                    <PanelLeftOpen size={16}/>
                </label>
                <Link href="/" className="flex-1 md:flex-none btn btn-ghost text-xl">Orby</Link>
            </div>

            <div className="hidden md:flex flex-none p-3 gap-3">
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
        </header>
    );
}


export default Navbar;