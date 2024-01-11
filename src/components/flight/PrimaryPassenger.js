import React, { useEffect, useState } from 'react'
import Collapse from '../mini/Collapse'
import TextInput from '../form/TextInput'
import CountriesInput from '../form/CountriesInput'
import SelectInput from '../form/SelectInput'
import { MenuItem } from '@mui/material'
import { travelersInfo } from '../../data/flight/travelersInfo'
import { clone } from '../../features/utils/objClone'
import moment from 'moment'

export function validateAge(birthDate,type) {
  let age = moment().diff(birthDate,'years')
  let valid = false;
  let msg = '';

  const validate = (val) => {valid = val; return val};
  const errorMsg = (val) => {msg = val};
  
  if(type === 'infant')
    validate(age < 3) || errorMsg(`${type}s should be under 3 `);
  else if(type === 'child')
    validate(age < 12) || errorMsg(`${type}s should be between 3 and 12 `);
  else if(type === 'adult')
    validate(age >= 12) || errorMsg(`${type}s should be over 11 `);


  return [valid,msg];
}

export default function PrimaryPassenger({label,type,handleReturn,count=0,collapse=false}) {

  const [data,setData] = useState(clone(travelersInfo))
  useEffect(() => {
    let {email,phone,birthDate,expiryDate,...rest} = data
    birthDate = moment(birthDate).format('YYYY-MM-DD')
    expiryDate = moment(expiryDate).format('YYYY-MM-DD')
    console.log('data: ',{...rest,birthDate,expiryDate,gotType: type})
    handleReturn && handleReturn({...rest,birthDate,expiryDate,gotType: type},count)
    //eslint-disable-next-line
  },[data])


  const expiredPassport = data.document.expiryDate && moment(data.document.expiryDate).isBefore(moment(),'day');
  
  return (
    <div>
      <Collapse label={label || 'Primary Passenger'} show={!collapse}>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4 flex-wrap md:flex-nowrap'>
            <TextInput label={'Given name'} required placeholder={'e.g John Doe'}
              value={data.firstName}
              onChange={(ev) => setData({...data,firstName: ev.target.value})}
            />
            <TextInput label={'Surname'} required placeholder={'e.g Ike'}
              value={data.lastName}
              onChange={(ev) => setData({...data,lastName: ev.target.value})}
            />
          </div>
          <div className='flex gap-4 flex-wrap md:flex-nowrap'>
            <div className='flex-1'>
              <CountriesInput label={'Nationality'} required
                value={data?.document?.nationality}
                onChange={(val) => setData({...data,document:{...data.document,nationality: val?.alpha2 || val}})}
              />
            </div>
            <div className='flex-1'>
              <SelectInput label='Gender' required
                value={data.gender}
                onChange={(ev) => setData({...data,gender: ev.target.value})}
              >
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
              </SelectInput>
            </div>
            <div className='flex-1'>
              <TextInput type='date' label={'Date of Birth'} required
                error={!validateAge(data.birthDate,type)[0]}
                helperText={<span className='text-red-500'>{validateAge(data.birthDate,type)[1]}</span>}
                value={data.birthDate}
                onChange={(ev) => setData({...data,birthDate: ev.target.value})}
              />
            </div>
          </div>
          <div className='flex gap-4 flex-wrap md:flex-nowrap'>
            <div className='flex-1'>
              <TextInput label='Passport or ID number' required
                value={data.document.number}
                onChange={(ev) => setData({...data,document:{...data.document,number: ev.target.value}})}
               />
            </div>
            <div className='flex-1'>
              <TextInput type='date' label='Passport or ID Expiration Date' required
                error={expiredPassport}
                helperText={<span className='text-red-500'>{expiredPassport ? 'Expired Passport!':''}</span>}
                value={data.document.expiryDate}
                onChange={(ev) => setData({...data,document: {...data.document,expiryDate: ev.target.value}})}
              />
            </div>
          </div>
          {/* <div className='flex gap-4 flex-wrap md:flex-nowrap'>
            <div className='flex-1'>
              <CountriesInput label={'Issuance Location'}
                value={data?.document?.issuanceLocation}
                onChange={(val) => setData({...data,document:{...data.document,issuanceLocation: val?.alpha2 || val}})}
              />
            </div>
            <div className='flex-1'>
              <TextInput type='date' label='Issuance Date' 
                value={data.document.issuanceDate}
                onChange={(ev) => setData({...data,document: {...data.document,issuanceDate: ev.target.value}})}
              />
            </div>
          </div> */}

          <h5>Additional details</h5>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <TextInput label='Frequent flyer number' placeholder='Enter here'/>
            </div>
            <div className='flex-1'>
              <SelectInput label='Special assistance' placeholder='Select'>
                <MenuItem></MenuItem>
              </SelectInput>
            </div>
          </div>

          <h5>Remarks</h5>
          <TextInput multiline rows={4} label='' placeholder={'Add remarks to booking'} />
        </div>
      </Collapse>
    </div>
  )
}
