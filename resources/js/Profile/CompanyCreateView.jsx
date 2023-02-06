import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { DataCompany } from "@/Pages/Admin/Company/data/Interface";
import { useForm } from "@inertiajs/inertia-react";
import { useState } from "react";
import Select from "react-select";

export default function CompanyCreateView({
    tapBack,
    setCreate,
    types,
    provinces,
}) {
    const { data, setData, post, errors } = useForm(DataCompany);
    const [city, setCity] = useState(null);
    const [district, setDistrict] = useState(null);
    const [village, setVillage] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        post(route("client.store.company"));

        tapBack();
    };

    const getCity = (id) => {
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
            });
    };

    const getDistrict = (id) => {
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
            });
    };

    const getVillages = (id) => {
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
            });
    };

    return (
        <form
            onSubmit={submit}
            encType="multipartform-data"
            className="flex-col space-y-6 lg:mx-20"
        >
            <div className="flex-col space-y-4 p-4 items-center">
                <div>
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
                            setData("logo", e.target.files[0]);
                        }}
                        autoComplete="photo"
                    />

                    <InputError className="mt-2" message={errors.logo} />
                </div>
                <div className="md:grid md:grid-cols-8 md:gap-4 space-y-4 md:space-y-0">
                    <div className="md:col-span-4">
                        <div>
                            <InputLabel for="name" value="Nama Perusahaan" />

                            <TextInput
                                id="name"
                                className="block w-full mt-1"
                                value={data.name}
                                handleChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                autofocus
                                autoComplete="name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>
                    </div>
                    <div className="md:col-span-4">
                        <div>
                            <InputLabel for="type" value="Type Company" />
                            <Select
                                options={types.map((e) => {
                                    return {
                                        value: e.id,
                                        label: e.name,
                                    };
                                })}
                                className="mt-2 basic-single"
                                classNamePrefix="select"
                                onChange={(e) => {
                                    setData("type_company_id", e.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:grid md:grid-cols-9 md:gap-4 space-y-4 md:space-y-0">
                    <div className="md:col-span-3">
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
                                autofocus
                                autoComplete="email"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <div>
                            <InputLabel for="fax" value="Faximile" />

                            <TextInput
                                id="fax"
                                type="tel"
                                className="block w-full mt-1"
                                value={data.fax}
                                handleChange={(e) =>
                                    setData("fax", e.target.value)
                                }
                                autofocus
                                autoComplete="fax"
                            />

                            <InputError className="mt-2" message={errors.fax} />
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <div>
                            <InputLabel for="phone" value="Telepon" />

                            <TextInput
                                id="phone"
                                type="tel"
                                className="block w-full mt-1"
                                value={data.phone}
                                handleChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                autofocus
                                autoComplete="phone"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.phone}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <InputLabel for="full_address" value="Alamat Lengkap" />

                    <textarea
                        id="full_address"
                        className="block w-full mt-1 border-gray-300 focus:border-[#2C7E5B] focus:ring-[#2C7E5B] rounded-md shadow-sm"
                        onChange={(e) =>
                            setData("full_address", e.target.value)
                        }
                    />

                    <InputError
                        className="mt-2"
                        message={errors.full_address}
                    />
                </div>

                <div className="md:grid md:grid-cols-8 md:gap-4 space-y-4 md:space-y-0">
                    <div className="md:col-span-4">
                        <InputLabel for="province_id" value={"Provinsi"} />
                        <Select
                            isClearable
                            options={provinces.map((item) => {
                                return {
                                    value: item.id,
                                    label: item.name,
                                };
                            })}
                            // defaultValue={
                            //     user
                            //         ? [
                            //               {
                            //                   value: user.province.id,
                            //                   label: user.province.name,
                            //               },
                            //           ]
                            //         : data.province_id && [
                            //               {
                            //                   value: data.province_id,
                            //                   label: data.province_name,
                            //               },
                            //           ]
                            // }
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
                    <div className="md:col-span-4">
                        <InputLabel for="city_id" value="Kabupaten / Kota" />
                        <Select
                            isDisabled={city === null}
                            isClearable
                            options={
                                !city
                                    ? []
                                    : city.map((item) => {
                                          return {
                                              value: item.id,
                                              label: item.name,
                                          };
                                      })
                            }
                            // defaultValue={
                            //     user && [
                            //         {
                            //             value: user.city.id,
                            //             label: user.city.name,
                            //         },
                            //     ]
                            // }
                            className="mt-2 basic-single"
                            classNamePrefix="select"
                            onChange={(val) => {
                                getDistrict(val.value);
                            }}
                        />

                        <InputError className="mt-2" message={errors.city_id} />
                    </div>
                </div>
                <div className="md:grid md:grid-cols-8 md:gap-4 space-y-4 md:space-y-0">
                    <div className="md:col-span-4">
                        <InputLabel for="district_id" value="Kecamatan" />
                        <Select
                            isDisabled={district === null}
                            isClearable
                            options={
                                !district
                                    ? []
                                    : district.map((item) => {
                                          return {
                                              value: item.id,
                                              label: item.name,
                                          };
                                      })
                            }
                            // defaultValue={
                            //     user && [
                            //         {
                            //             value: user.district.id,
                            //             label: user.district.name,
                            //         },
                            //     ]
                            // }
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
                    <div className="md:col-span-4">
                        <InputLabel for="village_id" value="Desa" />
                        <Select
                            isDisabled={village === null}
                            isClearable
                            options={
                                !village
                                    ? []
                                    : village.map((item) => {
                                          return {
                                              value: item.id,
                                              label: item.name,
                                          };
                                      })
                            }
                            // defaultValue={
                            //     user && [
                            //         {
                            //             value: user.village.id,
                            //             label: user.village.name,
                            //         },
                            //     ]
                            // }
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
                </div>
            </div>
            <div className="flex space-x-6 justify-end">
                <button
                    type="button"
                    className="font-medium text-gray-600 hover:underline hover:underline-offset-4"
                    onClick={() => {
                        setCreate(false);
                    }}
                >
                    Batal
                </button>
                <PrimaryButton className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest text-white uppercase border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150">
                    Tambahkan
                </PrimaryButton>
            </div>
        </form>
    );
}
