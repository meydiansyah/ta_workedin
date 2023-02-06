import Modal from "./Modal";
import SecondaryButton from "./SecondaryButton";

export function ConfirmationModal({
    show,
    setShow,
    title,
    description,
    action,
    cancelButton = true,
}) {
    return (
        <Modal
            show={show}
            onClose={() => {
                setShow(false);
            }}
        >
            <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                <p className="mt-1 text-sm text-gray-600">{description}</p>
                <div className="mt-6 flex justify-end">
                    {cancelButton && (
                        <SecondaryButton
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            Batal
                        </SecondaryButton>
                    )}
                    {action}
                </div>
            </div>
        </Modal>
    );
}
