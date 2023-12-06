import { useNavigate, useParams } from "react-router-dom";
import RadioGroup from "../form/RadioGroup";
import Icon from "../HOC/Icon";
import Button1 from "../form/Button1";
import payForTicket from "../../controllers/Flight/payForTicket";
import { useSnackbar } from "notistack";
import { useState } from "react";

export default function PaymentMethod({data}) {
  const {id} = useParams();
  const options = [
    {icon: <Icon icon='' />,name: 'Pay with stored card',description: 'Pay with sotred card',value: 'stored'},
    {icon: <Icon icon='' />,name: 'Pay instantly with a new card',description: 'Pay with a debit or credit card',value: 'card'},
    {icon: <Icon icon='' />,name: 'Pay with miles balance',description: 'Pay with a debit or credit card',value: 'balance'},
  ]
  const [method,setMethod] = useState(options[1].value);
  const [loading,setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();

  async function handlePay() {
    let obj = {
      ...data,
      paymentMode: 'Card',
      callback: window.location.href
    }
    setLoading(true);
    const res = await payForTicket(obj)
    setLoading(false);
    if(res.return) {
      navigate('/orders/1')
    } else enqueueSnackbar(res?.msg,{variant: 'error'})
  }
  return (
    <div className='border p-4 flex flex-col gap-6 md:min-w-[400px] '>
      <h5>Choose payment method</h5>
      <hr />
      <RadioGroup options={options} value={method} 
        className='flex flex-col gap-4'
        onChange={(val) => setMethod(val)}
        render={(obj) => (
          <div className="flex flex-col">
            <span>{obj.name}</span>
            <small>{obj.description}</small>
          </div>
        )} />
      <hr />
      <Button1 loading={loading} onClick={handlePay}>Pay now</Button1>
    </div>
  )
}