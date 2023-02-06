import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import EmptyContent from "@/Components/Empty";
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
                    <div className="flex space-x-4 items-center">
                        {props.status && (
                            <div className="font-medium text-sm text-green-600">
                                {props.status}
                            </div>
                        )}
                        <Link
                            href={route("university.create")}
                            className="inline-flex items-center px-4 py-2 bg-gray-500 border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-grey focus:bg-grey active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-grey focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Tambah
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Admin - University" />

            {props.universities.data.length > 0 ? (
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="flex justify-between">
                                <div className="p-6 text-gray-900">
                                    Daftar Universitas{" "}
                                </div>
                                {props.universities.last_page >= 2 && (
                                    <div className="p-6 text-gray-900">
                                        {props.universities.current_page} dari{" "}
                                        {props.universities.last_page} halaman
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
                                                Nama
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center"
                                            >
                                                Total Jurusan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center"
                                            >
                                                Total Freelancer
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Website
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.universities.data.map((data) => (
                                            <tr
                                                key={data.codept}
                                                className="bg-white border-b hover:cursor-pointer hover:bg-gray-100 hover:underline hover:underline-offset-4"
                                                onClick={(e) =>
                                                    Inertia.get(
                                                        route(
                                                            "university.detail",
                                                            data.codept
                                                        )
                                                    )
                                                }
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    {data.codept}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {data.name}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {data.majors === null
                                                        ? 0
                                                        : data.majors.length}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {data.freelances === null
                                                        ? 0
                                                        : data.freelances
                                                              .length}
                                                </td>
                                                <td className="px-6 py-4 hover:text-blue-400 hover:underline hover:decoration-sky-500">
                                                    <Link href={data.url}>
                                                        {data.url}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {props.universities.last_page !== 1 && (
                            <div className="flex justify-between mt-6 text-sm">
                                {props.universities.current_page !== 1 ? (
                                    <Link
                                        href={props.universities.prev_page_url}
                                        className="py-2 px-4 rounded-md bg-white shadow-sm hover:underline"
                                    >
                                        {"< "} Sebelumnya
                                    </Link>
                                ) : (
                                    <div></div>
                                )}
                                x
                                {props.universities.current_page !==
                                    props.universities.last_page && (
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
                <EmptyContent description="Data universitas masih kosong" />
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
