import React, { useState } from 'react'
import Insurance from '../../Insurance'
import ConfirmChangeModal from './ConfirmChangeModal';
import updateBooking from '../../../../../../controllers/booking/updateBooking';

export default function ChangeInsurance({orgi,callback}) {
  const pnr = orgi?.booking?.flightBooking?.at(0)?.pnr;

  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const [selected,setSelected] = useState();

  async function handleSubmit() {
    setLoading(true);
    const res = await updateBooking(pnr,selected);
    setLoading(false);
    callback && callback(res)
  }

  function handleInsurance(obj) {
    setSelected(obj);
    setOpen(true);
  }

  const data = {
    passengers: orgi?.orderDetail?.travelers
  }
  return (
    <div>
        <Insurance orgi={data} callback={(obj) => handleInsurance(obj)} />

        <ConfirmChangeModal open={open} setOpen={setOpen} loading={loading} callback={handleSubmit} />
    </div>
  )
}
