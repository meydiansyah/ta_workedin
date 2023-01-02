import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/inertia-react";

export default function Guest({ children, head }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <ApplicationLogo
                        className="w-20 h-20 fill-current text-gray-500"
                        login={true}
                    />
                </Link>
            </div>

            <div className="flex flex-col w-full sm:max-w-md">
                <div className="my-6 max-w-md mx-auto">{head}</div>
                <div className=" px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg ">
                    {children}
                </div>
            </div>
        </div>
    );
}
