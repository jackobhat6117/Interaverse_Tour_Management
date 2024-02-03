import React, { createRef, useCallback, useEffect, useMemo, useState } from 'react'
import { SwipeableDrawer, Tab, Tabs, ThemeProvider, createTheme } from '@mui/material';
import FlightOfferDisplay from '../../../../components/flight/FlightOfferDisplay';
import { FlightOfferDetail } from '../../../../components/flight/FlightOfferDetail';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import getFlightOffers from '../../../controllers/search/getFlightOffers';
import { decrypt, encrypt } from '../../../../features/utils/crypto';
// import getFlightOfferPrice from '../../../controllers/flight/getOfferPrice';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingData } from '../../../../redux/reducers/flight/flightBookingSlice';
import FlightOfferFilter from './OffersFilter';
import moment from 'moment';
import { clone } from '../../../../features/utils/objClone';
import { def } from '../../../../config';
import PriceTimeout from '../../../../components/flight/PriceTimeout';
import { formatMoney } from '../../../../features/utils/formatMoney';
import splitCapitals from '../../../../features/utils/splitCapital';
import BreadCrumb from '../../../../components/DIsplay/Nav/BreadCrumb';
import Icon from '../../../../components/HOC/Icon';
import Modal1 from '../../../../components/DIsplay/Modal/Modal1';
import Paginate from '../../../../components/DIsplay/Paginate';
import Button1 from '../../../../components/form/Button1';
import getFlightOffers from '../../../../controllers/Flight/getFlightOffers';
import convertFlightObject, { createFlightCat } from '../../../../features/utils/flight/flightOfferObj';
import { offerSearchTemp } from '../../../../data/flight/offerSearchData';
import CreateFlightOrder from '../CreateFlightOrder';
import LoadingBar from '../../../../components/animation/LoadingBar';
import SelectInput from '../../../../components/form/SelectInput';
import IOSSwitch from '../../../../components/form/IOSSwitch';
import EmailInput from '../../../../components/form/EmailInput';
import PriceAlert from '../../../../components/flight/PriceAlert';
// import getCalendarSearch from '../../../controllers/search/getCalendarSearch';


const tempCat = {
  Best: [],
  Cheapest: [],
  Fastest: [],
  EarlyDeparture: [],
  EarliestTakeOff: [],
  EarliestLanding: [],
  Slowest: [],
}
const tempFlightDate = [
  // {date: '2023-05-15',data: {},cost: '250,000'},
  // {date: '2023-05-16',data: {},cost: '250,000'},
  // {date: '2023-05-17',data: {},cost: '250,000'},
  // {date: '2023-05-18',data: {},cost: '250,000',active: true},
  // {date: '2023-05-19',data: {},cost: '250,000'},
  // {date: '2023-05-20',data: {},cost: '250,000'},
  // {date: '2023-05-21',data: {},cost: '250,000'},
]
const fetchedData = createRef([]);
const test = def.devStatus === 'test';

