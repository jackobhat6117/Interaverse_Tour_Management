import React, { useEffect, useState } from 'react'
import TextInput from '../../../../components/form/TextInput';
import Button1 from '../../../../components/form/Button1';
import createCurrency from '../../../../controllers/settings/currencies/createCurrency';
import { useSnackbar } from 'notistack';
import updateCurrency from '../../../../controllers/settings/currencies/updateCurrency';


const initData = {
    name: '',
    code: '',
    exchangeRateInNaira: 0,
    symbol: '',
}
export default function ExchangeRateForm({data: defData,callback}) {
    const [data,setData] = useState(defData || initData)
    const [loadings,setLoadings] = useState({submit: false})

    useEffect(() => {
        if(defData) {
            setData(defData)
        }
    },[defData])

    const {enqueueSnackbar} = useSnackbar();
    
    async function handleSubmit(ev) {
        ev?.preventDefault();
        setLoadings({...loadings,submit: true})
        let res = {return: 0,msg: 'Something went wrong on our end! Please contact support. 0XEXRR'}
        
        const {name,code,exchangeRateInNaira,symbol} = data;
        
        if(defData?._id)
            res = await updateCurrency(defData?._id,{name,code,exchangeRateInNaira,symbol});
        else
            res = await createCurrency(data);
        if(res?.return) {
            setData(initData);
            enqueueSnackbar('Currency Added',{variant: 'success'})
            callback && callback(res);
        } else enqueueSnackbar(res?.msg,{variant: 'error'})
        setLoadings({...loadings,submit: false})
    }
    
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <TextInput label='Name' required
            value={data?.name}
            onChange={(ev) => setData({...data,name: ev?.target?.value})}
        />
        <TextInput label='Code' required
            value={data?.code}
            onChange={(ev) => setData({...data,code: ev?.target?.value})}
        />
        <TextInput label='Exchange rate in Naira' type='number' required
            value={data?.exchangeRateInNaira}
            onChange={(ev) => setData({...data,exchangeRateInNaira: ev?.target?.value})}
        />
        <TextInput label='Symbol' required
            value={data?.symbol}
            onChange={(ev) => setData({...data,symbol: ev?.target?.value})}
        />

        <div>
            <Button1 loading={loadings?.submit} type='submit'>Submit</Button1>
        </div>
    </form>
  )
}
