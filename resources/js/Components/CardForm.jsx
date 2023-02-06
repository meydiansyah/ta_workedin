export function CardForm({ title, description, children, className }) {
    return (
        <div
            className={`p-4 bg-white shadow sm:p-8 sm:rounded-lg ${className}`}
        >
            <header>
                <h2 className="text-lg font-medium text-gray-900">{title}</h2>

                <p className="mt-1 text-sm text-gray-600">{description}</p>
            </header>
            <div className="mt-6 space-y-6">{children}</div>
        </div>
    );
}
