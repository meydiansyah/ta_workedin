import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AlertComponents from "@/Components/Alert";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import { DataFreelancer } from "./data/Interface";
import { FormUniversity } from "./component/Form_University";
import { FormInformation } from "../../../Components/Forms/Form_Information";
import { FormSkill } from "@/Components/Forms/Form_Skill";
import { FormAddress } from "@/Components/Forms/Form_Address";
import { FormUser } from "@/Components/Forms/Form_User";

export default function FreelanceCreate({
    universities,
    skills,
    provinces,
    majors,
    statuses,
}) {
    const { data, setData, patch, errors } = useForm(DataFreelancer);

    const submit = (e) => {
        e.preventDefault();

        patch(route("freelance.store"));
    };

    return (
        <form onSubmit={submit} encType="multipartform-data">
            <AuthenticatedLayout
                header={
                    <div className="flex justify-between">
                        <div className="flex text-xl text-gray-800">
                            <Link
                                href={route("admin.freelance")}
                                className="leading-tight hover:underline underline-offset-4"
                            >
                                Freelance
                            </Link>
                            <span className="mx-2 text-xl"> {">"} </span>
                            <h2 className="font-semibold leading-tight ">
                                Tambah
                            </h2>
                        </div>
                        <div className="flex">
                            <Link
                                href={route("admin.freelance")}
                                className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase text-gray-900 "
                            >
                                {"< "} Batal
                            </Link>
                            {universities.length > 0 &&
                                majors.length > 0 &&
                                skills.length > 0 && (
                                    <PrimaryButton className="inline-flex items-center px-4 py-2 ml-4 text-xs font-bold tracking-widest text-white uppercase bg-blue-600 border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150">
                                        Simpan
                                    </PrimaryButton>
                                )}
                        </div>
                    </div>
                }
            >
                <Head title="Admin - Mahasiswa Baru" />

                <div className="py-10">
                    {universities.length == 0 && (
                        <div className="mx-auto max-w-7xl px-6">
                            <AlertComponents
                                message="Data Universitas tidak ditemukan"
                                action={
                                    <Link
                                        href={route("admin.university")}
                                        className="font-bold"
                                    >
                                        Periksa
                                    </Link>
                                }
                            />
                        </div>
                    )}
                    <div className="mx-auto max-w-7xl md:grid md:grid-cols-7 md:space-x-6 sm:px-6 space-y-6 md:space-y-0 lg:px-8 items-start justify-start">
                        <div className="md:col-span-4 space-y-6">
                            <FormUser
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                            <FormInformation
                                title="Informasi Freelance"
                                data={data}
                                setData={setData}
                                errors={errors}
                                statuses={statuses}
                            />
                        </div>
                        <div className="md:col-span-3 space-y-6">
                            {universities.length > 0 && (
                                <FormUniversity
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    universities={universities}
                                    majors={majors}
                                />
                            )}
                            <FormSkill setData={setData} skills={skills} />
                            <FormAddress
                                data={data}
                                setData={setData}
                                errors={errors}
                                provinces={provinces}
                            />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </form>
    );
}
