import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";

export default function UniversityCreate({ provinces, cities, districts }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            kodept: "",
            name: "",
            email: "",
            phone: "",
            fax: "",
            logo: "",
            url: "",
            fullAddress: "",
            // villageId: 2,
            districtId: "",
            cityId: "",
            provinceId: "",
        });

    const [province, setProvince] = useState(null);
    const [city, setCity] = useState(null);
    const [district, setDistrict] = useState(null);

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
                            <h2 className="text-xl leading-tight text-gray-800">
                                University {" / "}
                            </h2>
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
                            {/* <Link
                        type="submit"
                            // href={route("admin.freelance")}
                            className="inline-flex items-center px-4 py-2 ml-4 text-xs font-bold tracking-widest text-white uppercase bg-blue-600 border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Save
                        </Link> */}

                            <PrimaryButton className="ml-4">Save</PrimaryButton>
                        </div>
                    </div>
                }
            >
                <Head title="Admin - Create University" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="p-4 bg-white max-w-2xl mx-auto shadow sm:p-8 sm:rounded-lg">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    University Information
                                </h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Create detail university data from{" "}
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
                                    <InputLabel for="kodept" value="Kode PT" />

                                    <TextInput
                                        id="kodept"
                                        className="block w-full mt-1"
                                        value={data.kodept}
                                        handleChange={(e) =>
                                            setData("kodept", e.target.value)
                                        }
                                        required
                                        autofocus
                                        autoComplete="kodept"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.kodept}
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

                                    <TextInput
                                        id="logo"
                                        className="block w-full mt-1"
                                        value={data.logo}
                                        handleChange={(e) =>
                                            setData("logo", e.target.value)
                                        }
                                        autoComplete="logo"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.logo}
                                    />
                                </div>

                                <div>
                                    <InputLabel for="url">
                                        Url{" "}
                                        <span className="inline-block text-sm text-gray-600">
                                            (optional)
                                        </span>{" "}
                                    </InputLabel>

                                    <TextInput
                                        id="url"
                                        type="url"
                                        className="block w-full mt-1"
                                        value={data.url}
                                        handleChange={(e) =>
                                            setData("url", e.target.value)
                                        }
                                        autoComplete="url"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.url}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 my-12 bg-white max-w-2xl mx-auto shadow sm:p-8 sm:rounded-lg">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Detail alamat
                                </h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Pastikan alamat sesuai dengan data dari :{" "}
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
                                        for="fullAddress"
                                        value="Alamat Lengkap"
                                    />

                                    <textarea
                                        className="block w-full mt-1 border-gray-300 focus:border-[#2C7E5B] focus:ring-[#2C7E5B] rounded-md shadow-sm"
                                        value={data.fullAddress}
                                        onChange={(e) =>
                                            setData(
                                                "fullAddress",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.fullAddress}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        for="provinceId"
                                        value="Provinsi"
                                    />

                                    <select
                                        id="provinceId"
                                        name="provinceId"
                                        class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(val) => {
                                            setData(
                                                "provinceId",
                                                val.target.value
                                            );
                                            setProvince(val.target.value);
                                            console.log(val.target.value);
                                        }}
                                    >
                                        <option selected>Pilih provinsi</option>

                                        {provinces.map((item) => (
                                            <option value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>

                                    <InputError
                                        className="mt-2"
                                        message={errors.provinceId}
                                    />
                                </div>

                                {cities && (
                                    <div>
                                        {province.data}
                                        {/* <InputLabel for="cityId" value="Kota" /> */}
                                        {/*  */}
                                        {/* <select */}
                                        {/*     id="countries" */}
                                        {/*     class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" */}
                                        {/*     onChange={(val) => setCity(val)} */}
                                        {/* > */}
                                        {/*     <option selected>Pilih kota</option> */}
                                        {/*     {province.cities.map((item) => ( */}
                                        {/*         <option value={item.name}> */}
                                        {/*             {item.name} */}
                                        {/*         </option> */}
                                        {/*     ))} */}
                                        {/* </select> */}
                                        {/*  */}
                                        {/* <InputError */}
                                        {/*     className="mt-2" */}
                                        {/*     message={errors.cityId} */}
                                        {/* /> */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </form>
    );
}
