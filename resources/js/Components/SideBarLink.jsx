export default function SideBarLink({ title, active, setActive, children }) {
    return (
        <div
            className={`flex justify-between p-3 rounded-md border border-l-2 border-transparent hover:bg-gray-100 hover:cursor-pointer ${
                active && "border-l-2 border-l-gray-500 bg-gray-50"
            }`}
            onClick={setActive}
        >
            <span>{title}</span>

            {children}
        </div>
    );
}
