import { Edit, EditOff } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

export default function EditableInput(props) {
  const {value,loading,onChange,footer,className,...restProps} = props;
  const [data,setData] = useState(value || 0);
  const [disabled,setDisabled] = useState(true);
  const inputRef = useRef();

  useEffect(() => {
    if (!disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  return (
    <div className='flex gap-4 items-center'>
      <div className='flex items-center gap-2 px-2 py-2'>
        <div ref={inputRef} type='text' contentEditable={!disabled}
          style={{minWidth: 'unset'}}
          className={" text-inherit !min-w-[none] "+className}
          onChange={(ev) => setData(ev.target.value)}
          {...restProps}>
            {data}
        </div>
        {disabled ? 
        <Edit onClick={() => setDisabled(!disabled)} fontSize='small' className='cursor-pointer mx-2' />
        :
        <EditOff onClick={() => setDisabled(!disabled)} fontSize='small' className='cursor-pointer mx-2' />
        }
      </div>
      {!disabled ? footer : ''}
      {/* <button className={`btn2 ${disabled ? ' hidden ' : ''}`} onClick={() => handleReturn && handleReturn(data)} disabled={loading}>
        {loading?<div className='load'></div>:null}
        update</button> */}
    </div>
  )
}