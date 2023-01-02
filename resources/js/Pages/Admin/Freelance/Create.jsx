import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import { BiInfoCircle } from "react-icons/bi";

export default function FreelanceCreate({ universities }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: "",
            email: "",
            password: "",
            status_id: 2,
            role_id: 2,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("freelance.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <div className="flex">
                        <h2 className="text-xl leading-tight text-gray-800">
                            Freelances {" / "}
                        </h2>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Create
                        </h2>
                    </div>
                    <div className="flex">
                        <Link
                            href={route("admin.freelance")}
                            className="inline-flex items-center px-4 py-2 text-xs font-bold tracking-widest uppercase bg-white border border-gray-600 rounded-md hover:bg-gray-100 focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Cancel
                        </Link>
                        <Link
                            href={route("admin.freelance")}
                            className="inline-flex items-center px-4 py-2 ml-4 text-xs font-bold tracking-widest text-white uppercase bg-blue-600 border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Save
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Admin - Create Freelance" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {!universities && (
                        <div className="bg-yellow-100 rounded-lg py-5 px-6 mb-4 text-base text-yellow-700 mb-3">
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <BiInfoCircle size={30} />
                                    <span className="ml-4">
                                        Data Universitas tidak ditemukan
                                    </span>
                                </div>

                                <Link className="font-bold">Periksa</Link>
                            </div>
                        </div>
                    )}

                    <div className="p-4 bg-white max-w-xl mx-auto shadow sm:p-8 sm:rounded-lg">
                        <header>
                            <h2 className="text-lg font-medium text-gray-900">
                                Profile Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-600">
                                Create your account's profile information and
                                email address.
                            </p>
                        </header>
                        <form onSubmit={submit} className="mt-6 space-y-6">
                            <div>
                                <TextInput type="hidden" id="status_id" />
                                <TextInput type="hidden" id="role_id" />

                                <InputLabel for="name" value="Name" />

                                <TextInput
                                    id="name"
                                    className="block w-full mt-1"
                                    value={data.name}
                                    handleChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    autofocus
                                    autoComplete="name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div>
                                <InputLabel for="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    className="block w-full mt-1"
                                    value={data.email}
                                    handleChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                    autofocus
                                    autoComplete="email"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            <div>
                                <InputLabel for="password" value="Passowrd" />

                                <TextInput
                                    id="password"
                                    type="password"
                                    className="block w-full mt-1"
                                    value={data.password}
                                    handleChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
                                    autoComplete="password"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.password}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
