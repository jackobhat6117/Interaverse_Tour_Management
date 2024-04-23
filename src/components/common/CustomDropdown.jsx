import React, { useState, useEffect, useRef } from "react";

const CustomDropdown = ({ button, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative border border-transparent" ref={dropdownRef}>
      <div onClick={toggleDropdown}>{button}</div>
      {isOpen && (
        <div className="absolute top-full ml-10 mt-2 w-48 bg-white   rounded-md shadow-lg z-10">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                onClick={handleOptionClick}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
