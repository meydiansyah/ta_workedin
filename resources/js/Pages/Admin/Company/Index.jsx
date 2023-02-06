import EmptyContent from "@/Components/Empty";
import HeaderClient from "@/Components/HeaderClient";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import { useEffect } from "react";

export default function CompanyAdmin(props) {
    return (
        <AuthenticatedLayout header={<HeaderClient status={props.status} />}>
            <Head title="Admin - Company" />

            {props.companies.data.length > 0 ? (
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                Daftar Perusahaan
                            </div>

                            <div className="relative mx-4 mb-4 overflow-x-auto sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                ID
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Nama Perusahaan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Jenis Perusahaan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Nama PIC
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.companies.data.map((data) => (
                                            <tr
                                                key={data.id}
                                                className="bg-white border-b hover:cursor-pointer hover:bg-gray-100"
                                                onClick={(e) =>
                                                    Inertia.get(
                                                        route(
                                                            "company.edit",
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
                                                    {data.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {data.type_company.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {data.company_pic.length ===
                                                    0
                                                        ? "Data masih kosong"
                                                        : data.company_pic[0]
                                                              .full_name}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <EmptyContent description="Data perusahaan masih kosong" />
            )}
        </AuthenticatedLayout>
    );
}
