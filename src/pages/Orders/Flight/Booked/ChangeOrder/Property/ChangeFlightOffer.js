import React, { useEffect, useState } from 'react'
import Button1 from '../../../../../../components/form/Button1';
import LoadingBar from '../../../../../../components/animation/LoadingBar';
import Paginate from '../../../../../../components/DIsplay/Paginate';
import getFlightOffers from '../../../../../../controllers/Flight/getFlightOffers';
import convertFlightObject from '../../../../../../features/utils/flight/flightOfferObj';
import { SortedOffers, rearrageFlight } from '../../../FlightSearch/OffersList';


export default function ChangeFlightOffer({back,callback,orgi,prevResult: reqBody}) {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false);
  // const {bookingData} = useSelector(state => state.flightBooking);
  // const dispatch = useDispatch();

  useEffect(() => {
    load();
  },[])

  console.log(" reqBody -> ",reqBody)
  async function load() {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve,2000))
    const res = await getFlightOffers(reqBody)
    if(res.return) {
      console.log(res.data);
      let data = res?.data?.data?.map(flight => convertFlightObject(flight))
      setData(data)
    }
    setLoading(false);
    // setData(offerResponseSample.data);
  }

  async function handleSelect(obj) {
    callback && callback(obj);
  }
  

  const Tag = (props) => (
    <span className='light-bg text-primary/60 whitespace-nowrap p-2 rounded-md'>{props.children}</span>
  )
  
  const modData = rearrageFlight(data);
  return (
    <div className='flex flex-col gap-4'>
      <h5>Showing results for</h5>
      <div className='flex gap-4 items-center'>
        <div className='flex gap-4 max-w-full py-1 overflow-x-auto overflow-hidden'>
          <Tag>LOS - LON</Tag>
          <Tag>Economy</Tag>
          <Tag>Round Trip</Tag>
          <Tag>2 Passengers</Tag>
          <Tag>Wed, 26th Oct</Tag>
        </div>
        <div>
          <Button1 onClick={back}>Edit</Button1>
        </div>
      </div>
      {loading ? 
        <LoadingBar />
      :null}
      <Paginate data={modData} className={'flex flex-col gap-4'} limit={20} render={(obj,i) => 
        <SortedOffers obj={obj} key={i} offer={[data[0]]} params={{handleOfferSelect:handleSelect}}/>
      } />

    </div>
  )
}
