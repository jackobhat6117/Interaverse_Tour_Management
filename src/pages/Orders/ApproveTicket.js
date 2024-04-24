import React, { createContext, useEffect, useState } from 'react'
import Button1 from '../../components/form/Button1'
import { useSnackbar } from 'notistack'
import approveTicket from '../../controllers/booking/Ticket/approveTicket';
import Icon from '../../components/HOC/Icon';
import CustomTable from '../../components/Table/CustomTable';
import CustomMenu from '../../components/utils/CustomMenu';
import { MenuItem } from '@mui/material';
import { Menu } from './OrdersData';
import denyTicket from '../../controllers/booking/Ticket/denyTicket';
import Modal1 from '../../components/DIsplay/Modal/Modal1';
import TextInput from '../../components/form/TextInput';
import getQueueTicket from '../../controllers/booking/Ticket/getQueueTicket';

const ActionContext = createContext();

export default function ApproveTicket({data,close,callback}) {
    const {enqueueSnackbar} = useSnackbar();
    const [loadQueues,setLoadQueues] = useState(true)
    const [queues,setQueues] = useState([]);

    const [openDeny,setOpenDeny] = useState(false);

    useEffect(() => {
        if(data)
            listQueues()
        //eslint-disable-next-line
    },[data])

    async function listQueues() {
        setLoadQueues(true);
        const res = await getQueueTicket(data?._id);
        setLoadQueues(false);
        if(res.return) {
            setQueues(res?.data?.data?.map(obj => ({...obj,id: obj._id})))
        }
    }
    
    async function handleApprove(id) {
        const reqBody = {
            ticketQueueId: id,
        }
        const res = await approveTicket(reqBody);
        if(res.return) {
            enqueueSnackbar('Ticket request has been approved.',{variant: 'success'})
            callback && callback()
        } else enqueueSnackbar(res.msg,{variant: 'error'})
    }

    async function handleDeny({_id,reason,...rest}) {
        console.log('request: ',rest)
        const reqBody = {
            ticketQueueId: _id,
            deniedReason: reason,
        }
        setOpenDeny({...openDeny,loading: true})
        const res = await denyTicket(reqBody);
        setOpenDeny({...openDeny,loading: false})

        if(res.return) {
            enqueueSnackbar('Ticket request has been denied.',{variant: 'success'})
            callback && callback()
        } else enqueueSnackbar(res.msg,{variant: 'error'})
    }

    const columns = [
        {field: 'ticketNo', headerName: 'Ticket No'},
        {field: 'numberOfTrials', headerName: 'Retrials',
            renderCell: (params) => (
                <div className='flex items-center gap-2'>
                    <Icon icon='pajamas:retry' className='!w-3 !h-3 text-red-400' />
                    {params.value} retry
                </div>
            )
        },
        {field: 'status', headerName: 'Status',
            renderCell: (params) => (
                <StatusCol params={params} />
            )
        },
    ]
    
    console.log(openDeny)
    
  return (
    <div className='card p-10 flex flex-col gap-4 justify-center'>
        {loadQueues ? 
            <div className='flex flex-col gap-2 items-center justify-center border-theme1'>
                <div className='load'></div>
                <p>Loading Tickets</p>
            </div>        
        :
            <ActionContext.Provider value={{
                approve: handleApprove,
                deny: setOpenDeny,
            }}>
                <CustomTable rows={queues} columns={columns} />
            </ActionContext.Provider>
        // <div className='flex flex-col gap-4 justify-center'>
        //     {queues.map((obj,i) => (
        //         <div key={i} className='flex justify-between gap-4 items-center'>
        //             <div className='flex-1'>{obj.ticketNo}</div>
        //             <div className='flex gap-2 items-center'>
        //                 <Icon icon='pajamas:retry' className='!w-4 !h-4 text-red-400' />
        //                 {obj?.numberOfTrials} retry
        //             </div>
        //             <div>{obj.status}</div>
        //             <div>
        //                 <Button1 onClick={() => handleApprove(obj?._id)}>Approve</Button1>
        //             </div>
        //         </div>
        //     ))}
        // </div>
        }
        {!loadQueues ? 
            <div className='py-4 flex justify-end gap-4'>
                <div>
                    <Button1 onClick={close}>Close</Button1>
                </div>
            </div>
        :null}

        <Modal1 open={openDeny} setOpen={setOpenDeny}>
            <div className='card p-4 flex flex-col  gap-4 min-w-[300px]'>
                <h5>What's your reson?</h5>
                <TextInput label='' multiline rows={5} 
                    placeholder={'e.g. Ticket not available'}
                    value={openDeny?.reason || ''}
                    onChange={(ev) => setOpenDeny({...openDeny,reason: ev.target.value})} />
                <div className='flex justify-end items-center gap-4'>
                    <Button1 variant='outlined' className='btn-outlined flex-1' onClick={() => setOpenDeny(false)}>Cancel</Button1>
                    <div>
                        <Button1 onClick={() => handleDeny(openDeny)} loading={openDeny?.loading}>Continue</Button1>
                    </div>
                </div>
            </div>
        </Modal1>
    </div>
  )
}


function StatusCol({params}) {
    const [loadings,setLoadings] = useState({approve: false})

    async function waiter(ev,callback) {
        ev?.preventDefault();
        ev?.stopPropagation();
        
        setLoadings(({...loadings,approve: true}))
        await callback(params?.row?._id)
        // await new Promise((resolve) => setTimeout(() => resolve(),2000))
        setLoadings(({...loadings,approve: false}))
    }
    
    const MenuContainer = ({children,loader,value,...restProps}) => (
        <Menu {...restProps}
         value={value}
         label={children}
         render={(val) => (
            <div>
                {loadings[loader] ? <div className='load mr-2 border-theme1'></div> :null}
                {val}
            </div>
         )}
        />
    )
    
    return (
        <div className='flex gap-2 items-center w-full'>
            <div className='flex-1'>
                {params.value}
            </div>
            <ActionContext.Consumer>
                {
                    (value) => {
                        const {approve,deny} = value || {}
                        return (
                            <CustomMenu 
                                element={
                                <label className="block p-2 px-4 cursor-pointer">
                                    <Icon icon={"pepicons-pop:dots-y"} />
                                </label>
                                }
                            >
                                <div className='menuItem'>
                                    <MenuContainer loader={'approve'}
                                        showFor={['Open']}
                                        onClick={(ev) => waiter(ev,approve)} value={params.value} >Approve</MenuContainer>
                                    <MenuContainer loader={'deny'}
                                        showFor={['Open']}
                                        onClick={() => deny(params?.row)} value={params.value} >Deny</MenuContainer>
                                    <MenuItem></MenuItem>
                                </div>
                            </CustomMenu>
                        )
                    }
                }
            </ActionContext.Consumer>
        </div>
    )
}