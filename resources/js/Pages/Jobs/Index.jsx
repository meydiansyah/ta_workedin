import CardJob from "@/Components/CardJob";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Head } from "@inertiajs/inertia-react";

export default function Job(props) {
    return (
        <>
            <Head title="workedin - pekerjaan" />
            <div className="relative flex-col items-top justify-center bg-white sm:items-center sm:pt-0">
                <Navbar />

                <div className="py-12">
                    <CardJob jobs={props.job} />
                </div>

                <Footer />
            </div>
        </>
    );
}
