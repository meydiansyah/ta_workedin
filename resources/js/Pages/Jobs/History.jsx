import { ConfirmationModal } from "@/Components/ConfirmationModal";
import EmptyContent from "@/Components/Empty";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import Rating from "react-rating";

export default function HistoryApply(props) {
    const { is_freelance, is_client } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [showModalRejection, setShowModalRejection] = useState(false);
    const [showModalFinished, setShowModalFinished] = useState(false);
    const [contentFinished, setContentFinished] = useState(null);
    const [ratingFinished, setRatingFinished] = useState(0);

    const [selected, setSelected] = useState(null);
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
            case "rejected":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    History
                </h2>
            }
        >
            <Head title="Workedin - History" />

            {props.resume.data.length > 0 ? (
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                Daftar riwayat melamar
                            </div>

                            <div className="relative mx-4 mb-4 overflow-x-auto sm:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Nama Lengkap
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Perusahaan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Pekerjaan
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-center"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                <span className="sr-only">
                                                    File
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.resume.data.map((data) => (
                                            <tr
                                                key={data.id}
                                                className="bg-white border-b hover:cursor-pointer hover:bg-gray-100 "
                                                onClick={(e) => {
                                                    is_client &&
                                                        Inertia.get(
                                                            route(
                                                                "client.detail.resume",
                                                                data.id
                                                            )
                                                        );
                                                    if (
                                                        is_freelance &&
                                                        data.statuses[0].id ===
                                                            7
                                                    ) {
                                                        setSelected(data);
                                                        setShowModalRejection(
                                                            true
                                                        );
                                                    }
                                                    // console.log(data);
                                                    if (
                                                        is_freelance &&
                                                        data.statuses[0].id ===
                                                            5
                                                    ) {
                                                        setSelected(data);
                                                        setShowModal(true);
                                                    }

                                                    if (
                                                        is_freelance &&
                                                        data.statuses[0].id ===
                                                            6
                                                    ) {
                                                        setSelected(data);
                                                        setShowModalFinished(
                                                            true
                                                        );
                                                    }
                                                }}
                                            >
                                                <td className="px-6 py-4">
                                                    {data.freelance.full_name}
                                                </td>

                                                <td
                                                    className="px-6 py-4 hover:underline hover:underline-offset-4"
                                                    onClick={() => {
                                                        Inertia.get(
                                                            route(
                                                                "company.detail",
                                                                data.job.company
                                                                    .id
                                                            )
                                                        );
                                                    }}
                                                >
                                                    {data.job.company.name}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {data.job.title}
                                                </td>

                                                <td className="px-6 py-4 ">
                                                    <div className="flex justify-center">
                                                        <div
                                                            className={`px-2 py-1 rounded-md  font-bold ${getStatus(
                                                                data.statuses[0]
                                                                    .name
                                                            )}`}
                                                        >
                                                            {
                                                                data.statuses[0]
                                                                    .name
                                                            }
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-center">
                                                        <a
                                                            href={data.file}
                                                            target="_blank"
                                                            className="px-4 py-2 rounded-md  font-bold border border-green-500 text-green-600 cursor-pointer hover:bg-green-100"
                                                        >
                                                            Preview
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <EmptyContent description="Belum ada yang mendaftarkan diri" />
            )}

            {selected && (
                <>
                    <ConfirmationModal
                        title="Konfirmasi kerja sama."
                        description="Apakah kamu yakin ingin melanjutkan kerja sama ini ?"
                        show={showModal}
                        setShow={setShowModal}
                        // border={false}
                        action={
                            <button
                                type="button"
                                className="ml-3 inline-flex items-center px-4 py-2 bg-[#2C7E5B] border border-transparent rounded-md font-bold text-sm text-white tracking-widest hover:bg-opacity-90 focus:bg-green active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition ease-in-out duration-150"
                                onClick={() => {
                                    setShowModal(false);
                                    Inertia.post(
                                        route("update.resume", selected.id),
                                        {
                                            status: 4,
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
                                Informasi penanggung jawab
                            </p>
                            <div className="flex space-x-4 items-center">
                                <img
                                    className="h-16 w-16 rounded-full object-cover"
                                    src={
                                        selected.job.company.company_pic[0].user
                                            .profile_photo_url
                                    }
                                    alt={
                                        selected.job.company.company_pic[0]
                                            .full_name
                                    }
                                />
                                <div className="flex-col">
                                    <div className="flex space-x-2 text-xl font-bold items-center">
                                        <span>
                                            {
                                                selected.job.company
                                                    .company_pic[0].user.name
                                            }
                                        </span>

                                        {props.freelance.user.is_verified ? (
                                            <MdVerified color="#2C7E5B" />
                                        ) : (
                                            <div className="text-sm text-gray-500 font-semibold">
                                                - Belum terverifikasi
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-sm font-semibold text-gray-500 flex space-x-2 items-center">
                                        <span>
                                            {
                                                selected.job.company
                                                    .type_company.code
                                            }
                                            ,{" "}
                                            {
                                                selected.job.company
                                                    .type_company.name
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ConfirmationModal>
                    {is_freelance && selected.statuses[0].id === 7 && (
                        <ConfirmationModal
                            title={
                                <div className="inline-flex space-x-1">
                                    <span>Kerja sama </span>
                                    <span className="text-red-800 font-semibold">
                                        ditolak.
                                    </span>
                                </div>
                            }
                            show={showModalRejection}
                            setShow={setShowModalRejection}
                            // border={false}
                            cancelButton={false}
                            action={
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 border border-gray-500 rounded-md font-bold text-sm text-gray-700 tracking-widest hover:bg-opacity-90 focus:bg-green focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition ease-in-out duration-150"
                                    onClick={() => {
                                        setShowModalRejection(false);
                                    }}
                                >
                                    Tutup
                                </button>
                            }
                        >
                            <div className="flex-col space-y-4 my-2">
                                <p className="text-md text-gray-600 font-bold">
                                    Alasan penolakan
                                </p>
                                <div className="flex space-x-4 items-center">
                                    <div className="text-sm text-gray-500 font-semibold">
                                        {selected.freelance.reviews[0].content}
                                    </div>
                                </div>
                            </div>
                        </ConfirmationModal>
                    )}

                    {is_freelance && selected.statuses[0].id === 6 && (
                        <ConfirmationModal
                            title="Penilaian pekerjaan."
                            description="Tanggapi pekerjaan yang sudah diselesaikan akan mempengaruhi penilaian terhadap perusahaan yang bersangkutan."
                            show={showModalFinished}
                            setShow={setShowModalFinished}
                            border={false}
                            action={
                                <PrimaryButton
                                    processing={
                                        contentFinished && ratingFinished === 0
                                    }
                                    type="button"
                                    className="ml-3"
                                    onClick={() => {
                                        setShowModalFinished(false);
                                        Inertia.post(
                                            route("update.resume", selected.id),
                                            {
                                                status: 6,
                                                rating: ratingFinished,
                                                content: contentFinished,
                                                company_id:
                                                    selected.job.company_id,
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
                                            onChange={(rate) =>
                                                setRatingFinished(rate)
                                            }
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
                                        onChange={(e) =>
                                            setContentFinished(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </ConfirmationModal>
                    )}
                </>
            )}
        </AuthenticatedLayout>
    );
}
