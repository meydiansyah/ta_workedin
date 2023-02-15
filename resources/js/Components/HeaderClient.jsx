import SubNavLink from "@/Components/SubNavLink";
import { Transition } from "@headlessui/react";
import { Link } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";

export default function HeaderClient({ status }) {
    const [showAlert, setShowAlert] = useState(false);
    const addButton = () => {
        switch (route().current()) {
            case "admin.company":
                return route("company.create");
            case "admin.pic":
                return route("pic.create");
            case "admin.jobs":
                return route("job.create");
            default:
                return route("admin.pic");
        }
    };

    useEffect(() => {
        if (status) {
            setShowAlert(true);
        }
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    }, [status]);

    return (
        <div className="flex justify-between">
            <div className="flex space-x-4">
                <SubNavLink
                    href={route("admin.company")}
                    active={route().current("admin.company")}
                >
                    Company
                </SubNavLink>
                <SubNavLink
                    href={route("admin.pic")}
                    active={route().current("admin.pic")}
                >
                    PIC Company
                </SubNavLink>
                <SubNavLink
                    href={route("admin.jobs")}
                    active={route().current("admin.jobs")}
                >
                    Jobs
                </SubNavLink>
            </div>
            <div className="flex space-x-4 items-center">
                <Transition
                    show={showAlert}
                    enterFrom="opacity-0"
                    leaveTo="opacity-0"
                    className="transition ease-in-out duration-700"
                >
                    <div className="font-medium text-sm text-green-600">
                        {status}
                    </div>
                </Transition>
                <Link
                    href={addButton()}
                    className="inline-flex items-center px-4 py-2 bg-[#2C7E5B] border border-transparent rounded-md font-bold text-xs text-white uppercase tracking-widest hover:bg-grey focus:bg-grey active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-grey focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Tambah
                </Link>
            </div>
        </div>
    );
}
