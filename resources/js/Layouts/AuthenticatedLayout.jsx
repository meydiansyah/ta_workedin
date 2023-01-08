import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/inertia-react";
import Navbar from "@/Components/Navbar";

export default function Authenticated({ header, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            {header && (
                <header className="bg-white shadow pt-16 fixed top-0 w-full">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="pt-32">{children}</main>
        </div>
    );
}
