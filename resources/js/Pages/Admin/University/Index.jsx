import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/inertia-react";

export default function UniversitiesAdmin(props) {
    // const { data } = usePage().props;
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Universitas
                    </h2>
                    <Link
                        href={route("university.create")}
                        className="inline-flex items-center px-4 py-2 bg-[#2C7E5B] border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-grey focus:bg-grey active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-grey focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Tambah
                    </Link>
                </div>
            }
        >
            <Head title="Admin - University" />

            {props.universities && (
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"></div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

const BaseView = () => {
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">Daftar Universitas</div>

            <div className="relative mx-4 mb-4 overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Kode
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.universities.map((data) => (
                            <tr
                                key={data.codept}
                                className="bg-white border-b hover:cursor-pointer hover:bg-gray-100 hover:underline hover:underline-offset-4"
                                onClick={(e) =>
                                    Inertia.get(
                                        route("university.detail", data.codept)
                                    )
                                }
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    {data.codept}
                                </th>
                                <td className="px-6 py-4">{data.name}</td>

                                <td className="px-6 py-4 text-right">
                                    <Link
                                        className="font-medium text-blue-600  hover:underline"
                                        href={route(
                                            "university.detail",
                                            data.codept
                                        )}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        type="button"
                                        className="font-medium ml-4 text-red-600  hover:underline"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
