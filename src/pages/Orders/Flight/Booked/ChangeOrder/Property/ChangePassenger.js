import React, { useState } from 'react'
import Button1 from '../../../../../../components/form/Button1'
import ContentInfo from '../../../../../../components/DIsplay/ContentInfo';
import { useLocation } from 'react-router-dom';
import ConfirmChangeModal from './ConfirmChangeModal';
import SelectInput from '../../../../../../components/form/SelectInput';
import { MenuItem } from '@mui/material';
import TextInput from '../../../../../../components/form/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingData } from '../../../../../../redux/reducers/flight/flightBookingSlice';

export default function ChangePassenger({callback}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const {bookingData} = useSelector(state => state.flightBooking);
  const dispatch = useDispatch();
  const [data,setData] = useState({
    givenName: '',
    surname: '',
  })

  const [open,setOpen] = useState(false);

  async function handleSubmit() {
    dispatch(setBookingData({...bookingData,changeOrderData: data}))
    callback && callback();
  }
  
  return (
    <div className='flex flex-col gap-6'>
        <ContentInfo>
          Use all given names and surnames exactly as they appear in your passport/ID to avoid boarding complications
        </ContentInfo>
        <form action={() => setOpen(true)} className='flex flex-col gap-6'>
          <div className='flex gap-4 flex-wrap'>
            <div>
              <SelectInput label='Title'>
                <MenuItem value={'Mr'}>Mr</MenuItem>
                <MenuItem value={'Ms'}>Ms</MenuItem>
                <MenuItem value={'Mrs'}>Mrs</MenuItem>
              </SelectInput>
            </div>
            <div>
              <TextInput label={'Given Name'}
                value={data.givenName}
                onChange={(ev) => setData({...data,givenName: ev.target.value})}
                />
            </div>
            <div>
              <TextInput label={'Surname'}
                value={data.surname}
                onChange={(ev) => setData({...data,surname: ev.target.value})}
                />
            </div>
          </div>
          <div className='flex gap-4'>
            <button className='px-6'>Cancel</button>
            <Button1 onClick={() => setOpen(true)}>Confirm</Button1>
          </div>
        </form>
        <ConfirmChangeModal callback={handleSubmit} open={open} setOpen={setOpen} />
    </div>
  )
}
