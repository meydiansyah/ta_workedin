import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import EmptyContent from "@/Components/Empty";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import HeaderClient from "@/Components/HeaderClient";

export default function PicCompanyAdmin(props) {
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
        <AuthenticatedLayout header={<HeaderClient />}>
            <Head title="Admin - University" />

            {props.pic.data.length > 0 ? (
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="flex justify-between">
                                <div className="p-6 text-gray-900">
                                    Daftar PIC Company{" "}
                                </div>
                                {props.pic.last_page >= 2 && (
                                    <div className="p-6 text-gray-900">
                                        {props.pic.current_page} dari{" "}
                                        {props.pic.last_page} halaman
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
                                                Nama Lengkap
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Jabatan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3  text-center"
                                            >
                                                Nama Perusahaan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center"
                                            >
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.pic.data.map((data) => (
                                            <tr
                                                key={data.id}
                                                className="bg-white border-b hover:cursor-pointer hover:bg-gray-100"
                                                onClick={(e) =>
                                                    Inertia.get(
                                                        route(
                                                            "pic.edit",
                                                            data.id
                                                        )
                                                    )
                                                }
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    {data.id}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {data.full_name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {data.email}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {data.title}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {data.company
                                                        ? data.company.name
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
                        {props.pic.last_page !== 1 && (
                            <div className="flex justify-between mt-6 text-sm">
                                {props.pic.current_page !== 1 ? (
                                    <Link
                                        href={props.pic.prev_page_url}
                                        className="py-2 px-4 rounded-md bg-white shadow-sm hover:underline"
                                    >
                                        {"< "} Sebelumnya
                                    </Link>
                                ) : (
                                    <div></div>
                                )}
                                x
                                {props.pic.current_page !==
                                    props.pic.last_page && (
                                    <Link
                                        href={props.skills.next_page_url}
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
                <EmptyContent description="Data PIC masih kosong" />
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
