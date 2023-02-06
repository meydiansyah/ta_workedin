import { Link, usePage } from "@inertiajs/inertia-react";

export default function SubNavLink({ href, active, children }) {
    const { is_admin } = usePage().props;
    return (
        <Link
            href={href}
            className={`text-xl leading-tight transition duration-150 ease-in-out ${
                active
                    ? "font-semibold text-gray-800"
                    : "font-medium text-gray-500 hover:text-gray-700"
            }`}
        >
            {children}
        </Link>
    );
}
