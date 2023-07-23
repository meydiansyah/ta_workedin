import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AlertComponents from "@/Components/Alert";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { useState } from "react";
import DangerButton from "@/Components/DangerButton";
import { FormUniversity } from "./component/Form_University";
import { ConfirmationModal } from "@/Components/ConfirmationModal";
import { FormSkill } from "@/Components/Forms/Form_Skill";
import { FormInformation } from "@/Components/Forms/Form_Information";
import { FormAddress } from "@/Components/Forms/Form_Address";
import StatusData from "@/Components/StatusData";
import { BiInfoCircle } from "react-icons/bi";
import Dropdown from "@/Components/Dropdown";
import { Inertia } from "@inertiajs/inertia";

export default function FreelanceEdit({
    freelance,
    provinces,
    universities,
    majors,
    skills,
}) {
    const { data, setData, patch, errors } = useForm({
        ...freelance,
        ...{
            role_id: 2,
            status_id: freelance.user.status_id,
            skill: freelance.skills && freelance.skills.map((e) => e.id),
        },
    });

    const [showModal, setShowModal] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        patch(route("freelance.update", freelance.id));
    };

    return (
        <>
            <form onSubmit={submit}>
                <AuthenticatedLayout
                    header={
                        <div className="flex justify-between items-center">
                            <div className="flex text-xl text-gray-800">
                                <Link
                                    href={route("admin.freelance")}
                                    className="leading-tight hover:underline underline-offset-4"
                                >
                                    Freelance
                                </Link>
                                <span className="mx-2 text-xl"> {">"} </span>
                                <h2 className="font-semibold leading-tight ">
                                    Edit
                                </h2>
                            </div>
                            <div className="flex items-center">
                                <Link
                                    href={route("admin.freelance")}
                                    className="inline-flex items-center px-4 py-2 text-gray-900"
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
                                {!freelance.user.email_verfied_at && (
                                    <div className="ml-4">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <BiInfoCircle
                                                    size={30}
                                                    className="text-yellow-700 cursor-pointer"
                                                />
                                            </Dropdown.Trigger>

                                            <Dropdown.Content width="w-64">
                                                <div className="p-4 flex space-x-2 items-center">
                                                    <BiInfoCircle size={22} />
                                                    <span>
                                                        Email belum
                                                        terverifikasi.
                                                    </span>
                                                </div>
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
                        <div className="mx-auto max-w-7xl md:flex md:space-x-6 sm:px-6 space-y-6 md:space-y-0 items-start justify-start">
                            <div className="md:grow space-y-6 md:max-w-3xl">
                                <AlertComponents message="Anda tidak memiliki akses untuk memperbarui data autentikasi" />

                                <div className="md:hidden flex justify-between md:px-0 px-6">
                                    <StatusData
                                        isActive={
                                            freelance.user.status_id === 1
                                        }
                                        setData={setData}
                                    />
                                </div>
                                <FormInformation
                                    title="Informasi Freelance"
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                                <FormSkill
                                    setData={setData}
                                    user={freelance}
                                    skills={skills}
                                />
                            </div>
                            <div className="md:grow-0 space-y-6 md:max-w-lg">
                                <div className="hidden md:flex justify-between">
                                    <StatusData
                                        isActive={
                                            freelance.user.status_id === 1
                                        }
                                        setData={setData}
                                    />
                                </div>
                                {universities.length > 0 && (
                                    <FormUniversity
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                        freelance={freelance}
                                        majors={majors}
                                        universities={universities}
                                    />
                                )}

                                <FormAddress
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    user={freelance}
                                    provinces={provinces}
                                />
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </form>
            <ConfirmationModal
                title="Konfirmasi hapus data freelancer."
                description="Apakah kamu yakin ingin menghapus data ini ?"
                show={showModal}
                setShow={setShowModal}
                action={
                    <DangerButton
                        className="ml-3"
                        onClick={() => {
                            setShowModal(false);
                            Inertia.delete(
                                route("freelance.destroy", freelance.id)
                            );
                        }}
                    >
                        Hapus
                    </DangerButton>
                }
            />
        </>
    );
}
