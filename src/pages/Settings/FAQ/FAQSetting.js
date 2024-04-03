import React, { createContext, useEffect, useState } from 'react'
import CustomTable from '../../../components/Table/CustomTable'
import Icon from '../../../components/HOC/Icon';
import getCurrencies from '../../../controllers/settings/currencies/getCurrencies';
import Button1 from '../../../components/form/Button1';
import Modal1 from '../../../components/DIsplay/Modal/Modal1';
import FAQForm from './FAQForm';
import deleteCurrency from '../../../controllers/settings/currencies/deleteCurrency';
import { useSnackbar } from 'notistack';
import getFAQs from '../../../controllers/settings/faq/getFAQs';
import deleteFAQ from '../../../controllers/settings/faq/deleteFAQ';


const ActionContext = createContext();

function ActionCol({params}) {
    return (
        <ActionContext.Consumer>
            {(value) => {
                const {setEditObj,setDeleteObj} = value || {}

                return (
                    <div className='flex items-center gap-4'>
                        <span
                        className="p-2 rounded-md !bg-gray-200 flex items-center justify-center cursor-pointer "
                        onClick={() => setEditObj(params?.row)}
                        >
                        <Icon icon="tabler:edit" />
                        </span>
                        <span
                        className="p-2 rounded-md !bg-gray-200 flex items-center justify-center cursor-pointer "
                        onClick={() => setDeleteObj(params?.row)}
                        >
                        <Icon
                            icon="material-symbols:delete-outline"
                            className="text-red-500"
                        />
                        </span>

                    </div>
                )
            }}
        </ActionContext.Consumer>
    )
}

export default function FAQSetting() {
    const [data,setData] = useState([])
    const [openForm,setOpenForm] = useState(false);
    const [loadings,setLoadings] = useState({currencies: false})
    
    const [editObj,setEditObj] = useState(false);
    const [deleteObj,setDeleteObj] = useState(false);


    useEffect(() => {
        load();
    },[])

    async function load() {
        setLoadings(loadings => ({...loadings,currencies: true}))
        const res = await getFAQs();
        setLoadings(loadings => ({...loadings,currencies: false}))
        if(res.return) {
            setData(res?.data?.data)
        }
    }

    const columns = [
        {field: 'question',headerName: 'Question',flex: 1},
        {field: 'answer',headerName: 'Answer',flex: 1},
        {field: 'action',headerName: 'Action',minWidth: 150,
            renderCell: (params) => (
                <ActionCol params={params} />
            )
        },
    ]
    
  return (
    <div className='flex flex-col gap-4 content-max-w'>
        <div className='flex justify-end gap-4 items-center'>
            <div>
                <Button1 onClick={() => setOpenForm(true)}>Add QA</Button1>
            </div>
            <Modal1 open={openForm} setOpen={setOpenForm}>
                <div className='card p-10'>
                    <FAQForm callback={() => {load();setOpenForm(false)}} />
                </div>
            </Modal1>
        </div>
        
        <ActionContext.Provider value={{
            setEditObj,
            setDeleteObj,
        }}>
            <CustomTable columns={columns} rows={data} loading={loadings?.currencies} />
        </ActionContext.Provider>

        <Modal1 open={editObj} setOpen={setEditObj}>
            <div className='card p-10'>
                <FAQForm data={editObj} callback={() => {load();setEditObj(false)}} />
            </div>
        </Modal1>
        
        <Modal1 open={deleteObj} setOpen={setDeleteObj}>
            <div className='card p-10'>
                <DeleteFAQ data={deleteObj} close={() => setDeleteObj(false)} callback={() => {load();setDeleteObj(false)}} />
            </div>
        </Modal1>
    </div>
  )
}

function DeleteFAQ({data,close,callback}) {
    const [loading,setLoading] = useState(false);
    
    const {enqueueSnackbar} = useSnackbar();
    
    async function handleRemove() {
        setLoading(true);
        const res = await deleteFAQ(data?._id)
        if(res?.return) {
            enqueueSnackbar('QA Removed',{variant: 'success'})
            callback && callback();
        } else
            enqueueSnackbar(res?.msg,{variant: 'error'})

        setLoading(false);
    }

    return (
        <div className='flex flex-col gap-4'>
            <h5>Delete QA</h5>
            <p>Are you sure you want to continue removing this QA?</p>
            <div className='flex gap-4 items-center pt-5'>
                <button onClick={() => close && close()} className='!btn1 px-4'>Cancel</button>
                <Button1 className='!bg-red-500 !text-white' loading={loading} type='submit' onClick={handleRemove}>Remove</Button1>
            </div>
        </div>
    )
}