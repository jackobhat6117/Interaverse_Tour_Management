import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BreadCrumb from '../../../components/DIsplay/Nav/BreadCrumb'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Box, MenuItem, Popover, RadioGroup } from '@mui/material'
import RadioInput from '../../../components/form/RadioInput'
import CountriesInput from '../../../components/form/CountriesInput'
import CalendarInput1 from '../../../components/form/CalendarInput1'
import SelectInput from '../../../components/form/SelectInput'
import Button1 from '../../../components/form/Button1'
import { Add, Group } from '@mui/icons-material'
import FilterTravelPassengers from '../../../components/form/Filters/TravelPassengers'
import { decrypt, encrypt } from '../../../features/utils/crypto'
import { useDispatch, useSelector } from 'react-redux'
import { setBookingData } from '../../../redux/reducers/flight/flightBookingSlice'
import { offerSearchTemp } from '../../../data/flight/offerSearchData'
import { clone } from '../../../features/utils/objClone'
import Icon from '../../../components/HOC/Icon'
import moment from 'moment'
import TextInput from '../../../components/form/TextInput'
import CitiesInput from '../../../components/form/CitiesInput'
import { useSnackbar } from 'notistack'
import AirlinesInput from '../../../components/form/AirlinesInput'

export default function CreateFlightOrder({callback,data,returnData,defaultData,config}) {
  const [travelClass,setTravelClass] = useState('Economy');
  const [type,setType] = useState('return');
  const {bookingData} = useSelector(state => state.flightBooking);
  const [passengers,setPassengers] = useState(offerSearchTemp.passengers);
  const [flightType] = useState('INTERNATIONAL');
  const [corporateUniFares] = useState("");
  const [date,setDate] = useState([""]);
  const [destination,setDestination] = useState(offerSearchTemp.originDestinations);
  const [airline,setAirline] = useState();
  const [markup,setMarkup] = useState({value: '',type: ''});

  const {enqueueSnackbar} = useSnackbar();
  const [showAdvanced,setShowAdvanced] = useState(false);

  const [searchParam] = useSearchParams();
  const q = useMemo(() => searchParam.get('q'),[searchParam]);
  const [qObj,setQObj] = useState();

  const [noStops,setNoStops] = useState(qObj && qObj.noAirportChange)

  const [lockupd,setLocUpd] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(q || data) {
      let obj = JSON.parse(decrypt(q)) || data;
      setQObj(obj)
      setDate(obj.originDestinations?.map(obj => obj.date))
      setDestination(obj.originDestinations);
      setNoStops(obj && obj.noAirportChange)
      setTravelClass((obj && obj.travelClass) || 'All')

      let type = 'oneway'
      if(obj.originDestinations?.length) {
        if(obj.originDestinations?.at(0)?.from?.iata === obj?.originDestinations?.at(-1)?.to?.iata && obj?.originDestinations?.length === 2)
          type = 'return'
        else if(obj.originDestinations.length >= 2)
          type = 'multiple'
      }
      setType(type)
    }
  },[q,data])

  useEffect(() => {
    if(type !== 'oneway') {
      if(destination.length < 2) {
        let tempDestination = clone(destination);

        let reversed = clone(tempDestination[0]);
        reversed.to = reversed.from;
        reversed.from = tempDestination[0]?.to
        tempDestination.push(reversed);

        setDestination(tempDestination);
      }
      if(date.length < 2)
        setDate([...date,""])
    } else if(date.length > 1)
      setDate([...date]?.slice(0,1))
    //eslint-disable-next-line
  },[type])


  const handleSetPassengers = useCallback((newPassengers) => {
    setPassengers(newPassengers);
  }, []);


  function handleSearch(ev) {
    ev?.preventDefault();

    console.log(date)
    const accurateDates = date?.reduce((acc, curr) => moment(curr).isSameOrAfter(moment(acc)) ? curr : false);
    if(!accurateDates && date?.length > 1) return enqueueSnackbar('Invalid date orders!',{variant: 'error'})

    let searchObj = {...offerSearchTemp};
    searchObj['originDestinations'] = clone(destination);
    date.map((d,i) => {
      if(i !== 0 && (!searchObj['originDestinations'][i] || !searchObj['originDestinations'][i]?.from || type === 'return')) {
        let reversed = clone(searchObj['originDestinations'][i-1]);
        reversed.to = reversed.from;
        reversed.from = clone(searchObj['originDestinations'][i-1])?.to;
        searchObj['originDestinations'][i] = reversed;
      }
      searchObj['originDestinations'][i]['date'] = d;
      return true;
    })
    // searchObj['originDestinations'].map((obj,i) => obj.date = date[i]);

    if(type === 'oneway')
      searchObj['originDestinations'] = searchObj['originDestinations'].slice(0,1);
    else if(type === 'return')
      searchObj['originDestinations'] = searchObj['originDestinations'].slice(0,2);

    searchObj['passengers'] = passengers;
    searchObj['travelClass'] = travelClass;
    searchObj['cabinClass'] = [travelClass];
    if(travelClass === 'All')
      searchObj['cabinClass'] = ['Economy','Business','PremiumEconomy','FirstClass']

    if(flightType !== 'Any') 
      searchObj['flightType'] = flightType;
    searchObj['requestedFlightTypes'] = noStops ? ['N'] : null;
    // searchObj['airlineOptions'] = airline ? {
    //   "M": [airline]
    // }:null
    try {
      if(airline)
        searchObj['flightFilters'] = {
          allowedCarriers: [airline]
        } 
      if(corporateUniFares) {
        searchObj['corporateUniFares'] = corporateUniFares.split(",")
      }
    } catch(ex) {console.log(ex)}

    try {
      if(markup.value) {
        searchObj['adjustment'] = {
          type: 'Markup',
          method: markup.type,
          adjustment: Number(markup.value)
        }
      }
    } catch(ex) {}

    // Backward Compatability
    searchObj['originDestinations']?.map(obj => {
      obj.departure.date = moment(obj.date).format('YYYY-MM-DD');
      // obj.from = obj.from?.iata || obj?.from
      // obj.to = obj.to?.iata || obj?.to
      
      return true
    })
    searchObj['destinations'] = searchObj.originDestinations.map(obj => {
      return {
        departureLocation: obj.from?.iata || obj?.from,
        arrivalLocation: obj.to?.iata || obj?.to,
        date: obj.date
      };
    })

    console.log(searchObj)
    let valid = searchObj['originDestinations']?.map((obj,i) => {
      if(!obj.from || !obj.to || !obj.from?.iata || !obj.to?.iata)
        return false;
      if(obj.from?.iata === obj.to?.iata)
        return false;
      if(!obj.date)
        return false;

      // if(i > 0 && obj.departureLocation === searchObj['destinations'][i-1].departureLocation)

      return true;
    })
    
    if(!callback && valid.some(val => !val)) return enqueueSnackbar('Invalid Request! Please select valid destination and date.',{variant: 'error'})

    
    // searchObj['currencyOverride'] = def.currencyCode;
    // setData(newData);

    // return console.log(searchObj)
    let enc = encrypt(JSON.stringify(searchObj));

            // SET TIME ------
    dispatch(setBookingData({...bookingData,offer: null,time: null}))

    // setTimeout(() => {
    //   dispatch(setModal(true))
    //   dispatch(setModalComp(PriceTimeout))
    // },priceTimeout)

    let referralCode = searchParam.get('refCode');

    if(returnData)
      returnData(searchObj)

    if(callback)
      callback(searchObj);
    else
      navigate(`/order/new/flight/offers?referralCode=${referralCode}&q=${enc}`);

  }

  const calendarRef = useRef([...Array(10)]);

  function handleSetDate(val,i=0) {
    let tempDate = clone(date);
    tempDate[i] = val;
    // if(tempDate?.at(i+1) !== 'undefined')
    //   tempDate[i+1] = val;
    
    setDate(tempDate);

    if(calendarRef.current?.at(i+1)) {
      calendarRef.current[i+1]?.toggle(calendarRef.current[i+1]?.ref?.current);
    }
    calendarRef.current[i]?.toggle();

  } 

  function handleSetDestination(obj,i=0) {
    const tempDestination = clone(destination);
    tempDestination[i] = obj;
    setDestination(tempDestination)
    setLocUpd(false);

  }

  function handleAdd() {
    setDate([...date,""]);
    let lastDestination = clone(destination[destination.length-1]);
    let newDestination = (lastDestination);
    newDestination.from = lastDestination.to;
    newDestination.to = '';
    setLocUpd(true);
    setDestination([...destination,newDestination]);
  }

  function handleRemove(i) {
    setDate(date => date.filter((_, index) => index !== i));
    setLocUpd(true);
    setDestination(dest => dest.filter((_, index) => index !== i));
  }

  function swapLoc(i=0) {
    let tempDestination = clone(destination);
    
    let from = tempDestination[i].from;
    tempDestination[i].from = tempDestination[i].to;
    tempDestination[i].to = from;


    setLocUpd(true);
    setDestination(tempDestination);
  }



  return (
    <div className='self-center flex flex-col gap-5 flex-1 pd-md w-full py-5'>
      {!callback ?
        <BreadCrumb>
          <Link to={'/order'}>Orders</Link>
          <b>New Order</b>
        </BreadCrumb>
      :null}
      <div className='justify-center items-center flex flex-col gap-4'>
        <div className='flex flex-col gap-4 max-w-full'>
          <div>
            {/* <h6>Journey Type</h6> */}
            {!callback ? 
              <RadioGroup value={type} onChange={(ev) => setType(ev.target.value)} >
                <div className='flex gap-4 overflow-x-auto max-w-full'>
                  <RadioInput className='whitespace-nowrap' value={'return'} checked={type === 'return'}>Return</RadioInput>
                  <RadioInput className='whitespace-nowrap' value={'oneway'} checked={type === 'oneway'}>One way</RadioInput>
                  <RadioInput className='whitespace-nowrap' value={'multiple'} checked={type === 'multiple'}>Multi-city</RadioInput>
                </div>
              </RadioGroup>
            :null}
          </div>
          {!config?.hide?.includes('location') ? 
            <div className='flex gap-1 sm:gap-[2px] flex-wrap '>
              <CitiesInput label='Where from?' placeholder='Origin' lockUpdate={lockupd} disabled={defaultData?.from}
                value={destination[0]?.from || ''} className='flex-1'
                onChange={(val) => handleSetDestination({...destination[0],from: val})}
              />
              <div className='relative flex items-center justify-end pr-4 sm:pr-0 sm:justify-center w-full sm:w-auto cursor-pointer'>
                <div className='absolute items-center justify-center flex z-10 rotate-90 sm:rotate-0'>
                  <span className='bg-secondary shadow-lg rounded-full p-1 hover:rotate-180 transition-all' onClick={() => !(defaultData?.from || defaultData?.to) && swapLoc()}>
                    <Icon icon='mdi:exchange' className='!w-5 !h-5' />
                  </span>
                </div>
              </div>
              <CitiesInput label={'Where to?'} placeholder='Destination'  lockUpdate={lockupd} disabled={defaultData?.to}
                value={destination[0]?.to || ''} className='flex-1'
                onChange={(val) => handleSetDestination({...destination[0],to: val})}            
              />
            </div>
          :null}
          <div className='flex justify-stretch gap-4 flex-wrap'>
            <div className='flex-1'>
              <CalendarInput1 ref={(el) => calendarRef.current[0] = el} label='Departure Date' className='w-full border border-primary/20 rounded-md p-2'
                header={<CalendarHeader>{destination[0]?.from?.iata} - {destination[0]?.to?.iata}</CalendarHeader>}
                value={date[0] || ''}
                onChange={(value) => handleSetDate(value?.start || value)}
                config={{validDates: [new Date()]}}
              />
            </div>
            {type === 'return' ? 
              <div className='flex-1'>
                <CalendarInput1 ref={(el) => calendarRef.current[1] = el} label='Return Date' className='w-full border border-primary/20 rounded-md p-2'
                  header={<CalendarHeader>{destination[0]?.to?.iata} - {destination[0]?.from?.iata}</CalendarHeader>}
                  value={date[1] || ''}
                  onChange={(value) => handleSetDate(value?.start || value,1)}
                  defaultMonth={new Date(date[0] || new Date())}
                  config={{validDates: [date[0]||new Date()]}}
                  />
              </div>
            :null}
          </div>
          {type === 'multiple' ? (
            <div className='flex flex-col gap-3'>
              {
              date.slice(1).map((d,i) => (
                <div key={i+1} className='flex gap-4 items-center flex-wrap'>
                  <div className='flex flex-col gap-4 flex-1'>
                    <div className='flex gap-4 flex-wrap'>
                      <CitiesInput label='Where from?' placeholder='Origin' lockUpdate={lockupd} disabled={defaultData?.from}
                        value={destination[i+1]?.from || ''} className={'flex-1'}
                        onChange={(val) => handleSetDestination({...destination[i+1],from: val?.alpha2 || val},i+1)}
                      />
                      <CitiesInput label={'Where to?'} placeholder='Destination'  lockUpdate={lockupd} disabled={defaultData?.to}
                        value={destination[i+1]?.to || ''} className={'flex-1'}
                        onChange={(val) => handleSetDestination({...destination[i+1],to: val?.alpha2 || val},i+1)}         
                      />
                    </div>
                    <CalendarInput1 ref={el => calendarRef.current[i+1] = el} label='Departure Date' className='w-full border border-primary/20 rounded-md p-2'
                      header={<CalendarHeader>{destination[i+1]?.from?.iata} - {destination[i+1]?.to?.iata}</CalendarHeader>}
                      value={d || ''}
                      onChange={(value) => handleSetDate(value?.start || value,i+1)}
                      defaultMonth={new Date(date[i-1]||date[0]) || new Date()}
                      config={{validDates: [date[i-1]||date[0] || new Date()]}}
                    />
                  </div>
                  <div className='-translate-y-2 '>
                    <Icon icon='carbon:close-filled' className='cursor-pointer' onClick={() => handleRemove(i+1)} />
                  </div>
                </div>
              ))
              }
              <Button1 className='!w-auto !self-start gap-2 !bg-primary/40' onClick={handleAdd}>
                <Add  />
                Add another flight</Button1>
            </div>
          ):null}
          <div className={'flex gap-4 flex-wrap '+(callback?'order-first':'')}>
            {!callback ? 
              <div className='flex-1'>
                <TravelInfo q={qObj} returnPassenger={handleSetPassengers} />
              </div>
            :null}
            <div className='flex-1'>
              <SelectInput value={travelClass} onChange={(ev) => setTravelClass(ev.target.value)} className='min-w-[100px]'
              select label="Travel Class" size='small'>
                <MenuItem value='All'>All</MenuItem>
                <MenuItem value='Economy'>Economy</MenuItem>
                <MenuItem value="PremiumEconomy">Premium Economy</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="FirstClass">First Class</MenuItem>
              </SelectInput>
            </div>
          </div>
          {!callback ? 
            <button className='flex justify-end cursor-pointer text-theme1 text-sm'
            onClick={() => setShowAdvanced(prev => !prev)}
            >
              Advanced Options
            </button>
          :null}
          {showAdvanced ? 
            <div className='flex flex-col gap-4 '>
              <div className='text-center'>Markup</div>
              <div className='flex gap-4 flex-wrap'>
                <div className='flex-1'>
                  <TextInput label='Markup Value' 
                    value={markup?.value}
                    onChange={(ev) => setMarkup({...markup,value: ev.target.value})}
                  />
                </div>
                <div className='flex-1'>
                  <TextInput select label='Markup by'
                    value={markup?.type}
                    onChange={(ev) => setMarkup({...markup,type: ev.target.value})}
                  >
                    <MenuItem value='Percentage'>Percent</MenuItem>
                    <MenuItem value='Fixed'>value</MenuItem>
                  </TextInput>
                </div>
              </div>
              <div className='text-center'>Airline</div>
              <div>
                <AirlinesInput label='Preferred Airline' placeholder='Search'
                  // value={airline || ''}
                  returnData={(value) => setAirline(value?.id || value)}
                />
              </div>
            </div>
          :null}
          <Button1 onClick={handleSearch}>Search for flights</Button1>
        </div>
      </div>
    </div>
  )
}

