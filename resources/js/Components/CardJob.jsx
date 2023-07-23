import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { FiExternalLink } from "react-icons/fi";
import { BsFilterRight } from "react-icons/bs";
import { HiOutlineClock } from "react-icons/hi";
import EmptyContent from "./Empty";
import moment from "moment";
import Dropdown from "./Dropdown";
import { ConfirmationModal } from "./ConfirmationModal";
import DangerButton from "./DangerButton";
import { MdMoreVert, MdVerified } from "react-icons/md";
import PrimaryButton from "./PrimaryButton";
import ModalApply from "./ModalApply";
import { Transition } from "@headlessui/react";

export default function CardJob({ jobs, status }) {
    const [selected, setSelected] = useState(null);
    const [modalApply, setModalApply] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showModalRestore, setShowModalRestore] = useState(false);
    const { user, dataUser } = usePage().props.auth;
    const { is_verified, is_freelance, is_admin, is_active } = usePage().props;
    useEffect(() => {
        // console.log(selected.resumes);
        if (status) {
            setShowAlert(true);
        }
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    }, [status]);

    const getStatus = (status) => {
        switch (status) {
            case "active":
                return "bg-green-500 text-white";
            case "ongoing":
                return "bg-orange-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    return (
        <>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pt-[50px]">
                <div className="bg-white shadow-md border rounded-md">
                    <div className="flex justify-between px-6 py-2 items-center border-b ">
                        <div className="flex space-x-6 items-center">
                            <div className="text-gray-900 text-lg font-semibold">
                                Daftar Pekerjaan
                            </div>
                            <Transition
                                show={showAlert}
                                enterFrom="opacity-0"
                                leaveTo="opacity-0"
                                className="transition ease-in-out duration-700"
                            >
                                <div className="font-medium text-sm text-green-600">
                                    {status}
                                </div>
                            </Transition>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <TextInput
                                id="search"
                                className="block w-full mt-2 !rounded-full py-1 text-sm mr-8"
                                value=""
                                placeholder="Temukan pekerjaan ..."
                                handleChange={(e) =>
                                    Inertia.get(
                                        user && is_admin
                                            ? route("admin.jobs")
                                            : route("jobs"),
                                        {
                                            search: e.target.value,
                                        },
                                        {
                                            preserveState: true,
                                            replace: true,
                                        }
                                    )
                                }
                                autofocus
                                autoComplete="search"
                            />
                            {is_freelance && (
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="p-2 rounded-full hover:bg-gray-100"
                                        >
                                            <BsFilterRight size={20} />
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <span className="text-gray-500 text-xs p-4">
                                            Temukan berdasarkan:
                                        </span>
                                        <Dropdown.Link
                                            href={route(
                                                "jobs",
                                                { filter: "semua" },
                                                {
                                                    preserveState: true,
                                                    replace: true,
                                                }
                                            )}
                                            method="get"
                                            as="button"
                                        >
                                            Semua
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("jobs")}
                                            method="get"
                                            as="button"
                                        >
                                            Rekomendasi
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            )}
                        </div>
                    </div>
                    {jobs.length > 0 ? (
                        <div className="hidden md:grid md:grid-cols-8">
                            <div className="col-span-2 overflow-auto h-[550px]">
                                {jobs.map((e) => {
                                    return (
                                        <div
                                            key={e.id}
                                            className={`flex-col p-3 m-2 rounded-md hover:bg-gray-200 border-l-4 border-transparent hover:cursor-pointer ${
                                                selected === e &&
                                                "bg-gray-100 border-l-4 border-gray-900"
                                            }`}
                                            onClick={(val) => setSelected(e)}
                                        >
                                            <div className="text-gray-900  font-semibold">
                                                {e.title}
                                            </div>
                                            <div className="text-sm">
                                                {e.company.type_company.code}{" "}
                                                {e.company.name}
                                            </div>
                                            <div className="font-bold text-sm mt-6 ">
                                                <span className="block">
                                                    {e.company.city.name}
                                                </span>
                                                <span>IDR {e.salary}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="col-span-6 border-l overflow-auto h-[550px]">
                                {selected ? (
                                    <div className="flex-col w-full">
                                        <div className="bg-white p-2 pr-4 sticky top-0">
                                            <div className="px-6 py-2 bg-gray-100 rounded-md flex justify-between items-center">
                                                {user ? (
                                                    <>
                                                        {!is_freelance ? (
                                                            <>
                                                                {selected.deleted_at ? (
                                                                    <div className="flex space-x-2 text-sm items-center text-gray-500">
                                                                        <div className="font-medium ml-4">
                                                                            Data
                                                                            telah
                                                                            dihapus
                                                                        </div>
                                                                        <HiOutlineClock />
                                                                        <span>
                                                                            {moment(
                                                                                selected.deleted_at
                                                                            ).fromNow()}
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex space-x-6 items-center">
                                                                        <div
                                                                            className={`px-2 py-1 my-auto text-sm rounded-md font-semibold ${getStatus(
                                                                                selected
                                                                                    .status
                                                                                    .name
                                                                            )}`}
                                                                        >
                                                                            {
                                                                                selected
                                                                                    .status
                                                                                    .name
                                                                            }
                                                                        </div>
                                                                        {selected
                                                                            .resumes
                                                                            .length >
                                                                            0 && (
                                                                            <div className="font-medium">
                                                                                ({" "}
                                                                                {
                                                                                    selected
                                                                                        .resumes
                                                                                        .length
                                                                                }{" "}
                                                                                )
                                                                                Pelamar
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                {is_verified ? (
                                                                    <>
                                                                        {is_active ? (
                                                                            <>
                                                                                {selected
                                                                                    .resumes
                                                                                    .length !==
                                                                                0 ? (
                                                                                    // array1.find(element => element > 10)
                                                                                    <>
                                                                                        {selected.resumes.find(
                                                                                            (
                                                                                                element
                                                                                            ) =>
                                                                                                element.freelance_id ===
                                                                                                dataUser.id
                                                                                        ) &&
                                                                                        selected.resumes.find(
                                                                                            (
                                                                                                element
                                                                                            ) =>
                                                                                                element.job_id ===
                                                                                                selected.id
                                                                                        ) ? (
                                                                                            <>
                                                                                                <div className="font-medium ml-4">
                                                                                                    Lamaran
                                                                                                    terkirim
                                                                                                </div>
                                                                                            </>
                                                                                        ) : (
                                                                                            <button
                                                                                                type="button"
                                                                                                className="font-semibold rounded-md bg-green-600 hover:bg-green-700 px-4 py-1 text-white "
                                                                                                onClick={() => {
                                                                                                    setModalApply(
                                                                                                        true
                                                                                                    );
                                                                                                }}
                                                                                            >
                                                                                                Lamar
                                                                                                sekarang
                                                                                            </button>
                                                                                        )}
                                                                                    </>
                                                                                ) : (
                                                                                    <button
                                                                                        type="button"
                                                                                        className="font-semibold rounded-md bg-green-600 hover:bg-green-700 px-4 py-1 text-white "
                                                                                        onClick={() => {
                                                                                            setModalApply(
                                                                                                true
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        Lamar
                                                                                        sekarang
                                                                                    </button>
                                                                                )}
                                                                            </>
                                                                        ) : (
                                                                            <div className="font-medium ml-4">
                                                                                Akun
                                                                                tidak
                                                                                aktif
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <div className="font-medium ml-4">
                                                                        Akun
                                                                        belum
                                                                        terverifikasi
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div></div>
                                                )}
                                                <div className="flex">
                                                    {user && !is_freelance ? (
                                                        <button
                                                            type="button"
                                                            className="font-medium ml-4  hover:underline"
                                                            onClick={() => {
                                                                is_admin
                                                                    ? Inertia.get(
                                                                          route(
                                                                              "job.edit",
                                                                              selected.id
                                                                          )
                                                                      )
                                                                    : Inertia.get(
                                                                          route(
                                                                              "client.edit.job",
                                                                              selected.id
                                                                          )
                                                                      );
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                    ) : (
                                                        <a
                                                            className="font-medium ml-4  hover:underline flex items-center space-x-2 text-blue-500"
                                                            href={route(
                                                                "job.detail",
                                                                selected.id
                                                            )}
                                                            target="_blank"
                                                        >
                                                            <FiExternalLink />

                                                            <span>
                                                                Buka di tab baru
                                                            </span>
                                                        </a>
                                                    )}
                                                    <button
                                                        type="button"
                                                        className="font-medium ml-4  hover:underline"
                                                        onClick={() => {
                                                            setSelected(null);
                                                        }}
                                                    >
                                                        Tutup
                                                    </button>
                                                    {selected.deleted_at && (
                                                        <Dropdown>
                                                            <Dropdown.Trigger>
                                                                <button
                                                                    type="button"
                                                                    className="p-2 pr-0 rounded-full hover:bg-gray-100"
                                                                >
                                                                    <MdMoreVert
                                                                        size={
                                                                            20
                                                                        }
                                                                    />
                                                                </button>
                                                            </Dropdown.Trigger>

                                                            <Dropdown.Content>
                                                                <span className="text-gray-500 text-xs p-4">
                                                                    Perbarui
                                                                    data:
                                                                </span>
                                                                <div
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        setShowModal(
                                                                            true
                                                                        );
                                                                    }}
                                                                    className="block w-full cursor-pointer px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                                >
                                                                    Hapus
                                                                    Permanen
                                                                </div>
                                                                <div
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        setShowModalRestore(
                                                                            true
                                                                        );
                                                                    }}
                                                                    className="block w-full cursor-pointer px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                                                >
                                                                    Restore
                                                                </div>
                                                            </Dropdown.Content>
                                                        </Dropdown>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2 p-4">
                                            {selected.company.logo && (
                                                <div className="px-4 w-32 items-center flex justify-center">
                                                    <img
                                                        src={
                                                            selected.company
                                                                .logo
                                                        }
                                                        alt="..."
                                                        className="rounded max-w-full h-auto align-middle border-none"
                                                    />
                                                </div>
                                            )}
                                            <Link
                                                href={route(
                                                    "company.detail",
                                                    selected.company.id
                                                )}
                                                className="flex-col cursor-pointer"
                                            >
                                                <div className="text-gray-600 text-lg ">
                                                    {selected.title}
                                                </div>
                                                <div className=" text-xl font-semibold">
                                                    {
                                                        selected.company
                                                            .type_company.code
                                                    }{" "}
                                                    {selected.company.name}
                                                </div>
                                                <div className="text-gray-600 text-xs ">
                                                    {selected.company.city.name}
                                                </div>
                                                <div className="text-gray-600">
                                                    IDR {selected.salary}
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="mx-4 flex space-x-2 items-center text-gray-500">
                                            <HiOutlineClock />
                                            <span>
                                                {moment(
                                                    selected.created_at
                                                ).fromNow()}
                                            </span>
                                        </div>
                                        <div className="my-6 p-4">
                                            <div className="mb-2 font-bold">
                                                Deskripsi Pekerjaan
                                            </div>
                                            <span>{selected.description}</span>
                                        </div>
                                        {selected.skills.length > 0 && (
                                            <div className="my-6 p-4">
                                                <div className="mb-2 font-bold">
                                                    Kemampuan yang dibutuhkan :
                                                </div>
                                                <ol className="list-decimal ml-4">
                                                    {selected.skills.map(
                                                        (e) => {
                                                            return (
                                                                <li key={e.id}>
                                                                    {e.name}
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ol>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex justify-center mt-12">
                                        <EmptyContent
                                            description={`Ada ${jobs.length} lowongan untuk kamu`}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-16">
                            <EmptyContent description="Data pekerjaan tidak ditemukan" />
                        </div>
                    )}
                </div>
            </div>
            {dataUser && is_freelance && selected && (
                <ModalApply
                    show={modalApply}
                    setShow={setModalApply}
                    dataJob={selected}
                />
            )}
            {!is_freelance && (
                <ConfirmationModal
                    title="Konfirmasi hapus pekerjaan."
                    description="Apakah kamu yakin ingin menghapus permanen pekerjaan ini ?"
                    show={showModal}
                    setShow={setShowModal}
                    action={
                        <DangerButton
                            className="ml-3"
                            onClick={() => {
                                setShowModal(false);
                                Inertia.get(
                                    route("job.force.destroy", selected.id)
                                );
                            }}
                        >
                            Hapus
                        </DangerButton>
                    }
                />
            )}
            {!is_freelance && (
                <ConfirmationModal
                    title="Konfirmasi kembalikan data."
                    description="Apakah kamu yakin ingin mengembalikan pekerjaan ini ?"
                    show={showModalRestore}
                    setShow={setShowModalRestore}
                    action={
                        <PrimaryButton
                            className="ml-3"
                            onClick={() => {
                                setShowModal(false);
                                Inertia.get(route("job.restore", selected.id));
                            }}
                        >
                            Kembalikan
                        </PrimaryButton>
                    }
                />
            )}
        </>
    );
}
