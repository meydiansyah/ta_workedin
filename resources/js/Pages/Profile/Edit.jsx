import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import Dropdown from "@/Components/Dropdown";
import { BiCheckCircle, BiInfoCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
import SideBarLink from "@/Components/SideBarLink";
import HomeView from "@/Profile/HomeView";
import { Inertia } from "@inertiajs/inertia";
import ProfileView from "@/Profile/ProfileView";
import PrivacyView from "@/Profile/PrivacyView";
import StudyView from "@/Profile/StudyView";
import CompanyView from "@/Profile/CompanyView";
import { Transition } from "@headlessui/react";
import SkillView from "@/Profile/SkillView";
import { MdOutlineDesignServices } from "react-icons/md";

export default function Edit({
    auth,
    data,
    mustVerifyEmail,
    status,
    skills,
    provinces,
    universities,
    majors,
    companies,
    types,
}) {
    const user = usePage().props.auth.user;
    const [showAlert, setShowAlert] = useState(false);
    const { is_admin, is_verified, is_freelance, is_client } = usePage().props;
    const [active, setActive] = useState(0);
    const skill = data.skills ?? [];
    const listView = [
        <HomeView
            data={data}
            updateStatus={() => {
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
            }}
        />,
        <ProfileView
            status={status}
            data={data}
            provinces={provinces}
            tapBack={() => {
                setShowAlert(true);
                setActive(1);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
            }}
        />,
        <>
            {is_freelance ? (
                <StudyView
                    data={data}
                    universities={universities}
                    majors={majors}
                    toProfile={() => {
                        setActive(1);
                    }}
                />
            ) : (
                <CompanyView
                    data={data}
                    types={types}
                    companies={companies}
                    provinces={provinces}
                    toProfile={() => {
                        setActive(1);
                    }}
                />
            )}
        </>,
        <>
            {is_freelance && (
                <SkillView
                    data={data}
                    skills={skills}
                    toProfile={() => {
                        setActive(1);
                    }}
                />
            )}
        </>,
        <PrivacyView status={status} />,
    ];

    useEffect(() => {
        if (status) {
            setShowAlert(true);
        }
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    }, [status]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Profile
                    </h2>

                    <div className="flex space-x-4 items-center">
                        <Transition
                            show={showAlert}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                            className="transition ease-in-out duration-700"
                        >
                            <div className="font-medium text-sm text-green-600">
                                {status}
                            </div>
                        </Transition>
                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                        {!user.email_verified_at && (
                            <Dropdown>
                                <Dropdown.Trigger>
                                    {status === "verification-link-sent" ? (
                                        <BiCheckCircle
                                            size={30}
                                            className="text-green-600 cursor-pointer"
                                        />
                                    ) : (
                                        <BiInfoCircle
                                            size={30}
                                            className="text-yellow-700 cursor-pointer"
                                        />
                                    )}
                                </Dropdown.Trigger>

                                <Dropdown.Content width="w-64">
                                    <div
                                        className="p-4 flex space-x-2 items-center hover:bg-gray-100 hover:cursor-pointer"
                                        onClick={(e) => {
                                            Inertia.post(
                                                route("verification.send")
                                            );
                                        }}
                                    >
                                        <BiInfoCircle size={22} />
                                        <span>Email belum terverifikasi.</span>
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        )}
                    </div>
                </div>
            }
        >
            <Head title="Profile" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="grid md:grid-cols-8 md:space-x-4">
                        <div className="col-span-2 hidden md:block">
                            <div className=" bg-white rounded-lg p-2 flex-col space-y-2">
                                <div
                                    className={`rounded-md p-2 flex justify-center hover:cursor-pointer hover:bg-gray-100 border border-l-2 border-transparent ${
                                        active === 0 &&
                                        "bg-gray-50 border-l-gray-500"
                                    }`}
                                    onClick={(e) => setActive(0)}
                                >
                                    <div className="mt-2">
                                        <div className="flex-col items-center space-y-4 text-sm focus:border-gray-300 transition justify-center">
                                            <img
                                                className="h-20 w-20 rounded-full object-cover"
                                                src={
                                                    auth.user.profile_photo_url
                                                }
                                                alt={auth.user.name}
                                            />
                                            <div className="flex justify-center">
                                                {auth.user.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <SideBarLink
                                    title="Profile Saya"
                                    active={active === 1}
                                    setActive={(e) => setActive(1)}
                                >
                                    {!data.user && !is_admin && (
                                        <BiInfoCircle
                                            size={20}
                                            className="text-yellow-700 "
                                        />
                                    )}
                                </SideBarLink>
                                {is_freelance && (
                                    <>
                                        <SideBarLink
                                            title="Pendidikan"
                                            active={active === 2}
                                            setActive={(e) => setActive(2)}
                                        >
                                            {!data.university && (
                                                <BiInfoCircle
                                                    size={20}
                                                    className="text-yellow-700 "
                                                />
                                            )}
                                        </SideBarLink>
                                        <SideBarLink
                                            title="Keterampilan"
                                            active={active === 3}
                                            setActive={(e) => setActive(3)}
                                        >
                                            {skill.length === 0 && (
                                                <BiInfoCircle
                                                    size={20}
                                                    className="text-yellow-700 "
                                                />
                                            )}
                                        </SideBarLink>
                                    </>
                                )}
                                {is_client && (
                                    <SideBarLink
                                        title="Perusahaan"
                                        active={active === 2}
                                        setActive={(e) => setActive(2)}
                                    >
                                        {!data.company && (
                                            <BiInfoCircle
                                                size={20}
                                                className="text-yellow-700 "
                                            />
                                        )}
                                    </SideBarLink>
                                )}
                                <SideBarLink
                                    title="Pengaturan Privasi"
                                    active={active === 4}
                                    setActive={(e) => setActive(4)}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">{listView[active]}</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function CustomView({ auth, mustVerifyEmail, status }) {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                {!is_admin && (
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                )}
            </div>
        </div>
    );
}
