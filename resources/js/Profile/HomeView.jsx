import Dropdown from "@/Components/Dropdown";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiInfoCircle } from "react-icons/bi";
import { FaIndustry, FaUserCog } from "react-icons/fa";
import {
    MdAlternateEmail,
    MdExpandLess,
    MdExpandMore,
    MdMoreVert,
    MdOutlineDesignServices,
    MdSchool,
    MdVerified,
} from "react-icons/md";

export default function HomeView({ data, updateStatus }) {
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
                        {!is_admin && data.user && (
                            <div className="flex-col space-y-2">
                                <Dropdown>
                                    <Dropdown.Trigger
                                        className={`${getStatus(
                                            data.user
                                                ? data.user.status.name
                                                : data.status.name
                                        )}`}
                                        withIcon
                                    >
                                        <button
                                            type="button"
                                            className="p-2 pr-0 flex space-x-2 items-center"
                                        >
                                            <div className="text-sm">
                                                {data.user
                                                    ? data.user.status.name
                                                    : data.status.name}
                                            </div>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <span className="text-gray-500 text-xs p-4">
                                            Perbarui status:
                                        </span>
                                        <div
                                            onClick={(e) => {
                                                data.user.status_id === 1
                                                    ? Inertia.patch(
                                                          route(
                                                              "profile.status.update",
                                                              user.id
                                                          ),
                                                          {
                                                              status_id: 2,
                                                          }
                                                      )
                                                    : Inertia.patch(
                                                          route(
                                                              "profile.status.update",
                                                              user.id
                                                          ),
                                                          {
                                                              status_id: 1,
                                                          }
                                                      );
                                                updateStatus();
                                            }}
                                            className="block w-full cursor-pointer px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                                        >
                                            {data.user.status_id === 1
                                                ? "Sembunyikan"
                                                : "Aktifkan"}
                                        </div>
                                    </Dropdown.Content>
                                </Dropdown>
                                {data.reviews && (
                                    <>
                                        <div className="flex justify-end pr-1 items-center space-x-1">
                                            <AiFillStar
                                                size={18}
                                                className="text-yellow-400"
                                            />
                                            <div className="text-sm flex space-x-2 text-gray-500">
                                                {data.rating}
                                            </div>
                                        </div>
                                        {data.reviews.length > 0 && (
                                            <div className="text-sm flex justify-end space-x-2 text-gray-500">
                                                ({data.reviews.length}) ulasan
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
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

            {data.company && (
                <div className=" bg-white rounded-lg p-6">
                    <div className="flex-col space-y-6">
                        <div className="flex space-x-4 items-center">
                            <FaIndustry size={20} />
                            <div className="text-lg font-semibold">
                                Perusahaan
                            </div>
                        </div>
                        <div className="flex-col space-y-4">
                            <div className="ml-8">
                                <div className="md:grid md:grid-cols-6 md:gap-6 items-center">
                                    {data.company.logo && (
                                        <div className="md:col-span-1">
                                            <div className="rounded-md  bg-gray-200 p-4">
                                                <img
                                                    src={data.company.logo}
                                                    className="mx-auto"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    <div className="md:col-span-4 flex-col space-y-2">
                                        <h2 className=" md:text-2xl text-lg font-semibold text-gray-900 mt-2 md:mt-0">
                                            {data.company.name}
                                        </h2>
                                        <div className="text-sm text-gray-500">
                                            {data.company.type_company.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
