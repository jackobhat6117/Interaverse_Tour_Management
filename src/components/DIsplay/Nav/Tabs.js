import { useEffect, useState } from "react";

export default function Tabs({
  value: defValue,
  option = [],
  onChange,
  className,
  config: defConfig,
}) {
  const [value, setValue] = useState(defValue || "");
  const [index, setIndex] = useState(null);

  const config = {
    activeClass: "btn",
    inActiveClass: "btn-light",
    ...defConfig,
  };

  useEffect(() => {
    setValue(defValue || "");
  }, [defValue]);

  function handleChange(val, i) {
    if(onChange) {
      const res = onChange(val);
      console.log(res)
      if(!res) return false;
    }

    setValue(val);
    setIndex(i);
  }
  return (
    <div className={"flex gap-4 " + className}>
      {option?.map((obj, i) => (
        <button
          key={i}
          className={`flex items-center ${
            value === obj.value || (index && index >= i)
              ? config.activeClass
              : config.inActiveClass
          }`}
          onClick={() => handleChange(obj.value, i)}
        >
          {obj.label || obj.value}
        </button>
      ))}
    </div>
  );
}
