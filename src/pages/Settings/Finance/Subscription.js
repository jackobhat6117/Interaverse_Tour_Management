import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { currency } from '../../../features/utils/countires';

const cardPlan = [
    {title: "Starter", description: "For starter travel business", amount: 5, pyamentplan: "per user/month", currency: "paid in local currency", btn: "Edit Details"},
    {title: "Premium", description: "Enhance team productivity and coordination", amount: 20, pyamentplan: "per business/month", currency: "paid in local currency", btn: "Edit Details"},
    {title: "Ultimate", description: "Designed for travel businesses aiming to achieve rapid, confident growth.", amount: 50, pyamentplan: "per business/month", currency: "paid in local currency", btn: "Edit Details"},
    {title: "Enterprise", description: "For enterprise who want to scale quickly with confidence.", listdetail: ["Discounts on high volume", "Tailored solution", "Unlimited users", "Dedicated technical support", "User your own IATA accreditation"], btn: "Edit Details"}
]

const Subscription = () => {
  return (
   <div>


   </div>
  )
}

export default Subscription
