import { ConfirmationModal } from "@/Components/ConfirmationModal";
import DangerButton from "@/Components/DangerButton";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import HeadComponent from "@/Layouts/Head";
import { Link, Head, usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";
import { useState } from "react";
import { FaSchool } from "react-icons/fa";
import { MdOutlineMarkEmailRead, MdVerified } from "react-icons/md";

export default function About(props) {
    return (
        <>
            <Head title="workedin - about" />
            <Navbar />

            <div className="relative flex-col items-top justify-center bg-white sm:items-center sm:pt-0">
                <HeadComponent
                    title="About Us"
                    description={`Kami telah terhubung dengan ${
                        props.universities.length
                    } universitas${
                        props.freelances.length > 0
                            ? ` dan ${props.freelances.length} mahasiswa di indonesia.`
                            : "."
                    }`}
                />
            </div>
            <div className=" bg-gray-100">
                <div className="max-w-3xl py-12 mx-auto md:grid md:grid-cols-8 gap-4 items-center">
                    <div className="col-span-3 md:block flex justify-center">
                        <FaSchool size={120} className="text-green-800" />
                    </div>
                    <div className="col-span-5 flex-col space-y-4 px-6">
                        <div className="font-bold text-xl">
                            Tentang Workedin
                        </div>
                        <div className="flex-col space-y-4">
                            <div>
                                Worked<span className="text-green-800">in</span>{" "}
                                adalah portal kerja lepas yang di fokuskan untuk
                                para mahasiswa yang tersebar di seluruh
                                universitas indonesia yang terdaftar pada laman{" "}
                                <span className="text-blue-800 hover:text-blue-500 cursor-pointer hover:underline hover:underline-offset-4 hover:decoration-blue-500">
                                    pddikti.kemdikbud.go.id.
                                </span>{" "}
                                Kami menghubungkan lebih dari{" "}
                                <span className="font-bold">
                                    {props.picCompanies.length}
                                </span>{" "}
                                para pemberi kerja.
                            </div>
                            <div>
                                Melalui website worked
                                <span className="text-green-800">in</span>, para
                                pemberi kerja dapat mempekerjakan freelancer
                                untuk melakukan pekerjaan di berbagai bidang
                                seperti pengembangan perangkat lunak, penulisan,
                                entri data dan desain sampai ke teknik,
                                ilmu-ilmu, penjualan dan pemasaran, akuntansi
                                dan jasa hukum
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
