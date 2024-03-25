import React from 'react'
import { formatMoney } from '../../features/utils/formatMoney'

export default function Stats({data}) {
  return (
    <div className='flex flex-col gap-10'>
        <Overview data={data} />
        <Flights data={data} />
    </div>
  )
}

const Card = ({count,label,callback}) => (
    <div className='flex gap-4 justify-between bg-primary/5 card p-5 py-3 rounded-md border border-primary/10'>
        <div className='flex flex-col gap-1 min-w-[200px]'>
            <b className='text-2xl'>{callback ? callback(count || 0) : (count || 0)}</b>
            <div>{label}</div>
        </div>
    </div>
)


function Overview({data}) {
    let obj = {
        allBookings: (
            data?.productStat?.flight?.systemCanceled +
            data?.productStat?.flight?.totalFailedBookings +
            data?.productStat?.flight?.totalIssuedBookings +
            data?.productStat?.flight?.totalIssuableBookings +
            data?.productStat?.flight?.totalPendingBookings
            ),
        totalCustomers: data?.userStat?.flight?.totalCustomers,
        allTrans: (
                data?.paymentStat?.flight?.successfulPayments + 
                data?.paymentStat?.flight?.pendingPayments
            ),
        receivedPayment: data?.paymentStat?.flight?.successfulPayments,
        pendingPayment: data?.paymentStat?.flight?.pendingPayments,
        walletPayment: data?.paymentStat?.flight?.successfulWalletTopUps,
    }
    return (
        <div className='flex flex-col gap-4'>
            <h5>Overview</h5>
            <div className='flex gap-4 flex-wrap'>
                <Card count={obj.totalCustomers} label='Customers' />
                <Card count={obj.allBookings} label='All Bookings' />
                <Card count={obj.allTrans} label='All Transactions' />
                <Card count={obj.receivedPayment} label='Received Payments' />
                <Card count={obj.pendingPayment} label='Pending Payments' />
                <Card count={obj.walletPayment} label='Wallet Payments' />
            </div>
        </div>
    )
}
function Flights({data}) {
    let obj = {
        allBookings: (
            data?.productStat?.flight?.systemCanceled +
            data?.productStat?.flight?.totalFailedBookings +
            data?.productStat?.flight?.totalIssuedBookings +
            data?.productStat?.flight?.totalIssuableBookings +
            data?.productStat?.flight?.totalPendingBookings
            ),
        totalPayments: (
            data?.paymentStat?.flight?.successfulPaymentsAmount + 
            data?.paymentStat?.flight?.pendingPaymentsAmount
        ),
        cancelledBookings: data?.productStat?.flight?.canceledBookings,
        expired: data?.productStat?.flight?.systemCanceled,
        receivedPayment: data?.paymentStat?.flight?.successfulPayments,
        issued: data?.productStat?.flight?.issuedBookingsAmount,
        pending: data?.productStat?.flight?.pendingBookingsAmount,
    }
    return (
        <div className='flex flex-col gap-4'>
            <h5>Flights</h5>
            <div className='flex gap-4 flex-wrap'>
                <Card count={obj.allBookings} label='All Bookings' />
                <Card count={obj.totalPayments} label='Total Payments' callback={(val) => formatMoney(val)} />
                <Card count={obj.cancelledBookings} label='Cancelled Bookings' />
                <Card count={obj.expired} label='Expired Bookings' />
                <Card count={obj.receivedPayment} label='Received Payments' />
                <Card count={obj.issued} label='Issued Tickets' />
                <Card count={obj.pending} label='Pending' />
            </div>
        </div>
    )
}