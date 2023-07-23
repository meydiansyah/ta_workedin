import { ConfirmationModal } from "@/Components/ConfirmationModal";
import DangerButton from "@/Components/DangerButton";
import Navbar from "@/Components/Navbar";
import { Link, Head, usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";
import { useState } from "react";
import { MdOutlineMarkEmailRead, MdVerified } from "react-icons/md";

export default function Welcome(props) {
    const { user, dataUser } = usePage().props.auth;
    const [showModal, setShowModal] = useState(false);
    const { is_admin, is_freelance } = usePage().props;

    useEffect(() => {
        if (props.status) {
            setShowModal(true);
        }
    }, [props.status]);

    return (
        <>
            <Head title="workedin" />
            <div className="relative flex items-top justify-center min-h-screen bg-white sm:items-center sm:pt-0">
                <Navbar />

                <section>
                    <div className="w-full px-3 h-screen antialiased bg-white lg:px-6 flex items-center justify-center ">
                        <div className="mx-auto max-w-5xl center">
                            <div className="container py-auto mx-auto text-center sm:px-4 ">
                                <h1 className="text-4xl font-semibold leading-10 tracking-tight sm:text-5xl sm:leading-none md:text-6xl xl:text-7xl">
                                    <div className="block my-6">
                                        <span className="my-6 font-extrabold">
                                            Worked
                                        </span>
                                        <span className="text-[#2C7E5B]">
                                            [in]
                                        </span>
                                    </div>
                                    <span className="inline-block relative">
                                        Portal Kerja Lepas Mahasiswa
                                    </span>
                                </h1>
                                <div className="max-w-lg mx-auto mt-6 text-sm text-center text-black md:mt-12 sm:text-base md:max-w-xl md:text-lg xl:text-xl">
                                    Temukan Skills Baru, Perluas Koneksimu
                                </div>
                                <div className="mt-8 text-sm text-black">
                                    By signing up, you agree to our terms and
                                    services.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {user && !is_admin && (
                <ConfirmationModal
                    title={
                        <div className="flex justify-between items-center">
                            <div className="font-bold">
                                Konfirmasi verifikasi
                            </div>
                            <MdOutlineMarkEmailRead size={26} color="#2C7E5B" />
                        </div>
                    }
                    description={
                        <div>
                            <span>Yeayy !!! Selamat email anda sudah</span>{" "}
                            <span className="font-bold text-green-700 underline underline-offset-4 decoration-green-700">
                                terverifikasi
                            </span>
                            .{" "}
                            <span>
                                Nikmati fitur - fitur workedin dengan nyaman.
                            </span>
                        </div>
                    }
                    show={showModal}
                    setShow={setShowModal}
                    action={
                        !dataUser && (
                            <Link
                                className="inline-flex items-center px-4 py-2 font-bold text-sm text-green-700 hover:text-opacity-60 focus:bg-green focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition ease-in-out duration-150"
                                href={route("profile.edit")}
                            >
                                Lengkapi profile
                            </Link>
                        )
                    }
                >
                    <div className="flex-col space-y-4 my-2 mt-12">
                        <p className="text-md text-gray-600 font-bold">
                            Informasi pengguna
                        </p>
                        <div className="flex space-x-4 items-center">
                            <img
                                className="h-16 w-16 rounded-full object-cover"
                                src={user.profile_photo_url}
                                alt={user.name}
                            />
                            <div className="flex-col space-y-2">
                                <div className="flex space-x-2 text-xl font-bold items-center">
                                    <span>{user.name}</span>

                                    {user.is_verified ? (
                                        <MdVerified color="#2C7E5B" />
                                    ) : (
                                        <div className="text-sm text-gray-500 font-semibold">
                                            - Belum terverifikasi
                                        </div>
                                    )}
                                </div>

                                <div className="text-sm font-semibold text-gray-500 flex space-x-2 items-center">
                                    {dataUser ? (
                                        is_freelance ? (
                                            <span>
                                                {dataUser.major
                                                    ? dataUser.major.name
                                                    : ""}
                                                ,{" "}
                                                {dataUser.university
                                                    ? dataUser.university.name
                                                    : ""}
                                            </span>
                                        ) : (
                                            <span>
                                                {dataUser.title ?? ""},{" "}
                                                {dataUser.company.name ?? ""}
                                            </span>
                                        )
                                    ) : (
                                        "Belum terdaftar di unversitas"
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </ConfirmationModal>
            )}
        </>
    );
}
