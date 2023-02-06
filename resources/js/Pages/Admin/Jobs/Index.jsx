import CardJob from "@/Components/CardJob";
import EmptyContent from "@/Components/Empty";
import HeaderClient from "@/Components/HeaderClient";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";

export default function JobAdmin(props) {
    return (
        <AuthenticatedLayout header={<HeaderClient />}>
            <Head title="Admin - Freelance" />

            <CardJob jobs={props.job} />
        </AuthenticatedLayout>
    );
}
