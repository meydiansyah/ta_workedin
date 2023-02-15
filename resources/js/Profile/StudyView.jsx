import { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { MdSchool } from "react-icons/md";
import StudyEdit from "./StudyEditView";
import { FiExternalLink } from "react-icons/fi";

export default function StudyView({ data, universities, majors, toProfile }) {
    const [edit, setEdit] = useState(false);

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
                                Data freelance belum lengkap
                            </span>
                        </div>
                        <button
                            type="button"
                            className="font-medium"
                            onClick={toProfile}
                        >
                            Lengkapi
                        </button>
                    </div>
                ) : (
                    <>
                        {!data.university ? (
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
                                        Data pendidikan belum lengkap
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
                        ) : (
                            <>
                                <div
                                    className={`flex justify-between p-4 rounded-md ${
                                        edit && "bg-gray-100"
                                    }`}
                                >
                                    <div className="flex space-x-4 items-center">
                                        <MdSchool size={20} />
                                        <div className="text-lg font-semibold">
                                            Pendidikan{" "}
                                            {!edit && data.nim && (
                                                <>- {data.nim}</>
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
                                    <>
                                        <div className="px-4">
                                            <div className="my-12 md:grid md:grid-cols-6 md:gap-6 items-center">
                                                <div className="md:col-span-1">
                                                    <div className="rounded-md  bg-gray-200 p-4">
                                                        <img
                                                            src={
                                                                data.university
                                                                    .logo
                                                            }
                                                            className="mx-auto"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-4 flex-col space-y-2">
                                                    <h2 className=" md:text-2xl text-lg font-semibold text-gray-900 mt-2 md:mt-0">
                                                        {data.university.name}{" "}
                                                        {`(${data.university.codept})`}
                                                    </h2>
                                                    <div className="text-sm text-gray-500">
                                                        {data.major.code} -{" "}
                                                        {data.major.name}
                                                    </div>
                                                </div>
                                                <div className="md:col-span-1">
                                                    {data.university.url && (
                                                        <a
                                                            className="flex space-x-2 mt-4 hover:text-blue-500 md:mt-0 justify-start md:justify-end"
                                                            href={
                                                                data.university
                                                                    .url
                                                            }
                                                            target="_blank"
                                                        >
                                                            <div className="text-sm">
                                                                Buka tautan
                                                            </div>
                                                            <FiExternalLink />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-6 md:grid md:grid-cols-6 md:gap-6 text-gray-500">
                                                <div className="md:col-span-1">
                                                    Alamat
                                                </div>
                                                <div className="md:col-span-4">
                                                    <h2 className=" font-semibold mt-2 md:mt-0">
                                                        {
                                                            data.university
                                                                .full_address
                                                        }
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="mt-6 md:grid md:grid-cols-6 md:gap-6 text-gray-500">
                                                <div className="md:col-span-1">
                                                    Total Jurusan
                                                </div>
                                                <div className="md:col-span-4">
                                                    <h2 className=" font-semibold mt-2 md:mt-0 cursor-pointer hover:underline hover:underline-offset-4 hover:text-blue-500">
                                                        {
                                                            data.university
                                                                .majors.length
                                                        }{" "}
                                                        Jurusan
                                                    </h2>
                                                </div>
                                            </div>
                                            <div className="mt-6 md:grid md:grid-cols-6 md:gap-6 text-gray-500">
                                                <div className="md:col-span-1">
                                                    Total Mahasiswa
                                                </div>
                                                <div className="md:col-span-4">
                                                    <h2 className=" font-semibold mt-2 md:mt-0 cursor-pointer hover:underline hover:underline-offset-4 hover:text-blue-500">
                                                        {
                                                            data.university
                                                                .freelances
                                                                .length
                                                        }{" "}
                                                        Mahasiswa
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                        {edit && (
                            <StudyEdit
                                freelance={data}
                                universities={universities}
                                majors={majors}
                                tapBack={() => {
                                    setEdit(false);
                                }}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
