import { BiInfoCircle } from "react-icons/bi";

export default function AlertComponents({
    message,
    action,
    success = false,
    className,
}) {
    return (
        <div
            className={` rounded-lg py-5 px-6 mb-4 text-base text-yellow-700 ${
                success ? "bg-green-200" : "bg-yellow-100"
            } ${className}`}
        >
            <div className="flex justify-between">
                <div className="flex items-center">
                    <BiInfoCircle size={30} />
                    <span className="ml-4">{message}</span>
                </div>

                {action}
            </div>
        </div>
    );
}
