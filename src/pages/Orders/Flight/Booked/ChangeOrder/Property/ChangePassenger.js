import React, { useEffect, useState } from 'react'
import Button1 from '../../../../../../components/form/Button1'
import ContentInfo from '../../../../../../components/DIsplay/ContentInfo';
import { useLocation } from 'react-router-dom';
import ConfirmChangeModal from './ConfirmChangeModal';
import TextInput from '../../../../../../components/form/TextInput';
import convertToSupplierData from '../../../../../../utils/booking/convertToSupplierData';
// import updateBooking from '../../../../../../controllers/booking/updateBooking';

export default function ChangePassenger({orgi,callback,update}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = parseInt(searchParams.get('id') || 1) - 1;
  // const {bookingData} = useSelector(state => state.flightBooking);
  // const dispatch = useDispatch();
  const flightBooking = orgi?.booking?.flightBooking?.at(0);
  // const pnr = flightBooking?.pnr;
  // const orgiName = flightBooking?.travelers?.at(Math.min(0,parseInt(id))||0);
  console.log('orgi: ',orgi)
  const [data,setData] = useState({
    firstName: '',
    // middleName: '',
    lastName: '',
  })

  useEffect(() => {
    const orgiName = flightBooking?.travelers?.at(Math.min(0,parseInt(id))||0);

    setData({
      firstName: orgiName?.firstName || '',
      // middleName: orgiName?.middleName || '',
      lastName: orgiName?.lastName || '',  
    })

    //eslint-disable-next-line
  },[orgi])

  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const givenName = data.firstName.split(' ');
    data.firstName = givenName[0];
    data.middleName = givenName[1]||'';

    const travelers = flightBooking?.travelers;
    travelers[(id || 0)] = {...(travelers?.at(id || 0) || {}),...data}
    
    const {remarks,offers,pricing,ticketingAgreement,...supplierData} = convertToSupplierData(flightBooking,orgi?.orderDetail)

    const res = await update({travelers},{...supplierData,ticketingAggreement: ticketingAgreement});
    // const res = await updateBooking(pnr,data);
    setLoading(false);
    callback && callback({...res,payment: false})
    // dispatch(setBookingData({...bookingData,changeOrderData: data}))
  }

  function handleFormSubmit(ev) {
    ev.preventDefault();
    setOpen(true)
  }

  return (
    <div className='flex flex-col gap-6'>
        <ContentInfo>
          Use all given names and surnames exactly as they appear in your passport/ID to avoid boarding complications
        </ContentInfo>
        <form onSubmit={handleFormSubmit} className='flex flex-col gap-6'>
          <div className='flex gap-4 flex-wrap sm:flex-nowrap'>
            {/* <div>
              <SelectInput label='Title'>
                <MenuItem value={'Mr'}>Mr</MenuItem>
                <MenuItem value={'Ms'}>Ms</MenuItem>
                <MenuItem value={'Mrs'}>Mrs</MenuItem>
              </SelectInput>
            </div> */}
            <TextInput label={'Given Name'}
              value={data.firstName}
              onChange={(ev) => setData({...data,firstName: ev.target.value})}
              />
            <TextInput label={'Surname'}
              value={data.lastName}
              onChange={(ev) => setData({...data,lastName: ev.target.value})}
              />
          </div>
          {/* <div>
            <TextInput
              label={"Last Name"}
              value={data.lastName}
              onChange={(ev) => setData({ ...data, lastName: ev.target.value })}
            />
          </div> */}
          <Button1 type='submit' >Confirm</Button1>
        </form>

        <ConfirmChangeModal loading={loading} callback={handleSubmit} open={open} setOpen={setOpen} />
    </div>
  );
}
