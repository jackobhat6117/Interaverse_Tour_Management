import React from 'react'
import { PassengerInputs } from '../../../../PassengersInput'
import Button1 from '../../../../../../components/form/Button1'
import ContentInfo from '../../../../../../components/DIsplay/ContentInfo';

export default function ChangePassenger({callback}) {

  async function handleSubmit() {
    callback && callback();
  }
  
  return (
    <div className='card p-10 flex flex-col gap-6'>
        <ContentInfo>
          Use all given names and surnames exactly as they appear in your passport/ID to avoid boarding complications
        </ContentInfo>
        <PassengerInputs data={{}} />
        <div className='flex gap-4'>
          <button className='px-6'>Cancel</button>
          <Button1 onClick={handleSubmit}>Confirm</Button1>
        </div>
    </div>
  )
}
