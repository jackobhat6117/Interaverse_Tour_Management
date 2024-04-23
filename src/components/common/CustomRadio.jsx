import React from "react";

function CustomRadio({
  label,
  description,
  selected,
  onSelect,
  value,
  className,
  standalone,
}) {
  const handleRadioChange = () => {
    onSelect(value);
  };

  return (
    <div
      className={`flex items-center space-x-4 my-2 cursor-pointer ${className}`}
      onClick={handleRadioChange}
    >
      {standalone ? (
        <div
          className={`w-8 h-8 rounded-full border border-gray-500 ${
            selected && "border-primary1 border-4"
          }`}
        ></div>
      ) : (
        <div
          className={`w-8 h-8 rounded-full border border-gray-500 ${
            selected === value && "border-primary1 border-4"
          }`}
        ></div>
      )}

      <div className="flex flex-col">
        <label htmlFor={label} className="font-semibold">
          {label}
        </label>
        {description && <span className="text-gray-400 ">{description}</span>}
      </div>
    </div>
  );
}

export default CustomRadio;