function CalendarHeader(props) {
  return (
    <div className='w-full flex justify-center !h-0 border-theme1 border'>
      {props.children}
    </div>
  )
}


function TravelInfo({returnPassenger,returnBags,q}) {
  // const [luggage] = useState();
  const [passenger,setPassenger] = useState() ;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const getPassenger = useMemo(() => {
    return q && Object.entries(q.passengers).map(([key,value]) => ({name: key,value}))
  },[q])

  useEffect(() => {
    setPassenger(getPassenger)
  },[getPassenger])


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
  const passengerCount = passenger && passenger.map(obj => obj.value).reduce((prev,cur) => parseInt(prev)+parseInt(cur),0);

  return (
    <div>
    <Button1
        className='!border !border-primary/30'
        variant={'outlined'}
        aria-describedby={id}
        onClick={handleClick}
      >
      <div className='flex gap-2 self-start text-gray-700 cursor-pointer relative'>
        <div className='flex gap-1 items-center font-mono'>
          <Group />
          {passenger ? passengerCount : 1}
          <span>
            Passenger{passengerCount > 1 ? 's':''}
          </span>
        </div>
        {/* <div className='flex gap-1 items-center font-mono'>
          <Luggage />
          {luggage ? luggage.map(obj => obj.value).reduce((prev,cur) => prev+cur,0) : 0}
        </div> */}
      </div>
    </Button1>
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
          <FilterTravelPassengers returnData={(objs) => setPassenger(objs)} q={q && q.passengers} />
          {/* <TravelLuggage returnData={(objs) => setLuggage(objs)} /> */}
        </Box>
    </Popover>

    </div>
  )
}
