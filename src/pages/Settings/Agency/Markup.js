import React, { createContext, useEffect, useState } from 'react'
import Button1 from '../../../components/form/Button1'
import CustomTable from '../../../components/Table/CustomTable'
import TextInput from '../../../components/form/TextInput'
import { MenuItem, RadioGroup } from '@mui/material'
import Modal1 from '../../../components/DIsplay/Modal/Modal1'
import Checkbox from '../../../components/form/Checkbox'
import RadioInput from '../../../components/form/RadioInput'
import { def } from '../../../config'
import createMarkup from '../../../controllers/markup/createMarkup'
import { useSnackbar } from 'notistack'
import getMarkups from '../../../controllers/markup/getMarkups'
import Icon from '../../../components/HOC/Icon'


const ActionContext = createContext();
export default function MarkupSetting() {
  const [data] = useState([
    {id: 1,name: 'Default Markup',type: 'value',figure: '5000',status: 'active'},
    {id: 2,name: 'Default Markup',type: 'Percentage',figure: '0',status: 'active'}
  ])
  const [open,setOpen] = useState(false);
  const [editObj,setEditObj] = useState();


  useEffect(() => {
    load();
  },[])

  async function load() {
    setOpen(false);
    setEditObj();
    const res = await getMarkups();
    if(res.return) {
      console.log(res.data)
    }
  }

  async function changeStatus() {
    // activate deactivate logic
    load();
  }

  const columns = [
    {field: 'name',headerName: 'Mark-up name',flex: 1},
    {field: 'type',headerName: 'Type',flex: 1},
    {field: 'figure',headerName: 'Figure',flex: 1},
    {field: 'status',headerName: 'Action',flex: 1,minWidth: 120,
      renderCell: (params) => {
        return (
          <ActionContext.Provider value={{
            setEditObj,
            changeStatus
          }}>
            <ActionCol params={params} />
          </ActionContext.Provider>
        )
      }
    },
  ]
  return (
    <div className='flex flex-col gap-4 content-max-w'>
      <div className='flex justify-between items-center gap-4'>
        <h5 className='text-primary/70'>Created Mark ups</h5>
        <div>
          <Button1 onClick={() => setOpen(true)}>Create</Button1>
          <Modal1 open={open} setOpen={setOpen}>
            <CreateMarkup reload={load} footer={
              <div>
                <Button1 onClick={() => setOpen(false)} className='btn-theme-light'>Cancel</Button1>
              </div>
            }/>
          </Modal1>
        </div>
      </div>
      <CustomTable rows={data} columns={columns} />

      <Modal1 open={editObj} setOpen={setEditObj}>
        <div className='p-10'>
          <CreateMarkup update data={editObj}  />
        </div>
      </Modal1>
    </div>
  )
}

function ActionCol({params}) {
  return (
    <ActionContext.Consumer>
      {(value) => {
        const {setEditObj,changeStatus} = value || {}
        return (
          <div className='flex gap-2'>
            <TextInput select value={params.value || ''} size='small' label=''
              onChange={() => changeStatus(params?.id)}
            >
              <MenuItem value='active'>Active</MenuItem>
              <MenuItem value='inactive'>Disabled</MenuItem>
            </TextInput>
            <label
             className='bg-primary/10 rounded-md cursor-pointer p-2 text-primary/30'
             onClick={() => setEditObj(params?.row)}>
              <Icon icon='tabler:edit' />
            </label>
          </div>
        )
      }}
    </ActionContext.Consumer>
  )
}