export default function OffersList({hide}) {
  const [data,setData] = useState([]);
  const {bookingData} = useSelector(state => state.flightBooking);
  const [cat,setCat] = useState(tempCat);
  const [flightDate,setFlightDate] = useState(tempFlightDate);
  const [curDetail,setCurDetail] = useState();
  const [loading,setLoading] = useState(false);
  const [resMsg,setResMsg] = useState("No Result");
  const [searchParam] = useSearchParams();
  const q = useMemo(() => searchParam.get('q'),[searchParam]);
  const qIndex = searchParam.get('path');
  const [openFilter,setOpenFilter] = useState(false);
  const [openSearch,setOpenSearch] = useState(false);
  const [openSort,setOpenSort] = useState(false);
  const [orgiData,setOrgiData] = useState([]);

  const [sortby,setSortBy] = useState('price');
  

  const navigate = useNavigate();
  const location = useLocation();
  
  const searchObj = JSON.parse(decrypt(q));
  
  const [searchPath,setSearchPath] = useState([searchObj?.destinations[0]])

  // console.log(' ---> ',searchPath,searchObj)

  // const curFlightDate = flightDate.findIndex(f => f.active)
  
  const dispatch = useDispatch();

  console.log('fetchedData: ',fetchedData)
  useEffect(() => {
    let path = [];
    for(let i = 0;i<=qIndex||0;i++) {
      path.push(searchObj?.destinations[i])
    }
    setSearchPath(path)
    console.log('path changed')
    filterForNextRoute();
    //eslint-disable-next-line
  },[qIndex])

  function filterForNextRoute() {
    console.log("also here")    
    if(!parseInt(qIndex)) {
      setData(fetchedData.current || [])
      dispatch(setBookingData({...bookingData,offer: []}))
      return false; 
    };

    console.log('here')
    let airline = bookingData?.offer?.at(Math.max(0,qIndex-1))?.segments[0].flights[0].marketingCarrier
    let supplier = bookingData?.offer?.at(Math.max(0,qIndex-1))?.supplier;
    let newData = (fetchedData.current)?.filter(obj => {
      if(obj.segments)
        return obj.segments[qIndex-1]?.flights?.every((flight) => (flight.marketingCarrier === airline) && obj.supplier === supplier)
              
      return false;
    })
    console.log((qIndex),'here',airline,supplier,orgiData,newData)

    setOrgiData(newData);
    setData(newData)
  }
  console.log('data now: ',data)
  
  function onDownloadProgress(progressEvent) {
    // const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    // setProgress(percentCompleted);
  }

  const fetchData = useCallback(async (req) => {
    if(!q && !test) return {return: false};
    let obj = req || clone(JSON.parse(decrypt(q))) || {};

    obj['originDestinations']?.map(obj => {
      obj.departure.date = moment(obj.date).format('YYYY-MM-DD');
      obj.from = obj.from?.iata || obj?.from
      obj.to = obj.to?.iata || obj?.to
      
      return true
    })

    let path = parseInt(qIndex || 0)
    if(path) {

      let prevOffer = bookingData?.offer?.at(0);
      if(prevOffer) {
        obj['supplier'] = [prevOffer.supplier];
        obj['flightFilters'] = {
          ...(obj.flightFilters || {}),
          allowedCarriers: [prevOffer?.directions?.at(0)?.at(0)?.airline?.marketing]
        }
      }

    //   console.log(' -------------- ',searchPath)
    //   obj.destinations = searchPath[path];
    //   obj.originDestinations = searchObj?.destinations.slice(path,path+1).map((obj) => {
    //     return {
    //       from: obj.departureLocation,
    //       to: obj.arrivalLocation,
    //       departure: {date: moment(obj.date).format('YYYY-MM-DD')},
    //     }
    //   });
    } else {
      obj['supplier'] = offerSearchTemp.supplier;
      obj['flightFilters'] = {
        ...(obj.flightFilters || {})
      }
    }

    // let userId = null;
    // if(bookingData.as)
    //   userId = bookingData.as.id;
    const newRes = await getFlightOffers(obj,null,onDownloadProgress);
    if(newRes.return) {
      let data = newRes?.data?.data?.map(obj => convertFlightObject(obj))
      return {return: 1,msg: 'Successfull',data,cat: createFlightCat(data)}
    } else return newRes;
    
    // const oldObj = convertFlightObject(newFlightObj)
    // console.log(oldObj)
    
    // if(test) {
    //   const {success,data,...cat} = offerResponseSample;
    //   console.log('searching: ',obj)
    //   await new Promise(resolve => setTimeout(resolve,3000))
    //   return {return: 1,msg: "Successfull",data,cat};
    // }
    
    // return {return: 1,data: [{},{}],msg: 'success'}
    //eslint-disable-next-line
  },[q,qIndex,bookingData])


  const handleSetCat = useCallback((cat) => {
    if(q || test)
      setCat(cat)
  },[q])

  useEffect(() => {
    let t = null;

    load();
    searchCalendars();

    return () => clearTimeout(t);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch,handleSetCat,q])

  
  async function load() {
    setLoading(true);
    // let obj = JSON.parse(decrypt(q));
    // const res = await getFlightOffers(obj);
    dispatch(setBookingData({...bookingData,time: null}))
    
    let {offer} = bookingData;
    
    const res = await fetchData();

    dispatch(setBookingData({offer: parseInt(qIndex)?offer:[],time: new Date().getTime()}))

    setLoading(false);

    if(res.return) {

      setOrgiData(res.data)
      fetchedData.current = res.data;
      // console.log(res.cat)
      if(res.cat)
        handleSetCat(clone(res.cat))

      
      // callDates(res);
      
    }
    if(res?.error) {
      setResMsg({msg: res?.msg,sub: res?.error});
    }
    setData(res.data || [])
    // console.log(res);
  }  

  async function searchCalendars() {
    let req = JSON.parse(decrypt(q));

    const res = {return: 0,data: [],msg: 'Error'}
    // const res = await getCalendarSearch(req);
    if(res.return) {
      let data = res.data;
      let obj = data.itineraries || [];
      if(!Array.isArray(obj))
        obj = Object.values(data.itineraries)
      // if(Array.isArray(obj[0]))
      //     obj = obj[0]

     

      let calendar = obj.map((item,i) => {
        let itierary = item;
        if(Array.isArray(item))
          itierary = item[0]
        else if(itierary.segments);
        else itierary = Object.values(item)[0]
            // itierary = Object.values(item)
        
        let date;
        if(Array.isArray(itierary?.segments))
            date = itierary?.segments[0]?.departureDate

        let reqObj = clone(req);
        let newDate = moment(date).format("YYYY-MM-DD");
        reqObj.destinations[0].date = newDate
    
        
        return {date,req:reqObj,data: {totalAmount: itierary?.totalAmount},active: i === 3}
      })


      // console.log(" --------- ")
      // console.log(calendar)
      setFlightDate(calendar)
    }
  }



  // function search(reqObj) {
  //   if(reqObj) {
  //     let enc = encrypt(JSON.stringify(reqObj));
  //     navigate(`/search/flight/offers?q=${enc}`);
  //   }
  // }

  function sortByCat(arr) {
    let temp = clone(fetchedData.current);
    try {
      let sortedData = [];
      arr.map(i => {
        sortedData.push(temp[i])
        return true;
      })


      setData(sortedData);
    } catch(ex) {}
  }

  function filterSort(val) {
    setSortBy(val)

    try {
      let temp = clone(fetchedData.current);
      let sortedData = temp

      const getArrivalTime = (obj) => {
        return moment(`${obj.arrivalDate} ${obj.arrivalTime}`,'YYYY-MM-DD HH:mm').toDate().getTime()
      }
      const getDepartureTime = (obj) => {
        return moment(`${obj.departureDate} ${obj.departureTime}`,'YYYY-MM-DD HH:mm').toDate().getTime()
      }

      if(val === 'price') {
        sortedData = temp.sort((a,b) => a?.totalAmount < b?.totalAmount)
      } else if(val === 'inbound')
        sortedData = temp.sort((a,b) => getArrivalTime(a?.segments?.at(0)) - getArrivalTime(b?.segments?.at(0)))
      else if(val === 'outbound')
        sortedData = temp.sort((a,b) => getDepartureTime(a?.segments?.at(0)) - getDepartureTime(b?.segments?.at(0)))

      setData(sortedData);
    } catch(ex) {}
  }



  async function showDetail(obj) {
    console.log(obj)
    // if(obj)
    //   setCurDetail(obj)

    // dispatch(setBookingData({...bookingData,offer: null,orderData: null,beforePrice: obj}))

    // // let userId = null;
    // // if(bookingData.as)
    // //   userId = bookingData.as.id;

    // // const res = {return: 1,msg: 'success',data: obj};
    // const res = await getFlightOfferPrice({offer: obj});
    // if(res.return) {
    //   // console.log(' ---- ',res.data)
    //   dispatch(setBookingData({...bookingData,offer: res.data,beforePrice: obj}))

    //   setCurDetail(res.data)
    // }
  }

  function handleOfferSelect(obj) {

    let offer = clone(bookingData.offer) || []
    if(!Array.isArray(offer))
      offer = [offer];

    // if(obj.fareDetailsBySegment)
    //   offer[offer.length-1] = obj;
    // else
      offer.push(obj)
    
    dispatch(setBookingData({...bookingData,offer,orderData: null,beforePrice: obj}))

    if(searchPath.length < searchObj?.destinations.length) {
      const currentPath = location.pathname;
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('path', searchPath.length);
      const newPath = `${currentPath}?${searchParams.toString()}`;
      
      navigate(newPath)

      // setSearchPath([...searchPath,searchObj?.destinations[searchPath.length]])
    } else if(searchPath.length === searchObj?.destinations.length) {
      navigate(`/order/new/flight/book/${q}`);
    }
  }


  function getCatInfo(ind) {
    // if(!ind) return false;
    try {
      let amount = fetchedData.current[ind].totalAmount;
      // amount = (amount.replace(",",""))
      amount = formatMoney(amount)
      let time = fetchedData.current[ind].segments[0]?.departureTime;
      let duration = fetchedData.current[ind].segments[0]?.duration;
      // time = [0,0]
      // time = time?.split(":")
      // let h = parseInt(time[0]);
      // let m = parseInt(time[1]);
      // time = h+"h ";
      // if(m) time += m+'m'
      
      return {amount,time,duration};
    } catch(ex) {
      // console.log(ex)
      return "";
    }
  }

  function handleSearchRoute(i) {
    // let temp = clone(searchObj);
    // temp['destinations'] = [searchPath[i]];
    if(i > 0 && !bookingData?.offers?.at(i-1))
      return false;

    navigate('?q='+q+'&path='+i)
  }

  const departDate = searchObj?.destinations[0]?.date || 0;
  const arrivalDate = searchObj?.destinations[1]?.date || 0;
  const passengersCount = Object.values(searchObj?.passengers || {})?.reduce((p,c) => Number(p)+Number(c),0);


  // classify with airline and price
  let modData = [];

  modData = rearrageFlight(data);

  return (
    <div className='w-full flex flex-col gap-2 py-4 flex-1'>
      <PriceTimeout />
      
      <div className='flex gap-10 justify-between pd-md py-5'>
        <div className='flex gap-4 justify-between'>
          <div className='flex gap-2 uppercase'>
            <h6>{searchObj?.destinations[0]?.departureLocation}</h6>
            <Icon icon='ri:plane-fill' className='rotate-90 p-1' />
            <h6>{searchObj?.destinations[0]?.arrivalLocation}</h6>
          </div>
          <div>
            {moment(departDate).format('DD MMM')} - {' '}
            {arrivalDate ? moment(arrivalDate).format('DD MMM')+ ' - ' : ' '}
            {passengersCount} passenger{passengersCount>1?'s':''}
          </div>
        </div>
        <div>
          <Button1 className='self-start !w-auto ' size='small' onClick={() => setOpenSearch(true)}>Edit Search</Button1>
        </div>
      </div>
      

      <div className='flex gap-4 flex-1'>
        {!hide || !hide?.includes('filter') ? 
        
          //  Filter  Part 

          <div className='hidden md:block self-end sticky bottom-0 rounded-2xl max-w-[300px] z-[90]'>
            <PriceAlert />
            <FlightOfferFilter cats={cat} orgi={orgiData} data={data} setData={setData} />
          </div>
        :null}


        {/* Offers List */}

        <div className='flex-1 flex flex-col gap-2 py-5 px-4 md:px-0 overflow-hidden sticky bottom-0 self-end min-h-screen z-[98]'>
           {!hide || !hide?.includes('breadcrumb') ? 
              <div className='px-10 py-2 max-w-full'>
                <BreadCrumb>
                  <Link to={'/order'}>Orders</Link>
                  {/* <Link to='/order/new/flight'>New order</Link> */}
                  {searchObj?.destinations.map((obj,i) => {
                    let label = 'Choose departing flight';
                    if(i === searchObj?.destinations?.length-1 && i > 0)
                      label = 'Choose return flight'
                    if(i === searchPath.length-1)
                      return (
                        <b>{label} ({obj?.departureLocation} to {obj?.arrivalLocation})</b>
                      )
                    if(!bookingData?.offers?.at(i-1) && i > 0)
                        return (
                          <p>{label} ({obj?.departureLocation} to {obj?.arrivalLocation})</p>
                        )

                    return (
                      <div onClick={() => handleSearchRoute(i)} className='cursor-pointer'>
                        {label} ({obj.departureLocation} to {obj.arrivalLocation})
                      </div>
                    )
                  })}
                  <p>Review your trip</p>
                  <p>Make Payment</p>
                  {/* <b>{searchObj?.destinations[0]?.departureLocation} to {searchObj?.destinations[0]?.arrivalLocation}</b> */}
                </BreadCrumb>
              </div>
            :null}

            {!hide || !hide?.includes('sort') ? 
              <div className='hidden md:flex justify-center  max-w-full gap-6'>
                <FlightOfferSort {...{cat,getCatInfo,sortByCat}} />
                <div className='flex flex-col gap-1 border border-primary/20 p-1 px-3 rounded-md'>
                  <p className='text-[13px]'>Sort by</p>
                  <SelectInput elem='select' label='' className='bg-transparent'
                    value={sortby} onChange={(ev) => filterSort(ev.target.value)}
                  >
                    <option value={'price'}>Price</option>
                    <option value={'inbound'}>In-bound</option>
                    <option value={'outbound'}>Out-bound</option>
                  </SelectInput>
                </div>
              </div>
            :null}
          {
            loading ?
              <div className='py-6 flex flex-col items-center justify-center gap-1'>
                {/* <div>Please wait, we are searching.</div> */}
                <LoadingBar duration={8} />
              </div>
              // <h5 className='bg-secondary p-5 rounded-md flex items-center justify-center text-primary/30 '>{progress}% Loading...</h5>
            : data?.length < 1 ?
              <div className='bg-secondary p-5 rounded-md flex items-center justify-center flex-col gap-2'>
                <h5 className=' text-primary/30 uppercase'>{resMsg?.msg || resMsg}</h5>
                <p>{resMsg?.sub || 'Please search for another flight.'} <button className='text-blue-600' onClick={() => load()}>Refresh</button></p>
              </div>
            : !data ? <div className='flex flex-col items-center justify-center capitalize'>
                <h5 className='bg-secondaryx p-5 rounded-md flex text-center items-center justify-center text-primary/30 uppercase'>Sorry something went wrong from our end! Please try again.</h5>
                <p>If this error persists please contact our support team.</p>
              </div>
            :
              <Paginate className='flex flex-col gap-4 pt-4' data={modData} limit={10} render={(obj,i) => 
                <SortedOffers obj={obj} key={i} params={{qIndex,showDetail,handleOfferSelect}} />
              } />
          }

          {/* <FlightOfferDisplay showDetail={(obj) => setCurDetail(obj)} /> */}
        </div>
        <div className='hidden lg:block self-end sticky bottom-0'>
          <FlightOfferDetail data={data} setData={setData} obj={curDetail} />
        </div>
      </div>


      <div className='flex md:hidden bg-secondary w-full self-end sticky bottom-0 border-t shadow'>
        <div className='bg-primary/10 flex-1 p-5 flex justify-center items-center cursor-pointer'
          onClick={() => setOpenSort(true)}
        >
          <span className='flex gap-2'>
            <Icon icon='iconoir:sort' />
            Sort
          </span>
        </div>
        <div className='w-[50%] flex flex-col items-center justify-center cursor-pointer' 
          onClick={() => setOpenSearch(true)}
        >
          <div className='flex gap-4'>
            <span>{searchObj?.destinations[0]?.departureLocation}</span>
            <span><Icon icon='el:plane' className='text-theme1 py-[2px]' /></span>
            <span>{searchObj?.destinations[0]?.arrivalLocation}</span>
          </div>
          Change
        </div>
        <div className='flex flex-col items-center justify-center bg-primary/10 flex-1 p-5 cursor-pointer' 
          onClick={() => setOpenFilter(true)}
        >
          <span className='flex gap-2'>
            <Icon icon='icon-park:setting-config' />
            Filter
          </span>
        </div>
      </div>



      <SwipeableDrawer anchor='right' open={openFilter} onClose={() => setOpenFilter(false)} >
        <div className='max-h-screen'>
          <FlightOfferFilter cats={cat} orgi={fetchedData.current} data={data} setData={setData} />
        </div>
      </SwipeableDrawer>

      <div className='block lg:hidden absolute'>
        <Modal1 open={curDetail} setOpen={() => setCurDetail()} >
          <div className='max-h-screen'>
            <FlightOfferDetail data={data} setData={setData} obj={curDetail} />
          </div>
        </Modal1>
      </div>
      <Modal1 open={openSort} setOpen={setOpenSort}>
        <FlightOfferSort {...{cat,getCatInfo,sortByCat}} />
      </Modal1>
      <Modal1 open={openSearch} setOpen={setOpenSearch}>
        <CreateFlightOrder data={searchObj} returnData={(searchObj) => {
          setOpenSearch(false);
        }} />
      </Modal1>

    </div>
  )
}

