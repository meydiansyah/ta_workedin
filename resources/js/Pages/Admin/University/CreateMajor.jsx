import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import { useState } from "react";

export default function MajorCreate({ id }) {
    const [listData, setListData] = useState([]);

    // const [dataMajor, setDataMajor] = useState({
    //     kode: "",
    //     name: "",
    // });

    const { data, setData, patch, errors } = useForm({
        kode: "",
        name: "",
    });

    const addMajor = (e) => {
        // var _list = listData.push(data);
        setListData([data, ...listData]);
        setData({
            kode: "",
            name: "",
        });
        console.log(listData);
    };

    const removeMajor = (kode) => {
        const newList = listData.filter((item) => item.kode !== kode);
        setListData(newList);
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route("university.store"));
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <AuthenticatedLayout
                header={
                    <div className="flex justify-between">
                        <div className="flex">
                            <Link
                                href={route("admin.university")}
                                className="text-xl leading-tight text-gray-800"
                            >
                                University {" / "}
                            </Link>
                            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                Create
                            </h2>
                        </div>
                        <div className="flex">
                            <Link
                                href={route("admin.university")}
                                className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase bg-white border border-gray-600 rounded-md hover:bg-gray-100 focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Cancel
                            </Link>
                            <PrimaryButton className="ml-4">Save</PrimaryButton>
                        </div>
                    </div>
                }
            >
                <Head title="Admin - Create University" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="max-w-2xl p-4 mx-auto bg-white shadow sm:p-8 sm:rounded-lg">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Jurusan Universitas
                                </h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Pastikan data sesuai dengan :{" "}
                                    <Link
                                        href="https://pddikti.kemdikbud.go.id"
                                        className="text-blue-500 underline"
                                    >
                                        https://pddikti.kemdikbud.go.id
                                    </Link>
                                </p>
                            </header>
                            <div className="mt-6 space-y-6">
                                <div>
                                    <InputLabel
                                        for="kode"
                                        value="kode Jurusan"
                                    />

                                    <TextInput
                                        id="kode"
                                        className="block w-full mt-1"
                                        value={data.kode}
                                        handleChange={(e) =>
                                            setData("kode", e.target.value)
                                        }
                                        required
                                        autofocus
                                        autoComplete="kode"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        for="name"
                                        value="Nama Jurusan"
                                    />

                                    <TextInput
                                        id="name"
                                        className="block w-full mt-1"
                                        value={data.name}
                                        handleChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                        autofocus
                                        autoComplete="name"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={addMajor}
                                        className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase bg-gray-600 text-white border rounded-md hover:bg-gray-100 focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Tambah
                                    </button>
                                </div>
                            </div>
                        </div>

                        {listData.length !== 0 && (
                            <div className="max-w-2xl mt-12 p-2  mx-auto bg-white shadow sm:p-8 sm:rounded-lg">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Daftar jurusan
                                    </h2>
                                </header>

                                <div className="relative mt-6 overflow-x-auto sm:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                                    className="px-6 py-3"
                                                >
                                                    <span className="sr-only">
                                                        Edit
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listData.map(({ kode, name }) => (
                                                <tr
                                                    key={kode}
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                >
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {kode}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {name}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                setData({
                                                                    kode: kode,
                                                                    name: name,
                                                                });
                                                            }}
                                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={(e) =>
                                                                removeMajor(
                                                                    kode
                                                                )
                                                            }
                                                            className="font-medium ml-4 text-red-600 dark:text-red-500 hover:underline"
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
                        )}
                    </div>
                </div>
            </AuthenticatedLayout>
        </form>
    );
}
