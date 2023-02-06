import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Link, Head } from "@inertiajs/inertia-react";
import { FiExternalLink } from "react-icons/fi";

export default function Company(props) {
    return (
        <>
            <Head title="workedin - universitas" />
            <div className="relative flex-col items-top justify-center min-h-screen bg-white sm:items-center sm:pt-0">
                <Navbar />

                <Head title="Admin - Create University" />

                <div className="py-10 pt-16">
                    <div className="mx-auto my-12 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 items-center">
                        <div className="md:col-span-1">
                            <div className="rounded-md  bg-gray-200 p-4">
                                <img
                                    src={props.university.logo}
                                    className="mx-auto"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-4">
                            <h2 className="lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-900 mt-2 md:mt-0">
                                {props.university.name}{" "}
                                {`(${props.university.codept})`}
                            </h2>
                        </div>
                        <div className="md:col-span-1">
                            {props.university.url && (
                                <a
                                    className="flex space-x-2 mt-4 hover:text-blue-500 md:mt-0 justify-start md:justify-end"
                                    href={props.university.url}
                                    target="_blank"
                                >
                                    <div className="text-sm">Buka tautan</div>
                                    <FiExternalLink />
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="mx-auto mt-6 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                        <div className="md:col-span-1">Alamat</div>
                        <div className="md:col-span-4">
                            <h2 className=" font-semibold text-gray-900 mt-2 md:mt-0">
                                {props.university.full_address}
                            </h2>
                        </div>
                    </div>
                    <div className="mx-auto mt-2 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                        <div className="md:col-span-1">Telepon</div>
                        <div className="md:col-span-4">
                            <h2 className="font-semibold text-gray-900 mt-2 md:mt-0">
                                {props.university.phone}
                            </h2>
                        </div>
                    </div>
                    <div className="mx-auto mt-2 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                        <div className="md:col-span-1">Faximile</div>
                        <div className="md:col-span-4">
                            <h2 className="font-semibold text-gray-900 mt-2 md:mt-0">
                                {props.university.fax}
                            </h2>
                        </div>
                    </div>
                    {props.university.majors.length > 0 && (
                        <div className="mx-auto mt-2 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                            <div className="md:col-span-1">Total Jurusan</div>
                            <div className="md:col-span-4">
                                <h2 className="font-semibold text-gray-900 mt-2 md:mt-0">
                                    {props.university.majors.length}{" "}
                                    {" Jurusan"}
                                </h2>
                            </div>
                        </div>
                    )}
                    {props.university.freelances.length > 0 && (
                        <div className="mx-auto mt-2 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                            <div className="md:col-span-1">Total Mahasiswa</div>
                            <div className="md:col-span-4">
                                <h2 className="font-semibold text-gray-900 mt-2 md:mt-0">
                                    {props.university.freelances.length}{" "}
                                    {" Mahasiswa"}
                                </h2>
                            </div>
                        </div>
                    )}
                </div>
                {props.majors.length > 0 && (
                    <div className="py-12 mb-20">
                        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-md sm:rounded-lg border border-gray-200">
                                <div className="p-6 text-gray-900">
                                    Daftar Program Studi
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
                                                    SK Terbit
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-center"
                                                >
                                                    Total Mahasiswa
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
                                            {props.majors.map((data) => (
                                                <tr
                                                    key={data.code}
                                                    className="bg-white hover:bg-gray-100"
                                                >
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                    >
                                                        {data.code}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {data.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {data.sk}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {data.freelances ===
                                                        null
                                                            ? 0
                                                            : data.freelances
                                                                  .length}
                                                    </td>
                                                    <td className="px-6 py-4 hover:text-blue-400 hover:underline hover:decoration-sky-500">
                                                        <Link
                                                            href={data.website}
                                                        >
                                                            {data.website}
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <Footer />
            </div>
        </>
    );
}
