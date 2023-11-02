import { useState } from "react";
import Button1 from "../../components/form/Button1";
import Modal1 from "../../components/DIsplay/Modal/Modal1";
import { RadioGroup } from "@mui/material";
import RadioInput from "../../components/form/RadioInput";
import { useNavigate } from "react-router-dom";

export default function CreateOrder({label,handleReturn}) {
  const [open,setOpen] = useState(false);
  const [selected,setSelected] = useState();
  const navigate = useNavigate()

  function handleSubmit(val) {
    setSelected(val);
    setOpen(false);
    // handleReturn && handleReturn();
    navigate('/order/new/'+val)
  }

  return (
    <div>
      <Button1 onClick={() => setOpen(true)}>{label ? label : "Create First Order"}</Button1>
      <Modal1 open={open} setOpen={setOpen}>
        <div className='card flex flex-col items-center gap-4'>
          <h4>Create new order</h4>
          <RadioGroup name='orderType' className='flex flex-col gap-2'
            onChange={(ev) => handleSubmit(ev.target.value)}
          >
            <RadioInput value='flight' className='py-4' checked={selected === 'flight'}>
              <div className={'flex flex-col'}>
                <h5>Flight Order</h5>
                <p>Click here to start booking a flight travel ticket.</p>
              </div>
            </RadioInput>
            <RadioInput value='tour' className='py-4' checked={selected === 'tour'}>
              <div className={'flex flex-col'}>
                <h5>Tour Order</h5>
                <p>Click here to book a tour ticket from anywhere.</p>
              </div>
            </RadioInput>
            <RadioInput value='stays' className='py-4' checked={selected === 'stays'}>
              <div className={'flex flex-col'}>
                <h5>Stays Order</h5>
                <p>Click here to book a place to stay</p>
              </div>
            </RadioInput>
          </RadioGroup>
          <Button1 className='!bg-red-500 ' onClick={() => setOpen(false)}>Close</Button1>
        </div>
      </Modal1>
    </div>
  )
}