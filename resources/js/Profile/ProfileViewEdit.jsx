import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { DataFreelancer } from "@/Pages/Admin/Freelance/data/Interface";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function ProfileViewEdit({
    provinces,
    userId,
    email,
    user,
    tapBack,
}) {
    const { data, setData, post, errors, wasSuccessful } = useForm({
        id: user ? user.id : String,
        first_name: user ? user.first_name : String,
        last_name: user ? user.last_name : String,
        phone: user ? user.phone : String,
        bio: user ? user.bio : String,
        nik: user ? user.nik : String,
        photo: user ? user.profile_photo_url : null,
        full_address: user ? user.full_address : String,
        village_id: user ? user.village_id : String,
        district_id: user ? user.district_id : String,
        city_id: user ? user.city_id : String,
        province_id: user ? user.province_id : String,
        user_id: userId,
        email: email,
    });
    const { is_freelance } = usePage().props;
    const [city, setCity] = useState(null);
    const [district, setDistrict] = useState(null);
    const [village, setVillage] = useState(null);
    const [getLocation, setGetLocation] = useState(false);
    const [changeImage, setChangeImage] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        // console.log(data);
        if (user.user) {
            if (user.user.role_id === 2) {
                post(route("profile.client.update", user.id));
            } else {
                post(route("profile.freelance.update", user.id));
            }
        } else {
            if (user.role_id === 2) {
                post(route("profile.client.store"));
            } else {
                post(route("profile.freelance.store"));
            }
        }
        if (wasSuccessful) {
            tapBack();
        }
    };

    useEffect(() => {
        // console.log(user.getProfilePhoto);
        if (user.province) {
            getCity(user.province_id);
            getDistrict(user.city_id);
            getVillages(user.district_id);
        }
        if (wasSuccessful) {
            tapBack();
        }
    }, [wasSuccessful]);

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
            encType="multipartform-data"
            className="flex-col space-y-6 p-4"
        >
            <p className="mt-1 text-sm text-gray-600">
                Masukkan data anda dengan benar
            </p>

            {!changeImage && data.photo ? (
                <div className="mx-auto flex-col space-y-4 text-center">
                    <div className="rounded-md  bg-gray-200 p-4">
                        <img src={data.photo} className="mx-auto" />
                    </div>
                    <PrimaryButton
                        type="button"
                        onClick={(e) => setChangeImage(true)}
                        className="bg-transparent text-green-500 border border-green-500 hover:bg-green-100"
                    >
                        Ubah
                    </PrimaryButton>
                </div>
            ) : (
                <div>
                    <InputLabel for="photo">
                        Photo{" "}
                        <span className="inline-block text-sm text-gray-600">
                            (optional)
                        </span>{" "}
                    </InputLabel>

                    <div className="flex space-x-4">
                        <input
                            id="photo"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg"
                            className="mt-1 form-control block w-full px-3 py-1.5 text-base file:cursor-pointer font-normal bg-gray-100 rounded-full text-gray-700  bg-clip-padding transition ease-in-out m-0 focus:text-gray-700  focus:border-green-600 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                            onChange={(e) => {
                                setData("photo", e.target.files[0]);
                            }}
                            autoComplete="photo"
                        />

                        {data.photo && (
                            <PrimaryButton
                                type="button"
                                onClick={(e) => {
                                    setChangeImage(false);
                                }}
                                className="bg-transparent text-red-500  hover:bg-red-100 my-2"
                            >
                                Batal
                            </PrimaryButton>
                        )}
                    </div>

                    <InputError className="mt-2" message={errors.photo} />
                </div>
            )}

            <div className="grid md:grid-cols-6 md:space-x-6 space-y-4 md:space-y-0">
                <div className="md:col-span-3">
                    <div className="md:flex-col space-y-6">
                        <div>
                            <InputLabel for="first_name" value="Firstname" />

                            <TextInput
                                id="first_name"
                                className="block w-full mt-1"
                                value={data.first_name}
                                handleChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                                required
                                autofocus
                                autoComplete="first_name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.first_name}
                            />
                        </div>
                        <div>
                            <InputLabel for="nik" value="NIK" />

                            <TextInput
                                id="nik"
                                type="number"
                                className="block w-full mt-1"
                                value={data.nik}
                                handleChange={(e) =>
                                    setData("nik", e.target.value)
                                }
                                defaultValue={user && user.nik}
                                required
                                autofocus
                                autoComplete="nik"
                            />

                            <InputError className="mt-2" message={errors.nik} />
                        </div>
                        {is_freelance && (
                            <div>
                                <InputLabel for="bio" value="Bio" />

                                <textarea
                                    id="bio"
                                    className="block w-full mt-1 border-gray-300 focus:border-[#2C7E5B] focus:ring-[#2C7E5B] rounded-md shadow-sm"
                                    value={user && user.bio}
                                    onChange={(e) =>
                                        setData("bio", e.target.value)
                                    }
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.bio}
                                />
                            </div>
                        )}
                        <div>
                            <InputLabel
                                for="full_address"
                                value="Alamat Lengkap"
                            />

                            <textarea
                                id="full_address"
                                className="block w-full mt-1 border-gray-300 focus:border-[#2C7E5B] focus:ring-[#2C7E5B] rounded-md shadow-sm"
                                value={user && user.full_address}
                                onChange={(e) =>
                                    setData("full_address", e.target.value)
                                }
                            />

                            <InputError
                                className="mt-2"
                                message={errors.full_address}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:col-span-3">
                    <div className="flex-col space-y-6">
                        <div>
                            <InputLabel for="last_name" value="Lastname" />

                            <TextInput
                                id="last_name"
                                className="block w-full mt-1"
                                value={data.last_name}
                                handleChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                autofocus
                                autoComplete="last_name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.last_name}
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
                            <InputLabel for="province_id" value={"Provinsi"} />
                            <Select
                                isClearable
                                options={provinces.map((item) => {
                                    return {
                                        value: item.id,
                                        label: item.name,
                                    };
                                })}
                                defaultValue={
                                    user.province && [
                                        {
                                            value: user.province.id,
                                            label: user.province.name,
                                        },
                                    ]
                                }
                                className="mt-2 basic-single"
                                classNamePrefix="select"
                                onChange={(val) => {
                                    setGetLocation(true);
                                    setCity(null);
                                    setData("province_id", val.value);
                                    axios
                                        .get(route("cities"), {
                                            params: {
                                                id: val.value,
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
                                    defaultValue={
                                        user.city && [
                                            {
                                                value: user.city.id,
                                                label: user.city.name,
                                            },
                                        ]
                                    }
                                    className="mt-2 basic-single"
                                    classNamePrefix="select"
                                    onChange={(val) => {
                                        setGetLocation(true);
                                        setDistrict(null);
                                        setData("city_id", val.value);
                                        axios
                                            .get(route("districts"), {
                                                params: {
                                                    id: val.value,
                                                },
                                            })
                                            .then((res) => {
                                                setDistrict(res.data);
                                                if (village) {
                                                    setVillage(null);
                                                }
                                                setGetLocation(false);
                                            });
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
                                    defaultValue={
                                        user.district && [
                                            {
                                                value: user.district.id,
                                                label: user.district.name,
                                            },
                                        ]
                                    }
                                    className="mt-2 basic-single"
                                    classNamePrefix="select"
                                    onChange={(val) => {
                                        setGetLocation(true);
                                        setVillage(null);
                                        setData("district_id", val.value);
                                        axios
                                            .get(route("villages"), {
                                                params: {
                                                    id: val.value,
                                                },
                                            })
                                            .then((res) => {
                                                setVillage(res.data);
                                                setGetLocation(false);
                                            });
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
                                <InputLabel for="village_id" value="Desa" />
                                <Select
                                    isClearable
                                    options={village.map((item) => {
                                        return {
                                            value: item.id,
                                            label: item.name,
                                        };
                                    })}
                                    defaultValue={
                                        user.village && [
                                            {
                                                value: user.village.id,
                                                label: user.village.name,
                                            },
                                        ]
                                    }
                                    className="mt-2 basic-single"
                                    classNamePrefix="select"
                                    onChange={(val) => {
                                        setData("village_id", val.value);
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
            <div className="flex">
                <PrimaryButton className="ml-auto inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest text-white uppercase bg-blue-600 border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150">
                    Simpan
                </PrimaryButton>
            </div>
        </form>
    );
}
