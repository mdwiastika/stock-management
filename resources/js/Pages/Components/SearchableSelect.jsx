import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

export default function SearchableSelect({
    options,
    value,
    onChange,
    placeholder,
    name,
    error,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const selectedOption = options.find((option) => option.value === value);

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSelectOption = (option) => {
        onChange({ target: { name: name, value: option.value } });
        setSearchTerm(option.label);
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        if (!isOpen) {
            setIsOpen(true);
        }
        onChange({ target: { name: name, value: "" } }); // Clear value on search
    };

    const displayValue = selectedOption ? selectedOption.label : searchTerm;

    return (
        <div className="relative" ref={wrapperRef}>
            <input
                type="text"
                name={name}
                value={displayValue}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                className={`form-control text-neutral-800 dark:text-white ${
                    error ? "border-danger-600" : ""
                }`}
                placeholder={placeholder}
            />
            {isOpen && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg dark:bg-neutral-700 dark:border-neutral-600">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleSelectOption(option)}
                                className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-600"
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li className="p-2 text-gray-500 dark:text-neutral-400">
                            Tidak ada hasil ditemukan.
                        </li>
                    )}
                </ul>
            )}
            {error && (
                <p className="!text-danger-600 mt-1">
                    {Array.isArray(error) ? error.join(", ") : error}
                </p>
            )}
        </div>
    );
}
