import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "react-select";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
// import CompanyCreateView from "./CompanyCreateView";
import { DataCompany } from "@/Pages/Admin/Company/data/Interface";

export default function CompanyEdit({ client, tapBack, types, provinces }) {
    const [city, setCity] = useState(null);
    const [district, setDistrict] = useState(null);
    const [village, setVillage] = useState(null);
    const [changeImage, setChangeImage] = useState(false);
    const { data, setData, post, errors, wasSuccessful } = useForm({
        ...{
            client_id: client.id ?? Number,
            nip: client.nip ?? Number,
            title: client.title ?? String,
        },
        ...(client.company ?? DataCompany),
    });

    useEffect(() => {
        if (client.company) {
            getCity(client.company.province_id);
            getDistrict(client.company.city_id);
            getVillages(client.company.district_id);
        }
        if (wasSuccessful) {
            tapBack();
        }
    }, [wasSuccessful]);

    const submit = (e) => {
        e.preventDefault();
        if (client.company) {
            post(route("client.update.company", client.company.id));
            if (wasSuccessful) {
                tapBack();
            }
        } else {
            post(route("client.store.company"));
            if (wasSuccessful) {
                tapBack();
            }
        }
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
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        Informasi Perusahaan
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Lengkapi data perusahaan yang sedang anda jalankan saat
                        ini.
                    </p>
                </header>
                {!changeImage && client.company ? (
                    <div className="mx-auto flex-col space-y-4 text-center">
                        <div className="rounded-md  bg-gray-200 p-4">
                            <img src={data.logo} className="mx-auto" />
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
                                accept="image/png"
                                className="mt-1 form-control block w-full px-3 py-1.5 text-base file:cursor-pointer font-normal bg-gray-100 rounded-full text-gray-700  bg-clip-padding transition ease-in-out m-0 focus:text-gray-700  focus:border-green-600 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                onChange={(e) => {
                                    setData("logo", e.target.files[0]);
                                }}
                                autoComplete="photo"
                            />

                            {data.logo && (
                                <PrimaryButton
                                    type="button"
                                    onClick={(e) => setChangeImage(false)}
                                    className="bg-transparent text-red-500  hover:bg-red-100 my-2"
                                >
                                    Batal
                                </PrimaryButton>
                            )}
                        </div>

                        <InputError className="mt-2" message={errors.logo} />
                    </div>
                )}
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
                                defaultValue={
                                    client.company && [
                                        {
                                            value: client.company.type_company
                                                .id,
                                            label: client.company.type_company
                                                .name,
                                        },
                                    ]
                                }
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
                        value={data.full_address ?? ""}
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
                            defaultValue={
                                client.company && [
                                    {
                                        value: client.company.province.id,
                                        label: client.company.province.name,
                                    },
                                ]
                            }
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
                            defaultValue={
                                client.company && [
                                    {
                                        value: client.company.city.id,
                                        label: client.company.city.name,
                                    },
                                ]
                            }
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
                            defaultValue={
                                client.company && [
                                    {
                                        value: client.company.district.id,
                                        label: client.company.district.name,
                                    },
                                ]
                            }
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
                            defaultValue={
                                client.company && [
                                    {
                                        value: client.company.village.id,
                                        label: client.company.village.name,
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
                </div>
            </div>
            <div className="flex-col space-y-4 p-4 items-center border-t-2">
                <header>
                    <h2 className="text-lg font-medium text-gray-900">
                        Data Pengguna
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Lengkapi data anda di perusahaan tersebut.
                    </p>
                </header>
                <div className="md:grid md:grid-cols-8 md:gap-4 space-y-4 md:space-y-0">
                    <div className="md:col-span-4">
                        <div>
                            <InputLabel for="nip" value="NIP" />

                            <TextInput
                                id="nip"
                                className="block w-full mt-1"
                                value={data.nip}
                                handleChange={(e) =>
                                    setData("nip", e.target.value)
                                }
                                autofocus
                                autoComplete="nip"
                            />

                            <InputError className="mt-2" message={errors.nip} />
                        </div>
                    </div>
                    <div className="md:col-span-4">
                        <div>
                            <InputLabel for="title" value="Jabatan" />

                            <TextInput
                                id="title"
                                className="block w-full mt-1"
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
                    </div>
                </div>
            </div>
            <div className="flex space-x-6 justify-end">
                <PrimaryButton className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest text-white uppercase border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150">
                    {client.company ? "Perbarui" : "Tambahkan"}
                </PrimaryButton>
            </div>
        </form>
    );
}
