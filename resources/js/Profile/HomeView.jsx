import { usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { FaIndustry, FaUserCog } from "react-icons/fa";
import {
    MdAlternateEmail,
    MdOutlineDesignServices,
    MdSchool,
    MdVerified,
} from "react-icons/md";

export default function HomeView({ data }) {
    const user = usePage().props.auth.user;
    const skills = data.skills ?? [];
    const { is_admin, is_verified, is_freelance, is_client } = usePage().props;
    const getStatus = (status) => {
        switch (status) {
            case "accepted":
            case "active":
                return "text-green-500";
            case "onreview":
            case "ongoing":
            case "deactive":
                return "text-orange-500";
            case "rejected":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    const listWarning = [
        !user.email_verified_at && (
            <li key="email">Email belum terverifikasi</li>
        ),
        !data.user && !is_admin && (
            <li key="profile">Data profile belum dilengkapi</li>
        ),
        is_freelance && !data.university && (
            <li key="study">Data pendidikan belum dilengkapi</li>
        ),
        is_freelance && skills.length === 0 && (
            <div key="skill">
                <li>Data keterampilan belum dilengkapi</li>
            </div>
        ),
        !data.company && is_client && (
            <li key="company">Belum terdaftar pada perusahaan</li>
        ),
    ];

    function isEmpty(info) {
        return info === false;
    }

    return (
        <div className="flex-col space-y-4">
            <div className=" bg-white rounded-lg p-6">
                <div className="flex-col space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="flex space-x-4">
                            <img
                                className="h-24 w-24 rounded-md object-cover"
                                src={
                                    data.user
                                        ? data.user.profile_photo_url
                                        : data.profile_photo_url
                                }
                                alt={data.user ? data.user.name : data.name}
                            />
                            <div className="flex-col">
                                <div className="flex space-x-2 text-xl font-bold items-center">
                                    <span>
                                        {data.user ? data.user.name : data.name}
                                    </span>
                                    {!is_admin && (
                                        <>
                                            {is_verified ? (
                                                <MdVerified color="#2C7E5B" />
                                            ) : (
                                                <div className="text-sm text-gray-500 font-semibold">
                                                    - Belum terverifikasi
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500 flex space-x-2 items-center">
                                    <FaUserCog />
                                    <span>
                                        {data.user
                                            ? data.user.role.name
                                            : data.role.name}
                                    </span>
                                </div>
                                {data.university && (
                                    <div className="text-sm text-gray-500 flex space-x-2 items-center">
                                        <MdSchool />
                                        <span>
                                            {data.major.name} -{" "}
                                            {data.university.name}
                                        </span>
                                    </div>
                                )}
                                {data.company && (
                                    <div className="text-sm text-gray-500 flex space-x-2 items-center">
                                        <FaIndustry />
                                        <span>
                                            {data.title} - {data.company.name}
                                        </span>
                                    </div>
                                )}
                                <div className="text-sm text-gray-500 flex space-x-2 items-center">
                                    <MdAlternateEmail />
                                    <span>{data.email}</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`text-sm ${getStatus(
                                data.user
                                    ? data.user.status.name
                                    : data.status.name
                            )}`}
                        >
                            {data.user
                                ? data.user.status.name
                                : data.status.name}
                        </div>
                    </div>

                    {!listWarning.every(isEmpty) && (
                        <div className="flex-col space-y-4">
                            <div className="font-semibold flex space-x-2 items-center">
                                <BiInfoCircle
                                    size={20}
                                    className="text-yellow-700 "
                                />
                                <span>Lengkapi data terlebih dahulu :</span>
                            </div>
                            <div className="ml-8">
                                <ol className="list-decimal ml-4">
                                    {listWarning.map((e) => e)}
                                </ol>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {skills.length !== 0 && (
                <div className=" bg-white rounded-lg p-6">
                    <div className="flex-col space-y-6">
                        <div className="flex space-x-4 items-center">
                            <MdOutlineDesignServices size={20} />
                            <div className="text-lg font-semibold">
                                Keterampilan
                            </div>
                        </div>
                        <div className="flex-col space-y-4">
                            <div className="ml-8">
                                <ol className="list-decimal ml-4">
                                    {skills.map((e) => {
                                        return <li key={e.id}>{e.name}</li>;
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
