import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Link, Head } from "@inertiajs/inertia-react";
import moment from "moment";
import {
    AiFillStar,
    AiOutlineClockCircle,
    AiOutlineStar,
} from "react-icons/ai";
import { FaCity, FaGetPocket, FaPhoneAlt } from "react-icons/fa";
import {
    MdLocationOn,
    MdOutlineDesignServices,
    MdOutlineMail,
    MdOutlineMarkEmailRead,
    MdVerified,
} from "react-icons/md";
import Rating from "react-rating";

export default function DetailUser(props) {
    const capitalize = (str) => {
        return str
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };
    return (
        <>
            <Head
                title={`workedin - ${
                    props.user.role_id === 2 && "Detail PIC"
                } ${props.user.role_id === 3 && "Detail Freelance"}`}
            />
            <Navbar />

            <div className="pt-20 py-16 bg-[#32A071] h-[250px] absolute top-0 left-0 right-0" />

            <div className="min-h-screen bg-gray-100">
                <div
                    className={`${
                        props.data.university ? "max-w-5xl" : "max-w-4xl"
                    } py-12 grid grid-cols-12 gap-8 mx-auto mt-20 relative flex-col`}
                >
                    <div
                        className={
                            props.data.university &&
                            props.data.skills &&
                            props.data.skills.length > 0
                                ? "md:col-span-9 col-span-12"
                                : "col-span-12"
                        }
                    >
                        <div className="flex-col space-y-12">
                            <div className="flex-col p-6 rounded-md bg-white shadow-md">
                                <div className="sm:hidden block mb-4">
                                    <img
                                        className="h-20 w-20 rounded-md object-cover"
                                        src={props.user.profile_photo_url}
                                        alt={props.data.full_name}
                                    />
                                </div>
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="sm:col-span-4 sm:block sm:space-y-2 hidden">
                                        <img
                                            className="w-full object-cover"
                                            src={props.user.profile_photo_url}
                                            alt={props.data.full_name}
                                        />
                                        {props.data.university && (
                                            <>
                                                <div className="flex space-x-2 items-center pt-4">
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
                                                    <div className="text-sm">
                                                        {props.data.email}
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2 items-center">
                                                    <FaGetPocket
                                                        size={18}
                                                        className="text-gray-400"
                                                    />
                                                    <div className="text-sm">
                                                        Bergabung{" "}
                                                        {moment(
                                                            props.data
                                                                .created_at
                                                        ).format("d MMMM YYYY")}
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2 items-center">
                                                    <FaCity
                                                        size={24}
                                                        className="text-gray-400"
                                                    />
                                                    <div className="text-sm">
                                                        {capitalize(
                                                            props.data.city.name
                                                        )}
                                                        ,{" "}
                                                        {capitalize(
                                                            props.data.province
                                                                .name
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className="sm:col-span-8 col-span-12 flex-col space-y-2">
                                        <div>
                                            <div className="flex space-x-2 font-bold items-center">
                                                <div className="text-2xl">
                                                    {props.data.full_name}
                                                </div>
                                                {props.user.is_verified ? (
                                                    <MdVerified
                                                        size={24}
                                                        color="#2C7E5B"
                                                    />
                                                ) : (
                                                    <div className="text-sm text-gray-500 font-semibold">
                                                        - Belum terverifikasi
                                                    </div>
                                                )}
                                            </div>
                                            {props.data.university && (
                                                <div className="text-md text-gray-400 flex space-x-2 items-center">
                                                    <Link
                                                        href={route(
                                                            "detail.university",
                                                            props.data
                                                                .university
                                                                .codept
                                                        )}
                                                    >
                                                        {props.data.major.name},{" "}
                                                        {
                                                            props.data
                                                                .university.name
                                                        }
                                                    </Link>
                                                </div>
                                            )}
                                            {props.data.company && (
                                                <>
                                                    <div className="text-md text-gray-400 flex space-x-2 items-center">
                                                        <Link
                                                            href={route(
                                                                "company.detail",
                                                                props.data
                                                                    .company.id
                                                            )}
                                                        >
                                                            {props.data.title},{" "}
                                                            {
                                                                props.data
                                                                    .company
                                                                    .name
                                                            }
                                                        </Link>
                                                    </div>
                                                    <div className="flex-col space-y-2  pt-4">
                                                        <div className="flex space-x-3 items-center">
                                                            <FaPhoneAlt
                                                                size={16}
                                                                className="text-gray-400"
                                                            />
                                                            <div className="text-sm">
                                                                {
                                                                    props.data
                                                                        .phone
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="flex space-x-2 items-center">
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
                                                            <div className="text-sm">
                                                                {
                                                                    props.data
                                                                        .email
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="flex space-x-2 items-center">
                                                            <FaGetPocket
                                                                size={20}
                                                                className="text-gray-400"
                                                            />
                                                            <div className="text-sm">
                                                                Bergabung{" "}
                                                                {moment(
                                                                    props.data
                                                                        .created_at
                                                                ).format(
                                                                    "d, MMMM YYYY"
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex space-x-2 items-center">
                                                            <FaCity
                                                                size={20}
                                                                className="text-gray-400"
                                                            />
                                                            <div className="text-sm">
                                                                {capitalize(
                                                                    props.data
                                                                        .city
                                                                        .name
                                                                )}
                                                                ,{" "}
                                                                {capitalize(
                                                                    props.data
                                                                        .province
                                                                        .name
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="pt-4 flex-col space-y-2 items-center">
                                                            <div className="flex space-x-2">
                                                                <MdLocationOn
                                                                    size={20}
                                                                    className="text-gray-400"
                                                                />
                                                                <div className="text-sm font-bold ">
                                                                    Alamat
                                                                    lengkap
                                                                </div>
                                                            </div>
                                                            <div className="text-sm">
                                                                {
                                                                    props.data
                                                                        .full_address
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        {props.reviews && (
                                            <div className="flex pr-1 items-center space-x-1">
                                                <AiFillStar
                                                    size={18}
                                                    className="text-yellow-400"
                                                />
                                                <div className="text-sm flex space-x-2 text-gray-500">
                                                    {props.reviews.length > 0
                                                        ? props.data.rating
                                                        : "Belum ada ulasan"}
                                                </div>
                                                {props.reviews.length > 0 && (
                                                    <div className="text-sm flex space-x-2 text-blue-500 hover:opacity-80">
                                                        ({props.reviews.length}{" "}
                                                        ulasan)
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <div className="pt-8">
                                            {props.data.bio}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {props.reviews && (
                                <>
                                    {props.reviews.length > 0 && (
                                        <div className="rounded-md bg-white flex-col shadow-md space-y-2">
                                            <div className="p-4 border-b flex justify-between items-center">
                                                <div className="font-semibold text-lg">
                                                    Ulasan
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
                            )}
                        </div>
                    </div>
                    {props.data.skills && (
                        <div className="md:col-span-3 md:block hidden">
                            {props.data.skills.length > 0 && (
                                <div className="rounded-md bg-white flex-col shadow-md space-y-2">
                                    <div className="border-b font-bold text-lg p-4">
                                        Kemampuan
                                    </div>
                                    <div className="flex flex-wrap p-4 gap-2">
                                        {props.data.skills.map((item) => {
                                            return (
                                                <div className="rounded-md border border-[#71BC9C] cursor-pointer hover:border-[#2C7E5B] p-1 text-sm hover:opacity-90 px-2">
                                                    {item.name}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
