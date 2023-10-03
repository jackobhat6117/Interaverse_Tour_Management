import React, { useState } from 'react'
import Button1 from '../../../components/forms/Button1'
import CustomTable from '../../../components/Table/CustomTable'
import TextInput from '../../../components/forms/TextInput'
import { MenuItem, RadioGroup } from '@mui/material'
import Modal1 from '../../../components/DIsplay/Modal/Modal1'
import Checkbox from '../../../components/forms/Checkbox'
import RadioInput from '../../../components/forms/RadioInput'

export default function MarkupSetting() {
  const [data] = useState([
    {id: 1,name: 'Default Markup',type: 'value',figure: '5000',status: 'active'},
    {id: 2,name: 'Default Markup',type: 'Percentage',figure: '0',status: 'active'}
  ])
  const columns = [
    {field: 'name',headerName: 'Mark-up name',flex: 1},
    {field: 'type',headerName: 'Type',flex: 1},
    {field: 'figure',headerName: 'Figure',flex: 1},
    {field: 'status',headerName: 'Action',flex: 1,
      renderCell: (props) => {
        return (
          <TextInput select value={props.value || ''} size='small' label=''>
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Disabled</MenuItem>
          </TextInput>
        )
      }
    },
  ]
  return (
    <div className='flex flex-col gap-4 content-max-w'>
      <div className='flex justify-between items-center gap-4'>
        <h4 className='text-primary/70'>Created Mark ups</h4>
        <div>
          <CreateMarkup />
        </div>
      </div>
      <CustomTable rows={data} columns={columns} />
    </div>
  )
}

function CreateMarkup() {
  const [data,setData] = useState({type: '',valueType: ''})
  const [open,setOpen] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    let newval;
    setData((data) => {
      if (data.type.includes(value)) {
        newval = data.type.filter((val) => val !== value);
      } else {
        newval = [...data.type, value];
      }
      return {...data,type: newval};
    });

    // returnData({...data,interestedIn: newval})

    // console.log('selected: ',selectedValues,newval)
  };

  return (
    <div>
      <Button1 onClick={() => setOpen(true)}>Create</Button1>
      <Modal1 open={open} setOpen={setOpen}>
        <div className='p-6 flex flex-col gap-4'>
          <h5>Create a new Markup</h5>
          <p>Select product to markup</p>
          <div className='flex flex-wrap gap-4 justify-between self-stretch pb-4'>
            <Checkbox labelClassName='flex-1' name='type' checked={data.type.includes('Flight')} onChange={handleChange} value='Flight'>Flight</Checkbox>
            <Checkbox labelClassName='flex-1' name='type' checked={data.type.includes('Stay')} onChange={handleChange} value='Stay'>Stay</Checkbox>
            <Checkbox labelClassName='flex-1' name='type' checked={data.type.includes('Tour')} onChange={handleChange} value='Tour'>Tour</Checkbox>
            <Checkbox labelClassName='' name='type' checked={data.type.includes('Protection')} onChange={handleChange} value='Protection'>Protection</Checkbox>
          </div>
          <TextInput label={'Markup name'} placeholder={'e.g flight markup'} />
          <small>Type</small>
          <RadioGroup name='valueType' value={data.valueType} onChange={(ev) => setData({...data,valueType: ev.target.value})} className='flex flex-col gap-2'>
            <RadioInput value='Value' checked={data.valueType === 'Value'}>
              <div className='flex flex-col '>
                <h6>Value</h6>
                <p>This will add the amount you choose to any ticket you want to sell</p>
              </div>
            </RadioInput>
            <RadioInput value='Percentage' checked={data.valueType === 'Percentage'}>
              <div className='flex flex-col '>
                <h6>Percentage</h6>
                <p>This will add the percentage you choose to any ticket you want to sell</p>
              </div>
            </RadioInput>
          </RadioGroup>
          <TextInput label={'Figure'} placeholder={'e.g 24,000'} InputProps={{endAdornment: 'NGN'}} />
          <div className='flex gap-4'>
            <div>
              <Button1 className='btn-theme-light'>Cancel</Button1>
            </div>
            <Button1>Create Markup</Button1>
          </div>
        </div>
      </Modal1>
    </div>
  )
}