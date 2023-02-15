import CardJob from "@/Components/CardJob";
import EmptyContent from "@/Components/Empty";
import HeaderClient from "@/Components/HeaderClient";
import SubNavLink from "@/Components/SubNavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

export default function JobClient(props) {
    const [showAlert, setShowAlert] = useState(false);
    const { is_verified, is_client } = usePage().props;

    useEffect(() => {
        if (props.status) {
            setShowAlert(true);
        }
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    }, [props.status]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <SubNavLink
                        href={route("client.job")}
                        active={route().current("client.job")}
                    >
                        Jobs
                    </SubNavLink>
                    <div className="flex space-x-4 items-center">
                        <Transition
                            show={showAlert}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out duration-700"
                        >
                            <div className="font-medium text-sm text-green-600">
                                {props.status}
                            </div>
                        </Transition>
                        {props.pic.company_id && is_verified && is_client && (
                            <Link
                                href={route("client.create.job")}
                                className="inline-flex items-center px-4 py-2 bg-[#2C7E5B] border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-grey focus:bg-grey active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-grey focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Tambah
                            </Link>
                        )}
                        {!is_verified && (
                            <div className="font-medium text-sm text-gray-600">
                                Akun belum terverifikasi
                            </div>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Client - Jobs" />

            <CardJob jobs={props.job} />
        </AuthenticatedLayout>
    );
}
