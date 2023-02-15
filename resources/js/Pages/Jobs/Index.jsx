import CardJob from "@/Components/CardJob";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/inertia-react";

export default function Job(props) {
    return (
        <>
            <Head title="workedin - pekerjaan" />
            <Navbar />

            <div className="relative flex-col min-h-screen items-top justify-center bg-white sm:items-center sm:pt-0">
                <div className="py-12">
                    <CardJob status={props.status} jobs={props.job} />
                </div>
            </div>
            <Footer />
        </>
    );
}
