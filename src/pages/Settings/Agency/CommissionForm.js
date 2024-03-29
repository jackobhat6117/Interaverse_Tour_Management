import React, { useEffect, useState } from 'react'
import AirlinesInput from '../../../components/form/AirlinesInput';
import { commissionData } from '../../../data/flight/commission/commissionData';
import CalendarInput1 from '../../../components/form/CalendarInput1';
import { Autocomplete, TextField } from '@mui/material';
import TextInput from '../../../components/form/TextInput';
import getAccounts from '../../../controllers/user/getAccounts';
import Icon from '../../../components/HOC/Icon';
import RadioGroup from '../../../components/form/RadioGroup';
import Button1 from '../../../components/form/Button1';
import { clone } from '../../../features/utils/objClone';
import createFlightCommission from '../../../controllers/Flight/Commission/createCommision';
import moment from 'moment';
import { useSnackbar } from 'notistack';


export default function CommissionForm({defData,callback}) {
    const [data,setData] = useState(clone(commissionData))
    const [users,setUsers] = useState([])
    const [loadings,setloadings] = useState({
        users: false,
        submit: false,
    })
    const {enqueueSnackbar} = useSnackbar();

    async function handleSubmit(ev) {
        ev?.preventDefault();
        setloadings({...loadings,submit: true})
        let modData = data;
        modData.airline = modData?.airline?.id || modData?.airline;

        let errMsg = 'Please fill all required fields';
        const valid = Object.entries(modData)?.map(([key,value]) => {

            if(key === "includedAgents" || key === 'excludedAgents')
                modData[key] = value?.map(obj => obj?.id || obj)

            if(key === 'startDate') {
                if(!value)
                    errMsg = 'Start Date is required';
                return value;
            }

            return true;
        })

        if(!valid?.every(obj => obj))
            return enqueueSnackbar(errMsg,{variant: 'error'});
        
        const res = await createFlightCommission(modData);
        if(res?.return) {
            enqueueSnackbar('Commission created',{variant: 'success'});
            callback && callback(res)
            setData(clone(commissionData))
        } else enqueueSnackbar(res?.msg,{variant: 'error'})
        setloadings({...loadings,submit: false})
    }

    useEffect(() => {
        loadUsers();

        //eslint-disable-next-line
    },[])

    async function loadUsers() {
        setloadings({...loadings,users: true})
        const params = {}
        const res = await getAccounts((new URLSearchParams(params))?.toString());
        if(res?.return) {
            setUsers(res?.data?.data?.map(obj => ({...obj,id:obj._id})))
        }
        setloadings({...loadings,users: false})
    }

    function handleFilter(options,{inputValue}) {
        let temp = options?.filter(obj => 
            obj.firstName?.toLowerCase()?.includes(inputValue) ||
            obj.lastName?.toLowerCase()?.includes(inputValue) ||
            obj.email?.toLowerCase()?.includes(inputValue)
        )
        return temp
    }

    console.log(users)
    
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <h5>
            {defData ? 'Update': 'Create'} Commission
        </h5>
        <AirlinesInput returnData={(val) => setData({...data,airline: val?.id || val})} 
            val={data?.airline} size='small' required />
        <div className='flex gap-4 flex-wrap sm:flex-nowrap'>
            <div className='flex-1'>
                <CalendarInput1 label='Start Date' size='small' closeOnSelect required
                    value={data?.startDate}
                    onChange={(val) => setData({...data,startDate: moment(val?.start)?.format('YYYY-MM-DD') || ''})}
                />
            </div>
            <div className='flex-1'>
                <CalendarInput1 label='End Date' size='small' closeOnSelect  
                    value={data?.endDate}
                    onChange={(val) => setData({...data,endDate: moment(val?.start)?.format('YYYY-MM-DD') || ''})}
                />
            </div>
        </div>
        <div className='flex gap-4 justify-between'>
            <div>Users</div>
            {!loadings?.users && !users ? 
                <button className='text-xs flex gap-1 items-center' onClick={loadUsers}>
                    <Icon icon='mdi:reload' className='!w-3 !h-3'/>
                    reload</button>
            : loadings?.users ?
                <Icon icon='mdi:reload' className='animate-spin !w-3 !h-3' />
                :null
            }
        </div>
        <hr />
        <Autocomplete multiple options={users} loading={loadings?.users}
            getOptionLabel={(opt) => typeof opt === 'string' ? opt : opt?.firstName + ' ' + opt?.lastName}
            renderInput={(params) => <TextInput {...params} size='small' label='Included users' />}
            filterOptions={handleFilter}
            onChange={(_,newVal) => setData({...data,includedAgents: newVal})}
            renderOption={(props,opt) => (
                <div {...props} key={opt.id} className='flex flex-col p-2 overflow-hidden cursor-pointer'>
                    {opt?.firstName} {opt?.lastName}
                    <p className='text-ellipsis overflow-hidden' title={opt?.email}>{opt?.email}</p>
                </div>
            )}
        size='small' />
        <Autocomplete multiple options={users} loading={loadings?.users}
            getOptionLabel={(opt) => typeof(opt) === 'string' ? opt : opt?.firstName + ' ' + opt?.lastName}
            renderInput={(params) => <TextInput {...params} size='small' label='Excluded users' />}
            filterOptions={handleFilter}
            onChange={(_,newVal) => setData({...data,excludedAgents: newVal})}
            renderOption={(props,opt) => (
                <div {...props} key={opt.id} className='flex flex-col p-2 overflow-hidden cursor-pointer'>
                    {opt?.firstName} {opt?.lastName}
                    <p className='text-ellipsis overflow-hidden' title={opt?.email}>{opt?.email}</p>
                </div>
            )}
        size='small' />
        <hr />
        <TextInput label='Minimum ticket sales amount' required type={'number'}
            value={data?.minimumTicketSalesAmount} 
            onChange={(ev) => setData({...data,minimumTicketSalesAmount: parseInt(ev?.target?.value)})}
            size='small' />
        <TextInput label='Notes' multiline rows={4} 
            value={data?.notes}
            onChange={(ev) => setData({...data,notes: ev?.target?.value})}
        />
        <hr />
        <Tiers data={data?.tiers} onChange={(tiers) => setData({...data,tiers})} />
        <hr />
        <div>Method</div>
        <RadioGroup options={[{value: 'Percentage',label: 'Percentage'},{value: 'Fixed',label: 'Fixed'}]} className='flex gap-2 flex-wrap sm:flex-nowrap ' 
            value={data?.commissionCalculationMethod}
            onChange={(val) => setData({...data,commissionCalculationMethod: val})}
            required
        /> 
        <Button1 type='submit' loading={loadings?.submit}>Submit</Button1>
    </form>
  )
}


