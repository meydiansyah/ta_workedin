import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Select from "react-select";
import InputLabel from "@/Components/InputLabel";
import { CardForm } from "@/Components/CardForm";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { FormSkill } from "@/Components/Forms/Form_Skill";
import { ConfirmationModal } from "@/Components/ConfirmationModal";
import DangerButton from "@/Components/DangerButton";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import StatusData from "@/Components/StatusData";

export default function JobEdit({ job, skills }) {
    const { data, setData, patch, errors } = useForm({
        ...{
            skill: job.skills.map((e) => {
                return e.id;
            }),
        },
        ...job,
    });
    const [showModal, setShowModal] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        patch(route("client.update.job", job.id));
    };

    return (
        <>
            <form onSubmit={submit}>
                <AuthenticatedLayout
                    header={
                        <div className="flex justify-between">
                            <div className="flex text-xl text-gray-800">
                                <Link
                                    href={route("client.job")}
                                    className="leading-tight hover:underline underline-offset-4"
                                >
                                    Job
                                </Link>
                                <span className="mx-2 text-xl"> {">"} </span>
                                <h2 className="font-semibold leading-tight ">
                                    Edit
                                </h2>
                            </div>
                            <div className="flex">
                                <Link
                                    href={route("client.job")}
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
                            </div>
                        </div>
                    }
                >
                    <Head title="Workedin - Perbarui Pekerjaan" />

                    <div className="py-10">
                        <div className=" mx-auto max-w-3xl sm:px-6 items-start">
                            <div className="flex justify-between py-4">
                                <StatusData
                                    isActive={job.status_id === 1}
                                    setData={setData}
                                />
                            </div>
                            <CardForm
                                title="Data Perusahaan"
                                description="Pastikan data yang anda masukkan benar"
                            >
                                <div className="md:grid md:grid-cols-6 md:space-x-4">
                                    <div className="md:col-span-3">
                                        <InputLabel
                                            for="title"
                                            value="Nama Pekerjaan"
                                        />

                                        <TextInput
                                            id="title"
                                            className="block w-full mt-2"
                                            value={data.title}
                                            defaultValue={data.title}
                                            handleChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                            autofocus
                                            autoComplete="title"
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.title}
                                        />
                                    </div>
                                    <div className="md:col-span-3">
                                        <div>
                                            <InputLabel
                                                for="salary"
                                                value="Gaji"
                                            />

                                            <TextInput
                                                id="salary"
                                                className="block w-full mt-2"
                                                value={data.salary}
                                                defaultValue={data.salary}
                                                handleChange={(e) =>
                                                    setData(
                                                        "salary",
                                                        e.target.value
                                                    )
                                                }
                                                autofocus
                                                autoComplete="salary"
                                                type="number"
                                            />

                                            <InputError
                                                className="mt-2"
                                                message={errors.salary}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <InputLabel
                                        for="skill"
                                        value="Skill yang dibutuhkan"
                                    />
                                    <Select
                                        options={skills.map((e) => {
                                            return {
                                                value: e.id,
                                                label: e.name,
                                            };
                                        })}
                                        className="mt-2"
                                        isMulti
                                        classNamePrefix="select"
                                        defaultValue={job.skills.map((e) => {
                                            return {
                                                value: e.id,
                                                label: e.name,
                                            };
                                        })}
                                        onChange={(e) => {
                                            const __list = [];
                                            e.map(({ value }) =>
                                                __list.push(value)
                                            );
                                            setData("skill", __list);
                                        }}
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.skill}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        for="description"
                                        value="Deskripsi pekerjaan"
                                    />

                                    <textarea
                                        id="description"
                                        className="block w-full mt-1 border-gray-300 focus:border-[#2C7E5B] focus:ring-[#2C7E5B] rounded-md shadow-sm"
                                        defaultValue={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.description}
                                    />
                                </div>
                            </CardForm>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </form>
            <ConfirmationModal
                title="Konfirmasi hapus pekerjaan."
                description="Apakah kamu yakin ingin menghapus data ini ?"
                show={showModal}
                setShow={setShowModal}
                action={
                    <DangerButton
                        className="ml-3"
                        onClick={() => {
                            setShowModal(false);
                            Inertia.delete(route("job.destroy", job.id));
                        }}
                    >
                        Hapus
                    </DangerButton>
                }
            />
        </>
    );
}
