import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { DataJob } from "./data/Interface";
import Select from "react-select";
import InputLabel from "@/Components/InputLabel";
import { CardForm } from "@/Components/CardForm";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { FormSkill } from "@/Components/Forms/Form_Skill";
import AlertComponents from "@/Components/Alert";
import { useState } from "react";

export default function JobCreate({ companies, skills }) {
    const { data, setData, post, errors } = useForm(DataJob);

    const submit = (e) => {
        e.preventDefault();
        post(route("job.store"));
    };

    return (
        <form onSubmit={submit}>
            <AuthenticatedLayout
                header={
                    <div className="flex justify-between">
                        <div className="flex text-xl text-gray-800">
                            <Link
                                href={route("admin.jobs")}
                                className="leading-tight hover:underline underline-offset-4"
                            >
                                Job
                            </Link>
                            <span className="mx-2 text-xl"> {">"} </span>
                            <h2 className="font-semibold leading-tight ">
                                Tambah
                            </h2>
                        </div>
                        <div className="flex">
                            <Link
                                href={route("admin.jobs")}
                                className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase text-gray-900 "
                            >
                                {"< "} Batal
                            </Link>

                            <PrimaryButton className="inline-flex items-center px-4 py-2 ml-4 text-xs font-bold tracking-widest text-white uppercase bg-blue-600 border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150">
                                Simpan
                            </PrimaryButton>
                        </div>
                    </div>
                }
            >
                <Head title="Admin - Perusahaan Baru" />

                <div className="py-10">
                    <div className=" mx-auto max-w-3xl sm:px-6 items-start">
                        {companies.length === 0 && (
                            <AlertComponents
                                message="Belum ada perusahaan yang terdaftar"
                                action={
                                    <Link
                                        href={route("admin.company")}
                                        className="font-bold"
                                    >
                                        Periksa
                                    </Link>
                                }
                            />
                        )}
                        <CardForm
                            title="Data Pekerjaan"
                            description="Pastikan data yang anda masukkan benar"
                        >
                            {errors.pic_company_id && (
                                <InputError
                                    className="mt-2"
                                    message="*perusahaan belum memiliki penanggung jawab"
                                />
                            )}
                            {/* <div>
                                <InputLabel for="photo">
                                    Photo{" "}
                                    <span className="inline-block text-sm text-gray-600">
                                        (optional)
                                    </span>{" "}
                                </InputLabel>

                                <input
                                    id="photo"
                                    type="file"
                                    accept="image/png"
                                    className="mt-1 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    onChange={(e) => {
                                        setData("image_url", e.target.files[0]);
                                    }}
                                    autoComplete="image_url"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.image_url}
                                />
                            </div> */}

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
                            </div>

                            <div>
                                <InputLabel
                                    for="description"
                                    value="Deskripsi pekerjaan"
                                />

                                <textarea
                                    id="description"
                                    className="block w-full mt-1 border-gray-300 focus:border-[#2C7E5B] focus:ring-[#2C7E5B] rounded-md shadow-sm"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.description}
                                />
                            </div>

                            <div className="md:grid md:grid-cols-6 md:space-x-4">
                                <div className="md:col-span-3">
                                    <div>
                                        <InputLabel for="salary" value="Gaji" />

                                        <TextInput
                                            id="salary"
                                            className="block w-full mt-2"
                                            value={data.salary}
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
                                <div className="md:col-span-3">
                                    <div>
                                        <InputLabel
                                            for="company"
                                            value="Perusahaan"
                                        />
                                        <Select
                                            options={companies.map((e) => {
                                                return {
                                                    value: e,
                                                    label: e.name,
                                                };
                                            })}
                                            className="mt-2 basic-single"
                                            classNamePrefix="select"
                                            onChange={(e) => {
                                                setData(
                                                    "company_id",
                                                    e.value.id
                                                );
                                            }}
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.company_id}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardForm>
                    </div>
                </div>
            </AuthenticatedLayout>
        </form>
    );
}
