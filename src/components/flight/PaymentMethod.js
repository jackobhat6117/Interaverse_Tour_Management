import RadioGroup from "../form/RadioGroup";
import Icon from "../HOC/Icon";
import Button1 from "../form/Button1";
import payForTicket from "../../controllers/Flight/payForTicket";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Modal } from "@mui/material";

export default function PaymentMethod({data,callback,className}) {
  // const {id} = useParams();
  // Bank, Card, USSD, QR, MobileMoney, BankTransfer
  const [paynow,setPaynow] = useState(false);
  const options = [
    {
      icon: <Icon icon="" />,
      name: "Pay with stored card",
      description: "Pay with stored card",
      value: "stored",
    },
    {
      icon: <Icon icon="" />,
      name: "Pay instantly with a new card",
      description: "Pay with a debit or credit card",
      value: "Card",
    },
    {
      icon: <Icon icon="" />,
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
            onChange={(val) => setMethod(val)}
            render={(obj) => (
              <div className="flex flex-col">
                <span>{obj.name}</span>
                <small>{obj.description}</small>
              </div>
            )} />
          <hr />
          <Button1 loading={loading} onClick={handlePay}>Pay now</Button1>
          <button className="btn" onClick={() => callback && callback()}>Hold booking and pay later</button>
        </div>
      :
        <div className="flex flex-col gap-3">
          <Button1 onClick={() => setPaynow(true)}>Pay now</Button1>
          <button className="btn" onClick={() => callback && callback()}>Hold booking and pay later</button>
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
