import React, { useState } from 'react'
import EmailInput from '../../../../../../components/form/EmailInput'
import PhoneNumberInput from '../../../../../../components/form/PhoneNumberInput'
import Button1 from '../../../../../../components/form/Button1'
import ConfirmChangeModal from './ConfirmChangeModal';
import updateBooking from '../../../../../../controllers/booking/updateBooking';
import { clone } from '../../../../../../features/utils/objClone';

export default function ChangeContact({orgi,callback}) {
  const pnr = orgi?.booking?.flightBooking?.at(0)?.pnr;
  const contact = orgi?.orderDetail?.contacts?.at(0);
  const phone = parseInt(contact?.phones?.at(0)?.countryCallingCode || '234') +"-"+contact?.phones?.at(0)?.number
  const [data,setData] = useState({
    email: contact.emailAddress || '',
    phone: phone || ''
  });
  const [open,setOpen] = useState(false);
  const [loading,setLoading] =  useState(false);

  console.log('contact: ',orgi)
  // @fix phone and contact are considered only from first array

  async function handleSubmit() {
    try {

    const reqBody = clone({
      supplier: orgi?.orderDetail?.offers?.at(0)?.supplier,
      // offers: orgi?.orderDetail?.offers,
      travelersInfo: orgi?.orderDetail?.travelers?.map(obj => ({
        id: obj.id,
        phone: obj?.contact?.phones?.at(0),
        email: obj?.contact?.emailAddress
      }))
      // orgi?.orderDetail?.travelers
    });

    reqBody?.travelersInfo?.map(traveler => {
      traveler.email = data?.email;
      let phone = data.phone.split('-');
      traveler.phone = {
        countryCallingCode: phone[0],
        deviceType : "MOBILE",
        number : phone[1],
      }
      return true;
    })
    setLoading(true);
    const res = await updateBooking(pnr,reqBody);
    setLoading(false);
    callback && callback({...res,payment:false})

    } catch(ex) {console.log(ex)}
  }
  
  return (
    <div className='flex flex-col gap-6'>
        <h5>Contact Person Details</h5>
        <EmailInput label='Email Address' 
          value={data.email}
          onChange={(ev) => setData({...data,email: ev.target.value})}
        />
        <PhoneNumberInput label='Phone Number' 
          value={data.phone}
          onChange={(val) => setData({...data,phone: val})}
        />

        <div className='flex gap-4'>
            <button className='px-6'>Cancel</button>
            <Button1 onClick={() => setOpen(true)}>Confirm</Button1>
        </div>

        <ConfirmChangeModal open={open} setOpen={setOpen} loading={loading} callback={handleSubmit} />
    </div>
  )
}
