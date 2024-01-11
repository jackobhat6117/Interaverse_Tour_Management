<<<<<<< HEAD
import React, { useState } from 'react'
import Button1 from '../../../../../../components/form/Button1'
import ContentInfo from '../../../../../../components/DIsplay/ContentInfo';
import { useLocation } from 'react-router-dom';
import ConfirmChangeModal from './ConfirmChangeModal';
import TextInput from '../../../../../../components/form/TextInput';
import updateBooking from '../../../../../../controllers/booking/updateBooking';

export default function ChangePassenger({orgi,callback}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  // const {bookingData} = useSelector(state => state.flightBooking);
  // const dispatch = useDispatch();
  const pnr = orgi?.booking?.flightBooking?.at(0)?.pnr;
  const orgiName = orgi?.orderDetail?.travelers?.at(Math.min(0,parseInt(id-1))||0)?.name;
  console.log('orgi: ',orgi,orgiName)
  const [data,setData] = useState({
    firstName: orgiName?.firstName || '',
    middleName: orgiName?.middleName || '',
    lastName: orgiName?.lastName || '',
  })

  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const givenName = data.firstName.split(' ');
    data.firstName = givenName[0];
    data.middleName = givenName[1]||'';
    const res = await updateBooking(pnr,data);
    setLoading(false);
    callback && callback({...res,payment: false})
    // dispatch(setBookingData({...bookingData,changeOrderData: data}))
=======
import React, { useState } from "react";
import Button1 from "../../../../../../components/form/Button1";
import ContentInfo from "../../../../../../components/DIsplay/ContentInfo";
import ConfirmChangeModal from "./ConfirmChangeModal";
import TextInput from "../../../../../../components/form/TextInput";

export default function ChangePassenger({ passenger, callback, submit }) {
  const [data, setData] = useState({
    firstName: passenger?.name?.firstName,
    lastName: passenger?.name?.lastName,
  });

  const [open, setOpen] = useState(false);

  async function handleSubmit() {
    submit && submit(data);
    callback && callback()
>>>>>>> 4a3383956f21f886c37fd419d966611f923e2de9
  }

  return (
<<<<<<< HEAD
    <div className='flex flex-col gap-6'>
        <ContentInfo>
          Use all given names and surnames exactly as they appear in your passport/ID to avoid boarding complications
        </ContentInfo>
        <form action={() => setOpen(true)} className='flex flex-col gap-6'>
          <div className='flex gap-4 flex-wrap sm:flex-nowrap'>
            {/* <div>
              <SelectInput label='Title'>
                <MenuItem value={'Mr'}>Mr</MenuItem>
                <MenuItem value={'Ms'}>Ms</MenuItem>
                <MenuItem value={'Mrs'}>Mrs</MenuItem>
              </SelectInput>
            </div> */}
            <TextInput label={'Given Name'}
              value={data.firstName+' '+data.middleName}
              onChange={(ev) => setData({...data,firstName: ev.target.value})}
              />
            <TextInput label={'Surname'}
              value={data.lastName}
              onChange={(ev) => setData({...data,lastName: ev.target.value})}
              />
=======
    <div className="flex flex-col gap-6">
      <ContentInfo>
        Use all given names and surnames exactly as they appear in your
        passport/ID to avoid boarding complications
      </ContentInfo>
      <form
        action={() => {
          setOpen(true);
        }}
        className="flex flex-col gap-6"
      >
        <div className="flex gap-4 flex-wrap">
          {/* <div>
            <SelectInput label="Title">
              <MenuItem value={"Mr"}>Mr</MenuItem>
              <MenuItem value={"Ms"}>Ms</MenuItem>
              <MenuItem value={"Mrs"}>Mrs</MenuItem>
            </SelectInput>
          </div> */}
          <div>
            <TextInput
              label={"First Name"}
              value={data.firstName}
              onChange={(ev) =>
                setData({ ...data, firstName: ev.target.value })
              }
            />
>>>>>>> 4a3383956f21f886c37fd419d966611f923e2de9
          </div>
          <div>
            <TextInput
              label={"Last Name"}
              value={data.lastName}
              onChange={(ev) => setData({ ...data, lastName: ev.target.value })}
            />
          </div>
<<<<<<< HEAD
        </form>
        <ConfirmChangeModal loading={loading} callback={handleSubmit} open={open} setOpen={setOpen} />
=======
        </div>
        <div className="flex gap-4">
          <button className="px-6">Cancel</button>
          <Button1 onClick={() => setOpen(true)}>Confirm</Button1>
        </div>
      </form>
      <ConfirmChangeModal
        callback={handleSubmit}
        open={open}
        setOpen={setOpen}
      />
>>>>>>> 4a3383956f21f886c37fd419d966611f923e2de9
    </div>
  );
}
