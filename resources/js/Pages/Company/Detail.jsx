import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Inertia } from "@inertiajs/inertia";
import { Link, Head } from "@inertiajs/inertia-react";
import { AiFillStar } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";

export default function Company(props) {
    return (
        <>
            <Navbar />

            <div className="relative flex-col items-top justify-center min-h-screen bg-white sm:items-center sm:pt-0">
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
                        <div className="md:col-span-4 flex-col space-y-4">
                            <h2 className="lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-900 mt-2 md:mt-0">
                                {props.company.type_company.code}{" "}
                                {props.company.name}
                            </h2>
                            <Link
                                href={route(
                                    "detail.user",
                                    props.company.company_pic[0].user_id
                                )}
                                className="text-sm hover:underline hover:underline-offset-4"
                            >
                                {props.company.company_pic[0].title}{" "}
                                {props.company.company_pic[0].full_name}
                            </Link>
                        </div>
                        <div className="md:col-span-1">
                            <div className="flex-col space-y-2">
                                <div className="flex justify-end space-x-1 items-center">
                                    <AiFillStar
                                        size={20}
                                        className="text-yellow-400"
                                    />
                                    <div className="text-md text-gray-500">
                                        {props.company.rating}
                                    </div>
                                </div>
                                {props.company.reviews.length > 0 && (
                                    <div className="text-sm flex justify-end space-x-2  hover:opacity-80">
                                        ({props.company.reviews.length} ulasan)
                                    </div>
                                )}
                            </div>
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
                    {/* {props.company.majors.length > 0 && (
                        <div className="mx-auto mt-2 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                            <div className="md:col-span-1">Total Jurusan</div>
                            <div className="md:col-span-4">
                                <h2 className="font-semibold text-gray-900 mt-2 md:mt-0">
                                    {props.university.majors.length}{" "}
                                    {" Jurusan"}
                                </h2>
                            </div>
                        </div>
                    )} */}
                </div>

                {props.jobs && (
                    <section>
                        <div className="max-w-6xl mx-auto mb-32">
                            <div className="mx-4 p-10  rounded-xl border border-gray-300">
                                <div className="flex-col space-y-6">
                                    <p className="text-2xl mx-auto text-center font-semibold text-gray-900 sm:tracking-tight lg:text-3xl border-b w-full pb-8">
                                        Daftar Pekerjaan
                                    </p>
                                    <div className="grid md:grid-cols-8 gap-x-6 gap-y-8 ">
                                        {props.jobs.map((e) => {
                                            return (
                                                <div
                                                    key={e.id}
                                                    className="col-span-2 flex-col space-y-1 items-start p-2 cursor-pointer rounded-md hover:bg-gray-50"
                                                    onClick={() => {
                                                        Inertia.get(
                                                            route(
                                                                "job.detail",
                                                                e.id
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <div className="font-bold">
                                                        {e.title}
                                                    </div>
                                                    <div className="font-sm">
                                                        Rp. {e.salary}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
            <Footer />
        </>
    );
}
