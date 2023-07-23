import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import EmptyContent from "@/Components/Empty";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import HeaderClient from "@/Components/HeaderClient";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { Inertia } from "@inertiajs/inertia";
import SubNavLink from "@/Components/SubNavLink";
import { Transition } from "@headlessui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";

export default function StudentsAdmin(props) {
    const [show, setShow] = useState(false);

    const { data, setData, post, errors, wasSuccessful } = useForm({
        codept: Number,
        major_code: Number,
        nim: String,
    });

    const [selectedPt, setSelectedPt] = useState(false);

    const listUniversity = props.universities.map((item) => {
        return {
            value: item.codept,
            label: item.codept + " - " + item.name,
        };
    });

    const listMajor = props.majors
        .filter((items) => items.pt_code.includes(data.codept))
        .map((item) => {
            return {
                value: item.code,
                label: item.code + " - " + item.name,
            };
        });

    useEffect(() => {
        if (wasSuccessful) {
            setShow(false);
            setData({});
        }
    }, [wasSuccessful]);

    const submit = (e) => {
        e.preventDefault();
        post(route("student.store"));
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <div className="flex space-x-4">
                        <SubNavLink
                            href={route("admin.user")}
                            active={route().current("admin.user")}
                        >
                            Users
                        </SubNavLink>
                        <SubNavLink
                            href={route("admin.students")}
                            active={
                                route().current("admin.students") ||
                                route().current("student.*")
                            }
                        >
                            Students
                        </SubNavLink>
                    </div>
                    {route().current("admin.students") && (
                        <button
                            onClick={(e) => {
                                setShow(true);
                            }}
                            className="inline-flex items-center px-4 py-2 bg-[#2C7E5B] border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-grey focus:bg-grey active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-grey focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Tambah
                        </button>
                    )}
                </div>
            }
        >
            <Head title="Admin - Students" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <Transition
                        show={show}
                        enter="transition-opacity duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="bg-white max-w-3xl mx-auto shadow-sm sm:rounded-lg p-4 mb-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <InputLabel
                                        for="student"
                                        value="Data Mahasiswa"
                                    />
                                    <div
                                        className="text-red-500 text-2xl hover:cursor-pointer"
                                        onClick={(e) => {
                                            setShow(false);

                                            setTimeout(
                                                function () {
                                                    setData({});
                                                }.bind(this),
                                                1000
                                            );
                                        }}
                                    >
                                        <div className="flex">
                                            <AiFillCloseCircle />
                                        </div>
                                    </div>
                                </div>
                                <form
                                    onSubmit={submit}
                                    className="flex-col space-y-6"
                                >
                                    <div className="grid md:grid-cols-8 md:space-x-4 md:space-y-0 space-y-2 p-4">
                                        <div
                                            className={`${
                                                selectedPt
                                                    ? "md:col-span-2"
                                                    : "md:col-span-8"
                                            }`}
                                        >
                                            <InputLabel
                                                for="university"
                                                value="Universitas"
                                            />
                                            <Select
                                                isClearable
                                                options={listUniversity}
                                                className="mt-2 basic-single"
                                                classNamePrefix="select"
                                                onChange={(e) => {
                                                    setData("codept", e.value);
                                                    setSelectedPt(true);
                                                }}
                                            />
                                        </div>
                                        {selectedPt && (
                                            <>
                                                <div className="md:col-span-4">
                                                    <InputLabel
                                                        for="nim"
                                                        value="NIM"
                                                    />

                                                    <TextInput
                                                        id="nim"
                                                        type="number"
                                                        className="block w-full mt-1"
                                                        value={data.nim}
                                                        handleChange={(e) =>
                                                            setData(
                                                                "nim",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                        autoComplete="nim"
                                                    />

                                                    <InputError
                                                        className="mt-2"
                                                        message={errors.nim}
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <InputLabel
                                                        for="major"
                                                        value="Jurusan"
                                                    />

                                                    <Select
                                                        isClearable
                                                        id="major"
                                                        options={listMajor}
                                                        className="mt-2 basic-single"
                                                        classNamePrefix="select"
                                                        onChange={(e) => {
                                                            setData(
                                                                "major_code",
                                                                e.value
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex">
                                        <PrimaryButton className="ml-auto inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest text-white uppercase bg-blue-600 border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150">
                                            Simpan
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Transition>

                    {props.students ? (
                        <>
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="flex justify-between">
                                    <div className="p-6 text-gray-900">
                                        Daftar Mahasiswa
                                    </div>
                                    {props.students.last_page >= 2 && (
                                        <div className="p-6 text-gray-900">
                                            {props.students.current_page} dari{" "}
                                            {props.students.last_page} halaman
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
                                                    Kode PT
                                                </th>
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
                                                    Kode Major
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
                                            {props.students.data.map(
                                                (dataStudent) => (
                                                    <tr
                                                        key={dataStudent.id}
                                                        className={`border-b hover:bg-gray-100 hover:underline hover:underline-offset-4 ${
                                                            data === dataStudent
                                                                ? "bg-gray-100"
                                                                : "bg-white"
                                                        }`}
                                                    >
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                        >
                                                            {dataStudent.codept}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {dataStudent.nim}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {
                                                                dataStudent.major_code
                                                            }
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
                                                                                "student.destroy",
                                                                                dataStudent.id
                                                                            ),
                                                                            {
                                                                                onSuccess:
                                                                                    () =>
                                                                                        setShowError(
                                                                                            false
                                                                                        ),
                                                                            }
                                                                        );
                                                                    }
                                                                }}
                                                                className="font-medium ml-4 text-red-600  hover:underline"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {props.students.last_page !== 1 && (
                                <div className="flex justify-between mt-6 text-sm">
                                    {props.students.current_page !== 1 ? (
                                        <Link
                                            href={props.students.prev_page_url}
                                            className="py-2 px-4 rounded-md bg-white shadow-sm hover:underline"
                                        >
                                            {"< "} Sebelumnya
                                        </Link>
                                    ) : (
                                        <div></div>
                                    )}
                                    {props.students.current_page !==
                                        props.students.last_page && (
                                        <Link
                                            href={props.students.next_page_url}
                                            className="py-2 px-4 rounded-md bg-white shadow-sm hover:underline"
                                        >
                                            {"> "} Selanjutnya
                                        </Link>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <EmptyContent description="Data users masih kosong" />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
