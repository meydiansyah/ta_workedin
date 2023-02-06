import { Link, usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { BiInfoCircle, BiUser } from "react-icons/bi";
import ProfileViewEdit from "./ProfileViewEdit";

export default function ProfileView({
    status,
    data,
    provinces,
    tapBack,
    skills,
}) {
    const user = usePage().props.auth.user;
    const { is_admin, is_freelance } = usePage().props;
    const [edit, setEdit] = useState(false);

    return (
        <div className=" bg-white rounded-lg p-6">
            <div className="flex-col space-y-6">
                {!user.email_verified_at && (
                    <div
                        className={`rounded-md p-4 flex justify-between items-center ${
                            status === "verification-link-sent"
                                ? "bg-green-100 text-green-600"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                        <div className="flex items-center">
                            <BiInfoCircle
                                size={20}
                                className={`${
                                    status === "verification-link-sent"
                                        ? "text-green-600"
                                        : "text-yellow-700"
                                }`}
                            />
                            <span className="ml-4">
                                {status === "verification-link-sent"
                                    ? "Verifikasi email berhasil dikirm, silahkan periksa."
                                    : "Email belum terverifikasi"}
                            </span>
                        </div>

                        {status !== "verification-link-sent" && (
                            <Link
                                href={route("verification.send")}
                                method="post"
                                className="font-bold"
                            >
                                Perbarui
                            </Link>
                        )}
                    </div>
                )}
                {!edit && !is_admin && !data.user && (
                    <div className="rounded-md p-4 flex justify-between items-centerbg-yellow-100 text-yellow-700">
                        <div className="flex items-center">
                            <BiInfoCircle
                                size={20}
                                className="text-yellow-700"
                            />
                            <span className="ml-4">
                                {is_freelance
                                    ? "Data freelance belum lengkap"
                                    : "Data PIC belum lengkap"}
                            </span>
                        </div>
                        <button
                            type="button"
                            className="font-medium"
                            onClick={() => {
                                // setModalSkill(true);
                                setEdit(true);
                            }}
                        >
                            Lengkapi
                        </button>
                    </div>
                )}
                {!edit && is_freelance && data.user && data.user.skills && (
                    <div className="rounded-md p-4 flex justify-between items-centerbg-yellow-100 text-yellow-700">
                        <div className="flex items-center">
                            <BiInfoCircle
                                size={20}
                                className="text-yellow-700"
                            />
                            <span className="ml-4">
                                Data keterampilan belum dilengkapi
                            </span>
                        </div>
                        <button
                            type="button"
                            className="font-medium"
                            onClick={() => {
                                setEdit(true);
                            }}
                        >
                            Lengkapi
                        </button>
                    </div>
                )}
                <div
                    className={`flex justify-between p-4 rounded-md ${
                        edit && "bg-gray-100"
                    }`}
                >
                    <div className="flex space-x-4 items-center">
                        <BiUser size={20} />
                        <div className="text-lg font-semibold">Profil Saya</div>
                    </div>
                    {!is_admin && (
                        <>
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
                        </>
                    )}
                </div>
                {!edit ? (
                    <div className="flex-col space-y-6 px-4">
                        <Information title="Username" data={user.name} />
                        <Information
                            title="Email"
                            data={
                                <>
                                    <span>{user.email}</span>
                                    {status === "verification-link-sent" && (
                                        <span className="ml-4 text-green-800">
                                            Terkirim
                                        </span>
                                    )}
                                </>
                            }
                        />
                        {data.user && (
                            <>
                                <Information
                                    title="Nama Lengkap"
                                    data={data.full_name}
                                />
                                <Information title="NIK" data={data.nik} />
                                <Information
                                    title="Telepon"
                                    data={data.phone}
                                />
                                {data.bio && (
                                    <Information
                                        title="Nama Lengkap"
                                        data={data.bio}
                                    />
                                )}
                                <Information
                                    title="Alamat Lengkap"
                                    data={data.full_address}
                                />
                                <Information
                                    title="Provinsi"
                                    data={data.province.name}
                                />
                                <Information
                                    title="Kota"
                                    data={data.city.name}
                                />
                            </>
                        )}
                    </div>
                ) : (
                    <div className="flex-col space-y-6">
                        {/* {is_freelance && ( */}
                        <ProfileViewEdit
                            provinces={provinces}
                            userId={user.id}
                            email={user.email}
                            user={data}
                            skills={skills}
                            tapBack={() => {
                                setEdit(false);
                                tapBack();
                            }}
                        />
                        {/* )} */}
                    </div>
                )}
            </div>
        </div>
    );
}

export function Information({ title, data }) {
    return (
        <div className="grid grid-cols-8 space-x-4">
            <div className="col-span-2 text-gray-500">{title}</div>
            <div className="col-span-5 text-gray-500">{data}</div>
        </div>
    );
}
