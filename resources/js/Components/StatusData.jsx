import { useState } from "react";
import PrimaryButton from "./PrimaryButton";

export default function StatusData({ isActive, setData }) {
    const [access, setAccess] = useState(false);
    return (
        <>
            {!access ? (
                <>
                    <div className="text-base text-gray-500 my-auto">
                        Perbarui status
                    </div>
                    <button
                        type="button"
                        className="font-medium mr-4 my-1 text-orange-600  hover:underline"
                        onClick={() => {
                            setAccess(true);
                        }}
                    >
                        Perbarui
                    </button>
                </>
            ) : (
                <>
                    <button
                        type="button"
                        className="font-medium ml-4 text-gray-600  hover:underline"
                        onClick={() => {
                            setAccess(false);
                        }}
                    >
                        Batalkan
                    </button>
                    <div className="flex space-x-4">
                        {isActive ? (
                            <>
                                <PrimaryButton
                                    onClick={(e) => {
                                        setData("status_id", 2);
                                    }}
                                    className="inline-flex items-center px-4 py-2 ml-4 text-xs font-bold tracking-widest text-white uppercase bg-orange-600 border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-orange-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Deactive
                                </PrimaryButton>
                                <PrimaryButton
                                    onClick={(e) => {
                                        setData("status_id", 7);
                                    }}
                                    className="inline-flex items-center px-4 py-2 ml-4 text-xs font-bold tracking-widest text-white uppercase bg-gray-600 border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Suspend
                                </PrimaryButton>
                            </>
                        ) : (
                            <PrimaryButton
                                onClick={(e) => {
                                    setData("status_id", 1);
                                }}
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-bold tracking-widest text-white uppercase bg-green-600 border border-transparent rounded-md hover:bg-gray focus:bg-gray active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-gray focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Activate
                            </PrimaryButton>
                        )}
                    </div>
                </>
            )}
        </>
    );
}
