import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role_id: 3,
    });

    const [freelance, setFreelance] = useState(true);
    const [client, setClient] = useState(false);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    const clickFreelance = (e) => {
        setData("role_id", 3);
        setFreelance(true);
        setClient(false);
    };

    const clickClient = (e) => {
        setData("role_id", 2);
        setFreelance(false);
        setClient(true);
    };
    return (
        <GuestLayout
            head={
                <div>
                    <p className="mt-1 text-md text-center text-black mb-4">
                        Daftarkan sebagai :
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div
                            className={`${
                                freelance
                                    ? "bg-white shadow-md border-transparent hover:cursor-default"
                                    : "bg-transparent border-[#2C7E5B] opacity-50"
                            } text-center rounded-lg px-12 py-2 border-2  hover:cursor-pointer hover:opacity-100`}
                            onClick={clickFreelance}
                        >
                            <h2>Freelancer</h2>
                        </div>
                        <div
                            className={`${
                                client
                                    ? "bg-white shadow-md border-transparent hover:cursor-default"
                                    : "bg-transparent border-[#2C7E5B] opacity-50"
                            } text-center rounded-lg px-12 py-2 border-2  hover:cursor-pointer hover:opacity-90`}
                            onClick={clickClient}
                        >
                            <h2>Client</h2>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="block w-full mt-1"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full mt-1"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full mt-1"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        forInput="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="block w-full mt-1"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="text-sm text-gray-600 underline hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" processing={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
