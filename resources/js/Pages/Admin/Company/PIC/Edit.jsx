import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import { FormAddress } from "@/Components/Forms/Form_Address";
import { FormPIC } from "@/Components/Forms/Form_PIC";
import { ConfirmationModal } from "@/Components/ConfirmationModal";
import DangerButton from "@/Components/DangerButton";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import AlertComponents from "@/Components/Alert";
import { CardForm } from "@/Components/CardForm";
import Select from "react-select";
import InputLabel from "@/Components/InputLabel";
import StatusData from "@/Components/StatusData";
import Dropdown from "@/Components/Dropdown";
import { BiInfoCircle } from "react-icons/bi";

export default function ClientEdit({ pic, provinces, companies }) {
    const { data, setData, patch, errors } = useForm({
        ...pic,
        ...{
            status_id: pic.user.status_id,
        },
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("pic.update", pic.id));
    };

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <form onSubmit={submit}>
                <AuthenticatedLayout
                    header={
                        <div className="flex justify-between">
                            <div className="flex text-xl text-gray-800">
                                <Link
                                    href={route("admin.pic")}
                                    className="leading-tight hover:underline underline-offset-4"
                                >
                                    PIC Company
                                </Link>
                                <span className="mx-2 text-xl"> {">"} </span>
                                <h2 className="font-semibold leading-tight ">
                                    Edit
                                </h2>
                            </div>
                            <div className="flex">
                                <Link
                                    href={route("admin.pic")}
                                    className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase text-gray-900 "
                                >
                                    {"< "} Batal
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
                                <PrimaryButton className="inline-flex items-center px-4 py-2 ml-4 text-xs font-bold tracking-widest text-white uppercase bg-blue-600 border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150">
                                    Simpan
                                </PrimaryButton>
                                {!pic.user.email_verfied_at && (
                                    <div className="ml-4">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <BiInfoCircle
                                                    size={30}
                                                    className="text-yellow-700 cursor-pointer"
                                                />
                                            </Dropdown.Trigger>

                                            <Dropdown.Content width="w-72">
                                                <div className="p-4 grid grid-cols-8 space-x-2 items-center">
                                                    <div className="col-span-1">
                                                        <BiInfoCircle
                                                            size={22}
                                                        />
                                                    </div>
                                                    <div className="col-span-7">
                                                        Email belum
                                                        terverifikasi.
                                                    </div>
                                                </div>
                                                {companies.length === 0 && (
                                                    <Link
                                                        className="p-4 grid grid-cols-8 space-x-2 items-center hover:bg-gray-100 hover:cursor-pointer"
                                                        href={route(
                                                            "admin.company"
                                                        )}
                                                    >
                                                        <div className="col-span-1">
                                                            <BiInfoCircle
                                                                size={22}
                                                            />
                                                        </div>
                                                        <div className="col-span-7">
                                                            Belum ada perusahaan
                                                            yang terdaftar.
                                                        </div>
                                                    </Link>
                                                )}
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                >
                    <Head title="Admin - Mahasiswa Baru" />

                    <div className="py-10">
                        <div className="mx-auto max-w-7xl md:grid md:grid-cols-7 md:space-x-6 sm:px-6 space-y-6 md:space-y-0 items-start justify-start">
                            <div className="md:col-span-4 space-y-6 md:max-w-3xl">
                                <AlertComponents message="Anda tidak memiliki akses untuk memperbarui data autentikasi" />
                                <div className="md:hidden flex justify-between md:px-0 px-6">
                                    <StatusData
                                        isActive={pic.user.status_id === 1}
                                        setData={setData}
                                    />
                                </div>
                                <FormPIC
                                    title="Informasi PIC Perusahaan"
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            </div>
                            <div className="md:col-span-3 space-y-6 md:max-w-lg">
                                <div className="hidden md:flex justify-between">
                                    <StatusData
                                        isActive={pic.user.status_id === 1}
                                        setData={setData}
                                    />
                                </div>
                                {companies.length !== 0 && (
                                    <CardForm
                                        title="Data Perusahaan"
                                        description="Lengkapi data perusahaan yang terdaftar dibawah ini :"
                                    >
                                        <div>
                                            <InputLabel for="company" />
                                            <Select
                                                options={companies.map((e) => {
                                                    return {
                                                        value: e.id,
                                                        label: e.name,
                                                    };
                                                })}
                                                className="mt-2 basic-single"
                                                defaultValue={
                                                    pic.company && [
                                                        {
                                                            value: pic.company
                                                                .id,
                                                            label: pic.company
                                                                .name,
                                                        },
                                                    ]
                                                }
                                                classNamePrefix="select"
                                                onChange={(e) => {
                                                    setData(
                                                        "company_id",
                                                        e.value
                                                    );
                                                }}
                                            />
                                        </div>
                                    </CardForm>
                                )}

                                <FormAddress
                                    data={data}
                                    user={data}
                                    setData={setData}
                                    errors={errors}
                                    provinces={provinces}
                                />
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </form>
            <ConfirmationModal
                title="Konfirmasi hapus data PIC."
                description="Apakah kamu yakin ingin menghapus data ini ?"
                show={showModal}
                setShow={setShowModal}
                action={
                    <DangerButton
                        className="ml-3"
                        onClick={() => {
                            setShowModal(false);
                            Inertia.delete(route("pic.destroy", pic.id));
                        }}
                    >
                        Hapus
                    </DangerButton>
                }
            />
        </>
    );
}
