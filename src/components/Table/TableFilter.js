import React, { useState } from "react";

export default function TableFilter({ options, value, onChange }) {
  const [selected, setSelected] = useState(value || "");

  function handleChange(val) {
    setSelected(val);
    onChange && onChange(val);
  }
  return (
    <div className="flex gap-4 overflow-hidden overflow-x-auto">
      {options.map((option, i) => (
        <button
          key={i}
          onClick={() => handleChange(option.value)}
          className={`flex p-3 px-5 items-center gap-2 ${
            selected === option.value ? "!btn" : "!btn-theme-light"
          } `}
        >
          {option.label || option.value}
          <div className={`bg-secondary/20 rounded-sm text-blue-400 px-2`}>
            {option.count}
          </div>
        </button>
      ))}
    </div>
  );
}
