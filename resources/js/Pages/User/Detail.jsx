import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Link, Head } from "@inertiajs/inertia-react";
import { MdOutlineDesignServices, MdVerified } from "react-icons/md";

export default function DetailUser(props) {
    return (
        <>
            <Head
                title={`workedin - ${
                    props.user.role_id === 2 && "Detail PIC"
                } ${props.user.role_id === 3 && "Detail Freelance"}`}
            />
            <Navbar />

            <div className="relative flex-col items-top justify-center min-h-screen bg-white sm:items-center sm:pt-0">
                <div className="py-10 pt-16">
                    <div className="mx-auto my-12 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 items-center">
                        <div className="md:col-span-1">
                            <div className="rounded-md  bg-gray-200 p-4">
                                <img
                                    src={props.user.profile_photo_url}
                                    className="mx-auto"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-5">
                            <div className="flex justify-between">
                                <div className="md:flex md:space-x-4 space-y-2 md:space-y-0 items-center">
                                    <h2 className="lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-900 md:mt-0">
                                        {props.data.full_name}
                                    </h2>
                                    {props.user.is_verified ? (
                                        <MdVerified
                                            className="text-3xl"
                                            color="#2C7E5B"
                                        />
                                    ) : (
                                        <div className="lg:text-2xl md:text-lg text-md font-semibold text-gray-900 md:mt-0">
                                            - Belum terverifikasi
                                        </div>
                                    )}
                                </div>
                            </div>
                            {props.user.role_id === 2 ? (
                                <Link
                                    href={route(
                                        "company.detail",
                                        props.data.company.id
                                    )}
                                    className="text-sm hover:underline hover:underline-offset-4"
                                >
                                    {props.data.company.type_company.code}{" "}
                                    {props.data.company.name}
                                </Link>
                            ) : (
                                <Link
                                    href={route(
                                        "detail.university",
                                        props.data.university.codept
                                    )}
                                    className="text-sm hover:underline hover:underline-offset-4"
                                >
                                    {props.data.major.name}
                                    {", "}
                                    {props.data.university.name}
                                </Link>
                            )}
                        </div>
                    </div>
                    {props.data.bio && (
                        <div className="mx-auto mt-6 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                            <div className="md:col-span-1">Bio</div>
                            <div className="md:col-span-4">
                                <h2 className=" font-semibold text-gray-900 mt-2 md:mt-0">
                                    {props.data.bio}
                                </h2>
                            </div>
                        </div>
                    )}
                    <div className="mx-auto mt-2 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                        <div className="md:col-span-1">Alamat</div>
                        <div className="md:col-span-4">
                            <h2 className=" font-semibold text-gray-900 mt-2 md:mt-0">
                                {props.data.full_address}
                            </h2>
                        </div>
                    </div>
                    <div className="mx-auto mt-2 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                        <div className="md:col-span-1">Email</div>
                        <div className="md:col-span-4">
                            <h2 className="font-semibold text-gray-900 mt-2 md:mt-0">
                                {props.data.email}
                            </h2>
                        </div>
                    </div>
                    <div className="mx-auto mt-2 max-w-6xl md:grid md:grid-cols-6 md:gap-6 px-16 ">
                        <div className="md:col-span-1">Telepon</div>
                        <div className="md:col-span-4">
                            <h2 className="font-semibold text-gray-900 mt-2 md:mt-0">
                                {props.data.phone}
                            </h2>
                        </div>
                    </div>
                    {props.data.skills && props.data.skills.length !== 0 && (
                        <div className="space-y-2 mx-auto mt-12 max-w-6xl px-16 md:grid md:grid-cols-6 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="text-lg font-semibold">
                                    Keterampilan
                                </div>
                            </div>
                            <div className="md:col-span-4">
                                <ol className="list-decimal ml-4">
                                    {props.data.skills.map((e) => {
                                        return <li key={e.id}>{e.name}</li>;
                                    })}
                                </ol>
                            </div>
                        </div>
                    )}
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

                {props.company && (
                    <section>
                        {props.company.jobs.length > 0 && (
                            <div className="max-w-6xl mx-auto mb-32">
                                <div className="mx-4 p-10  rounded-xl border border-gray-300">
                                    <div className="flex-col space-y-6">
                                        <p className="text-2xl mx-auto text-center font-semibold text-gray-900 sm:tracking-tight lg:text-3xl border-b w-full pb-8">
                                            Daftar Pekerjaan
                                        </p>
                                        <div className="grid md:grid-cols-8 gap-x-6 gap-y-8 ">
                                            {props.company.jobs.map((e) => {
                                                return (
                                                    <div
                                                        key={e.id}
                                                        className="col-span-2 flex-col space-y-1 items-start p-2 cursor-pointer rounded-md hover:bg-gray-50"
                                                        // onClick={() => {
                                                        //     Inertia.get(
                                                        //         route(
                                                        //             "company.detail",
                                                        //             e.id
                                                        //         )
                                                        //     );
                                                        // }}
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
                        )}
                    </section>
                )}
            </div>
            <Footer />
        </>
    );
}
