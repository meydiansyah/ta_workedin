import Navbar from "@/Components/Navbar";
import { Link, Head } from "@inertiajs/inertia-react";

export default function Welcome(props) {
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
        </>
    );
}
