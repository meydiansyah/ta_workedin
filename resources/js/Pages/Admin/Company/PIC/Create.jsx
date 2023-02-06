import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { DataPIC } from "./data/Interface";
import { FormAddress } from "@/Components/Forms/Form_Address";
import { FormUser } from "@/Components/Forms/Form_User";
import { FormPIC } from "@/Components/Forms/Form_PIC";
import AlertComponents from "@/Components/Alert";
import { CardForm } from "@/Components/CardForm";
import InputLabel from "@/Components/InputLabel";
import Select from "react-select";
import InputError from "@/Components/InputError";

export default function ClientCreate({ provinces, statuses, companies }) {
    const { data, setData, post, errors } = useForm(DataPIC);

    const submit = (e) => {
        e.preventDefault();

        post(route("pic.store"));
    };

    return (
        <form onSubmit={submit}>
            <AuthenticatedLayout
                header={
                    <div className="flex justify-between">
                        <div className="flex text-xl text-gray-800">
                            <Link
                                href={route("admin.pic")}
                                className="leading-tight hover:underline underline-offset-4"
                            >
                                PIC Company
                            </Link>
                            <span className="mx-2 text-xl"> {">"} </span>
                            <h2 className="font-semibold leading-tight ">
                                Tambah
                            </h2>
                        </div>
                        <div className="flex">
                            <Link
                                href={route("admin.pic")}
                                className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase text-gray-900 "
                            >
                                {"< "} Batal
                            </Link>

                            <PrimaryButton className="inline-flex items-center px-4 py-2 ml-4 text-xs font-bold tracking-widest text-white uppercase bg-blue-600 border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150">
                                Simpan
                            </PrimaryButton>
                        </div>
                    </div>
                }
            >
                <Head title="Admin - Mahasiswa Baru" />

                <div className="py-10">
                    <div className="mx-auto max-w-7xl md:grid md:grid-cols-7 md:space-x-6 sm:px-6 space-y-6 md:space-y-0 lg:px-8 items-start justify-start">
                        <div className="md:col-span-4 space-y-6 md:max-w-3xl">
                            <FormUser
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                            <FormPIC
                                title="Informasi PIC Company"
                                data={data}
                                setData={setData}
                                errors={errors}
                                statuses={statuses}
                            />
                        </div>
                        <div className="md:col-span-3 space-y-6 md:max-w-lg">
                            {companies.length === 0 ? (
                                <AlertComponents message="Belum ada perusahaan yang terdaftar" />
                            ) : (
                                <CardForm
                                    title="Data Perusahaan"
                                    description="Lengkapi data perusahaan yang terdaftar dibawah ini :"
                                >
                                    <div>
                                        <InputLabel for="company" />
                                        <Select
                                            options={companies.map((e) => {
                                                return {
                                                    value: e.id,
                                                    label: e.name,
                                                };
                                            })}
                                            className="mt-2 basic-single"
                                            classNamePrefix="select"
                                            onChange={(e) => {
                                                setData("company_id", e.value);
                                            }}
                                        />
                                        <InputError
                                            className="mt-2"
                                            message={errors.company_id}
                                        />
                                    </div>
                                </CardForm>
                            )}

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
