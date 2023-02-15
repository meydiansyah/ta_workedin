import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import HeadComponent from "@/Layouts/Head";
import { Inertia } from "@inertiajs/inertia";
import { Link, Head } from "@inertiajs/inertia-react";

export default function Company(props) {
    return (
        <>
            <Head title="workedin - perusahaan" />
            <div className="relative flex-col items-top justify-center min-h-screen bg-white sm:items-center sm:pt-0">
                <Navbar />

                <HeadComponent
                    title="Daftar Perusahaan"
                    description="Temukan perusahaan yang terdaftar di portal kerja"
                />

                {props.companies.length > 0 && (
                    <section>
                        <div className="max-w-6xl mx-auto mb-32">
                            <div className="mx-4 p-10  rounded-xl border border-gray-300">
                                <div className="flex-col space-y-6">
                                    <p className="text-2xl mx-auto text-center font-semibold text-gray-900 sm:tracking-tight lg:text-3xl border-b w-full pb-8">
                                        Daftar Perusahaan
                                    </p>
                                    <div className="grid md:grid-cols-8 gap-x-6 gap-y-8 ">
                                        {props.companies.map((e) => {
                                            return (
                                                <div
                                                    key={e.id}
                                                    className="col-span-2 flex-col space-y-1 items-start p-2 cursor-pointer rounded-md hover:bg-gray-50"
                                                    onClick={() => {
                                                        Inertia.get(
                                                            route(
                                                                "company.detail",
                                                                e.id
                                                            )
                                                        );
                                                    }}
                                                >
                                                    <div className="font-bold">
                                                        {e.name}
                                                    </div>
                                                    <div className="font-sm">
                                                        {e.type_company.name}
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
