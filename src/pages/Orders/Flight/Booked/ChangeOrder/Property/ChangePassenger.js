import React, { useState } from 'react'
import { PassengerInputs } from '../../../../PassengersInput'
import Button1 from '../../../../../../components/form/Button1'
import ContentInfo from '../../../../../../components/DIsplay/ContentInfo';
import { useLocation } from 'react-router-dom';
import ConfirmChangeModal from './ConfirmChangeModal';

export default function ChangePassenger({callback}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [open,setOpen] = useState(false);

  async function handleSubmit() {
    callback && callback();
  }
  
  return (
    <div className='card p-10 flex flex-col gap-6'>
        <ContentInfo>
          Use all given names and surnames exactly as they appear in your passport/ID to avoid boarding complications
        </ContentInfo>
        <PassengerInputs required={['firstName','lastName']} data={{}} />
        <div className='flex gap-4'>
          <button className='px-6'>Cancel</button>
          <Button1 onClick={() => setOpen(true)}>Confirm</Button1>
        </div>
        <ConfirmChangeModal callback={handleSubmit} open={open} setOpen={setOpen} />
    </div>
  )
}
