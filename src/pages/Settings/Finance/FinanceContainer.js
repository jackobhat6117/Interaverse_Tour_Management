import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CustomLink } from '../../../components/Settings/CustomLink';

export const financeLinks = [
  {to: "/settings/finance/", title: '', icon: 'vaadin:cash',label: "Payout"},
  {to: "/settings/finance/method", title: 'method', icon: 'mdi:hand-coin',label: "Payout Method"},
  {to: "/settings/finance/payment", title: 'payment', icon: 'simple-icons:contactlesspayment', label: "Payment Method"},
  {to: "/settings/finance/gateway", title: 'gateway', icon: 'fluent:collections-add-20-filled', label: "Payment Gateway"},
  {to: "/settings/finance/balance", title: 'balance', icon: 'material-symbols-light:account-balance-wallet', label: "Wallet Balance"},
  {to: "/settings/finance/currency", title: 'currency', icon: 'ph:currency-ngn-fill', label: "Exchange Rate"},
]

export default function FinanceContainer() {
  const location = useLocation();

  let pathname = location.pathname.split("/");
  let page = pathname[pathname.length-1]

  return (
    <div className='flex flex-1 flex-col gap-4 w-full h-full'>
      <div className='hidden sm:flex gap-2 overflow-x-auto overflow-hidden w-full'>
        {financeLinks.map(({to,title,icon,label},i) => (
          <CustomLink key={i} to={to} active={!page ? title === '' : title === page} Icon={icon} label={label} />
        ))}
      </div>
      <div className='sm:hidden vector-bg text-white p-2'>
        <h3 className='capitalize text-white'>{page || 'Payout'}</h3>
      </div>

      <hr className='hidden sm:block mb-2' />
      <Outlet />
    </div>
  )
}
