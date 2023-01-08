import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import { useState } from "react";
import { DataUniversity } from "./data/Interface";
// import ImageUploading from "react-images-uploading";

export default function UniversityDetail(props) {
    return (
        <form className="space-y-6">
            <AuthenticatedLayout
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
                                className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase text-gray-900 "
                            >
                                {"< "} Kembali
                            </Link>
                            <PrimaryButton
                                type="button"
                                onClick={(e) =>
                                    Inertia.get(
                                        route(
                                            "university.edit",
                                            props.data.codept
                                        )
                                    )
                                }
                                className="ml-4 bg-orange-600"
                            >
                                Edit
                            </PrimaryButton>
                        </div>
                    </div>
                }
            >
                <Head title="Admin - Create University" />

                <div className="py-10">
                    <div className="mx-auto max-w-7xl md:flex md:space-x-6 sm:px-6 lg:px-8">
                        <div className="p-4 md:grow bg-white shadow sm:p-8 sm:rounded-lg">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Informasi Universitas {props.data.codept}
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
                                    <InputLabel for="codept" value="Kode PT" />

                                    <TextInput
                                        id="codept"
                                        className="block w-full mt-1"
                                        value={props.data.codept}
                                        required
                                        autofocus
                                        autoComplete="codept"
                                    />

                                    <InputError className="mt-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </form>
    );
}
