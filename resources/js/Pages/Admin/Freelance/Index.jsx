import EmptyContent from "@/Components/Empty";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/inertia-react";

export default function FreelanceAdmin(props) {
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
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Freelances
                    </h2>
                    <Link
                        href={route("freelance.create")}
                        className="inline-flex items-center px-4 py-2 bg-[#2C7E5B] border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-grey focus:bg-grey active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-grey focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Tambah
                    </Link>
                </div>
            }
        >
            <Head title="Admin - Freelance" />

            {props.freelance.data.length > 0 ? (
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="flex justify-between">
                                <div className="p-6 text-gray-900">
                                    Daftar Freelance (Mahasiswa)
                                </div>
                                {props.freelance.last_page >= 2 && (
                                    <div className="p-6 text-gray-900">
                                        {props.freelance.current_page} dari{" "}
                                        {props.freelance.last_page} halaman
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
                                                NIM
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Nama Lengkap
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Universitas
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Jurusan
                                            </th>

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center"
                                            >
                                                Status
                                            </th>
                                            {/* <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.freelance.data.map((data) => (
                                            <tr
                                                key={data.nim}
                                                className="bg-white border-b hover:cursor-pointer hover:bg-gray-100 "
                                                onClick={(e) =>
                                                    Inertia.get(
                                                        route(
                                                            "freelance.edit",
                                                            data.id
                                                        )
                                                    )
                                                }
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    {data.nim ??
                                                        "Belum terdaftar"}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {data.full_name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {data.university
                                                        ? data.university.name
                                                        : "Belum terdaftar"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {data.major
                                                        ? data.major.name
                                                        : "Belum terdaftar"}
                                                </td>

                                                <td className="px-6 py-4 flex">
                                                    <div
                                                        className={`px-4 py-2 rounded-md mx-auto font-bold ${getStatus(
                                                            data.user.status
                                                                .name
                                                        )}`}
                                                    >
                                                        {data.user.status.name}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {props.freelance.last_page !== 1 && (
                            <div className="flex justify-between mt-6 text-sm">
                                {props.freelance.current_page !== 1 ? (
                                    <Link
                                        href={props.freelance.prev_page_url}
                                        className="py-2 px-4 rounded-md bg-white shadow-sm hover:underline"
                                    >
                                        {"< "} Sebelumnya
                                    </Link>
                                ) : (
                                    <div></div>
                                )}
                                {props.freelance.current_page !==
                                    props.freelance.last_page && (
                                    <Link
                                        href={props.freelance.next_page_url}
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
                <EmptyContent description="Data freelance masih kosong" />
            )}
        </AuthenticatedLayout>
    );
}
