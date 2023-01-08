export default function InputSuccess({ message, className = "" }) {
    return message ? (
        <p className={"text-sm text-green-600 " + className}>{message}</p>
    ) : null;
}
