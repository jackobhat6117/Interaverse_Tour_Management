import { useState } from "react";
import Icon from "../../../../components/HOC/Icon";
import Button1 from "../../../../components/form/Button1";
import Modal1 from "../../../../components/DIsplay/Modal/Modal1";
import { clone } from "../../../../features/utils/objClone";
import EmailInput from "../../../../components/form/EmailInput";
import { useSnackbar } from "notistack";
import { shareFlightBooking } from "../../../../controllers/Flight/shareFlightBooking";

export default function ShareViaEmail({flightBookingId}) {
  const [loading,setLoading] = useState(false);
  const [open,setOpen] = useState(false);
  const [data,setData] = useState([{email: ''}])
  const [includePrice,setIncludePrice] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  
  function handleChange(val,i) {
    let modData = clone(data);
    modData[i] = {email: val};

    setData(modData)
  }

  function addEmail() {
    setData([...data,{email: ''}])
  }

  async function handleSubmit() {
    setLoading(true);
    const res = await shareFlightBooking({
      flightBookingId,
      share: data?.map(obj => ({shareToEmail: [obj.email],includePrice})),
      includePrice,
    })
    setLoading(false);
    if(res.return) {
      setOpen(false);
      setData([{email: ''}])
      enqueueSnackbar('Booking shared',{variant: 'success'})
    } else enqueueSnackbar(res?.msg,{variant: 'error'})
    
  }
  
  return (
    <div className='py-10'>
      <Button1 variant='outlined' className='!border-primary !text-primary !font-bold flex gap-3 !py-5'
        onClick={() => setOpen(true)}
      >
        <Icon icon='ic:email' />
        Share Via Email
      </Button1>
      <Modal1 open={open} setOpen={setOpen}>
        <div className='card p-10 flex flex-col gap-4'>
          {/* <h5 className='self-center'>Email Share</h5> */}
          <p>
            Enter the email below where you would like to send booking details to
          </p>

          <label className="flex gap-2 items-center cursor-pointer">
            <input type='checkbox' checked={includePrice} onChange={(ev) => setIncludePrice(ev?.target?.checked)} />
            Include Pricings 
          </label>
          <div className='flex flex-col gap-2'>
            {data?.map((obj,i) => (
              <div className="flex gap-2 items-center">
                <EmailInput key={i} label='' placeholder='username@gmail.com' 
                  value={obj.email}
                  onChange={(ev) => handleChange(ev.target.value,i)}
                />
                {i !== 0 ? 
                  <Icon icon='ion:close-circle' className='cursor-pointer' onClick={() => setData(data.filter((_,Index) => Index !== i))} />
                :null}
              </div>
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
              <Button1 loading={loading} onClick={handleSubmit}>Confirm</Button1>
            </div>
          </div>
        </div>
      </Modal1>
    </div>
  )
}