function CreateMarkup({reload,footer,data: defData,update}) {
  const [data,setData] = useState(defData || {appliedTo: '',method: '',type: 'Markup',amount: '',name: '',appliedType: ''})
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();

  console.log(defData,data)

  const handleChange = (event) => {
    const { value } = event.target;
    let newval;
    setData((data) => {
      if (data.appliedTo.includes(value)) {
        newval = data.appliedTo.filter((val) => val !== value);
      } else {
        newval = [...data.appliedTo, value];
      }
      return {...data,appliedTo: newval};
    });

    // returnData({...data,interestedIn: newval})

    // console.log('selected: ',selectedValues,newval)
  };

  let currency = def.currencyCode;

  async function handleSubmit(ev) {
    ev.preventDefault();

    if(data.appliedTo === '' || data.method === '')
      return enqueueSnackbar('Please fill required fields!',{variant: 'error'})

    setLoading(true);
    let res = {return: false,msg: 'Error',data: []};
    if(!update)
      res = await createMarkup({...data,currency});
    // else // update logic

    setLoading(false);
    if(res.return) {
      enqueueSnackbar(update ? 'Markup updated':'Markup created.',{variant: 'success'})
      reload();
    } else enqueueSnackbar(res.msg,{variant: 'error'})
  }


  return (
    <div>
      <form onSubmit={handleSubmit} className='p-6 flex flex-col gap-4'>
        <h5>{update ? 'Update Markup' : 'Create a new Markup'}</h5>

        {/* <p>Select product to markup</p> */}
        {/* <div className='flex flex-wrap gap-4 justify-between self-stretch pb-4'>
          <Checkbox labelClassName='flex-1' name='type' checked={data.appliedTo.includes('Flight')} onChange={handleChange} value='Flight'>Flight</Checkbox>
          <Checkbox labelClassName='flex-1' name='type' checked={data.appliedTo.includes('Stay')} onChange={handleChange} value='Stay'>Stay</Checkbox>
          <Checkbox labelClassName='flex-1' name='type' checked={data.appliedTo.includes('Tour')} onChange={handleChange} value='Tour'>Tour</Checkbox>
          <Checkbox labelClassName='' name='type' checked={data.appliedTo.includes('Protection')} onChange={handleChange} value='Protection'>Protection</Checkbox>
        </div> */}
        <TextInput label={'Markup name'} placeholder={'e.g flight markup'} required
          value={data.name}
          onChange={(ev) => setData({...data,name: ev.target.value})}
        />
        <small>Type</small>
        <RadioGroup name='method' required value={data.method} onChange={(ev) => setData({...data,method: ev.target.value})} className='flex flex-col gap-2'>
          <RadioInput value='Value' checked={data.method === 'Value'}>
            <div className='flex flex-col '>
              <h6>Value</h6>
              <p>This will add the amount you choose to any ticket you want to sell</p>
            </div>
          </RadioInput>
          <RadioInput value='Percentage' checked={data.method === 'Percentage'}>
            <div className='flex flex-col '>
              <h6>Percentage</h6>
              <p>This will add the percentage you choose to any ticket you want to sell</p>
            </div>
          </RadioInput>
        </RadioGroup>
        <TextInput required label={'Figure'} placeholder={'e.g 24,000'} InputProps={{endAdornment: currency}}
          value={data.amount}
          onChange={(ev) => setData({...data,amount: ev.target.value})}
        />
        <TextInput select label={'Applied To'}
          value={data.appliedType}
          onChange={(ev) => setData({...data,appliedType: ev.target.value})}
        >
          <MenuItem value='passenger'>Passenger Type</MenuItem>
        </TextInput>
        {data?.appliedType === 'passenger' ? (
          <div>
            <div className='flex flex-wrap gap-4 justify-between self-stretch pb-4'>
              <Checkbox labelClassName='flex-1' name='type' checked={data.appliedTo.includes('Adult')} onChange={handleChange} value='Adult'>Infant</Checkbox>
              <Checkbox labelClassName='flex-1' name='type' checked={data.appliedTo.includes('Child')} onChange={handleChange} value='Child'>Child</Checkbox>
              <Checkbox labelClassName='flex-1' name='type' checked={data.appliedTo.includes('Infant')} onChange={handleChange} value='Infant'>Infant</Checkbox>
            </div>
            <div className='tooltip'>Leave blank if applied to all</div>
          </div>
        ):null}
        <div className='flex gap-4'>
          {footer}
          <Button1 loading={loading} type='submit'>{update ? 'Update Markup' : 'Create Markup'}</Button1>
        </div>
      </form>
    </div>
  )
}