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
import listQueueTicket from '../../controllers/booking/Ticket/listQueue';
import { getSupplierName } from '../../data/flight/supplier/getSupplierName';
import issueTicket from '../../controllers/booking/issueTicket';
import issueTicketManually from '../../controllers/booking/issueTicketManually';
import cancelTicket from '../../controllers/booking/cancelTicket';
import requestTicketMoreInfo from '../../controllers/booking/Ticket/requestMoreInfo';

const ActionContext = createContext();

export default function ApproveTicket({loadAll,data,close,callback}) {
    const {enqueueSnackbar} = useSnackbar();
    const [loadQueues,setLoadQueues] = useState(true)
    const [queues,setQueues] = useState([]);

    const [openDeny,setOpenDeny] = useState(false);
    const [openManualIssue,setOpenManualIssue] = useState(false);
    const [openCancel,setOpenCancel] = useState(false);
    const [openRequestInfo,setOpenRequestInfo] = useState(false);

    useEffect(() => {
        if(data || loadAll)
            listQueues()
        //eslint-disable-next-line
    },[data])

    async function listQueues() {
        setLoadQueues(true);
        const res = await listQueueTicket();
        // const res = await getQueueTicket(data?._id);
        setLoadQueues(false);
        if(res.return) {
            setQueues(res?.data?.data?.map(obj => ({...obj,
                id: obj._id,
                pnr: obj?.flightBooking?.pnr,
                provider: {
                    supplier: getSupplierName(obj?.flightBooking?.supplier),
                    airline: obj?.flightBooking?.flights?.at(0).airlineName,
                }
            })))
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

    async function handleRequestInfo({_id,requestedInfo}) {
        const reqBody = {
            ticketQueueId: _id,
            requestedInfo,
        }
        setOpenRequestInfo({...openRequestInfo,loading: true})
        const res = await requestTicketMoreInfo(reqBody);
        setOpenRequestInfo({...openRequestInfo,loading: false})

        if(res.return) {
            enqueueSnackbar('More info has has been requested.',{variant: 'success'})
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

    async function handleIssue(id) {
        const reqBody = {
            ticketQueueId: id,
        }
        const res = await issueTicket(reqBody);
        if(res.return) {
            enqueueSnackbar('Ticket has been issued.',{variant: 'success'})
            callback && callback()
        } else enqueueSnackbar(res.msg,{variant: 'error'})
    }
    async function handleManualIssue({id,ticketNumber}) {
        const reqBody = {
            ticketQueueId: id,
            ticketNumber,
        }
        setOpenManualIssue({...openManualIssue,loading: true})
        const res = await issueTicketManually(reqBody);
        setOpenManualIssue({...openManualIssue,loading: false})
        if(res.return) {
            enqueueSnackbar('Ticket has been issued.',{variant: 'success'})
            callback && callback()
        } else enqueueSnackbar(res.msg,{variant: 'error'})
    }
    async function handleCancel(id) {
        const reqBody = {
            ticketQueueId: id,
        }
        setOpenCancel({...openCancel,loading: true})
        const res = await cancelTicket(reqBody);
        setOpenCancel({...openCancel,loading: false})
        if(res.return) {
            enqueueSnackbar('Ticket has been canceled.',{variant: 'success'})
            callback && callback()
        } else enqueueSnackbar(res.msg,{variant: 'error'})
    }

    const columns = [
        {field: 'ticketNo', headerName: 'Ticket Ref No'},
        {field: 'pnr', headerName: 'Book Ref No'},
        {field: 'provider', headerName: 'Provider',
            renderCell: (params) => (
                <div className='flex flex-col'>
                    <span>{params?.value?.airline}</span>
                    <span>{params?.value?.supplier}</span>
                </div>
            )
        },
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
    <div className='card py-10 p-0 flex flex-col gap-4 justify-center'>
        {
        // loadQueues ? 
        //     <div className='flex flex-col gap-2 items-center justify-center border-theme1'>
        //         <div className='load'></div>
        //         <p>Loading Tickets</p>
        //     </div>        
        // :
            <ActionContext.Provider value={{
                approve: handleApprove,
                deny: setOpenDeny,
                issue: handleIssue,
                manualIssue: setOpenManualIssue,
                cancel: setOpenCancel,
                requestInfo: setOpenRequestInfo,
            }}>
                <CustomTable loading={loadQueues} rows={queues} columns={columns} />
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
        {/* {!loadQueues ? 
            <div className='py-4 flex justify-end gap-4'>
                <div>
                    <Button1 onClick={close}>Close</Button1>
                </div>
            </div>
        :null} */}

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
        <Modal1 open={openManualIssue} setOpen={setOpenManualIssue}>
            <div className='card p-4 flex flex-col  gap-4 min-w-[300px]'>
                <h5>Ticket Number?</h5>
                <TextInput label=''
                    value={openManualIssue?.ticketNumber || ''}
                    onChange={(ev) => setOpenManualIssue({...openManualIssue,ticketNumber: ev.target.value})} />
                <div className='flex justify-end items-center gap-4'>
                    <Button1 variant='outlined' className='btn-outlined flex-1' onClick={() => setOpenManualIssue(false)}>Cancel</Button1>
                    <div>
                        <Button1 onClick={() => handleManualIssue(openManualIssue)} loading={openManualIssue?.loading}>Issue Ticket</Button1>
                    </div>
                </div>
            </div>
        </Modal1>
        <Modal1 open={openCancel} setOpen={setOpenCancel}>
            <div className='card p-4 flex flex-col  gap-4 min-w-[300px]'>
                <h5>Are you sure you want to cancel ticket?</h5>
                <div className='flex justify-end items-center gap-4'>
                    <Button1 variant='outlined' className='btn-outlined flex-1' onClick={() => setOpenCancel(false)}>No, Close</Button1>
                    <div>
                        <Button1 onClick={() => handleCancel(openCancel)} loading={openCancel?.loading}>Yes, Cancel Ticket</Button1>
                    </div>
                </div>
            </div>
        </Modal1>
        <Modal1 open={openRequestInfo} setOpen={setOpenRequestInfo}>
            <div className='card p-4 flex flex-col  gap-4 min-w-[300px]'>
                <h5>What's missing?</h5>
                <TextInput label='' multiline rows={5} 
                    placeholder={'e.g. Phone number is required'}
                    value={openRequestInfo?.requestedInfo || ''}
                    onChange={(ev) => setOpenRequestInfo({...openRequestInfo,requestedInfo: ev.target.value})} />
                <div className='flex justify-end items-center gap-4'>
                    <Button1 variant='outlined' className='btn-outlined flex-1' onClick={() => setOpenRequestInfo(false)}>Close</Button1>
                    <div>
                        <Button1 onClick={() => handleRequestInfo(openRequestInfo)} loading={openRequestInfo?.loading}>Continue</Button1>
                    </div>
                </div>
            </div>
        </Modal1>
    </div>
  )
}


function StatusCol({params}) {
    const [loadings,setLoadings] = useState({approve: false,deny: false,manualIssue: false,issue: false,cancel: false,more: false})

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
                        const {approve,deny,issue,manualIssue,cancel,requestInfo} = value || {}
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
                                    <MenuContainer loader={'more'}
                                        // showFor={['Open']}
                                        onClick={() => requestInfo(params?.row)} value={params.value} >Request more info</MenuContainer>
                                    <MenuContainer loader={'deny'}
                                        showFor={['Open']}
                                        onClick={() => deny(params?.row)} value={params.value} >Deny</MenuContainer>
                                    <MenuContainer loader={'issue'}
                                        showFor={['Pending','RequestedInfo']}
                                        onClick={() => issue(params?.row?._id)} value={params.value} >Issue Ticket</MenuContainer>
                                    <MenuContainer loader={'manualIssue'}
                                        showFor={['Pending']}
                                        onClick={() => manualIssue(params?.row)} value={params.value} >Manual Issue</MenuContainer>
                                    <MenuContainer loader={'cancel'}
                                        showFor={['Issued']}
                                        onClick={() => cancel(params?.row?.id)} value={params.value} >Cancel Ticket</MenuContainer>
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