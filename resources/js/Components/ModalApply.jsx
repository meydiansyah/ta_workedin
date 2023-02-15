import { useForm, usePage } from "@inertiajs/inertia-react";
import { ConfirmationModal } from "./ConfirmationModal";
import PrimaryButton from "./PrimaryButton";
import { MdVerified } from "react-icons/md";
import { Inertia } from "@inertiajs/inertia";
import InputError from "./InputError";
import { useEffect } from "react";

export default function ModalApply({ show, setShow, dataJob }) {
    const { user, dataUser } = usePage().props.auth;
    const { is_verified } = usePage().props;
    const { data, setData, post, errors, wasSuccessful } = useForm({
        job_id: dataJob.id,
        freelance_id: dataUser.id,
        file: null,
    });

    const capitalize = (str) => {
        return str
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    useEffect(() => {
        if (wasSuccessful) setShow(false);
    }, [wasSuccessful]);

    const submit = (e) => {
        e.preventDefault();
        post(route("apply.job"));
    };

    return (
        <form onSubmit={submit} encType="multipartform-data">
            <ConfirmationModal
                title={`Melamar ke ${dataJob.company.type_company.code} ${dataJob.company.name}`}
                show={show}
                setShow={setShow}
                maxW="lg"
                action={
                    <PrimaryButton
                        className="ml-3 rounded-full"
                        onClick={submit}
                    >
                        Lamar
                    </PrimaryButton>
                }
            >
                <div className="flex-col space-y-4 my-2">
                    <p className="text-md text-gray-600 font-bold">
                        Informasi Kontak
                    </p>
                    <div className="flex space-x-4 items-center">
                        <img
                            className="h-16 w-16 rounded-full object-cover"
                            src={user.profile_photo_url}
                            alt={user.name}
                        />
                        <div className="flex-col">
                            <div className="flex space-x-2 text-xl font-bold items-center">
                                <span>{user ? user.name : data.name}</span>

                                {is_verified ? (
                                    <MdVerified color="#2C7E5B" />
                                ) : (
                                    <div className="text-sm text-gray-500 font-semibold">
                                        - Belum terverifikasi
                                    </div>
                                )}
                            </div>
                            <div className="text-sm font-semibold text-gray-500 flex space-x-2 items-center">
                                <span>
                                    {dataUser.major.name},{" "}
                                    {dataUser.university.name}
                                </span>
                            </div>
                            <div className="text-sm text-gray-500 flex space-x-2 items-center">
                                <span>
                                    {capitalize(dataUser.city.name)},{" "}
                                    {capitalize(dataUser.province.name)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <p className=" text-sm text-gray-600">
                            Kirim CV terbaru kamu :
                        </p>
                        <p className=" text-sm text-gray-600">PDF (10mb)</p>
                    </div>

                    <div>
                        <input
                            id="resume"
                            type="file"
                            accept="pdf"
                            className="mt-1 form-control block w-full px-3 py-1.5 text-base file:cursor-pointer font-normal bg-gray-100 rounded-full text-gray-700  bg-clip-padding transition ease-in-out m-0 focus:text-gray-700  focus:border-green-600 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                            onChange={(e) => {
                                setData("file", e.target.files[0]);
                            }}
                            autoComplete="resume"
                            required
                        />
                    </div>
                    <InputError
                        className="mt-2"
                        message={errors.full_address}
                    />
                </div>
            </ConfirmationModal>
        </form>
    );
}
