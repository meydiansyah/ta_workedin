import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Link, Head, usePage } from "@inertiajs/inertia-react";
import moment from "moment";
import { HiOutlineClock } from "react-icons/hi";
import { FaCity, FaGetPocket } from "react-icons/fa";
import {
    MdOutlineDesignServices,
    MdOutlineMail,
    MdOutlineMarkEmailRead,
    MdVerified,
} from "react-icons/md";
import Rating from "react-rating";
import ModalApply from "@/Components/ModalApply";
import { useState } from "react";

export default function DetailJob(props) {
    const user = usePage().props.auth.user;
    const { is_freelance } = usePage().props;
    const [modalApply, setModalApply] = useState(false);
    const getStatus = (status) => {
        switch (status) {
            case "accepted":
            case "active":
                return "bg-green-500 text-white";
            case "finished":
                return "bg-green-800 text-white";
            case "onreview":
            case "ongoing":
            case "deactive":
                return "bg-orange-500 text-white";
            case "canceled":
            case "rejected":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };
    return (
        <>
            <Head title="workedin - detail pekerjaan" />
            <Navbar />

            <div className="pt-20 py-16 bg-[#32A071] h-[250px] absolute top-0 left-0 right-0" />

            <div className="min-h-screen bg-gray-100">
                <div className="py-12 mx-auto mt-20 relative flex-col max-w-4xl">
                    <div className="flex-col space-y-8">
                        <div className="flex-col space-y-6 p-6 rounded-md bg-white shadow-md hover:bg-gray-100">
                            <div className="font-semibold text-lg">
                                Penanggung Jawab
                            </div>
                            <div className="sm:hidden block mb-4">
                                <img
                                    className="h-14 w-14 rounded-md object-cover"
                                    src={props.user.profile_photo_url}
                                    alt={props.pic.full_name}
                                />
                            </div>
                            <div className="grid grid-cols-12 gap-6">
                                <div className="sm:col-span-1 sm:block sm:space-y-2 hidden ">
                                    <div className="flex justify-center">
                                        <img
                                            className="h-12 object-cover"
                                            src={props.user.profile_photo_url}
                                            alt={props.pic.full_name}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-11 col-span-12 flex-col space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <Link
                                                href={route(
                                                    "detail.user",
                                                    props.pic.user.id
                                                )}
                                                className="flex space-x-2 font-bold items-center"
                                            >
                                                <div className="text-2xl">
                                                    {props.pic.full_name}
                                                </div>
                                                {props.pic.user.is_verified ? (
                                                    <MdVerified
                                                        size={24}
                                                        color="#2C7E5B"
                                                    />
                                                ) : (
                                                    <div className="text-sm text-gray-500 font-semibold">
                                                        - Belum terverifikasi
                                                    </div>
                                                )}
                                            </Link>
                                            <div className="text-md text-gray-400 flex space-x-2 items-center">
                                                <Link
                                                    href={route(
                                                        "company.detail",
                                                        props.company.id
                                                    )}
                                                    className="hover:underline hover:underline-offset-4 decoration-gray-400"
                                                >
                                                    {props.pic.title},{" "}
                                                    {props.company.name}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="flex-col space-y-2">
                                            <div className="flex justify-end space-x-2 items-center pt-4">
                                                <div className="text-sm">
                                                    {props.pic.email}
                                                </div>
                                                {props.user
                                                    .email_verified_at ? (
                                                    <MdOutlineMarkEmailRead
                                                        size={20}
                                                        color="#2C7E5B"
                                                    />
                                                ) : (
                                                    <MdOutlineMail
                                                        size={20}
                                                        className="text-gray-400"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex justify-end space-x-2 items-center">
                                                <div className="text-sm">
                                                    Bergabung{" "}
                                                    {moment(
                                                        props.user.created_at
                                                    ).format("d, MMMM YYYY")}
                                                </div>
                                                <FaGetPocket
                                                    size={20}
                                                    className="text-gray-400"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-col space-y-6 p-6 rounded-md bg-white shadow-md">
                            <div className="flex justify-between  border-b pb-4">
                                <div className="flex space-x-2">
                                    <div className="font-semibold text-lg">
                                        {props.data.title}
                                    </div>
                                    <div className="text-gray-500">
                                        ({props.data.resumes.length} pelamar)
                                    </div>
                                </div>
                                <div className="font-semibold text-lg">
                                    Rp. {props.data.salary}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="font-semibold">
                                    Deskripsi pekerjaan :
                                </div>
                                <div className="flex space-x-2 items-center">
                                    <div className="text-sm">
                                        {moment(
                                            props.data.created_at
                                        ).fromNow()}
                                    </div>
                                    <HiOutlineClock
                                        size={18}
                                        className="text-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="text-gray-700">
                                {props.data.description}
                            </div>
                            <div className="flex-col space-y-2">
                                <div className="font-semibold">
                                    Kemampuan yang dibutuhkan :
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {props.data.skills.map((data, index) => {
                                        return (
                                            <div className="flex items-center">
                                                <div className="cursor-pointer text-sm px-2 text-blue-500 hover:opacity-90 hover:underline hover:underline-offset-4 decoration-blue-500">
                                                    {data.name}
                                                </div>
                                                {props.data.skills.length -
                                                    1 !==
                                                    index && (
                                                    <div className="text-gray-500">
                                                        •
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {is_freelance && (
                            <div className="flex justify-end items-center space-x-4">
                                {props.data.resumes.find(
                                    (element) =>
                                        element.job_id === props.data.id
                                ) ? (
                                    <>
                                        <Link
                                            href={route("history.apply")}
                                            className="font-medium ml-4 hover:underline hover:underline-offset-4"
                                        >
                                            Lamaran terkirim
                                        </Link>
                                        {props.data.resumes
                                            .filter((e) => {
                                                return (
                                                    e.job_id ===
                                                        props.data.id &&
                                                    e.freelance.user_id ===
                                                        user.id
                                                );
                                            })
                                            .map((data) => {
                                                return (
                                                    <div
                                                        className={`px-2 py-1 rounded-md  font-bold ${getStatus(
                                                            data.statuses[0]
                                                                .name
                                                        )}`}
                                                    >
                                                        {data.statuses[0].name}
                                                    </div>
                                                );
                                            })}
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        className="font-semibold rounded-md bg-green-600 hover:bg-green-700 px-4 py-1 text-white "
                                        onClick={() => {
                                            setModalApply(true);
                                        }}
                                    >
                                        Lamar sekarang
                                    </button>
                                )}
                            </div>
                        )}
                        {/* {props.reviews && (
                                <>
                                    {props.reviews.length > 0 && (
                                        <div className="rounded-md bg-white flex-col shadow-md space-y-2">
                                            <div className="p-4 border-b flex justify-between items-center">
                                                <div className="font-semibold text-lg">
                                                    Ulasan perusahaan
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Menampilkan{" "}
                                                    {props.reviews.length}{" "}
                                                    ulasan
                                                </div>
                                            </div>
                                            <div className="p-4 flex-col space-y-4">
                                                {props.reviews.map(
                                                    (item, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className={`${
                                                                    props
                                                                        .reviews
                                                                        .length -
                                                                        1 !==
                                                                        index &&
                                                                    "border-b"
                                                                } pb-2`}
                                                            >
                                                                <div className="flex space-x-4">
                                                                    <Rating
                                                                        readonly
                                                                        initialRating={
                                                                            item.rating
                                                                        }
                                                                        emptySymbol={
                                                                            <AiOutlineStar
                                                                                size={
                                                                                    20
                                                                                }
                                                                                className="text-gray-400 text-4xl"
                                                                            />
                                                                        }
                                                                        fullSymbol={
                                                                            <AiFillStar
                                                                                size={
                                                                                    20
                                                                                }
                                                                                className="text-yellow-400 text-4xl"
                                                                            />
                                                                        }
                                                                    />
                                                                    <div className="text-sm">
                                                                        {
                                                                            item.rating
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="my-2 mt-4 flex-col space-y-2">
                                                                    <div className="font-bold">
                                                                        {
                                                                            item
                                                                                .job
                                                                                .title
                                                                        }
                                                                    </div>
                                                                    <div className="text-sm">
                                                                        {
                                                                            item.content
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-wrap py-4 gap-2">
                                                                    {item.job.skills.map(
                                                                        (
                                                                            data,
                                                                            index
                                                                        ) => {
                                                                            return (
                                                                                <div className="flex items-center">
                                                                                    <div className="cursor-pointer text-sm px-2 text-blue-500 hover:opacity-90 hover:underline hover:underline-offset-4 decoration-blue-500">
                                                                                        {
                                                                                            data.name
                                                                                        }
                                                                                    </div>
                                                                                    {item
                                                                                        .job
                                                                                        .skills
                                                                                        .length -
                                                                                        1 !==
                                                                                        index && (
                                                                                        <div className="text-gray-500">
                                                                                            •
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                                </div>
                                                                <div className="py-4 flex justify-between">
                                                                    <div className="flex space-x-4 items-center">
                                                                        <Link
                                                                            href={route(
                                                                                "detail.user",
                                                                                item
                                                                                    .job
                                                                                    .company
                                                                                    .company_pic[0]
                                                                                    .user
                                                                                    .id
                                                                            )}
                                                                        >
                                                                            <img
                                                                                className="h-10 w-10 rounded-md object-cover"
                                                                                src={
                                                                                    item
                                                                                        .job
                                                                                        .company
                                                                                        .company_pic[0]
                                                                                        .user
                                                                                        .profile_photo_url
                                                                                }
                                                                                alt={
                                                                                    item
                                                                                        .job
                                                                                        .company
                                                                                        .company_pic[0]
                                                                                        .full_name
                                                                                }
                                                                            />
                                                                        </Link>

                                                                        <Link
                                                                            href={route(
                                                                                "detail.user",
                                                                                item
                                                                                    .job
                                                                                    .company
                                                                                    .company_pic[0]
                                                                                    .user
                                                                                    .id
                                                                            )}
                                                                            className="flex-col space-y-1"
                                                                        >
                                                                            <div className="text-sm font-semibold">
                                                                                {
                                                                                    item
                                                                                        .job
                                                                                        .company
                                                                                        .company_pic[0]
                                                                                        .title
                                                                                }

                                                                                ,{" "}
                                                                                {
                                                                                    item
                                                                                        .job
                                                                                        .company
                                                                                        .company_pic[0]
                                                                                        .full_name
                                                                                }
                                                                            </div>
                                                                            <div className="text-xs">
                                                                                {
                                                                                    item
                                                                                        .job
                                                                                        .company
                                                                                        .type_company
                                                                                        .code
                                                                                }{" "}
                                                                                {
                                                                                    item
                                                                                        .job
                                                                                        .company
                                                                                        .name
                                                                                }
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="flex space-x-2 items-center">
                                                                        <div className="text-gray-500 text-xs">
                                                                            {moment(
                                                                                item.created_at
                                                                            ).fromNow()}
                                                                        </div>
                                                                        <AiOutlineClockCircle
                                                                            size={
                                                                                16
                                                                            }
                                                                            className="text-gray-500"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )} */}
                    </div>
                </div>
            </div>
            <Footer />
            {is_freelance && (
                <ModalApply
                    show={modalApply}
                    setShow={setModalApply}
                    dataJob={props.data}
                />
            )}
        </>
    );
}
