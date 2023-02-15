export default function PrimaryButton({
    type = "submit",
    className = "",
    processing,
    children,
    onClick,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `inline-flex items-center px-4 py-2 bg-[#2C7E5B] border border-transparent rounded-md font-bold text-sm text-white tracking-widest hover:bg-opacity-90 focus:bg-green active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
