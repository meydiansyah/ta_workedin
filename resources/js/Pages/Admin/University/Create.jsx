import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import { useState } from "react";
import ImageUploading from "react-images-uploading";

export default function UniversityCreate({ provinces }) {
    const [images, setImages] = useState([]);
    const maxNumber = 69;
    const [city, setCity] = useState(null);
    const [district, setDistrict] = useState(null);
    const [village, setVillage] = useState(null);

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setData("logo", images[0].data_url);
        console.log(data.logo);
    };

    const { data, setData, patch, errors } = useForm({
        kodept: "",
        name: "",
        email: "",
        phone: "",
        fax: "",
        logo: null,
        url: "",
        full_address: "",
        village_id: "",
        district_id: "",
        city_id: "",
        province_id: "",
    });

    const [getLocation, setGetLocation] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        // console.log(data);
        patch(route("university.store"));
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <AuthenticatedLayout
                header={
                    <div className="flex justify-between">
                        <div className="flex">
                            <Link
                                href={route("admin.university")}
                                className="text-xl leading-tight text-gray-800"
                            >
                                University {" / "}
                            </Link>
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
                            <PrimaryButton className="ml-4">Save</PrimaryButton>
                        </div>
                    </div>
                }
            >
                <Head title="Admin - Create University" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="max-w-2xl p-4 mx-auto bg-white shadow sm:p-8 sm:rounded-lg">
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
                                {/* <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChange}
                                    maxNumber={maxNumber}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps,
                                    }) => (
                                        // write your building UI
                                        <div>
                                            <div className="flex justify-center">
                                                {imageList.map(
                                                    (image, index) => (
                                                        <div className="flex">
                                                            <img
                                                                key={index}
                                                                src={
                                                                    image[
                                                                        "data_url"
                                                                    ]
                                                                }
                                                                className="w-32 h-32 rounded-md ring-2 ring-gray-300"
                                                                alt=""
                                                            />
                                                            <div className="image-item__btn-wrapper">
                                                                <button
                                                                    onClick={() =>
                                                                        onImageUpdate(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    Update
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        onImageRemove(
                                                                            index
                                                                        )
                                                                    }
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <div className="upload__image-wrapper flex justify-between">
                                                <button
                                                    style={
                                                        isDragging
                                                            ? { color: "red" }
                                                            : undefined
                                                    }
                                                    onClick={onImageUpload}
                                                    {...dragProps}
                                                >
                                                    Click or Drop here
                                                </button>
                                                &nbsp;
                                                <button
                                                    onClick={onImageRemoveAll}
                                                >
                                                    Remove all images
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </ImageUploading> */}
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
                                {/* TODO: Next feature */}
                                {/* <div>
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
                                </div> */}

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
                        <div className="max-w-2xl p-4 mx-auto my-12 bg-white shadow sm:p-8 sm:rounded-lg">
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

                                    <select
                                        id="province_id"
                                        className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        defaultValue="pilih"
                                        onChange={(val) => {
                                            if (val.target.value !== "pilih") {
                                                setGetLocation(true);
                                                setData(
                                                    "province_id",
                                                    val.target.value
                                                );
                                                axios
                                                    .get(route("cities"), {
                                                        params: {
                                                            id: val.target
                                                                .value,
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
                                            } else {
                                                setCity(null);
                                                setDistrict(null);
                                                setVillage(null);
                                            }
                                        }}
                                    >
                                        <option value="pilih">
                                            Pilih provinsi
                                        </option>

                                        {provinces.map((item) => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>

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

                                        <select
                                            id="city_id"
                                            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={city[0].name}
                                            onChange={(val) => {
                                                if (
                                                    val.target.value !== "pilih"
                                                ) {
                                                    setGetLocation(true);

                                                    setData(
                                                        "city_id",
                                                        val.target.value
                                                    );
                                                    axios
                                                        .get(
                                                            route("districts"),
                                                            {
                                                                params: {
                                                                    id: val
                                                                        .target
                                                                        .value,
                                                                },
                                                            }
                                                        )
                                                        .then((res) => {
                                                            setDistrict(
                                                                res.data
                                                            );
                                                            if (village) {
                                                                setVillage(
                                                                    null
                                                                );
                                                            }
                                                            setGetLocation(
                                                                false
                                                            );
                                                        });
                                                } else {
                                                    setDistrict(null);
                                                    setVillage(null);
                                                }
                                            }}
                                        >
                                            {/* <option value="pilih">
                                                Pilih kota
                                            </option> */}
                                            {city.map(({ name, id }) => (
                                                <option value={id} key={id}>
                                                    {name}
                                                </option>
                                            ))}
                                        </select>

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

                                        <select
                                            id="district_id"
                                            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={district[0].name}
                                            onChange={(val) => {
                                                if (
                                                    val.target.value !== "pilih"
                                                ) {
                                                    setGetLocation(true);

                                                    setData(
                                                        "district_id",
                                                        val.target.value
                                                    );
                                                    axios
                                                        .get(
                                                            route("villages"),
                                                            {
                                                                params: {
                                                                    id: val
                                                                        .target
                                                                        .value,
                                                                },
                                                            }
                                                        )
                                                        .then((res) => {
                                                            setVillage(
                                                                res.data
                                                            );
                                                            setGetLocation(
                                                                false
                                                            );
                                                        });
                                                } else {
                                                    setDistrict(null);
                                                }
                                            }}
                                        >
                                            {/* <option value="pilih">
                                                Pilih Kecamatan
                                            </option> */}
                                            {district.map(({ name, id }) => (
                                                <option
                                                    id={id}
                                                    value={id}
                                                    key={id}
                                                >
                                                    {name}
                                                </option>
                                            ))}
                                        </select>

                                        <InputError
                                            className="mt-2"
                                            message={errors.city_id}
                                        />
                                    </div>
                                )}

                                {village && (
                                    <div>
                                        <InputLabel
                                            for="village_id"
                                            value="Desa"
                                        />

                                        <select
                                            id="village_id"
                                            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            defaultValue={village[0].name}
                                            onChange={(val) => {
                                                if (
                                                    val.target.value !== "pilih"
                                                ) {
                                                    setData(
                                                        "village_id",
                                                        val.target.value
                                                    );
                                                } else {
                                                    setVillage(null);
                                                }
                                            }}
                                        >
                                            {/* <option value="pilih">
                                                Pilih Desa
                                            </option> */}
                                            {village.map(({ name, id }) => (
                                                <option
                                                    id={id}
                                                    value={id}
                                                    key={id}
                                                >
                                                    {name}
                                                </option>
                                            ))}
                                        </select>

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
