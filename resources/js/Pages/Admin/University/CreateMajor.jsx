import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { useState } from "react";
import DatePicker from "react-date-picker";
import { format } from "date-fns";
import { DataMajor } from "./data/Interface";

export default function MajorCreate({ validateData }) {
    const accredity = ["A", "B", "C", "Tidak terakreditasi"];

    const level = ["D3", "D4", "S1", "S2", "S3"];

    const [date, changeDate] = useState(new Date());

    const { data, setData, post } = useForm(DataMajor);

    const addMajor = (
        code,
        name,
        level,
        accredity,
        sk,
        website,
        dateStanding
    ) => {
        setData({
            code: "",
            name: "",
            level: null,
            accredity: null,
            sk: "",
            website: "",
            dateStanding: null,
            listData: [
                {
                    code: code,
                    name: name,
                    level: level,
                    accredity: accredity,
                    sk: sk,
                    website: website,
                    dateStanding: dateStanding,
                },
                ...data.listData,
            ],
            validateData: validateData,
        });
    };

    const removeMajor = (code) => {
        const newList = data.listData.filter((item) => item.code !== code);
        setData("listData", newList);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("university.storeMajor"));
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
                                Universitas
                            </Link>
                            <span className="mx-2 text-xl"> {">"} </span>
                            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                Buat
                            </h2>
                        </div>
                        <div className="flex">
                            <Link
                                href={route("admin.university")}
                                className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase text-gray-900 "
                            >
                                {"< "} Batal
                            </Link>
                            <PrimaryButton className="ml-4">
                                Simpan
                            </PrimaryButton>
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
                                    Jurusan Universitas
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
                                    <InputLabel
                                        for="code"
                                        value="kode Jurusan"
                                    />

                                    <TextInput
                                        id="code"
                                        className="block w-full mt-1"
                                        value={data.code}
                                        handleChange={(e) =>
                                            setData("code", e.target.value)
                                        }
                                        autofocus
                                        autoComplete="code"
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        for="name"
                                        value="Nama Jurusan"
                                    />

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
                                </div>

                                <div>
                                    <InputLabel
                                        for="sk"
                                        value="SK Penyelenggaraan"
                                    />

                                    <TextInput
                                        id="sk"
                                        className="block w-full mt-1"
                                        value={data.sk}
                                        handleChange={(e) =>
                                            setData("sk", e.target.value)
                                        }
                                        autofocus
                                        autoComplete="sk"
                                    />
                                </div>
                                <div>
                                    <InputLabel for="website" value="Website" />

                                    <TextInput
                                        id="website"
                                        className="block w-full mt-1"
                                        value={data.website}
                                        handleChange={(e) =>
                                            setData("website", e.target.value)
                                        }
                                        autofocus
                                        type="url"
                                        autoComplete="sk"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between">
                                        <InputLabel value="Tanggal diterbitkan" />

                                        <DatePicker
                                            onChange={(e) => {
                                                setData(
                                                    "dateStanding",
                                                    format(e, "dd/mm/yyyy")
                                                );
                                            }}
                                            value={data.dateStanding}
                                            calendarIcon={null}
                                            clearIcon={null}
                                            className="border-0"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <InputLabel
                                        for="accredity"
                                        value="Akreditasi"
                                    />
                                    <select
                                        id="accredity"
                                        className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        defaultValue={
                                            data.accredity === null
                                                ? "Pilih akreditasi"
                                                : data.accredity
                                        }
                                        onChange={(val) => {
                                            setData(
                                                "accredity",
                                                val.target.value
                                            );
                                        }}
                                    >
                                        <option value="Pilih akreditasi">
                                            Pilih akreditasi
                                        </option>

                                        {accredity.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <InputLabel for="level" value="Jenjang" />
                                    <select
                                        id="level"
                                        className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        defaultValue={
                                            data.level === null
                                                ? "Pilih jenjang"
                                                : data.level
                                        }
                                        onChange={(val) => {
                                            setData("level", val.target.value);
                                        }}
                                    >
                                        <option value="Pilih jenjang">
                                            Pilih jenjang
                                        </option>

                                        {level.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={(e) =>
                                            addMajor(
                                                data.code,
                                                data.name,
                                                data.level,
                                                data.accredity,
                                                data.sk,
                                                data.website,
                                                data.dateStanding
                                            )
                                        }
                                        className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase bg-gray-600 text-white  border rounded-md hover:bg-gray-500 focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Tambah
                                    </button>
                                </div>
                            </div>
                        </div>

                        {data.listData.length !== 0 && (
                            <div className="max-w-2xl mt-12 p-2  mx-auto bg-white shadow sm:p-8 sm:rounded-lg">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Daftar jurusan
                                    </h2>
                                </header>

                                <div className="relative mt-6 overflow-x-auto sm:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-500">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Kode
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Nama
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    <span className="sr-only">
                                                        Edit
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.listData.map(
                                                ({ code, name }) => (
                                                    <tr
                                                        key={code}
                                                        className="bg-white border-b "
                                                    >
                                                        <th
                                                            scope="row"
                                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                                        >
                                                            {code}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {name}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button
                                                                type="button"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    setData({
                                                                        code: code,
                                                                        name: name,
                                                                        listData:
                                                                            data.listData,
                                                                        validateData:
                                                                            validateData,
                                                                    });
                                                                }}
                                                                className="font-medium text-blue-600  hover:underline"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={(e) =>
                                                                    removeMajor(
                                                                        code
                                                                    )
                                                                }
                                                                className="font-medium ml-4 text-red-600  hover:underline"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </AuthenticatedLayout>
        </form>
    );
}