export const SortedOffers = ({obj,offer,params:{qIndex,showDetail,handleOfferSelect,...restParams}}) => {
  const [view,setView] = useState(false);

  return (
  <div className='px-4'>
    <FlightOfferDisplay path={qIndex} offer={offer} data={obj?.objects[0]} showDetail={async () => await showDetail(obj)} select={handleOfferSelect} />
    {obj.objects.length > 1 ? (
      <div className={'flex flex-col gap-4 relative  '+(view?'bg-[#F3F7FF] ':'')}>
        <div className={'absolute -translate-y-[12px] p-2 w-full -z-10 '+(view?'bg-[#f3f7ff]':'')}></div>
        <div className='relative flex flex-col gap-2 mb-4'>
          <button className={'text-sm text-theme1 font-bold self-center shadow-inner border border-b-0 absolute bottom-0 max-h-[1.3rem] rounded-t-lg  pt-2 w-[50%] '+(view?'bg-[#F3F7FF]':'bg-secondary')} 
            onClick={() => setView(!view)}>
              <div className={'px-4 pb-2 rounded-lg '+(view?'bg-[#F3F7FF]':'bg-secondary')}>
                {view ? `Hide flights` : `${obj.objects.length-1} more flight options available at this price`}
              </div>
          </button>
        </div>
        {view ? 
          <div className='flex flex-col gap-4 p-3'>
            {
              obj.objects.slice(1).map((obj,i) => (
                <FlightOfferDisplay key={i} path={qIndex} offer={offer} data={obj} showDetail={async () => showDetail && await showDetail(obj)} select={handleOfferSelect} {...restParams} />
              ))
            }
          </div>
        :null}
      </div>
    ):null}
  </div>
  )
}

