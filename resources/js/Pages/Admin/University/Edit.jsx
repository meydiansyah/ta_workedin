import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";
import { DataUniversity } from "./data/Interface";
import { Inertia } from "@inertiajs/inertia";
// import ImageUploading from "react-images-uploading";

export default function UniversityEdit(props) {
    const { data, setData, patch, errors } = useForm(props.data);

    const [city, setCity] = useState(null);
    const [district, setDistrict] = useState(null);
    const [village, setVillage] = useState(null);
    const [getLocation, setGetLocation] = useState(false);
    const [changeLogo, setChangeLogo] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        console.log(data.codept);
        // patch(route("university.update", data.codept));
        Inertia.post(route("university.update", data.codept), data);
    };

    useEffect(() => {
        // console.log(data);
    });

    useEffect(() => {
        getCity(props.data.province_id);
        getDistrict(props.data.city_id);
        getVillages(props.data.district_id);
    }, []);

    const getCity = (id) => {
        setGetLocation(true);
        setCity(null);
        setData("province_id", id);
        axios
            .get(route("cities"), {
                params: {
                    id: id,
                },
            })
            .then((res) => {
                setCity(res.data);
                if (district) {
                    setDistrict(null);
                }
                if (village) {
                    setVillage(null);
                }
                setGetLocation(false);
            });
    };

    const getDistrict = (id) => {
        setGetLocation(true);
        setDistrict(null);
        setData("city_id", id);
        axios
            .get(route("districts"), {
                params: {
                    id: id,
                },
            })
            .then((res) => {
                setDistrict(res.data);
                if (village) {
                    setVillage(null);
                }
                setGetLocation(false);
            });
    };

    const getVillages = (id) => {
        setGetLocation(true);
        setVillage(null);
        setData("district_id", id);
        axios
            .get(route("villages"), {
                params: {
                    id: id,
                },
            })
            .then((res) => {
                setVillage(res.data);
                setGetLocation(false);
            });
    };

    return (
        <form
            onSubmit={submit}
            className="space-y-6"
            encType="multipart/form-data"
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
                                Edit
                            </h2>
                        </div>
                        <div className="flex">
                            <button
                                type="button"
                                onClick={(e) => {
                                    history.back();
                                }}
                                className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase text-gray-900 "
                            >
                                {"< "} Batal
                            </button>
                            <PrimaryButton className="ml-4 bg-blue-600">
                                Simpan
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
                                        </span>
                                    </InputLabel>
                                    {!changeLogo ? (
                                        <div className="flex-col justify-center">
                                            <div className="flex w-full justify-center">
                                                <div className="rounded-md md:w-52 w-full bg-gray-200 p-4 my-4">
                                                    <img
                                                        src={data.logo}
                                                        className="mx-auto"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex w-full justify-center">
                                                <PrimaryButton
                                                    type="button"
                                                    onClick={(e) =>
                                                        setChangeLogo(true)
                                                    }
                                                    className="ml-4"
                                                >
                                                    Ubah
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex w-full">
                                                <input
                                                    id="logo"
                                                    type="file"
                                                    accept="image/png"
                                                    className="mt-1 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                    onChange={(e) => {
                                                        setData(
                                                            "logo",
                                                            e.target.files[0]
                                                        );
                                                    }}
                                                    autoComplete="logo"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={(e) =>
                                                        setChangeLogo(false)
                                                    }
                                                    className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase text-red-600 "
                                                >
                                                    Batal
                                                </button>
                                            </div>

                                            <InputError
                                                className="mt-2"
                                                message={errors.logo}
                                            />
                                        </>
                                    )}
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
                        <div className=" p-4 md:grow-0 my-12 md:my-auto bg-white shadow sm:p-8 sm:rounded-lg">
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
                                        for="full_address"
                                        value="Alamat Lengkap"
                                    />

                                    <textarea
                                        id="full_address"
                                        className="block w-full mt-1 border-gray-300 focus:border-[#2C7E5B] focus:ring-[#2C7E5B] rounded-md shadow-sm"
                                        value={data.full_address}
                                        onChange={(e) =>
                                            setData(
                                                "full_address",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.full_address}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        for="province_id"
                                        value="Provinsi"
                                    />
                                    <Select
                                        isClearable
                                        options={props.provinces.map((item) => {
                                            return {
                                                value: item.id,
                                                label: item.name,
                                            };
                                        })}
                                        defaultValue={[
                                            {
                                                value: props.data.province.id,
                                                label: props.data.province.name,
                                            },
                                        ]}
                                        className="mt-2 basic-single"
                                        classNamePrefix="select"
                                        onChange={(val) => {
                                            getCity(val.value);
                                        }}
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.province_id}
                                    />
                                </div>

                                {city && (
                                    <div>
                                        <InputLabel
                                            for="city_id"
                                            value="Kabupaten / Kota"
                                        />
                                        <Select
                                            isClearable
                                            options={city.map((item) => {
                                                return {
                                                    value: item.id,
                                                    label: item.name,
                                                };
                                            })}
                                            defaultValue={[
                                                {
                                                    value: props.data.city.id,
                                                    label: props.data.city.name,
                                                },
                                            ]}
                                            className="mt-2 basic-single"
                                            classNamePrefix="select"
                                            onChange={(val) => {
                                                getDistrict(val.value);
                                            }}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.city_id}
                                        />
                                    </div>
                                )}

                                {district && (
                                    <div>
                                        <InputLabel
                                            for="district_id"
                                            value="Kecamatan"
                                        />
                                        <Select
                                            isClearable
                                            options={district.map((item) => {
                                                return {
                                                    value: item.id,
                                                    label: item.name,
                                                };
                                            })}
                                            defaultValue={[
                                                {
                                                    value: props.data.district
                                                        .id,
                                                    label: props.data.district
                                                        .name,
                                                },
                                            ]}
                                            className="mt-2 basic-single"
                                            classNamePrefix="select"
                                            onChange={(val) => {
                                                getVillages(val.value);
                                            }}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.district_id}
                                        />
                                    </div>
                                )}

                                {village && (
                                    <div>
                                        <InputLabel
                                            for="village_id"
                                            value="Desa"
                                        />
                                        <Select
                                            isClearable
                                            options={village.map((item) => {
                                                return {
                                                    value: item.id,
                                                    label: item.name,
                                                };
                                            })}
                                            defaultValue={[
                                                {
                                                    value: props.data.village
                                                        .id,
                                                    label: props.data.village
                                                        .name,
                                                },
                                            ]}
                                            className="mt-2 basic-single"
                                            classNamePrefix="select"
                                            onChange={(val) => {
                                                setData(
                                                    "village_id",
                                                    val.value
                                                );
                                            }}
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.village_id}
                                        />
                                    </div>
                                )}
                                {getLocation && (
                                    <h2 className="text-lg font-medium text-gray-900 opacity-80">
                                        memuat ...
                                    </h2>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </form>
    );
}
