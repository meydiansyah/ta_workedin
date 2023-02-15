import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import TextInput from "@/Components/TextInput";
import HeadComponent from "@/Layouts/Head";
import { Inertia } from "@inertiajs/inertia";
import { Link, Head } from "@inertiajs/inertia-react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import Rating from "react-rating";
import Select from "react-select";

export default function Company(props) {
    return (
        <>
            <Head title="workedin - freelance" />
            <Navbar />

            <div className="relative flex-col items-top justify-center bg-white sm:items-center sm:pt-0">
                <HeadComponent
                    title="Daftar Mahasiswa"
                    description="Temukan mahasiswa yang terdaftar di portal kerja"
                />
            </div>

            <div className="min-h-screen bg-gray-100">
                <div className="max-w-5xl py-12 grid grid-cols-12 gap-4 mx-auto">
                    <div className="md:col-span-4 md:block hidden">
                        <div className="h-max flex-col space-y-4 bg-white shadow-md rounded sticky top-20 p-4">
                            <div className="font-bold text-xl">
                                Freelance untuk dipekerjakan
                            </div>
                            <TextInput
                                id="search"
                                className="block w-full !rounded-full py-1 text-sm"
                                value=""
                                placeholder="Temukan pekerjaan ..."
                                handleChange={(e) =>
                                    // Inertia.get(
                                    //     user && is_admin
                                    //         ? route("admin.jobs")
                                    //         : route("jobs"),
                                    //     {
                                    //         search: e.target.value,
                                    //     },
                                    //     {
                                    //         preserveState: true,
                                    //         replace: true,
                                    //     }
                                    // )
                                    console.log(e.target.value)
                                }
                                autofocus
                                autoComplete="search"
                            />
                            <div className="border-t py-2">
                                <div className="font-bold text-md">
                                    Kemampuan
                                </div>
                                <Select
                                    isMulti
                                    id="skill"
                                    options={props.skills.map((item) => {
                                        return {
                                            value: item.id,
                                            label: item.name,
                                        };
                                    })}
                                    // defaultValue={
                                    //     data.user &&
                                    //     data.skills.map((e) => {
                                    //         return {
                                    //             value: e.id,
                                    //             label: e.name,
                                    //         };
                                    //     })
                                    // }
                                    className="mt-2"
                                    // onChange={(e) => {
                                    //     const __list = [];
                                    //     e.map(({ value }) =>
                                    //         __list.push(value)
                                    //     );
                                    //     setData("skill", __list);
                                    // }}
                                />
                            </div>
                            <div className="border-t py-2">
                                <div className="font-bold text-md">
                                    Universitas
                                </div>
                                <Select
                                    id="university"
                                    options={props.universities.map((item) => {
                                        return {
                                            value: item.codept,
                                            label: item.name,
                                        };
                                    })}
                                    // defaultValue={
                                    //     data.user &&
                                    //     data.skills.map((e) => {
                                    //         return {
                                    //             value: e.id,
                                    //             label: e.name,
                                    //         };
                                    //     })
                                    // }
                                    className="mt-2"
                                    // onChange={(e) => {
                                    //     const __list = [];
                                    //     e.map(({ value }) =>
                                    //         __list.push(value)
                                    //     );
                                    //     setData("skill", __list);
                                    // }}
                                />
                            </div>
                            <div className="border-t py-2">
                                <div className="font-bold text-md mb-2">
                                    Rating
                                </div>
                                <Rating
                                    initialRating="0"
                                    // onChange={(rate) =>
                                    //     setRatingFinished(rate)
                                    // }
                                    emptySymbol={
                                        <AiOutlineStar className="text-gray-400 text-xl" />
                                    }
                                    fullSymbol={
                                        <AiFillStar className="text-yellow-400 text-xl" />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-8 col-span-12">
                        <div className="rounded-md bg-white flex-col shadow-md pb-20 space-y-2">
                            <div className="flex justify-end p-4">
                                <div className="text-sm text-gray-500">
                                    Menampilkan {props.freelance.length} pekerja
                                </div>
                            </div>
                            {props.freelance.length > 0 && (
                                <>
                                    {props.freelance.map((freelance) => {
                                        return (
                                            <div className="flex-col px-8 py-6 hover:bg-gray-100 border-b">
                                                <div className="sm:hidden block mb-4">
                                                    <Link
                                                        href={route(
                                                            "detail.user",
                                                            freelance.user_id
                                                        )}
                                                    >
                                                        <img
                                                            className="h-12 w-12 rounded-md object-cover"
                                                            src={
                                                                freelance.user
                                                                    .profile_photo_url
                                                            }
                                                            alt={
                                                                freelance.full_name
                                                            }
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="grid grid-cols-8 ">
                                                    <div className="sm:col-span-1 sm:block hidden">
                                                        <Link
                                                            href={route(
                                                                "detail.user",
                                                                freelance.user_id
                                                            )}
                                                        >
                                                            <img
                                                                className="h-12 w-12 rounded-md object-cover"
                                                                src={
                                                                    freelance
                                                                        .user
                                                                        .profile_photo_url
                                                                }
                                                                alt={
                                                                    freelance.full_name
                                                                }
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="sm:col-span-7 col-span-8 flex-col">
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <div className="flex space-x-2 font-bold items-center">
                                                                    <Link
                                                                        href={route(
                                                                            "detail.user",
                                                                            freelance.user_id
                                                                        )}
                                                                        className="hover:underline hover:underline-offset-4"
                                                                    >
                                                                        {
                                                                            freelance.full_name
                                                                        }
                                                                    </Link>

                                                                    <MdVerified color="#2C7E5B" />
                                                                </div>
                                                                <div className="text-sm text-gray-400 flex space-x-2 items-center">
                                                                    <Link
                                                                        href={route(
                                                                            "detail.university",
                                                                            freelance
                                                                                .university
                                                                                .codept
                                                                        )}
                                                                    >
                                                                        {
                                                                            freelance
                                                                                .major
                                                                                .name
                                                                        }
                                                                        ,{" "}
                                                                        {
                                                                            freelance
                                                                                .university
                                                                                .name
                                                                        }
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <div className="flex-col">
                                                                <div className="flex justify-end pr-1 items-center space-x-1">
                                                                    <AiFillStar
                                                                        size={
                                                                            18
                                                                        }
                                                                        className="text-yellow-400"
                                                                    />
                                                                    <div className="text-sm flex space-x-2 text-gray-500">
                                                                        {
                                                                            freelance.rating
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="text-sm flex justify-end space-x-2 text-gray-500">
                                                                    {freelance
                                                                        .reviews
                                                                        .length >
                                                                    0 ? (
                                                                        <>
                                                                            (
                                                                            {
                                                                                freelance
                                                                                    .reviews
                                                                                    .length
                                                                            }{" "}
                                                                            ulasan
                                                                            )
                                                                        </>
                                                                    ) : (
                                                                        "belum ada penilaian"
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {freelance.skills
                                                            .length > 0 && (
                                                            <div className="text-md space-x-2 my-2">
                                                                {freelance.skills.map(
                                                                    (
                                                                        skill,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <>
                                                                                <Link
                                                                                    href=""
                                                                                    className="hover:underline hover:underline-offset-4"
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        skill.name
                                                                                    }
                                                                                </Link>
                                                                                {index +
                                                                                    1 !==
                                                                                    freelance
                                                                                        .skills
                                                                                        .length &&
                                                                                    ","}
                                                                            </>
                                                                        );
                                                                    }
                                                                )}
                                                            </div>
                                                        )}
                                                        <div className="text-sm line-clamp-2">
                                                            {freelance.bio}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
