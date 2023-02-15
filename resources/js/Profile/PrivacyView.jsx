import Checkbox from "@/Components/Checkbox";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm";
import UpdateProfileInformation from "@/Pages/Profile/Partials/UpdateProfileInformationForm";
import { RadioGroup, Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { FaUserLock } from "react-icons/fa";

export default function PrivacyView({ status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, wasSuccessful } = useForm({
        status_id: user.status_id,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showInformation, setShowInformation] = useState(false);

    return (
        <div className=" bg-white rounded-lg p-6">
            <div className="p-4 flex-col space-y-6">
                <div className="flex justify-between">
                    <div className="flex space-x-4 items-center">
                        <FaUserLock size={20} />
                        <div className="text-lg font-semibold">
                            Pengaturan Privasi Pengguna
                        </div>
                    </div>
                    {wasSuccessful && (
                        <Transition
                            show={wasSuccessful}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out duration-700"
                        >
                            <div className="font-medium text-sm text-green-600">
                                Berhasil diperbarui
                            </div>
                        </Transition>
                    )}
                </div>
                {showInformation ? (
                    <UpdateProfileInformation
                        show={showInformation}
                        cancelTap={() => setShowInformation(false)}
                    />
                ) : (
                    <div className="flex justify-between">
                        <div className="text-lg font-semibold">
                            Perbarui Informasi
                        </div>

                        <button
                            type="button"
                            className="font-medium text-green-600"
                            onClick={() => {
                                setShowInformation(true);
                            }}
                        >
                            Perbarui
                        </button>
                    </div>
                )}
                <div className="w-full border-2 border-gray-100 rounded-md" />
                {showPassword ? (
                    <UpdatePasswordForm
                        cancelTap={() => setShowPassword(false)}
                        show={showPassword}
                    />
                ) : (
                    <div className="flex justify-between">
                        <div className="text-lg font-semibold">
                            Perbarui Password
                        </div>

                        <button
                            type="button"
                            className="font-medium text-green-600"
                            onClick={() => {
                                setShowPassword(true);
                            }}
                        >
                            Perbarui
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
