import { ConfirmationModal } from "@/Components/ConfirmationModal";
import DangerButton from "@/Components/DangerButton";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import PrimaryButton from "@/Components/PrimaryButton";
import { Inertia } from "@inertiajs/inertia";
import { Link, Head } from "@inertiajs/inertia-react";
import moment from "moment";
import { useState } from "react";
import {
    AiFillStar,
    AiOutlineClockCircle,
    AiOutlineStar,
} from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import Rating from "react-rating";

export default function DetailUser(props) {
    const [showReject, setShowReject] = useState(false);
    const [showAccept, setShowAccept] = useState(false);
    const [bodyRejection, setBodyRejection] = useState(null);
    const [bodyFinished, setBodyFinished] = useState(null);
    const [ratingFinished, setRatingFinished] = useState(0);
    const [showModalFinished, setShowModalFinished] = useState(false);

    const capitalize = (str) => {
        return str
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <>
            <Head title="workedin - Detail Freelance" />
            <Navbar />

            <div className="relative flex-col items-top justify-center bg-white sm:items-center sm:pt-0">
                <div className="py-10 pt-16">
                    {props.status.id === 8 && (
                        <div className="bg-red-100 py-4">
                            <div className="mx-auto max-w-6xl px-16 text-red-800">
                                Mahasiswa ditolak
                            </div>
                        </div>
                    )}
                    {props.status.id === 4 && (
                        <div className="bg-orange-100 py-4">
                            <div className="flex justify-between items-center mx-auto max-w-6xl px-16 text-orange-800">
                                <span>Kerja sama sedang berlangsung</span>
                                <button
                                    type="button"
                                    onClick={() => setShowModalFinished(true)}
                                    className="font-semibold text-sm text-green-800 hover:decoration-green-800"
                                >
                                    Selesai
                                </button>
                            </div>
                        </div>
                    )}
                    {props.status.id === 5 && (
                        <div className="bg-green-100 py-4">
                            <div className="flex justify-between items-center mx-auto max-w-6xl px-16 text-green-800">
                                <span>Mahasiswa diterima</span>
                                <span className="font-semibold text-sm">
                                    Menunggu konfirmasi ...
                                </span>
                            </div>
                        </div>
                    )}
                    {props.status.id === 6 && (
                        <div className="bg-green-100 py-4">
                            <div className="mx-auto max-w-6xl px-16 text-green-800">
                                <span>Pekerjaan diselesaikan</span>
                            </div>
                        </div>
                    )}
                    <div className=" mx-auto max-w-6xl px-16">
                        <div className=" my-12 md:grid md:grid-cols-6 md:gap-6 items-center">
                            <div className="md:col-span-1">
                                <div className="rounded-md  bg-gray-200 p-4">
                                    <img
                                        src={props.user.profile_photo_url}
                                        className="mx-auto"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-5">
                                <div className="flex justify-between items-center">
                                    <Link
                                        href={route(
                                            "freelance.detail",
                                            props.freelance.id
                                        )}
                                        className="md:flex md:space-x-4 space-y-2 md:space-y-0 items-center"
                                    >
                                        <h2 className="lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-900 md:mt-0">
                                            {props.freelance.full_name}
                                        </h2>
                                        {props.is_verified ? (
                                            <MdVerified
                                                className="text-3xl"
                                                color="#2C7E5B"
                                            />
                                        ) : (
                                            <div className="lg:text-2xl md:text-lg text-md font-semibold text-gray-900 md:mt-0">
                                                - Belum terverifikasi
                                            </div>
                                        )}
                                    </Link>
                                    <div className="space-x-4 items-center hidden sm:flex">
                                        <a
                                            href={props.data.file}
                                            target="_blank"
                                            className="font-medium py-1 px-2 rounded-md text-green-800 hover:bg-green-100"
                                        >
                                            Preview CV
                                        </a>
                                        <div className="flex items-center space-x-1">
                                            <AiFillStar
                                                size={20}
                                                className="text-yellow-400"
                                            />
                                            <div className="text-md text-gray-500">
                                                {props.freelance.rating}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href={route(
                                        "detail.university",
                                        props.university.codept
                                    )}
                                    className="text-sm hover:underline hover:underline-offset-4"
                                >
                                    {props.major.name}
                                    {", "}
                                    {props.university.name}
                                </Link>
                            </div>
                        </div>
                        <div className="flex space-x-4 items-center justify-between sm:hidden">
                            <a
                                href={props.data.file}
                                target="_blank"
                                className="font-medium py-1 px-2 rounded-md text-green-800 hover:bg-green-100"
                            >
                                Preview CV
                            </a>
                            <div className="flex items-center space-x-1">
                                <AiFillStar
                                    size={20}
                                    className="text-yellow-400"
                                />
                                <div className="text-md text-gray-500">
                                    {props.freelance.rating}
                                </div>
                            </div>
                        </div>
                        <div className=" mt-6 md:grid md:grid-cols-6 md:gap-6  ">
                            <div className="md:col-span-1">Bio</div>
                            <div className="md:col-span-4">
                                <h2 className=" font-semibold text-gray-900 mt-2 md:mt-0">
                                    {props.freelance.bio}
                                </h2>
                            </div>
                        </div>
                        <div className=" mt-2 md:grid md:grid-cols-6 md:gap-6  ">
                            <div className="md:col-span-1">Alamat</div>
                            <div className="md:col-span-4">
                                <h2 className=" font-semibold text-gray-900 mt-2 md:mt-0">
                                    {props.freelance.full_address}
                                </h2>
                            </div>
                        </div>
                        <div className=" mt-2 md:grid md:grid-cols-6 md:gap-6  ">
                            <div className="md:col-span-1">Email</div>
                            <div className="md:col-span-4">
                                <h2 className="font-semibold text-gray-900 mt-2 md:mt-0">
                                    {props.freelance.email}
                                </h2>
                            </div>
                        </div>
                        <div className=" mt-2 md:grid md:grid-cols-6 md:gap-6  ">
                            <div className="md:col-span-1">Telepon</div>
                            <div className="md:col-span-4">
                                <h2 className="font-semibold text-gray-900 mt-2 md:mt-0">
                                    {props.freelance.phone}
                                </h2>
                            </div>
                        </div>
                        <div className="space-y-2  my-12  md:grid md:grid-cols-6 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="text-lg font-semibold">
                                    Keterampilan
                                </div>
                            </div>
                            <div className="md:col-span-4">
                                {props.skills && props.skills.length !== 0 ? (
                                    <ol className="list-decimal ml-4">
                                        {props.skills.map((e) => {
                                            return <li key={e.id}>{e.name}</li>;
                                        })}
                                    </ol>
                                ) : (
                                    <div className="text-md font-semibold text-red-500">
                                        Tidak memiliki keterampilan
                                    </div>
                                )}
                            </div>
                        </div>
                        {props.status.id === 8 && (
                            <div className="border-t ">
                                <div className="bg-red-100 m-6 rounded-md py-8 px-6">
                                    <div className="md:grid md:grid-cols-6 md:gap-6 ">
                                        <div className="md:col-span-1">
                                            <div className="font-semibold text-red-500">
                                                Alasan penolakan
                                            </div>
                                        </div>
                                        <div className="md:col-span-4">
                                            <h2 className="font-semibold text-gray-900 mt-2 md:mt-0">
                                                {
                                                    props.reviews.filter(
                                                        (e) =>
                                                            e.job_id ===
                                                            props.data.job_id
                                                    )[0].content
                                                }
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {props.status.id === 3 && (
                            <div className="flex justify-end space-x-4 items-center">
                                <button
                                    type="button"
                                    className="font-medium px-4 py-2 rounded-md text-red-800 hover:underline hover:underline-offset-4 hover:decoration-red-800"
                                    onClick={() => setShowReject(true)}
                                >
                                    Tolak
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 bg-[#2C7E5B] border border-transparent rounded-md font-bold text-sm text-white tracking-widest hover:bg-opacity-90 focus:bg-green active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition ease-in-out duration-150"
                                    onClick={() => setShowAccept(true)}
                                >
                                    Terima
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {props.reviews && (
                <>
                    {props.reviews.length > 0 && (
                        <div className="bg-gray-100">
                            <div className="mx-auto max-w-5xl py-12">
                                <div className="rounded-md bg-white flex-col shadow-md space-y-2">
                                    <div className="p-4 border-b flex justify-between items-center">
                                        <div className="font-semibold text-lg">
                                            Ulasan
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Menampilkan {props.reviews.length}{" "}
                                            ulasan
                                        </div>
                                    </div>
                                    <div className="p-4 flex-col space-y-4">
                                        {props.reviews
                                            .filter(
                                                (e) =>
                                                    e.job_id !==
                                                    props.data.job_id
                                            )
                                            .map((item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`${
                                                            props.reviews
                                                                .length -
                                                                1 !==
                                                                index &&
                                                            "border-b"
                                                        } pb-2`}
                                                    >
                                                        {item.rating ? (
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
                                                        ) : (
                                                            <div className="flex justify-end text-red-500">
                                                                Dibatalkan
                                                            </div>
                                                        )}
                                                        <div className="my-2 mt-4 flex-col space-y-2">
                                                            <div className="font-bold">
                                                                {item.job.title}
                                                            </div>
                                                            <div className="text-sm">
                                                                {item.content}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap py-4 gap-2">
                                                            {item.job.skills.map(
                                                                (
                                                                    data,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="flex items-center"
                                                                        >
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
                                                                        item.job
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
                                                                        item.job
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
                                                                    size={16}
                                                                    className="text-gray-500"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
            <Footer />

            {/* {bodyRejection && ( */}
            <ConfirmationModal
                title="Konfirmasi penolakan."
                description="Apakah kamu yakin ingin menolak kerja sama ini ?"
                show={showReject}
                setShow={setShowReject}
                border={false}
                action={
                    <DangerButton
                        processing={!bodyRejection}
                        type="button"
                        className="ml-3"
                        onClick={() => {
                            setShowReject(false);
                            Inertia.post(
                                route("update.resume", props.data.id),
                                {
                                    status: 8,
                                    content: bodyRejection,
                                    job_id: props.data.job.id,
                                    freelance_id: props.freelance.id,
                                }
                            );
                        }}
                    >
                        Tolak
                    </DangerButton>
                }
            >
                <div className="flex-col space-y-4 my-2 mt-12">
                    <p className="text-md text-gray-600 font-bold">
                        Berikan alasan penolakan
                    </p>
                    <div className="flex space-x-4 items-center">
                        <textarea
                            id="content"
                            className="block w-full mt-1 border-gray-300 focus:border-[#2C7E5B] focus:ring-[#2C7E5B] rounded-md shadow-sm"
                            onChange={(e) => setBodyRejection(e.target.value)}
                        />
                    </div>
                </div>
            </ConfirmationModal>
            {/* )} */}

            <ConfirmationModal
                title="Konfirmasi penyelesaian."
                description="Apakah kamu yakin ingin menyelesaikan kerja sama ini ?"
                show={showModalFinished}
                setShow={setShowModalFinished}
                border={false}
                action={
                    <PrimaryButton
                        processing={bodyFinished && ratingFinished === 0}
                        type="button"
                        className="ml-3"
                        onClick={() => {
                            setShowReject(false);
                            Inertia.post(
                                route("update.resume", props.data.id),
                                {
                                    status: 7,
                                    rating: ratingFinished,
                                    content: bodyFinished,
                                    job_id: props.data.job.id,
                                    freelance_id: props.freelance.id,
                                }
                            );
                        }}
                    >
                        Selesai
                    </PrimaryButton>
                }
            >
                <div className="flex-col space-y-4 my-2 mt-12">
                    <p className="text-md text-gray-600 font-bold">
                        Berikan penilaian
                    </p>
                    <div className="flex-col space-y-4">
                        <div className="flex justify-center">
                            <Rating
                                initialRating={ratingFinished}
                                onChange={(rate) => setRatingFinished(rate)}
                                emptySymbol={
                                    <AiOutlineStar className="text-gray-400 text-4xl" />
                                }
                                fullSymbol={
                                    <AiFillStar className="text-yellow-400 text-4xl" />
                                }
                            />
                        </div>
                        <textarea
                            id="content"
                            className="block w-full mt-1 border-gray-300 focus:border-[#2C7E5B] focus:ring-[#2C7E5B] rounded-md shadow-sm"
                            onChange={(e) => setBodyFinished(e.target.value)}
                        />
                    </div>
                </div>
            </ConfirmationModal>

            <ConfirmationModal
                title="Konfirmasi kerja sama."
                description="Apakah kamu yakin ingin melanjutkan kerja sama ini ?"
                show={showAccept}
                setShow={setShowAccept}
                // border={false}
                action={
                    <button
                        type="button"
                        className="ml-3 inline-flex items-center px-4 py-2 bg-[#2C7E5B] border border-transparent rounded-md font-bold text-sm text-white tracking-widest hover:bg-opacity-90 focus:bg-green active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition ease-in-out duration-150"
                        onClick={() => {
                            setShowAccept(false);
                            Inertia.post(
                                route("update.resume", props.data.id),
                                {
                                    status: 5,
                                    job_id: props.data.job.id,
                                }
                            );
                        }}
                    >
                        Lanjutkan
                    </button>
                }
            >
                <div className="flex-col space-y-4 my-2 mt-12">
                    <p className="text-md text-gray-600 font-bold">
                        Informasi Kontak
                    </p>
                    <div className="flex space-x-4 items-center">
                        <img
                            className="h-16 w-16 rounded-full object-cover"
                            src={props.user.profile_photo_url}
                            alt={props.user.name}
                        />
                        <div className="flex-col">
                            <div className="flex space-x-2 text-xl font-bold items-center">
                                <span>{props.user.name}</span>

                                {props.is_verified ? (
                                    <MdVerified color="#2C7E5B" />
                                ) : (
                                    <div className="text-sm text-gray-500 font-semibold">
                                        - Belum terverifikasi
                                    </div>
                                )}
                            </div>
                            <div className="text-sm font-semibold text-gray-500 flex space-x-2 items-center">
                                <span>
                                    {props.freelance.major.name},{" "}
                                    {props.freelance.university.name}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500 flex space-x-2 items-center">
                                <span>
                                    {capitalize(props.freelance.city.name)},{" "}
                                    {capitalize(props.freelance.province.name)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </ConfirmationModal>
        </>
    );
}
