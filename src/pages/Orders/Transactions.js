import React, { createContext, useEffect, useState } from 'react'
import Button1 from '../../components/form/Button1'
import { useSnackbar } from 'notistack'
import Icon from '../../components/HOC/Icon';
import CustomTable from '../../components/Table/CustomTable';
import CustomMenu from '../../components/utils/CustomMenu';
import { MenuItem } from '@mui/material';
import { Menu } from './OrdersData';
import Modal1 from '../../components/DIsplay/Modal/Modal1';
import issueTicketManually from '../../controllers/booking/issueTicketManually';
import getTransactions from '../../controllers/booking/Transactions.js/getTransactions';
import { formatMoney } from '../../features/utils/formatMoney';
import approveCashPayment from '../../controllers/booking/Transactions.js/approveCashPayment';

const ActionContext = createContext();

export default function Transactions({loadAll,data,close,callback}) {
    const {enqueueSnackbar} = useSnackbar();
    const [loadTransactions,setLoadTransactions] = useState(true)
    const [transactions,setTransactions] = useState([]);

    const [openApprove,setOpenApprove] = useState(false);

    useEffect(() => {
        if(data || loadAll)
            listQueues()
        //eslint-disable-next-line
    },[data])

    async function listQueues() {
        setLoadTransactions(true);

        const query = {}
        
        const res = await getTransactions(new URLSearchParams(query)?.toString());
        // const res = await getQueueTicket(data?._id);
        setLoadTransactions(false);
        if(res.return) {
            setTransactions(res.data?.data?.map(obj => ({...obj,id: obj._id})))
            // setTransactions(res?.data?.data?.map(obj => ({...obj,
            //     id: obj._id,
            //     pnr: obj?.flightBooking?.pnr,
            //     provider: {
            //         supplier: getSupplierName(obj?.flightBooking?.supplier),
            //         airline: obj?.flightBooking?.flights?.at(0).airlineName,
            //     }
            // })))
        }
    }
    
    async function handlePaymentApprove(transactionId) {
        const reqBody = {
            transactionId
        }
        setOpenApprove({...openApprove,loading: true})
        const res = await approveCashPayment(reqBody);
        setOpenApprove({...openApprove,loading: false})
        if(res.return) {
            enqueueSnackbar('Payment Confirmed.',{variant: 'success'})
            callback && callback()
        } else enqueueSnackbar(res.msg,{variant: 'error'})
    }

    const columns = [
        {field: 'transactionRef', headerName: 'Transaction Ref'},
        {field: 'reason', headerName: 'Reason'},
        {field: 'description', headerName: 'Description'},
        {field: 'paymentMode', headerName: 'Payment Mode'},
        {field: 'amount', headerName: 'Amount',
            renderCell: (params) => (
                <span>{formatMoney(params.value)}</span>
            )
        },
        {field: 'status', headerName: 'Status',
            renderCell: (params) => (
                <StatusCol params={params} />
            )
        },
    ]
    
    
  return (
    <div className='card py-10 p-0 flex flex-col gap-4 justify-center'>
        {
            <ActionContext.Provider value={{
                approvePayment: setOpenApprove,
            }}>
                <CustomTable loading={loadTransactions} rows={transactions} columns={columns} />
            </ActionContext.Provider>
        }

        <Modal1 open={openApprove} setOpen={setOpenApprove}>
            <div className='card p-10 flex flex-col  gap-4 max-w-[400px]'>
                <h5>Do you approve payment has been made by cash?</h5>
                <div className='flex justify-end items-center gap-4'>
                    <Button1 variant='outlined' className='btn-outlined flex-1' onClick={() => setOpenApprove(false)}>No, Cancel</Button1>
                    <div>
                        <Button1 onClick={() => handlePaymentApprove(openApprove)} loading={openApprove?.loading}>Yes, I Approve Payment</Button1>
                    </div>
                </div>
            </div>
        </Modal1>
    </div>
  )
}


function StatusCol({params}) {
    const [loadings] = useState({approve: false})

    // async function waiter(ev,callback) {
    //     ev?.preventDefault();
    //     ev?.stopPropagation();
        
    //     setLoadings(({...loadings,approve: true}))
    //     await callback(params?.row?._id)
    //     // await new Promise((resolve) => setTimeout(() => resolve(),2000))
    //     setLoadings(({...loadings,approve: false}))
    // }
    
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
                        const {approvePayment} = value || {}
                        return (
                            <CustomMenu 
                                element={
                                <label className="block p-2 px-4 cursor-pointer">
                                    <Icon icon={"pepicons-pop:dots-y"} />
                                </label>
                                }
                            >
                                <div className='menuItem'>
                                    {params?.row?.reason === 'IssueTicket' &&
                                     params?.row?.paymentMode === 'Cash' ? 
                                        <MenuContainer loader={'approve'}
                                            showFor={['Pending']}
                                            onClick={() => approvePayment(params?.row?._id)} value={params.value} >Approve Payment</MenuContainer>
                                    :null}
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