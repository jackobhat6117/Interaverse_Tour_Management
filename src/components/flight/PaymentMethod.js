import RadioGroup from "../form/RadioGroup";
import Button1 from "../form/Button1";
import payForTicket from "../../controllers/Flight/payForTicket";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Modal } from "@mui/material";
import card from '../../assets/icons/payment/card-payment.svg'
import payment from '../../assets/icons/payment/payment.svg'
import wallet from '../../assets/icons/payment/wallet.svg'

export default function PaymentMethod({data,callback,className}) {
  // const {id} = useParams();
  // Bank, Card, USSD, QR, MobileMoney, BankTransfer
  const [paynow,setPaynow] = useState(false);
  const options = [
    {
      icon: <img alt='' src={card} className="" />,
      name: "Pay with stored card",
      description: "Pay with stored card",
      value: "stored",
    },
    {
      icon: <img alt='' src={payment} className="" />,
      name: "Pay instantly with a new card",
      description: "Pay with a debit or credit card",
      value: "Card",
    },
    {
      icon: <img alt='' src={wallet} className="" />,
      name: "Pay with miles balance",
      description: "Pay with a debit or credit card",
      value: "balance",
    },
  ];
  const [method, setMethod] = useState(options[1].value);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();
  const [paymentUrl, setPaymentUrl] = useState();

  async function handlePay() {
    let obj = {
      ...(data.paymentData || {}),
      paymentMode: method,
      callback: window.location.href,
    };
    setLoading(true);
    const res = await payForTicket(obj);
    setLoading(false);
    if (res.return) {
      setPaymentUrl(res?.data?.data?.authorization_url);
      // navigate(data.link)
    } else enqueueSnackbar(res?.msg, { variant: "error" });
  }
  return (
    <div
      className={"border p-4 flex flex-col gap-6 md:min-w-[400px] " + className}
    >
      <h5>Choose payment method</h5>
      <hr />
      {paynow ? 
        <div className="flex flex-col gap-3">
          <RadioGroup options={options} value={method} 
            className='flex flex-col gap-4'
            radioClass='flex-row-reverse justify-between'
            onChange={(val) => setMethod(val)}
            render={(obj) => (
              <div className="flex gap-2">
                <div className="w-7">
                  {obj.icon}
                </div>
                <div className="flex flex-col">
                  <span>{obj.name}</span>
                  <small>{obj.description}</small>
                </div>
              </div>
            )} />
          <hr />
          <div className="flex flex-col ">
            <h5>Flexify</h5>
            <p>Pay in instalments</p>
          </div>
          <hr />
          <div className="flex flex-col ">
            <h5>Price freeze</h5>
            <p>Hold price for a while</p>
          </div>
          <hr />
          <Button1 loading={loading} onClick={handlePay}>Pay now</Button1>
          <button className="p-2" onClick={() => callback && callback()}>Hold booking and pay later</button>
        </div>
      :
        <div className="flex flex-col gap-3">
          <Button1 onClick={() => setPaynow(true)}>Pay now</Button1>
          <button className="btn bg-primary" onClick={() => callback && callback()}>Hold booking and pay later</button>
        </div>
      }
      <Modal
        open={Boolean(paymentUrl)}
        onClose={() => setPaymentUrl(undefined)}
      >
        <div className="h-full max-w-[50%] overflow-y-scroll md:overflow-y-hidden">
          <iframe src={paymentUrl} title="Payment" className="w-full h-full" />
        </div>
      </Modal>
    </div>
  );
}
