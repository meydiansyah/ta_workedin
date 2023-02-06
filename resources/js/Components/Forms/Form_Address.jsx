import { CardForm } from "@/Components/CardForm";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { useEffect, useState } from "react";
import Select from "react-select";

export function FormAddress({ data, setData, errors, provinces, user }) {
    const [city, setCity] = useState(null);
    const [district, setDistrict] = useState(null);
    const [village, setVillage] = useState(null);
    const [getLocation, setGetLocation] = useState(false);

    useEffect(() => {
        if (user) {
            getCity(user.province_id);
            getDistrict(user.city_id);
            getVillages(user.district_id);
        }
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
        <CardForm
            title="Detail Alamat"
            description="Lengkapi data alamat sesuai KTP :"
            className="w-full"
        >
            <div>
                <InputLabel for="full_address" value="Alamat Lengkap" />

                <textarea
                    id="full_address"
                    className="block w-full mt-1 border-gray-300 focus:border-[#2C7E5B] focus:ring-[#2C7E5B] rounded-md shadow-sm"
                    defaultValue={data.full_address}
                    onChange={(e) => setData("full_address", e.target.value)}
                />

                <InputError className="mt-2" message={errors.full_address} />
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
                        user
                            ? [
                                  {
                                      value: user.province.id,
                                      label: user.province.name,
                                  },
                              ]
                            : data.province_id && [
                                  {
                                      value: data.province_id,
                                      label: data.province_name,
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

                <InputError className="mt-2" message={errors.province_id} />
            </div>

            {city && (
                <div>
                    <InputLabel for="city_id" value="Kabupaten / Kota" />
                    <Select
                        isClearable
                        options={city.map((item) => {
                            return {
                                value: item.id,
                                label: item.name,
                            };
                        })}
                        defaultValue={
                            user && [
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

                    <InputError className="mt-2" message={errors.city_id} />
                </div>
            )}

            {district && (
                <div>
                    <InputLabel for="district_id" value="Kecamatan" />
                    <Select
                        isClearable
                        options={district.map((item) => {
                            return {
                                value: item.id,
                                label: item.name,
                            };
                        })}
                        defaultValue={
                            user && [
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

                    <InputError className="mt-2" message={errors.district_id} />
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
                            user && [
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

                    <InputError className="mt-2" message={errors.village_id} />
                </div>
            )}
            {getLocation && (
                <h2 className="text-lg font-medium text-gray-900 opacity-80">
                    memuat ...
                </h2>
            )}
        </CardForm>
    );
}
