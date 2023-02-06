export default function Checkbox({ name, value, handleChange, isChecked }) {
    return (
        <input
            type="checkbox"
            defaultChecked={isChecked}
            name={name}
            value={value}
            className="rounded border-gray-300 text-[#2C7E5B] shadow-sm focus:ring-[#2C7E5B]"
            onChange={(e) => handleChange(e)}
        />
    );
}
