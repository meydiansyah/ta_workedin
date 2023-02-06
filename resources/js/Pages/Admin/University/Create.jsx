import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import { useState } from "react";
import { DataUniversity } from "./data/Interface";
import { FormAddress } from "@/Components/Forms/Form_Address";
// import ImageUploading from "react-images-uploading";

export default function UniversityCreate({ provinces }) {
    const { data, setData, post, errors } = useForm(DataUniversity);

    const [city, setCity] = useState(null);
    const [district, setDistrict] = useState(null);
    const [village, setVillage] = useState(null);
    const [getLocation, setGetLocation] = useState(false);
    const submit = (e) => {
        e.preventDefault();

        // console.log(data);
        post(route("university.store"));
    };

    return (
        <form
            onSubmit={submit}
            className="space-y-6"
            encType="multipartform-data"
        >
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
                                Tambah
                            </h2>
                        </div>
                        <div className="flex">
                            <Link
                                href={route("admin.university")}
                                className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase text-gray-900 "
                            >
                                {"< "} Batal
                            </Link>
                            <PrimaryButton className="ml-4 bg-blue-600">
                                Simpan
                            </PrimaryButton>
                        </div>
                    </div>
                }
            >
                <Head title="Admin - Create University" />

                <div className="py-10">
                    <div className="mx-auto max-w-7xl grid md:grid-cols-7 md:space-x-6 space-y-6 md:space-y-0 sm:px-6 lg:px-8 ">
                        <div className="p-4 md:col-span-4 bg-white shadow sm:p-8 sm:rounded-lg">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Informasi Universitas
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
                                        value={data.codept}
                                        handleChange={(e) =>
                                            setData("codept", e.target.value)
                                        }
                                        required
                                        autofocus
                                        autoComplete="codept"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.codept}
                                    />
                                </div>

                                <div>
                                    <InputLabel for="name" value="Name" />

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

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div>
                                    <InputLabel for="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="block w-full mt-1"
                                        value={data.email}
                                        handleChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                        autoComplete="email"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                <div>
                                    <InputLabel for="phone" value="Phone" />

                                    <TextInput
                                        id="phone"
                                        type="tel"
                                        className="block w-full mt-1"
                                        value={data.phone}
                                        handleChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        required
                                        autoComplete="phone"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.phone}
                                    />
                                </div>

                                <div>
                                    <InputLabel for="fax" value="Fax" />

                                    <TextInput
                                        id="fax"
                                        type="tel"
                                        className="block w-full mt-1"
                                        value={data.fax}
                                        handleChange={(e) =>
                                            setData("fax", e.target.value)
                                        }
                                        required
                                        autoComplete="fax"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.fax}
                                    />
                                </div>
                                <div>
                                    <InputLabel for="logo">
                                        Logo{" "}
                                        <span className="inline-block text-sm text-gray-600">
                                            (optional)
                                        </span>{" "}
                                    </InputLabel>

                                    <input
                                        id="logo"
                                        type="file"
                                        accept="image/png"
                                        className="mt-1 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        onChange={(e) => {
                                            setData("logo", e.target.files[0]);
                                        }}
                                        autoComplete="logo"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.logo}
                                    />
                                </div>

                                <div>
                                    <InputLabel for="url" value="Url" />

                                    <TextInput
                                        id="url"
                                        type="url"
                                        className="block w-full mt-1"
                                        value={data.url}
                                        handleChange={(e) =>
                                            setData("url", e.target.value)
                                        }
                                        required
                                        autoComplete="url"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.url}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-3 mt-0">
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
