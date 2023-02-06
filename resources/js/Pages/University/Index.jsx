import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import HeadComponent from "@/Layouts/Head";
import { Inertia } from "@inertiajs/inertia";
import { Link, Head } from "@inertiajs/inertia-react";

export default function University(props) {
    return (
        <>
            <Head title="workedin - universitas" />
            <div className="relative flex-col items-top justify-center min-h-screen bg-white sm:items-center sm:pt-0">
                <Navbar />

                <HeadComponent
                    title="Daftar Universitas"
                    description="Temukan universitas yang terdaftar di portal kerja"
                />

                <section>
                    <div className="max-w-6xl mx-auto mb-32">
                        <div className="mx-4 p-10  rounded-xl border border-gray-300">
                            <div className="flex-col space-y-6">
                                <p className="text-2xl mx-auto text-center font-semibold text-gray-900 sm:tracking-tight lg:text-3xl border-b w-full pb-8">
                                    Daftar Universitas
                                </p>
                                <div className="grid md:grid-cols-8 gap-x-6 gap-y-8 ">
                                    {props.universities.map((e) => {
                                        return (
                                            <Link
                                                key={e.codept}
                                                className="col-span-2 flex-col space-y-1 items-start p-2 cursor-pointer rounded-md hover:bg-gray-50"
                                                href={route(
                                                    "detail.university",
                                                    e.codept
                                                )}
                                                // onClick={(e) =>
                                                //     Inertia.get(
                                                //         route(
                                                //             "university.detail",
                                                //             e.codept
                                                //         )
                                                //     )
                                                // }
                                            >
                                                <div className="font-bold">
                                                    {e.name}
                                                </div>
                                                <div className="font-sm">
                                                    {e.codept}
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