function Tiers({data,onChange}) {
    const [tiers,setTiers] = useState(clone(data) || [])

    
    function handleChange(i,obj) {
        let temp = tiers;
        temp[i] = {...temp[i],...obj}
        setTiers(temp);
        onChange && onChange(temp);
    }
    
    function addTier() {
        setTiers([...tiers,clone(commissionData)?.tiers?.at(0)])
    }
    function removeTier(ind) {
        setTiers(tiers?.filter((_,i) => ind !== i))
    }
    
    return (
        <div className='flex flex-col gap-4'>
            <div>Tiers</div>
            {tiers?.map((obj,ind) => (
                <div key={ind} className='flex flex-col gap-4'>
                    <div className='flex gap-4 flex-wrap sm:flex-nowrap'>
                        <TextInput required label='Name' value={obj?.name} onChange={(ev) => handleChange(ind,{name: ev?.target?.value})} size='small'/> 
                        <TextInput required label='Tier amount' type='number'  size='small'
                            value={obj?.tierAmount} 
                            onChange={(ev) => handleChange(ind,{tierAmount: parseInt(ev?.target?.value)})} />
                    </div>
                    <div className='flex gap-4 flex-wrap sm:flex-nowrap'>
                        <TextInput required label='From ticket sales amount' type='number' placeholder='e.g 400' size='small'
                            value={obj?.fromTicketSalesAmount} 
                            onChange={(ev) => handleChange(ind,{fromTicketSalesAmount: parseInt(ev?.target?.value)})} />
                        <TextInput required label='To ticket sales amount' type='number' placeholder='e.g 4000' size='small'
                            value={obj?.toTicketSalesAmount} 
                            onChange={(ev) => handleChange(ind,{toTicketSalesAmount: parseInt(ev?.target?.value)})} />
                    </div>
                    {ind > 0 ? 
                        <button type='button' onClick={() => removeTier(ind)} className='text-red-500 self-end'>Remove</button>
                    :null}
                </div>
            ))}
            <button type='button' onClick={addTier} className='self-center'>+ Add Tier</button>
        </div>
    )
}