import { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { MdSchool } from "react-icons/md";
import StudyEdit from "./StudyEditView";
import { FiExternalLink } from "react-icons/fi";
import CompanyEdit from "./CompanyEditView";
import { FaIndustry } from "react-icons/fa";

export default function CompanyView({
    data,
    companies,
    toProfile,
    types,
    provinces,
}) {
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        // console.log(companies);
    });
    return (
        <div className=" bg-white rounded-lg p-6">
            <div className="flex-col space-y-6">
                {!data.user ? (
                    <div className="rounded-md p-4 flex justify-between items-centerbg-yellow-100 text-yellow-700">
                        <div className="flex items-center">
                            <BiInfoCircle
                                size={20}
                                className="text-yellow-700"
                            />
                            <span className="ml-4">
                                Data profile belum lengkap
                            </span>
                        </div>
                        <button
                            type="button"
                            className="font-medium"
                            onClick={() => toProfile()}
                        >
                            Lengkapi
                        </button>
                    </div>
                ) : (
                    <>
                        {!data.company ? (
                            <>
                                <div
                                    className={`rounded-md p-4 flex justify-between items-center ${
                                        !edit && "bg-yellow-100"
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <BiInfoCircle
                                            size={20}
                                            className="text-yellow-700"
                                        />
                                        <span className="ml-4 text-yellow-700">
                                            Data perusahaan belum lengkap
                                        </span>
                                    </div>
                                    {edit ? (
                                        <button
                                            type="button"
                                            className="font-medium"
                                            onClick={() => {
                                                setEdit(false);
                                            }}
                                        >
                                            Batal
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="font-medium text-yellow-700"
                                            onClick={() => {
                                                setEdit(true);
                                            }}
                                        >
                                            Lengkapi
                                        </button>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    className={`flex justify-between p-4 rounded-md ${
                                        edit && "bg-gray-100"
                                    }`}
                                >
                                    <div className="flex space-x-4 items-center">
                                        <FaIndustry size={20} />
                                        <div className="text-lg font-semibold">
                                            Perusahaan{" "}
                                            {!edit && data.nip && (
                                                <>- {data.nip}</>
                                            )}
                                        </div>
                                    </div>
                                    {edit ? (
                                        <button
                                            type="button"
                                            className="font-medium"
                                            onClick={() => {
                                                setEdit(false);
                                            }}
                                        >
                                            Batal
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="font-medium text-green-800"
                                            onClick={() => {
                                                setEdit(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                                {!edit && (
                                    <div className="px-4">
                                        <div className="my-12 md:grid md:grid-cols-6 md:gap-6 items-center">
                                            {data.company.logo && (
                                                <div className="md:col-span-1">
                                                    <div className="rounded-md  bg-gray-200 p-4">
                                                        <img
                                                            src={
                                                                data.company
                                                                    .logo
                                                            }
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
                                                    {
                                                        data.company
                                                            .type_company.name
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:grid md:grid-cols-6 md:gap-6 text-gray-500">
                                            <div className="md:col-span-1">
                                                Jabatan
                                            </div>
                                            <div className="md:col-span-4">
                                                <h2 className=" font-semibold mt-2 md:mt-0">
                                                    {data.title}
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="mt-6 md:grid md:grid-cols-6 md:gap-6 text-gray-500">
                                            <div className="md:col-span-1">
                                                Alamat
                                            </div>
                                            <div className="md:col-span-4">
                                                <h2 className=" font-semibold mt-2 md:mt-0">
                                                    {data.company.full_address}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
                {edit && (
                    <CompanyEdit
                        dataCompany={data.company}
                        companies={companies}
                        types={types}
                        provinces={provinces}
                        client={data}
                        tapBack={() => {
                            setEdit(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
}
