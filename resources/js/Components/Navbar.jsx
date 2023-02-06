import { Link, usePage } from "@inertiajs/inertia-react";
import { useState } from "react";
import ApplicationLogo from "./ApplicationLogo";
import Dropdown from "./Dropdown";
import NavLink from "./NavLink";
import PrimaryButton from "./PrimaryButton";
import ResponsiveNavLink from "./ResponsiveNavLink";
import { Inertia } from "@inertiajs/inertia";
import { ConfirmationModal } from "./ConfirmationModal";

const Navbar = () => {
    const { user, is_admin, is_client, is_freelance, is_verified } =
        usePage().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <nav className="fixed top-0 w-full bg-white border-b border-gray-100 z-50">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex space-x-6">
                            <Link href={route("home")} className="my-auto">
                                <ApplicationLogo className="block w-auto text-gray-800 fill-current h-9" />
                            </Link>
                            {user && !is_freelance ? (
                                <>
                                    {is_client && (
                                        <div className="space-x-8 sm:-my-px sm:ml-10 sm:flex hidden">
                                            <NavLink
                                                href={route("admin.company")}
                                                active={route().current(
                                                    "admin.company"
                                                )}
                                            >
                                                Dashboard
                                            </NavLink>
                                            <NavLink
                                                href={route("university")}
                                                active={
                                                    route().current(
                                                        "university"
                                                    ) ||
                                                    route().current(
                                                        "detail.university"
                                                    )
                                                }
                                            >
                                                University
                                            </NavLink>
                                            <NavLink
                                                href={route("freelance")}
                                                active={route().current(
                                                    "freelance"
                                                )}
                                            >
                                                Freelance
                                            </NavLink>
                                            <NavLink
                                                href={route("freelance")}
                                                active={route().current(
                                                    "freelance"
                                                )}
                                            >
                                                Resumes
                                            </NavLink>
                                            <div className="md:flex hidden">
                                                <NavLink
                                                    href={route("client.job")}
                                                    active={route().current(
                                                        "client.*.job"
                                                    )}
                                                >
                                                    Jobs
                                                </NavLink>
                                            </div>
                                        </div>
                                    )}
                                    {is_admin && (
                                        <div className="space-x-8 sm:-my-px sm:ml-10 sm:flex hidden">
                                            <NavLink
                                                href={route("admin.university")}
                                                active={
                                                    route().current(
                                                        "admin.university"
                                                    ) ||
                                                    route().current(
                                                        "university.*"
                                                    )
                                                }
                                            >
                                                University
                                            </NavLink>
                                            <NavLink
                                                href={route("admin.freelance")}
                                                active={
                                                    route().current(
                                                        "admin.freelance"
                                                    ) ||
                                                    route().current(
                                                        "freelance.*"
                                                    )
                                                }
                                            >
                                                Freelances
                                            </NavLink>
                                            <NavLink
                                                href={route("admin.company")}
                                                active={
                                                    route().current(
                                                        "admin.pic"
                                                    ) ||
                                                    route().current(
                                                        "admin.company"
                                                    ) ||
                                                    route().current(
                                                        "admin.jobs"
                                                    ) ||
                                                    route().current("pic.*") ||
                                                    route().current(
                                                        "company.*"
                                                    ) ||
                                                    route().current("job.*")
                                                }
                                            >
                                                Client
                                            </NavLink>
                                            <NavLink
                                                href={route("admin.skills")}
                                                active={
                                                    route().current(
                                                        "admin.skills"
                                                    ) ||
                                                    route().current("skills.*")
                                                }
                                            >
                                                Skills
                                            </NavLink>
                                            <NavLink
                                                href={route("admin.skills")}
                                                active={
                                                    route().current(
                                                        "admin.skills"
                                                    ) ||
                                                    route().current("skills.*")
                                                }
                                            >
                                                Resumes
                                            </NavLink>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="space-x-8 sm:-my-px sm:ml-10 sm:flex hidden">
                                    <NavLink
                                        href={route("university")}
                                        active={
                                            route().current("university") ||
                                            route().current("detail.university")
                                        }
                                    >
                                        University
                                    </NavLink>
                                    <NavLink
                                        href={route("company")}
                                        active={route().current("company")}
                                    >
                                        Company
                                    </NavLink>
                                    <NavLink
                                        preserveState={
                                            route().current("profile.edit") &&
                                            !is_verified
                                        }
                                        onClick={
                                            route().current("profile.edit") &&
                                            !is_verified
                                                ? () => setShowModal(true)
                                                : null
                                        }
                                        href={
                                            route().current("profile.edit") &&
                                            !is_verified
                                                ? null
                                                : route("jobs")
                                        }
                                        active={route().current("jobs")}
                                    >
                                        Jobs
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        {user === null ? (
                            <div className="hidden sm:block">
                                <div className="flex">
                                    <NavLink href={route("login")}>
                                        Masuk
                                    </NavLink>
                                    <Link
                                        href={route("register")}
                                        className="inline-flex items-center px-4 py-2 bg-[#2C7E5B] border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-grey focus:bg-grey active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C7E5B] focus:ring-offset-2 transition ease-in-out duration-150 m-4"
                                    >
                                        Gabung
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="relative ml-3">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button className="flex items-center space-x-4 text-sm focus:border-gray-300 transition">
                                                    <span>{user.name}</span>
                                                    <img
                                                        className="h-8 w-8 rounded-full object-cover"
                                                        src={
                                                            user.profile_photo_url
                                                        }
                                                        alt={user.name}
                                                    />
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            {is_admin && (
                                                <>
                                                    <Dropdown.Link
                                                        href={route(
                                                            "dashboard"
                                                        )}
                                                        method="get"
                                                        as="button"
                                                    >
                                                        Dashboard
                                                    </Dropdown.Link>
                                                    <Dropdown.Link
                                                        href={route(
                                                            "admin.user"
                                                        )}
                                                        method="get"
                                                        as="button"
                                                    >
                                                        Users
                                                    </Dropdown.Link>
                                                </>
                                            )}
                                            {is_client && (
                                                <Dropdown.Link
                                                    href={route("client.job")}
                                                    method="get"
                                                    as="button"
                                                    className="md:hidden block"
                                                >
                                                    Jobs
                                                </Dropdown.Link>
                                            )}
                                            {is_freelance && (
                                                <Dropdown.Link
                                                    href={route("dashboard")}
                                                    method="get"
                                                    as="button"
                                                >
                                                    History
                                                </Dropdown.Link>
                                            )}
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                                className="border-b"
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center -mr-2 sm:hidden">
                            {!user && (
                                <div className="flex sm:hidden ">
                                    <Link
                                        href={route("register")}
                                        className="inline-flex items-center px-4 py-2 bg-[#2C7E5B] border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-grey focus:bg-grey active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2C7E5B] focus:ring-offset-2 transition ease-in-out duration-150 m-4"
                                    >
                                        Gabung
                                    </Link>
                                </div>
                            )}

                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg
                                    className="w-6 h-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        {user && (
                            <ResponsiveNavLink href={route("profile.edit")}>
                                <div className="block">
                                    <div className="text-base font-medium text-gray-800">
                                        {user.name}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
                                        {user.email}
                                    </div>
                                </div>
                            </ResponsiveNavLink>
                        )}

                        <div className="mt-3 space-y-1">
                            {user ? (
                                <>
                                    {is_freelance && (
                                        <>
                                            <ResponsiveNavLink
                                                href={route("university")}
                                                active={
                                                    route().current(
                                                        "university"
                                                    ) ||
                                                    route().current(
                                                        "detail.university"
                                                    )
                                                }
                                            >
                                                University
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink
                                                href={route("company")}
                                                active={route().current(
                                                    "company"
                                                )}
                                            >
                                                Company
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink
                                                href={route("jobs")}
                                                active={route().current("jobs")}
                                            >
                                                Jobs
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink
                                                href={route("dashboard")}
                                                active={route().current(
                                                    "dashboard"
                                                )}
                                            >
                                                History
                                            </ResponsiveNavLink>
                                        </>
                                    )}
                                    {is_client && (
                                        <>
                                            <ResponsiveNavLink
                                                href={route("dashboard")}
                                                active={route().current(
                                                    "dashboard"
                                                )}
                                            >
                                                Dashboard
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink
                                                href={route("dashboard")}
                                                active={route().current(
                                                    "dashboard"
                                                )}
                                            >
                                                University
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink
                                                href={route("dashboard")}
                                                active={route().current(
                                                    "dashboard"
                                                )}
                                            >
                                                Freelance
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink
                                                href={route("dashboard")}
                                                active={route().current(
                                                    "dashboard"
                                                )}
                                            >
                                                Resumes
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink
                                                href={route("client.job")}
                                                active={route().current(
                                                    "client.*.job"
                                                )}
                                            >
                                                Jobs
                                            </ResponsiveNavLink>
                                        </>
                                    )}
                                    {is_admin && (
                                        <>
                                            <ResponsiveNavLink
                                                href={route("dashboard")}
                                                active={route().current(
                                                    "dashboard"
                                                )}
                                            >
                                                Dashboard
                                            </ResponsiveNavLink>

                                            <ResponsiveNavLink
                                                href={route("admin.university")}
                                                active={
                                                    route().current(
                                                        "admin.university"
                                                    ) ||
                                                    route().current(
                                                        "university.*"
                                                    )
                                                }
                                            >
                                                University
                                            </ResponsiveNavLink>

                                            <ResponsiveNavLink
                                                href={route("admin.company")}
                                                active={
                                                    route().current(
                                                        "admin.pic"
                                                    ) ||
                                                    route().current(
                                                        "admin.company"
                                                    ) ||
                                                    route().current(
                                                        "admin.jobs"
                                                    ) ||
                                                    route().current("pic.*") ||
                                                    route().current(
                                                        "company.*"
                                                    ) ||
                                                    route().current("job.*")
                                                }
                                            >
                                                Clients
                                            </ResponsiveNavLink>

                                            <ResponsiveNavLink
                                                href={route("admin.freelance")}
                                                active={
                                                    route().current(
                                                        "admin.freelance"
                                                    ) ||
                                                    route().current(
                                                        "freelance.*"
                                                    )
                                                }
                                            >
                                                Freelances
                                            </ResponsiveNavLink>

                                            <ResponsiveNavLink
                                                href={route("admin.skills")}
                                                active={
                                                    route().current(
                                                        "admin.skills"
                                                    ) ||
                                                    route().current("skills.*")
                                                }
                                            >
                                                Skills
                                            </ResponsiveNavLink>
                                            <ResponsiveNavLink
                                                href={route("dashboard")}
                                                active={route().current(
                                                    "dashboard"
                                                )}
                                            >
                                                Resumes
                                            </ResponsiveNavLink>
                                        </>
                                    )}
                                    <ResponsiveNavLink
                                        href={route("profile.edit")}
                                    >
                                        Profile
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route("logout")}
                                        as="button"
                                    >
                                        Log Out
                                    </ResponsiveNavLink>
                                </>
                            ) : (
                                <>
                                    <ResponsiveNavLink
                                        href={route("university")}
                                        active={
                                            route().current("university") ||
                                            route().current("detail.university")
                                        }
                                    >
                                        University
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route("company")}
                                        active={route().current("company")}
                                    >
                                        Company
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        Jobs
                                    </ResponsiveNavLink>

                                    <ResponsiveNavLink
                                        href={route("freelance")}
                                        active={route().current("freelances")}
                                    >
                                        Freelances
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route("login")}
                                        active={route().current("login")}
                                    >
                                        Masuk
                                    </ResponsiveNavLink>
                                    {/* {user && (
                                    <>
                                        <ResponsiveNavLink
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </ResponsiveNavLink>
                                        <ResponsiveNavLink
                                            method="post"
                                            href={route("logout")}
                                            as="button"
                                        >
                                            Log Out
                                        </ResponsiveNavLink>
                                    </>
                                )} */}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <ConfirmationModal
                title="Seperti ada yang kurang?"
                description="oh iya, lengkapi profile terlebih dahulu sebelum menemukan rekomendasi pekerjaan untuk kamu"
                show={showModal}
                setShow={setShowModal}
                cancelButton={false}
                action={
                    <div className="flex space-x-6">
                        <button
                            type="button"
                            className="font-medium text-gray-600"
                            onClick={() => {
                                setShowModal(false);
                                Inertia.get(route("jobs"));
                            }}
                        >
                            Lewati
                        </button>
                        <PrimaryButton
                            className="ml-3"
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            Lanjutkan
                        </PrimaryButton>
                    </div>
                }
            />
        </>
    );
};

export default Navbar;
