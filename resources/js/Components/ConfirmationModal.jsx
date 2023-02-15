import Modal from "./Modal";
import SecondaryButton from "./SecondaryButton";

export function ConfirmationModal({
    show,
    setShow,
    title,
    description,
    action,
    children,
    maxW,
    cancelButton = true,
    border = true,
}) {
    return (
        <Modal
            maxWidth={maxW}
            show={show}
            onClose={() => {
                setShow(false);
            }}
        >
            {/* <div className="p-6"> */}
            <h2 className="text-lg px-6 pb-4 font-medium text-gray-900 mt-6">
                {title}
            </h2>
            <div className={`py-2 ${border ? "border-y-2" : "border-t-2"}`}>
                {description && (
                    <p className="mt-4 mx-6 text-md text-gray-600">
                        {description}
                    </p>
                )}
                <div className="mx-6">{children}</div>
            </div>
            <div className="m-6 flex justify-end ">
                {cancelButton && (
                    <SecondaryButton
                        className="border-0 shadow-transparent hover:bg-transparent hover:opacity-80"
                        onClick={() => {
                            setShow(false);
                        }}
                    >
                        Batal
                    </SecondaryButton>
                )}
                {action}
            </div>
            {/* </div> */}
        </Modal>
    );
}
