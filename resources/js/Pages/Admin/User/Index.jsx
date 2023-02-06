import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import EmptyContent from "@/Components/Empty";
import { Head, Link } from "@inertiajs/inertia-react";
import HeaderClient from "@/Components/HeaderClient";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { Inertia } from "@inertiajs/inertia";

export default function UsersAdmin(props) {
    const getStatus = (status) => {
        switch (status) {
            case "accepted":
            case "active":
                return "bg-green-500 text-white";
            case "onreview":
            case "ongoing":
            case "deactive":
                return "bg-orange-500 text-white";
            case "rejected":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Users
                    </h2>
                </div>
            }
        >
            <Head title="Admin - Users" />

            {props.users.data.length > 0 ? (
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="flex justify-between">
                                <div className="p-6 text-gray-900">
                                    Daftar User
                                </div>
                                {props.users.last_page >= 2 && (
                                    <div className="p-6 text-gray-900">
                                        {props.users.current_page} dari{" "}
                                        {props.users.last_page} halaman
                                    </div>
                                )}
                            </div>

                            <div className="relative mx-4 mb-4 overflow-x-auto sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Kode
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Username
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center"
                                            >
                                                Role
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center"
                                            >
                                                Terverifikasi
                                                <span className="block">
                                                    (email)
                                                </span>
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.users.data.map((data) => (
                                            <tr
                                                key={data.id}
                                                className="bg-white border-b hover:bg-gray-100"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    {data.id}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {data.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {data.email}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {data.role.name}
                                                </td>

                                                <td className="px-6 py-4 flex">
                                                    <div
                                                        className={`px-4 py-1 rounded-md mx-auto font-semibold text-sm ${getStatus(
                                                            data.status.name
                                                        )}`}
                                                    >
                                                        {data.status.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {data.email_verified_at ? (
                                                        <div className="flex justify-center text-green-600">
                                                            <MdOutlineMarkEmailRead
                                                                size={25}
                                                            />
                                                        </div>
                                                    ) : (
                                                        "Belum terverifikasi"
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        typeof="button"
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    "Are you sure you want to delete this user?"
                                                                )
                                                            ) {
                                                                Inertia.delete(
                                                                    route(
                                                                        "admin.user.delete",
                                                                        data.id
                                                                    )
                                                                );
                                                            }
                                                        }}
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
                        {props.users.last_page !== 1 && (
                            <div className="flex justify-between mt-6 text-sm">
                                {props.users.current_page !== 1 ? (
                                    <Link
                                        href={props.users.prev_page_url}
                                        className="py-2 px-4 rounded-md bg-white shadow-sm hover:underline"
                                    >
                                        {"< "} Sebelumnya
                                    </Link>
                                ) : (
                                    <div></div>
                                )}
                                x
                                {props.users.current_page !==
                                    props.users.last_page && (
                                    <Link
                                        href={props.users.next_page_url}
                                        className="py-2 px-4 rounded-md bg-white shadow-sm hover:underline"
                                    >
                                        {"> "} Selanjutnya
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <EmptyContent description="Data users masih kosong" />
            )}
        </AuthenticatedLayout>
    );
}

export const CustomView = () => {
    return (
        <>
            <div className="sticky top-44 bg-blue-600 h-[400px] overflow shadow-sm sm:rounded-lg md:flex flex-col md:flex-row ">
                <div className="h-[1000px] overflow flex flex-col w-full md:w-64 text-gray-700 flex-shrink-0">
                    Hello
                </div>
            </div>
            <div className="px-4 py-8 md:flex-1 md:py-7 md:overflow-y-auto bg-white shadow-sm sm:rounded-lg">
                <div className="h-[1000px]"></div>
            </div>
        </>
    );
};
