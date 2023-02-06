import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "react-select";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import CompanyCreateView from "./CompanyCreateView";

export default function CompanyEdit({
    dataCompany,
    companies,
    client,
    tapBack,
    types,
    provinces,
}) {
    const [create, setCreate] = useState(false);
    const { data, setData, patch, errors } = useForm({
        nip: client.nip ?? Number,
        title: client.title ?? String,
        company_id: client.company_id ?? Number,
    });

    const [selectedCompany, setSelectedCompany] = useState(
        client.company ?? null
    );

    const listCompanies = companies.map((item) => {
        return {
            value: item.id,
            label: item.name,
        };
    });

    useEffect(() => {
        console.log(client.company);
        if (client.company) {
            // setSelectedPt(true);
        }
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.company.update", client.id));

        // if (wasSuccessful) {
        tapBack();
        // }
    };

    return (
        <>
            {create ? (
                <CompanyCreateView
                    tapBack={tapBack}
                    setCreate={setCreate}
                    types={types}
                    provinces={provinces}
                />
            ) : (
                <form onSubmit={submit} className="flex-col space-y-6 lg:mx-20">
                    <div className="flex-col space-y-4 p-4">
                        <div>
                            <InputLabel for="company" value="Perusahaan" />
                            <Select
                                isClearable
                                options={listCompanies}
                                className="mt-2 basic-single"
                                defaultValue={
                                    client.company && [
                                        {
                                            value: client.company.id,
                                            label: client.company.name,
                                        },
                                    ]
                                }
                                classNamePrefix="select"
                                onChange={(e) => {
                                    setData("company_id", e.value);
                                    setSelectedCompany(true);
                                }}
                            />
                            <InputError
                                className="mt-2"
                                message={errors.company_id}
                            />
                        </div>
                        {selectedCompany && (
                            <div className="md:grid md:grid-cols-8 gap-4">
                                <div className="md:col-span-4">
                                    <InputLabel for="nip" value="NIP" />

                                    <TextInput
                                        id="nip"
                                        type="number"
                                        className="block w-full mt-1"
                                        value={data.nip}
                                        handleChange={(e) =>
                                            setData("nip", e.target.value)
                                        }
                                        required
                                        autoComplete="nip"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.nip}
                                    />
                                </div>
                                <div className="md:col-span-4">
                                    <InputLabel for="title" value="Title" />

                                    <TextInput
                                        id="title"
                                        className="block w-full mt-1"
                                        value={data.title}
                                        handleChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        required
                                        autoComplete="title"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.title}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex space-x-6 justify-end">
                        <button
                            type="button"
                            className="font-medium text-gray-600 hover:underline hover:underline-offset-4"
                            onClick={() => {
                                setCreate(true);
                            }}
                        >
                            Tidak menemukan perusahaan ?
                        </button>
                        <PrimaryButton className="ml-auto inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest text-white uppercase bg-blue-600 border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150">
                            Simpan
                        </PrimaryButton>
                    </div>
                </form>
            )}
        </>
    );
}