export function rearrageFlight(array) {
  const airlinesMatch = (cur,prev) => {
    try {
      let curAirlines = [...new Set(cur?.segments?.map(obj => obj.flights).flat().map(obj => obj.marketingCarrier))]
      let prevAirlines = [...new Set(prev?.segments?.map(obj => obj.flights).flat().map(obj => obj.marketingCarrier))]
      if(curAirlines.length === prevAirlines.length)
        if(curAirlines.every(val => prevAirlines.includes(val)))
          return true;
    } catch(ex) {}

    return false;
  }
  const result = array?.reduce((acc,cur,ind) => {
    if(ind > 0 && (cur.totalAmount === array[ind - 1].totalAmount &&
                   airlinesMatch(cur,array[ind - 1]))) {
      const prev = acc?.at(-1);
      prev.objects.push(cur);
    }
    else 
      acc.push({airline: '',price: '',objects: [cur]})

    return acc
  },[])

  return result;
}



function FlightOfferSort({cat,getCatInfo,sortByCat}) {
  const [value,setValue] = useState();

  return (
    <Tabs indicatorColor='inherit' textColor='inherit' scrollButtons allowScrollButtonsMobile variant='scrollable' className='div_mid'
      value={value}
      onChange={(ev,val) => setValue(val)}
    >
      {
        Object.entries(cat).map(([name,obj],i) => {
          let catInfo = getCatInfo(obj[0])
          return (
            <Tab key={i} className={`p-5 !min-w-[200px] !border border-[#333] ${i===value?' !bg-theme1 !text-secondary':''}`} 
              sx={{textTransform: 'capitalize',border: 1,borderRadius: 2,mr: 2}}
              onClick={() => sortByCat(obj)}
              label={(
                <div className='text-start flex flex-col gap-1'>
                  <mall>{splitCapitals(name)}</mall>
                  <div className='flex gap-1 relative items-center'>
                    <span>{catInfo.amount}</span>
                    <div className='-translate-y-[1px] px-1 '>{catInfo.time ? '|' : ''}</div>
                    <div>{(['quickest'].includes(name.toLowerCase())) ? catInfo.duration : catInfo.time}</div>
                  </div>
                </div>
              )}
            />
          )})
      }
    </Tabs>

  )
}