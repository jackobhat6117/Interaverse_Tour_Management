import React, { useEffect, useState } from 'react'
import Collapse from '../mini/Collapse'
import TextInput from '../form/TextInput'
import CountriesInput from '../form/CountriesInput'
import SelectInput from '../form/SelectInput'
import { MenuItem } from '@mui/material'
import CalendarInput1 from '../form/CalendarInput1'
import { Contrast } from '@mui/icons-material'
import { travelersInfo } from '../../data/flight/travelersInfo'
import { clone } from '../../features/utils/objClone'
import moment from 'moment'

export default function PrimaryPassenger({label,handleReturn,count=0,collapse=false}) {

  const [data,setData] = useState(clone(travelersInfo))
  useEffect(() => {
    let {email,phone,birthDate,expiryDate,...rest} = data
    birthDate = moment(birthDate).format('YYYY-MM-DD')
    expiryDate = moment(expiryDate).format('YYYY-MM-DD')
    handleReturn && handleReturn({...rest,birthDate,expiryDate},count)
    //eslint-disable-next-line
  },[data])


  return (
    <div>
      <Collapse label={label || 'Primary Passenger'} show={!collapse}>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4 flex-wrap md:flex-nowrap'>
            <TextInput label={'Given name'} placeholder={'e.g John Doe'}
              value={data.firstName}
              onChange={(ev) => setData({...data,firstName: ev.target.value})}
            />
            <TextInput label={'Surname'} placeholder={'e.g Ike'}
              value={data.lastName}
              onChange={(ev) => setData({...data,lastName: ev.target.value})}
            />
          </div>
          <div className='flex gap-4 flex-wrap md:flex-nowrap'>
            <div className='flex-1'>
              <CountriesInput label={'Nationality'}
                value={data?.document?.nationality}
                onChange={(val) => setData({...data,document:{...data.document,nationality: val?.alpha2 || val}})}
              />
            </div>
            <div className='flex-1'>
              <SelectInput label='Gender'
                value={data.gender}
                onChange={(ev) => setData({...data,gender: ev.target.value})}
              >
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
              </SelectInput>
            </div>
            <div className='flex-1'>
              <TextInput type='date' label={'Date of Birth'}
                value={data.birthDate}
                onChange={(ev) => setData({...data,birthDate: ev.target.value})}
              />
            </div>
          </div>
          <div className='flex gap-4 flex-wrap md:flex-nowrap'>
            <div className='flex-1'>
              <TextInput label='Passport or ID number'
                value={data.document.number}
                onChange={(ev) => setData({...data,document:{...data.document,number: ev.target.value}})}
               />
            </div>
            <div className='flex-1'>
              <TextInput type='date' label='Passport or ID Expiration Date' 
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
