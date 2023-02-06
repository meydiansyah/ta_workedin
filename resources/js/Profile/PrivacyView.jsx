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
                <div className="flex-col my-4 pb-6 space-y-6">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            isChecked={data.status_id === 1}
                            name="public"
                            value={data.status_id === 1}
                            handleChange={(e) => {
                                // if (e.target.checked) {
                                //     setData("status_id", 1);
                                // }
                                // console.log(e.target.checked);
                                // setData("status_id", 1);
                                // patch(route("profile.status.update", user.id));
                                // location.reload();
                            }}
                        />
                        <div className="flex-col ml-6">
                            <div className="text-xl text-gray-800">
                                Tampilkan profil
                            </div>
                            <div className="text-gray-500">
                                Memungkinkan perusahaan untuk mencari profil dan
                                melihat nama dan rincian informasi saya.
                            </div>
                        </div>
                    </label>
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            isChecked={data.status_id === 2}
                            name="private"
                            value={data.status_id === 2}
                            handleChange={(e) => {
                                // console.log(e.target.checked);
                                // if (e.target.checked) {
                                //     setData("status_id", 2);
                                // }
                                // setData("status_id", 2);
                                // patch(route("profile.status.update", user.id));
                                // location.reload();
                            }}
                        />
                        <div className="flex-col ml-6">
                            <div className="text-xl text-gray-800">
                                Sembunyikan
                            </div>
                            <div className="text-gray-500">
                                Perusahaan tidak dapat mencari profil saya.
                            </div>
                        </div>
                    </label>
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
