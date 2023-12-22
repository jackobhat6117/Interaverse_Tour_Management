import { useEffect, useState } from "react";

export default function Tabs({value: defValue,option=[],onChange,className,config: defConfig}) {
	const [value,setValue] = useState(defValue || '');

    const config = {
        activeClass: 'btn',
        inActiveClass: 'btn-light',
        ...defConfig
    }

    useEffect(() => {
        setValue(defValue || '')
    },[defValue])

    function handleChange(val) {
        setValue(val);
        onChange && onChange(val)
    }
	return (
		<div className={'flex gap-4 '+className}>
			{option?.map((obj,i) => (
				<button key={i} className={`${value === obj.value ? config.activeClass:config.inActiveClass}`}
					onClick={() => handleChange(obj.value)}
				>{obj.value}</button>
			))}
		</div>
	)
}