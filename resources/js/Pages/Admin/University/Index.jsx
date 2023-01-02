import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";

export default function UniversitiesAdmin(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        University
                    </h2>
                    <Link
                        href={route("university.create")}
                        className="inline-flex items-center px-4 py-2 bg-[#2C7E5B] border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-grey focus:bg-grey active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-grey focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Create
                    </Link>
                </div>
            }
        >
            <Head title="Admin - University" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">List University</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
