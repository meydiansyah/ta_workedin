import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { DataCompany } from "./data/Interface";
import { FormAddress } from "@/Components/Forms/Form_Address";
import Select from "react-select";
import InputLabel from "@/Components/InputLabel";
import { CardForm } from "@/Components/CardForm";
import { FormCompany } from "@/Components/Forms/Form_Company";
import { useState } from "react";
import { ConfirmationModal } from "@/Components/ConfirmationModal";
import { Inertia } from "@inertiajs/inertia";
import DangerButton from "@/Components/DangerButton";

export default function CompanyEdit({ company, provinces, types }) {
    const { data, setData, patch, errors } = useForm(company);

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        // Inertia.post(route("company.update", company.id), {
        //     _method: "put",
        //     logo: data.logo,
        // });
        // patch(route("company.update", company.id));
        Inertia.post(route("company.update", company.id), data);
    };
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <form onSubmit={submit} encType="multipart/form-data">
                <AuthenticatedLayout
                    header={
                        <div className="flex justify-between">
                            <div className="flex text-xl text-gray-800">
                                <Link
                                    href={route("admin.company")}
                                    className="leading-tight hover:underline underline-offset-4"
                                >
                                    Company
                                </Link>
                                <span className="mx-2 text-xl"> {">"} </span>
                                <h2 className="font-semibold leading-tight ">
                                    Edit
                                </h2>
                            </div>
                            <div className="flex">
                                <Link
                                    href={route("admin.company")}
                                    className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase text-gray-900 "
                                >
                                    {"< "} Batal
                                </Link>
                                <button
                                    type="button"
                                    className="font-medium ml-4 text-red-600  hover:underline"
                                    onClick={() => {
                                        setShowModal(true);
                                    }}
                                >
                                    Hapus
                                </button>
                                <PrimaryButton className="inline-flex items-center px-4 py-2 ml-4 text-xs font-bold tracking-widest text-white uppercase bg-blue-600 border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150">
                                    Simpan
                                </PrimaryButton>
                            </div>
                        </div>
                    }
                >
                    <Head title="Admin - Perusahaan Baru" />

                    <div className="py-10">
                        <div className="mx-auto max-w-7xl md:grid md:grid-cols-7 md:space-x-6 sm:px-6 space-y-6 md:space-y-0 lg:px-8 items-start justify-start">
                            <div className="md:col-span-4 space-y-6 md:max-w-3xl">
                                <FormCompany
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                />
                            </div>
                            <div className="md:col-span-3 space-y-6 md:max-w-lg">
                                <CardForm
                                    title="Tipe Perusahaan"
                                    description="Pilih Tipe Perusahaan yang dijalankan saat ini :"
                                >
                                    <div>
                                        <InputLabel
                                            for="type"
                                            value="Type Company"
                                        />
                                        <Select
                                            options={types.map((e) => {
                                                return {
                                                    value: e.id,
                                                    label: e.name,
                                                };
                                            })}
                                            defaultValue={[
                                                {
                                                    value: data.type_company.id,
                                                    label: data.type_company
                                                        .name,
                                                },
                                            ]}
                                            className="mt-2 basic-single"
                                            classNamePrefix="select"
                                            onChange={(e) => {
                                                setData(
                                                    "type_company_id",
                                                    e.value
                                                );
                                            }}
                                        />
                                    </div>
                                </CardForm>

                                <FormAddress
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    user={data}
                                    provinces={provinces}
                                />
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </form>
            <ConfirmationModal
                title="Konfirmasi hapus data perusahaan."
                description="Apakah kamu yakin ingin menghapus data ini ?"
                show={showModal}
                setShow={setShowModal}
                action={
                    <DangerButton
                        className="ml-3"
                        onClick={() => {
                            setShowModal(false);
                            Inertia.delete(
                                route("company.destroy", company.id)
                            );
                        }}
                    >
                        Hapus
                    </DangerButton>
                }
            />
        </>
    );
}
