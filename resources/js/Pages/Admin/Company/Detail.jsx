import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Link, Head } from "@inertiajs/inertia-react";
import { FiExternalLink } from "react-icons/fi";

export default function Company(props) {
    return (
        <>
            <Head title="workedin - universitas" />
            <div className="relative flex-col items-top justify-center min-h-screen bg-white sm:items-center sm:pt-0">
                <Navbar />

                <Head title="WorkedIn - Detail Company" />

                <div className="py-10 pt-16">
                    <div className="mx-auto my-12 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 items-center">
                        <div className="md:col-span-1">
                            <div className="rounded-md  bg-gray-200 p-4">
                                <img
                                    src={props.company.logo}
                                    className="mx-auto"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-5">
                            <h2 className="lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-900 mt-2 md:mt-0">
                                {props.company.name}
                            </h2>
                        </div>
                    </div>
                    <div className="mx-auto mt-6 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                        <div className="md:col-span-1">Alamat</div>
                        <div className="md:col-span-4">
                            <h2 className=" font-semibold text-gray-900 mt-2 md:mt-0">
                                {props.company.full_address}
                            </h2>
                        </div>
                    </div>
                    <div className="mx-auto mt-2 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                        <div className="md:col-span-1">Email</div>
                        <div className="md:col-span-4">
                            <h2 className="font-semibold text-gray-900 mt-2 md:mt-0">
                                {props.company.email}
                            </h2>
                        </div>
                    </div>
                    <div className="mx-auto mt-2 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                        <div className="md:col-span-1">Telepon</div>
                        <div className="md:col-span-4">
                            <h2 className="font-semibold text-gray-900 mt-2 md:mt-0">
                                {props.company.phone}
                            </h2>
                        </div>
                    </div>
                    <div className="mx-auto mt-2 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                        <div className="md:col-span-1">Faximile</div>
                        <div className="md:col-span-4">
                            <h2 className="font-semibold text-gray-900 mt-2 md:mt-0">
                                {props.company.fax}
                            </h2>
                        </div>
                    </div>
                    {props.company.majors.length > 0 && (
                        <div className="mx-auto mt-2 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                            <div className="md:col-span-1">Total Jurusan</div>
                            <div className="md:col-span-4">
                                <h2 className="font-semibold text-gray-900 mt-2 md:mt-0">
                                    {props.university.majors.length}{" "}
                                    {" Jurusan"}
                                </h2>
                            </div>
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
}
