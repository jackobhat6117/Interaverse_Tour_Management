import { useState } from "react";
import { clone } from "../../../../features/utils/objClone";
import EmailInput from "../../../../components/form/EmailInput";
import Icon from "../../../../components/HOC/Icon";
import Button1 from "../../../../components/form/Button1";

export default function EmailExport() {
    const [data,setData] = useState([{email: ''}])
  
    function handleChange(val,i) {
      let modData = clone(data);
      modData[i] = {email: val};
  
      setData(modData)
    }
  
    function addEmail() {
      setData([...data,{email: ''}])
    }
  
    async function handleSubmit() {
      // request
    }
    return (
      <div className='card p-10 flex flex-col gap-4'>
        <h5 className='self-center'>Email Export</h5>
        <p>
          Enter the email below where you would like to send the file to
        </p>
        <div className='flex flex-col gap-2'>
          {data?.map((obj,i) => (
            <EmailInput key={i} label='' placeholder='username@gmail.com' 
            value={obj.email}
            onChange={(ev) => handleChange(ev.target.value,i)}
            />
          ))}
        </div>
        <div className='py-4 flex gap-4 justify-between items-center'>
          <button className='flex gap-2'
            onClick={addEmail}
          >
            <Icon icon='ic:round-add-circle' className='text-theme1' />
            Add another email address
          </button>
          <div>
            <Button1 onClick={handleSubmit}>Confirm</Button1>
          </div>
        </div>
      </div>
    )
  }
  