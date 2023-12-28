import { Cancel, Flight, Group, Luggage } from '@mui/icons-material'
import { Box, Button, MenuItem, Popover, TextField } from '@mui/material'
// import { DatePicker } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
// import moment from 'moment/moment';
import { offerSearchTemp } from '../../data/flight/offerSearchData';
import moment from 'moment/moment';
import { decrypt, encrypt } from '../../features/utils/crypto';
import { clone } from '../../features/utils/objClone';
import { useDispatch, useSelector } from 'react-redux';
import { setBookingData } from '../../redux/reducers/flight/flightBookingSlice';
import TravelPassengers from '../flight/filters/TravelPassengers';
import IataInput from '../form/IataInput';
import AirlinesInput from '../form/AirlinesInput';
import { def } from '../../config';
import { FLIGHT_TYPES } from '../../data/ENUM/FlightTypes';


// const {RangePicker} = DatePicker;

export default function FlightSearchInput({cur,gotQ,newWindow}) {
  const [type,setType] = useState(cur || 1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {bookingData} = useSelector(state => state.flightBooking);
  const [passengers,setPassengers] = useState(offerSearchTemp.passengers);
  const [flightType,setFlightType] = useState('INTERNATIONAL');
  const [searchParam] = useSearchParams();
  const q = useMemo(() => searchParam.get('q'),[searchParam]);
  const [qObj,setQObj] = useState();

  const [noStops,setNoStops] = useState(qObj && qObj.noAirportChange)
  const [airline,setAirline] = useState();

  const [travelClass,setTravelClass] = useState((qObj && qObj.travelClass) || 'All');

  const [corporateUniFares,setCorporateUniFares] = useState("");

  // const [data,setData] = useState(offerSearchTemp);
  // console.log('rendering SearchINputs: ',qObj)
  // console.log('TC: ',travelClass)
  const handleSetPassengers = useCallback((newPassengers) => {
    setPassengers(newPassengers);
  }, []);

  useEffect(() => {
    if(q) {
      let obj = JSON.parse(decrypt(q));
      setQObj(obj)
      setNoStops(obj && obj.noAirportChange)
      setTravelClass((obj && obj.travelClass) || 'All')
    }
  },[q])

  function handleSearch(ev,dataInp) {
    ev.preventDefault();

    let searchObj = dataInp;
    searchObj['passengers'] = passengers;
    searchObj['travelClass'] = travelClass;
    if(flightType !== 'Any') 
      searchObj['flightType'] = flightType;
    searchObj['requestedFlightTypes'] = noStops ? ['N'] : null;
    searchObj['airlineOptions'] = airline ? {
      "M": [airline]
    }:null
    if(corporateUniFares) {
      searchObj['corporateUniFares'] = corporateUniFares.split(",")
    }
      
    // searchObj['currencyOverride'] = def.currencyCode;
    // console.log("Search Request - ",searchObj);
    // setData(newData);

    let enc = encrypt(JSON.stringify(searchObj));

            // SET TIME ------
    dispatch(setBookingData({...bookingData}))

    // setTimeout(() => {
    //   dispatch(setModal(true))
    //   dispatch(setModalComp(PriceTimeout))
    // },priceTimeout)

    // console.log(" -------------   ")
    // console.log(" -------------   ")
    // console.log('here: ',searchObj)
    // console.log(" -------------   ")
    // console.log(" -------------   ")
    let referralCode = searchParam.get('refCode');


    if(newWindow)
      window.open(`/search/flight/offers?referralCode=${referralCode}&q=${enc}`);
    else
      navigate(`/search/flight/offers?referralCode=${referralCode}&q=${enc}`);

  }

  return (
    <div className='py-5 flex flex-col gap-4'>
      <div className='flex flex-wrap-reverse items-center gap-4'>
        <div className='flex tabs flex-1'>
          <button onClick={() => setType(1)} className={type === 1 ? 'active' : ''}>One-Way</button>
          <button onClick={() => setType(2)} className={type === 2 ? 'active' : ''}>Round trip</button>
          <button onClick={() => setType(3)} className={type === 3 ? 'active' : ''}>Multi Destination</button>
        </div>

        <div className='flex gap-4 flex-1'>
          <TextField value={travelClass} onChange={(ev) => setTravelClass(ev.target.value)} className='min-w-[100px]'
            select label="Travel Class" size='small'>
            <MenuItem value='All'>All</MenuItem>
            <MenuItem value='ECONOMY'>Economy</MenuItem>
            <MenuItem value="PREMIUM">Premium Economy</MenuItem>
            <MenuItem value="BUSINESS">Business</MenuItem>
            <MenuItem value="FIRST_SUPERSONIC">First Class</MenuItem>
          </TextField>
          <TravelInfo q={qObj} returnPassenger={handleSetPassengers} />
        </div>

        <AirlinesInput val={airline} returnData={(val) => setAirline(val ? val.id : null)} label='Prefered Airline' size='small' />
      </div>
      {
        (type === 1) ?
          <OneWayInput handleSearch={handleSearch} q={qObj} />
        :
        (type === 2) ? 
          <RoundTripInput handleSearch={handleSearch} q={qObj} />
        :
        (type === 3) ? 
          <MultiRouteInput handleSearch={handleSearch} q={qObj} />
        : null
      }
        <div className='flex gap-6 pb-3'>
          <label className='flex gap-2 items-center cursor-pointer'>
            <input type='checkbox' defaultChecked={noStops} onChange={(ev) => setNoStops(ev.target.checked)} />
            No stops
          </label>
          <TextField select size='small' value={flightType} onChange={(ev) => setFlightType(ev.target.value)} label='Flight Type'>
            <MenuItem value={'Any'} className='capitalize'>Any</MenuItem>
            {FLIGHT_TYPES.map((val,i) => (
              <MenuItem value={val} key={i} className='capitalize'>{val.toLowerCase()}</MenuItem>
            ))}
          </TextField>
          <TextField label='' size='small' value={corporateUniFares} onChange={(ev) => setCorporateUniFares(ev.target.value)} />
        </div>

    </div>
  )
}

function TravelInfo({returnPassenger,returnBags,q}) {
  const [luggage,setLuggage] = useState();
  const [passenger,setPassenger] = useState() ;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const getPassenger = useMemo(() => {
    return q && Object.entries(q.passengers).map(([key,value]) => ({name: key,value}))
  },[q])

  useEffect(() => {
    setPassenger(getPassenger)
  },[getPassenger])

  // console.log('q be like: ',q)
  // console.log('passenger be like: ',passenger)
  // console.log('luggage be like: ',luggage)

  const handleReturnPassenger = useCallback((passenger) => {
    if(returnPassenger)
      returnPassenger(passenger.map((data) => (data.value >  0 && {[data.name]: data.value})).reduce((prev,cur) => ({...prev,...cur})));
  },[returnPassenger])

  useEffect(() => {
    if(Array.isArray(passenger))
      handleReturnPassenger(passenger)
  },[passenger,handleReturnPassenger])


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const id = open ? 'TravelInfo': undefined;

  return (
    <div>
    <Button
        aria-describedby={id}
        onClick={handleClick}
      >
      <div className='flex gap-2 self-start text-gray-700 cursor-pointer relative'>
        <div className='flex gap-1 items-center font-mono'>
          <Group />
          {passenger ? passenger.map(obj => obj.value).reduce((prev,cur) => parseInt(prev)+parseInt(cur),0) : 1}
        </div>
        <div className='flex gap-1 items-center font-mono'>
          <Luggage />
          {luggage ? luggage.map(obj => obj.value).reduce((prev,cur) => prev+cur,0) : 0}
        </div>
      </div>
    </Button>
    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        // TransitionComponent={Fade}
      >
        <Box className='flex flex-col gap-5 p-4 px-6 min-w-[300px]'>
          <TravelPassengers returnData={(objs) => setPassenger(objs)} q={q && q.passengers} />
          {/* <TravelLuggage returnData={(objs) => setLuggage(objs)} /> */}
        </Box>
    </Popover>

    </div>
  )
}

function Loc({returnData,value}) {
  const [data,setData] = useState((value) || {departureLocation: "",arrivalLocation: ""});

  useEffect(() => {
    if(value)
      setData(value)
  },[value])

  function handleChange(val) {
    setData(val)
    if(returnData)
      returnData(val);
  }
  return (
    <div className='flex gap-2 flex-1 justify-stretch relative'>
      <IataInput className='flex-1 ' label="From" val={data.departureLocation} returnData={(val) => handleChange({...data,departureLocation: val.iata || val})}
        icon={<Flight />}
      />
      <IataInput className='flex-1' label="To" val={data.arrivalLocation} returnData={(val) => handleChange({...data,arrivalLocation: val.iata || val})} 
        icon={<Flight className='rotate-180' />}
      />
    </div>
  )
}
// function Persons({returnData}) {
//   const [data,setData] = useState((offerSearchTemp.passengers))

//   function handleChange(ev) {
//     console.log("p",data);
//     console.log("p",{...data,adults: ev.target.value});
//     setData({...data,adults: ev.target.value});
//     returnData({...data,adults: ev.target.value});
//   }
//   return (
//     <div>
//       <TextField select value={data.adults} label="How many persons" size='small' name='person'
//         onChange={handleChange}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position='start'>
//               <Avatar className='w-5 h-5 text-black' />
//             </InputAdornment>
//           )
//         }}
//       >
//         <MenuItem value={1}>1 Person</MenuItem>
//         <MenuItem value={2}>2 Person</MenuItem>
//       </TextField>
//     </div>
//   )
// }

function OneWayInput({handleSearch,q}) {
  const [data,setData] = useState(q || offerSearchTemp);

  useEffect(() => {
    if(q)
      setData(q)
  },[q])

  function setDate(ev) {
    let temp = clone(data);
    temp.destinations[0].date = ev.target.value;
    setData(temp);
  }
  function setLoc(val) {
    let temp = clone(data);
    temp.destinations[0] = {...temp.destinations[0],...val};
    setData(temp);
  } 
  return (
    <form onSubmit={(ev) => handleSearch(ev,data)} className='flex gap-2 '>

      <Loc returnData={setLoc} value={data.destinations[0]} />
      <TextField type='date' label='Depart' size='small' name='date' className='flex-1'
        value={data.destinations[0].date}
        onChange={setDate}
        InputLabelProps={{
          shrink: true,
        }}/>
      {/* <Persons returnData={(val) => setData({...data,passengers: val})} /> */}
      <button className='btn2 !rounded-sm'>Search</button>

    </form>

  )
}

// function getRoundDates(destinations) {
//   let dates = [null,null]
//   try {
//     destinations.map((d,i) => (dates[i] = moment(d.date)))
//   } catch(err) {

//   }
//   return dates;
// }

function RoundTripInput({handleSearch,q}) {
  const [data,setData] = useState(q || offerSearchTemp)

  // useEffect(() => {
  //   if(q)
  //     setData(q)
  // },[q])
  // useEffect(() => {
  //   console.log(' --- round trip date range')
  //   console.log(getRoundDates())
  //   // console.log(data.destinations.map(d =>  (moment(d.date).isValid() ? moment(d.date) : "")))
  // },[data])

  // const roundDates = [moment("2023-6-16"),moment()]
  // const roundDates = useMemo(() => getRoundDates(data.destinations),[data.destinations])

  let date = data.destinations.map(d =>  (moment(d.date).isValid() ? moment(d.date) : null));
  // for(let i=2;i>date.length;i--) {
  //   date.push('')
  // }

  function handleChange(dates) {
    if(!Array.isArray(dates))
      return false;
    
    
    let temp = clone(data);
    temp.destinations[0].date = moment(dates[0].$d).format("YYYY-MM-DD");

    if(!dates[1]) dates[1] = "";
    
    temp.destinations[1] = {
      "departureLocation": data.destinations[0].arrivalLocation,
      "arrivalLocation": data.destinations[0].departureLocation,
      "date": moment(dates[1].$d).format("YYYY-MM-DD")
    };

    setData(temp);
  }
  function setLoc(val) {
    let temp = clone(data);
    temp.destinations[0] = {...temp.destinations[0],...val};
    setData(temp);
  } 
  return (
    
    <form onSubmit={(ev) => handleSearch(ev,data)} className='flex justify-stretch gap-2'>
      <Loc returnData={setLoc} value={data.destinations[0]} />
      {/* <RangePicker placeholder={["Departure Date","Return Date"]} 
        // value={[moment('2023-06-16'),moment('2023-06-30')]}
        onChange={handleChange}
        /> */}
        {/* // value={data.destinations.map(d =>  (moment(d.date).isValid() ? moment(d.date) : ""))} */}
      {/* <Persons returnData={(val) => setData({...data,passengers: val})} /> */}
      <button className='btn2 !rounded-sm '>Search</button>
    </form>

  )
}

function MultiRouteInput({handleSearch,q}) {
  let fill = [clone(offerSearchTemp),clone(offerSearchTemp)];
  
  if(q) fill = q.destinations.map((d) => ({destinations: [d]}));
  
  const [data,setData] = useState(fill)

  useEffect(() => {
    if(q) {
      let fill = q.destinations.map((d) => ({destinations: [d]}));
      setData(fill)
    }
  },[q])


  function setDate(ev,i) {
    let temp = clone(data);
    temp[i].destinations[0].date = ev.target.value;
    setData(temp);
  }

  function setLoc(val,i) {
    let temp = clone(data);
    // console.log("check",temp);
    
    temp[i].destinations[0] = {...temp[i].destinations[0],...val};
    setData(temp);
  } 

  // function setPerson(val,i) {
  //   let temp = data;
  //   temp[i].passengers = val;
  //   setData(temp)
  // }

  function joinSearch(ev) {
    let build = clone(offerSearchTemp);
    build.destinations = data.map((obj) => obj.destinations[0])
    handleSearch(ev,build)
  }

  return (
    <form onSubmit={joinSearch} className='flex gap-2'>
      <div className='flex flex-col gap-2'>
      {
        data.map((d,i) => { return (
          <div key={i} className='flex justify-stretch gap-2'>
            <Loc returnData={(val) => setLoc(val,i)} value={d.destinations[0]} />
            <TextField type='date' label='Depart' size='small'
              value={d.destinations[0].date}
              onChange={(ev) => setDate(ev,i)}
              InputLabelProps={{
                shrink: true,
              }}/>
            {/* <Persons returnData={(val,i) => setPerson(val,i)} /> */}
            {
              i>=2 ? (
                <Cancel onClick={() => setData(data => data.filter((d,k) => i !== k))} />
              ) : null
            }
            </div>
        )})
      }
      </div>
      <div className='flex flex-col gap-2'>
        <button className='btn2 !rounded-sm' onClick={(ev) => {ev.preventDefault();setData(data => [...data,clone(offerSearchTemp)])}}>Add</button>
        <button className='btn2 !rounded-sm'>Search</button>
      </div>
    </form>

  )
}