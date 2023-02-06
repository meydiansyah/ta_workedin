import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FiExternalLink, FiEdit2 } from "react-icons/fi";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataMajor, DataUniversity } from "./data/Interface";
import { Inertia } from "@inertiajs/inertia";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import DatePicker from "react-date-picker";
import { format } from "date-fns";
// import ImageUploading from "react-images-uploading";

export default function UniversityDetail(props) {
    const [showModal, setShowModal] = useState(false);
    const [modalMajor, setModalMajor] = useState(false);
    const [major, setMajor] = useState({});
    const closeModal = () => {
        setShowModal(false);
        setModalMajor(false);
        setMajor({});
    };

    return (
        <>
            <AuthenticatedLayout
                cleanBg
                header={
                    <div className="flex justify-between">
                        <div className="flex text-xl text-gray-800">
                            <Link
                                href={route("admin.university")}
                                className="leading-tight hover:underline underline-offset-4"
                            >
                                Universitas
                            </Link>
                            <span className="mx-2 text-xl"> {">"} </span>
                            <h2 className="font-semibold leading-tight ">
                                Detail
                            </h2>
                        </div>
                        <div className="flex">
                            <Link
                                href={route("admin.university")}
                                className="md:inline-flex hidden items-center px-4 py-2 text-xs font-bold tracking-widest uppercase text-gray-900 "
                            >
                                {"< "} Kembali
                            </Link>
                            <button
                                type="button"
                                className="font-medium ml-4 text-red-600  hover:underline"
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                Hapus
                            </button>
                            <PrimaryButton
                                type="button"
                                onClick={(e) =>
                                    Inertia.get(
                                        route(
                                            "university.edit",
                                            props.university.codept
                                        )
                                    )
                                }
                                className="ml-4 bg-orange-600 block md:hidden"
                            >
                                <FiEdit2 />
                            </PrimaryButton>
                            <PrimaryButton
                                type="button"
                                onClick={(e) =>
                                    Inertia.get(
                                        route(
                                            "university.edit",
                                            props.university.codept
                                        )
                                    )
                                }
                                className="ml-4 bg-orange-600 md:block hidden"
                            >
                                Edit
                            </PrimaryButton>
                        </div>
                    </div>
                }
            >
                <Head title="Admin - Create University" />

                <div className="py-10">
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
                {props.majors.data.length > 0 && (
                    <div className="py-12">
                        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-md sm:rounded-lg border border-gray-200">
                                <div className="flex justify-between">
                                    <div className="p-6 text-gray-900">
                                        Daftar Program Studi
                                    </div>
                                    <div className="flex">
                                        {props.majors.last_page >= 2 && (
                                            <div className="p-6 text-gray-900">
                                                {props.majors.current_page} dari{" "}
                                                {props.majors.last_page} halaman
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            className="font-medium mx-6 text-green-600  hover:underline focus:border-0"
                                            onClick={() => {
                                                setModalMajor(true);
                                                // Inertia.post(
                                                //     route(
                                                //         "university.createMajor",
                                                //         props.university.codept
                                                //     )
                                                // );
                                            }}
                                        >
                                            Tambah
                                        </button>
                                    </div>
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
                                            {props.majors.data.map((data) => (
                                                <tr
                                                    key={data.code}
                                                    className="bg-white border-b hover:bg-gray-100 hover:underline hover:underline-offset-4 hover:cursor-pointer"
                                                    onClick={() => {
                                                        setMajor(data);
                                                        setModalMajor(true);
                                                    }}
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
                            {props.majors.last_page !== 1 && (
                                <div className="flex justify-between mt-6 text-sm">
                                    {props.majors.current_page !== 1 ? (
                                        <Link
                                            href={props.majors.prev_page_url}
                                            className="py-2 px-4 rounded-md bg-white shadow-sm hover:underline"
                                        >
                                            {"< "} Sebelumnya
                                        </Link>
                                    ) : (
                                        <div></div>
                                    )}
                                    x
                                    {props.majors.current_page !==
                                        props.majors.last_page && (
                                        <Link
                                            href={props.majors.next_page_url}
                                            className="py-2 px-4 rounded-md bg-white shadow-sm hover:underline"
                                        >
                                            {"> "} Selanjutnya
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </AuthenticatedLayout>
            {props.majors.data.length === 0 && (
                <div className="fixed bottom-0 items-center p-2 w-full text-white">
                    <div className="flex">
                        <div className="bg-gray-500 mx-auto rounded-md p-2 cursor-pointer hover:bg-gray-600 transition ease-in-out duration-500" onClick={(e) => setModalMajor(true)}>
                            Tambah Jurusan
                        </div>
                    </div>
                </div>
            )}
            <Modal show={showModal} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Konfirmasi hapus data universitas.
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Apakah kamu yakin ingin menghapus data ini ?
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Batal
                        </SecondaryButton>

                        <DangerButton
                            className="ml-3"
                            onClick={() => {
                                setShowModal(false);
                                Inertia.delete(
                                    route(
                                        "university.destroy",
                                        props.university.codept
                                    )
                                );
                            }}
                        >
                            Hapus
                        </DangerButton>
                    </div>
                </div>
            </Modal>
            <Modal closeable={false} show={modalMajor} onClose={closeModal}>
                <FormModalMajor
                    university={props.university}
                    closeModal={closeModal}
                    major={major}
                />
            </Modal>
        </>
    );
}

const FormModalMajor = ({ university, closeModal, major }) => {
    const { data, setData, post, patch, errors } = useForm(DataMajor);
    const accredity = ["A", "B", "C", "Tidak terakreditasi"];

    const level = ["D3", "D4", "S1", "S2", "S3"];

    const [date, changeDate] = useState(new Date());

    useEffect(() => {
        setData("validateData", {
            codept: university.codept,
        });
        if (Object.keys(major).length > 0) {
            console.log("Update data");
            setData({
                code: major.code,
                name: major.name,
                level: major.level,
                accredity: major.accredity,
                sk: major.sk,
                website: major.website,
                dateStanding: major.date_standing,
                validateData: {
                    codept: university.codept,
                },
            });
        }
    }, []);

    const addMajor = (e) => {
        e.preventDefault();
        // console.log(data);
        if (Object.keys(major).length > 0) {
            patch(route("university.updateMajor", major.code));
        } else {
            post(route("university.storeMajor"));
        }
        closeModal();
    };
    return (
        // <form>
        <form onSubmit={addMajor}>
            <div className="p-6 flex space-y-4 flex-col">
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
                <div>
                    <InputLabel for="name" value="Nama Jurusan" />

                    <TextInput
                        id="name"
                        className="block w-full mt-1"
                        value={data.name}
                        handleChange={(e) => setData("name", e.target.value)}
                        // defaultValue={data.name}
                        autofocus
                        autoComplete="name"
                        required
                        placeholder="Masukkan nama jurusan"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div className="md:grid md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel for="code" value="kode Jurusan" />

                        <TextInput
                            id="code"
                            className="block w-full mt-1"
                            type="number"
                            value={data.code}
                            handleChange={(e) =>
                                setData("code", e.target.value)
                            }
                            autofocus
                            autoComplete="code"
                            required
                            placeholder="Kode jurusan"
                        />

                        <InputError className="mt-2" message={errors.code} />
                    </div>

                    <div>
                        <InputLabel for="sk" value="SK Penyelenggaraan" />

                        <TextInput
                            id="sk"
                            className="block w-full mt-1"
                            value={data.sk}
                            handleChange={(e) => setData("sk", e.target.value)}
                            autofocus
                            autoComplete="sk"
                            placeholder="SK penerbitan jurusan"
                            required
                        />
                        <InputError className="mt-2" message={errors.sk} />
                    </div>
                </div>
                <div>
                    <InputLabel for="website" value="Website" />

                    <TextInput
                        id="website"
                        className="block w-full mt-1"
                        value={data.website}
                        handleChange={(e) => setData("website", e.target.value)}
                        autofocus
                        type="url"
                        placeholder="https://website.jurusan.com"
                        autoComplete="sk"
                    />
                    <InputError className="mt-2" message={errors.website} />
                </div>
                <div>
                    <div className="">
                        <InputLabel value="Tanggal diterbitkan" />
                        <TextInput
                            id="dateStanding"
                            className="block w-full mt-1"
                            value={data.dateStanding}
                            handleChange={(e) =>
                                setData("dateStanding", e.target.value)
                            }
                            autofocus
                            autoComplete="dateStanding"
                            placeholder="dd/mm/yyyy"
                            required
                        />
                        <InputError
                            className="mt-2"
                            message={errors.dateStanding}
                        />
                        {/* <DatePicker
                            onChange={(e) => {
                                setData(
                                    "dateStanding",
                                    format(e, "dd/mm/yyyy")
                                );
                            }}
                            value={date}
                            calendarIcon={null}
                            clearIcon={null}
                            className="border-0"
                        /> */}
                    </div>
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-6">
                    <div>
                        <InputLabel for="accredity" value="Akreditasi" />
                        <select
                            id="accredity"
                            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={major.accredity ?? "Pilih akreditasi"}
                            onChange={(val) => {
                                setData("accredity", val.target.value);
                            }}
                        >
                            <option value="Pilih akreditasi">
                                Pilih akreditasi
                            </option>

                            {accredity.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <InputLabel for="level" value="Jenjang" />
                        <select
                            id="level"
                            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            defaultValue={major.level ?? "Pilih jenjang"}
                            onChange={(val) => {
                                setData("level", val.target.value);
                            }}
                        >
                            <option value="Pilih jenjang">Pilih jenjang</option>

                            {level.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div
                    className={`pt-6 flex space-x-6 ${
                        Object.keys(major).length > 0
                            ? "justify-between"
                            : "justify-end"
                    }`}
                >
                    {Object.keys(major).length > 0 && (
                        <DangerButton
                            onClick={() => {
                                setShowModal(false);
                                Inertia.delete(
                                    route(
                                        "university.destroy",
                                        props.university.codept
                                    )
                                );
                            }}
                        >
                            Hapus
                        </DangerButton>
                    )}
                    <div className="flex space-x-6">
                        <SecondaryButton onClick={closeModal}>
                            Batal
                        </SecondaryButton>

                        <PrimaryButton>Kirim</PrimaryButton>
                    </div>
                </div>
            </div>
        </form>
    );
};
