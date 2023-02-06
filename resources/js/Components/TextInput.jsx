import { forwardRef, useEffect, useRef, useState } from "react";

export default forwardRef(function TextInput(
    {
        type = "text",
        name,
        id,
        value,
        className,
        autoComplete,
        required,
        handleChange,
        placeholder,
        max,
        min,
    },
    ref
) {
    const input = ref ? ref : useRef();

    return (
        <div className="flex flex-col items-start">
            <input
                type={type}
                name={name}
                id={id}
                defaultValue={value}
                className={
                    `border-gray-300 focus:border-[#2C7E5B] focus:ring-[#2C7E5B] rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                min={min}
                max={max}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
                placeholder={placeholder}
            />
        </div>
    );
});
