import React, { useEffect, useState } from 'react'
import TextInput from '../../../components/form/TextInput';
import Button1 from '../../../components/form/Button1';
import createCurrency from '../../../controllers/settings/currencies/createCurrency';
import { useSnackbar } from 'notistack';
import updateCurrency from '../../../controllers/settings/currencies/updateCurrency';
import updateFAQ from '../../../controllers/settings/faq/updateFAQ';
import createFAQ from '../../../controllers/settings/faq/createFAQ';


const initData = {
    question: '',
    answer: '',
}
export default function FAQForm({data: defData,callback}) {
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
        
        const {question,answer} = data;
        
        if(defData?._id)
            res = await updateFAQ(defData?._id,{question,answer});
        else
            res = await createFAQ(data);
        if(res?.return) {
            setData(initData);
            enqueueSnackbar('Currency Added',{variant: 'success'})
            callback && callback(res);
        } else enqueueSnackbar(res?.msg,{variant: 'error'})
        setLoadings({...loadings,submit: false})
    }
    
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 md:min-w-[300px]'>
        <TextInput label='Question' multiline rows={3} required
            value={data?.question}
            onChange={(ev) => setData({...data,question: ev?.target?.value})}
        />
        <TextInput label='Answer' multiline rows={6} required
            value={data?.answer}
            onChange={(ev) => setData({...data,answer: ev?.target?.value})}
        />

        <div>
            <Button1 loading={loadings?.submit} type='submit'>Submit</Button1>
        </div>
    </form>
  )
}
