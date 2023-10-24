import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { passengerDataTemp, passengerDataTempFilled } from '../../data/user/passengerData';
import { clone } from "../../features/utils/objClone";
import moment from "moment";
import FetchUsersInput from "../../components/forms/FetchUsersInput";
import { MenuItem, TextField } from "@mui/material";
import CountriesInput from "../../components/forms/CountriesInput";


export function PassengerInputs({returnData,ind,type}) {
  const {bookingData} = useSelector((state) => state.flightBooking);
  const [newPassenger,setNewPassenger] = useState(false);
  const urlData = bookingData;

  const dataInit = (urlData.bookingInfo && urlData.bookingInfo[ind]) || {...passengerDataTemp,boardingUserType: type,middleName: '',title: '',ffn: '',idType: ''};
  const [data,setDataa] = useState(clone(dataInit))
  
  function setData(obj) {
    returnData(obj)
    setDataa(obj);
  }

  const [passengerList] = useState([]);
  useEffect(() => {
    loadPassengers();
  },[])

  async function loadPassengers() {
    // const res = await getPassengers(); //bookingData?.as?.id
    // if(res.return) {
      // let data = res.data
      // const uniqueEmails = new Set();
      // data = data.filter(obj => !uniqueEmails.has(obj.email) && uniqueEmails.add(obj.email));

      // setPassengerList(data)
    // }
  }

  function handleSelectPassenger(obj) {
    if(obj === 'Add User') return setNewPassenger(true);
    else setNewPassenger(false);

    const {
      birthDate,
      firstName,
      lastName,
      nationality,
      gender,
      passportId,
      boardingUserType,
      email,
      phoneNumber,
      issuanceLocation,
      issuanceDate,
      issuanceCountry,
      validityCountry,
      passportExpirationDate
    } = obj;
    setData({
      birthDate,
      firstName,
      lastName,
      nationality,
      gender,
      passportId,
      boardingUserType,
      email,
      phoneNumber,
      issuanceLocation,
      issuanceDate,
      issuanceCountry,
      validityCountry,
      passportExpirationDate      
    })
  }


  const getAgeType = (birthDate) => {
    const today = moment();
    const age = today.diff(moment(birthDate).format("YYYY-MM-DD"), 'years')

    
    let userType = ''
    if (age < 2 && age >= 0) {
      userType = 'INFANT'
    } else if (age <= 11) {
      userType = 'CHILD'
    } else {
      userType = 'ADULT'
    }

    return userType;
  }
  function testFill(ev) {
    let data = {...clone(passengerDataTempFilled),boardingUserType: type,idType: 'Passport'};
    const Rand = parseInt(Math.random() * 999);
    data.firstName = `Test${type.toLowerCase()}`
    data.email = `Test${Rand}@gmail.com`
    data.gender =["MALE","FEMALE"][parseInt(Math.random()*2)]

    setData(data)
    returnData(data);
  }
  return (
    <div className='flex flex-col gap-3'>
      <FetchUsersInput from={passengerList} enableNew onChange={(obj) => handleSelectPassenger(obj)} label={'Passengers'} />
      {newPassenger ? (
        <div className='gap-3 flex flex-col'>
          <h6 onDoubleClick={testFill}>Passenger Detail</h6>
          <hr />
          <div className='flex gap-2'>
            <TextField className='min-w-[60px]' size='small' label='Title' select
              value={data.title||""}
              onChange={(ev) => setData({...data,title: ev.target.value})}
              InputLabelProps={{
                shrink: true,
              }}>
                <MenuItem value='Mr'>Mr</MenuItem>
                <MenuItem value='Ms'>Ms</MenuItem>
                <MenuItem value='Mrs'>Mrs</MenuItem>
              </TextField>
            <TextField required className='flex-1' size='small' label='First Name' name='firstName'
              value={data.firstName}
              onChange={(ev) => setData({...data,firstName: ev.target.value})}
              InputLabelProps={{
                shrink: true,
              }} />
            <TextField className='flex-1' size='small' label='Middle Name' name='middleName'
              value={data.middleName}
              onChange={(ev) => setData({...data,middleName: ev.target.value})}
              InputLabelProps={{
                shrink: true,
              }} />
            <TextField required className='flex-1' size='small' label='Surname' name='lastName'
              value={data.lastName}
              onChange={(ev) => setData({...data,lastName: ev.target.value})}
              InputLabelProps={{
                shrink: true,
              }} />

          </div>
          <div className='flex gap-2'>
            <TextField required className='flex-1 min-w-[100px]' size='small' label='Date of birth' type='date'
              value={moment(data.birthDate).format("YYYY-MM-DD") || ""}
              onChange={(ev) => setData({...data,birthDate: ev.target.value})}
              error={data.birthDate !== "" && (getAgeType(data.birthDate) !== type)}
              aria-errormessage={`Must be ${type}`}
              InputLabelProps={{
                shrink: true,
              }} />
            <TextField required className='flex-1' size='small' label='Gender' select
              value={data.gender}
              onChange={(ev) => setData({...data,gender: ev.target.value})}
              InputLabelProps={{
                shrink: true,
              }}>
                <MenuItem value='FEMALE'>Female</MenuItem>
                <MenuItem value='MALE'>Male</MenuItem>
            </TextField>
          </div>
          <div className='flex gap-2'>
            <CountriesInput required
              value={data.nationality}
              // onChange={(val) => handleChange(val.name || val)}
              onChange={(val) => setData({...data,nationality: val.alpha2 || val})}
            />
            <TextField required className='flex-1 min-w-[150px]' size='small' label='Identification Type' select
              value={data.idType || "Passport"}
              onChange={(ev) => setData({...data,idType: ev.target.value})}
              InputLabelProps={{
                shrink: true,
              }}>
                <MenuItem value='Passport'>Passport</MenuItem>
                <MenuItem value='NationalID'>National ID</MenuItem>
            </TextField>

          </div>
          <div className='flex gap-2 flex-wrap'>
            <CountriesInput required label="Issuance Country" 
              value={data.issuanceCountry} name='issuanceCountry'
              onChange={(val) => setData({...data,issuanceCountry: val.alpha2 || val})}
            />
            <TextField required className='flex-1' size='small' label={data.idType === 'NationalID' ? 'National ID No' : 'Passport Number'}
              value={data.passportId}
              onChange={(ev) => setData({...data,passportId: ev.target.value})}
              InputLabelProps={{
                shrink: true,
              }} />
            <TextField required className='flex-1' size='small' label='Expiry Date' type='date' 
              value={moment(data.passportExpirationDate).format("YYYY-MM-DD") || ""}
              onChange={(ev) => setData({...data,passportExpirationDate: ev.target.value})}
              inputProps={{
                min: new Date().toISOString().slice(0,10)
              }}
              InputLabelProps={{
                shrink: true,
              }} />
          </div>
          <div>
            <TextField className='w-[200px]' size='small' label='Frequent Flyer Number'
              value={data.ffn}
              onChange={(ev) => setData({...data,ffn: ev.target.value})}
              InputLabelProps={{
                shrink: true,
              }} />
          </div>
        </div>
      ) : null}

    </div>
  )
}