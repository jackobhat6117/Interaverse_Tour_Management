import React, { useState } from 'react'
import ContentInfo from '../../../../../../components/DIsplay/ContentInfo'
import SelectInput from '../../../../../../components/form/SelectInput'
import Button1 from '../../../../../../components/form/Button1';
import { MenuItem } from '@mui/material';
import ConfirmChangeModal from './ConfirmChangeModal';
import RadioGroup from '../../../../../../components/form/RadioGroup';


export default function ChangeSplitPNRConfirm({callback}) {
  const data = {
    passengers: [
      {firstName: 'John',lastName: 'Doe',id: 1},
      {firstName: 'John',lastName: 'Doe',id: 2},
    ]
  }
  const [open,setOpen] = useState(false);

  function handleSubmit() {
    callback && callback();
  }
  
  return (
    <div className='flex flex-col gap-4'>
      <h5>Confirm Split PNR</h5>
      <p>
        Are you sure you want to split this PNR(Passenger Name Record) from the parent order? This action is not reversable.
      </p>

      {data?.passengers?.map((obj) => (
        <div className='light-bg p-4 rounded-sm'>
          <p>{obj.firstName} {obj.lastName}</p>
          <div>
            Economy Class
          </div>
        </div>
      ))}

      <div className='flex gap-4'>
        <button className='px-6'>Cancel</button>
        <Button1 onClick={() => setOpen(true)}>Confirm</Button1>
      </div>

      <ConfirmChangeModal callback={handleSubmit} open={open} setOpen={setOpen} />

    </div>
  )
}
