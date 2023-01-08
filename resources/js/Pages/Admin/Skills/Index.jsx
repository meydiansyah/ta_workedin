import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import InputSuccess from "@/Components/InputSuccess";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm, usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function SkillAdmin(props) {
    // const { data } = usePage().props;
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [showError, setShowError] = useState(null);
    const { data, setData, patch, post, errors } = useForm({
        id: "",
        name: "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (edit) {
            patch(route("skill.update", data), {
                onError: () => setShowError(true),

                onSuccess: () => {
                    setShowError(true);
                    setTimeout(
                        function () {
                            setData({});
                            setShow(false);
                            setShowError(false);
                        }.bind(this),
                        1000
                    );
                },
            });
        } else {
            post(route("skill.store"), {
                onError: () => setShowError(true),
                onSuccess: () => {
                    setShowError(true);

                    setTimeout(
                        function () {
                            setData({});
                            setShow(false);
                            setShowError(false);
                        }.bind(this),
                        1000
                    );
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Skill
                    </h2>
                    <button
                        onClick={(e) => {
                            setShow(true);
                            setEdit(false);
                            setData("name", "");
                        }}
                        className="inline-flex items-center px-4 py-2 bg-[#2C7E5B] border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-grey focus:bg-grey active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-grey focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Tambah
                    </button>
                </div>
            }
        >
            <Head title="Admin - University" />

            {props.skills && (
                <div className="py-12">
                    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                        <Transition
                            show={show}
                            enter="transition-opacity duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <form onSubmit={submit}>
                                <div className="bg-white max-w-xl mx-auto overflow-hidden shadow-sm sm:rounded-lg p-4 mb-6">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <InputLabel
                                                for="name"
                                                value="Skill name"
                                            />
                                            <div
                                                className="text-red-500 text-2xl hover:cursor-pointer"
                                                onClick={(e) => {
                                                    setShow(false);

                                                    setTimeout(
                                                        function () {
                                                            setData({});
                                                        }.bind(this),
                                                        1000
                                                    );
                                                }}
                                            >
                                                <div className="flex">
                                                    <AiFillCloseCircle />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <div className="w-full items-start">
                                                <TextInput
                                                    id="name"
                                                    className="block mt-1 w-full"
                                                    value={data.name}
                                                    handleChange={(e) => {
                                                        setShowError(false);
                                                        setData(
                                                            "name",
                                                            e.target.value
                                                        );
                                                    }}
                                                    required
                                                    autofocus
                                                    autoComplete="name"
                                                />
                                            </div>

                                            <PrimaryButton className="ml-4 my-auto bg-green-600 ">
                                                Simpan
                                            </PrimaryButton>
                                        </div>
                                        {showError &&
                                            (errors.name ? (
                                                <InputError
                                                    className="mt-2"
                                                    message={errors.name}
                                                />
                                            ) : (
                                                <InputSuccess
                                                    className="mt-2"
                                                    message="update berhasil"
                                                />
                                            ))}
                                    </div>
                                </div>
                            </form>
                        </Transition>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                Daftar Skills
                            </div>

                            <div className="relative mx-4 mb-4 overflow-x-auto sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                No
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Nama
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.skills.map(
                                            (dataSkill, index) => (
                                                <tr
                                                    key={dataSkill.id}
                                                    className={`border-b hover:cursor-pointer hover:bg-gray-100 hover:underline hover:underline-offset-4 ${
                                                        data === dataSkill
                                                            ? "bg-gray-100"
                                                            : "bg-white"
                                                    }`}
                                                    onClick={(e) => {
                                                        setShow(true);
                                                        setEdit(true);
                                                        setShowError(false);
                                                        setData(dataSkill);
                                                    }}
                                                >
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                    >
                                                        {index + 1}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {dataSkill.name}
                                                    </td>

                                                    <td className="px-6 py-4 text-right">
                                                        <button
                                                            typeof="button"
                                                            onClick={() => {
                                                                if (
                                                                    confirm(
                                                                        "Are you sure you want to delete this user?"
                                                                    )
                                                                ) {
                                                                    Inertia.delete(
                                                                        route(
                                                                            "skill.destroy",
                                                                            dataSkill.id
                                                                        ),
                                                                        {
                                                                            onSuccess:
                                                                                () =>
                                                                                    setShowError(
                                                                                        false
                                                                                    ),
                                                                        }
                                                                    );
                                                                }
                                                            }}
                                                            className="font-medium ml-4 text-red-600  hover:underline"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
