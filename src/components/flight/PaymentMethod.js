import RadioGroup from "../form/RadioGroup";
import Button1 from "../form/Button1";
import payForTicket from "../../controllers/Flight/payForTicket";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { MenuItem, Modal } from "@mui/material";
import card from "../../assets/icons/payment/card-payment.svg";
import payment from "../../assets/icons/payment/payment.svg";
import wallet from "../../assets/icons/payment/wallet.svg";
import holdFlightBooking from "../../controllers/booking/holdFlightBooking";
import TextInput from "../form/TextInput";
import getSavedCards from "../../controllers/Bank/getSavedCards";
import { getTestLevel } from "../../utils/testLevel";

export default function PaymentMethod({
  flightBookingId,
  callback,
  handleReturn,
  className,
  deductCommission,
  hide,
  expand
}) {
  // const {id} = useParams();
  // Bank, Card, USSD, QR, MobileMoney, BankTransfer
  const [paynow, setPaynow] = useState(expand);
  const options = [
    {
      icon: <img alt="" src={card} className="" />,
      name: "Pay with stored card",
      description: "Pay with stored card",
      value: "SavedCard",
    },
    {
      icon: <img alt="" src={payment} className="" />,
      name: "Pay instantly with a new card",
      description: "Pay with a debit or credit card",
      value: "Card",
    },
  ];

  if(getTestLevel() < getTestLevel('qa'))
    options.push({
      icon: <img alt="" src={wallet} className="" />,
      name: "Pay with Intraverse balance",
      description: "Pay with a debit or credit card",
      value: "Wallet",
    })
  
  const [method, setMethod] = useState(options[1].value);
  const [loading, setLoading] = useState(false);
  const [loadingCards, setLoadingCards] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();
  const [paymentUrl, setPaymentUrl] = useState();
  const [cards,setCards] = useState([])
  const [selectedCard,setSelectedCard] = useState();

  useEffect(() => {
    if(method === 'SavedCard')
      loadCards();
    //eslint-disable-next-line
  },[method])

  async function handlePay() {
    const url = new URL(window.location.href);

    const searchParams = url.searchParams;
    searchParams.set('payed', 'true');
    url.search = searchParams.toString();
    const newUrl = url.toString();

    let obj = {
      flightBookingId,
      paymentMode: method,//method,
      callback: newUrl,
      onClose: callback && callback,
      deductCommission,
    };
    if(method === 'SavedCard')
      obj.savedCardId = selectedCard;

    setLoading(true);
    const res = await payForTicket(obj);
    setLoading(false);
    if(handleReturn) return handleReturn(res);
    if (res.return) {
      const url = res?.data?.data?.authorization_url;
      // setPaymentUrl(res?.data?.data?.authorization_url);
      // const width = 600; // Desired width of the popup window
      // const height = 400; // Desired height of the popup window

      // const left = window.screen.width / 2 - width / 2;
      // const top = window.screen.height / 2 - height / 2;

      // const options = `width=${width}, height=${height}, left=${left}, top=${top}`;

      if(url) {
        setPaymentUrl(url);
        const popup = window.open(url,'popupWindow')
        const checkPopupClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkPopupClosed);
            setPaymentUrl(undefined)
            callback && callback();
          }
        }, 1000);
      } else {
        enqueueSnackbar(res?.msg,{variant: 'success'});
        callback && callback();
      }
    } else enqueueSnackbar(res?.msg, { variant: "error" });
  }

  async function loadCards() {
    setLoadingCards(true);
    const res = await getSavedCards();
    setLoadingCards(false);
    if(res.return) {
      setCards(res?.data?.data)
    } else enqueueSnackbar(res?.msg,{variant: 'error'})
  }

  async function handleHold() {
    setLoading(true);
    const res = await holdFlightBooking(flightBookingId);
    setLoading(false);
    if(res.return) {

      callback && callback()
    }
  }

  return (
    <div
      className={"border p-4 flex flex-col gap-6 md:min-w-[400px] " + className}
    >
      <h5>Choose payment method</h5>
      <hr />
      {paynow ? (
        <div className="flex flex-col gap-3">
          {method === 'SavedCard' ? 
            <TextInput select onChange={(ev) => setSelectedCard(ev?.target?.value)} label={'Saved Cards'}>
              <div className="w-full flex justify-center items-center">
                {loadingCards ? <div className="load text-primary"></div> : null}
              </div>
              {cards?.map((card,i) => (
                <MenuItem value={card?._id} key={i}>
                  <div className="flex gap-4 justify-between items-center w-full">
                    <div>
                      <b>{card?.bank}</b>
                      <p>{card?.bin} {card?.last4}</p>
                    </div>
                    <div className='flex flex-col gap-1 text-xs'>
                      <span className='flex gap-2 justify-between'>EXPIRY <span>{card?.exp_month}/{card?.exp_year}</span></span>
                      <span className='flex gap-2 justify-between'>{card?.channel} <span>{card?.card_type}</span></span>
                    </div>
                  </div>
                </MenuItem>
              ))}
            </TextInput>
          :null}
          <RadioGroup
            options={options}
            value={method}
            className="flex flex-col gap-4"
            radioClass="flex-row-reverse justify-between"
            onChange={(val) => setMethod(val)}
            render={(obj) => (
              <div className="flex gap-2">
                <div className="w-7">{obj.icon}</div>
                <div className="flex flex-col">
                  <span>{obj.name}</span>
                  <small>{obj.description}</small>
                </div>
              </div>
            )}
          />
          <hr />
          {(!hide || !hide.includes('flexify')) && getTestLevel() < getTestLevel('qa') ? 
            <div className="flex flex-col ">
              <h5>Flexify</h5>
              <p>Pay in instalments</p>
              <hr />
            </div>
          :null}
          {(!hide || !hide.includes('freeze')) && getTestLevel() < getTestLevel('qa') ? 
            <div className="flex flex-col ">
              <h5>Price freeze</h5>
              <p>Hold price for a while</p>
              <hr />
            </div>
          :null}
          <Button1 loading={loading} onClick={handlePay}>Pay now</Button1>
          {!hide || !hide.includes('booklater') ? 
            <Button1 variant='outlined' className="!p-2 !border !border-primary !bg-transparent !text-primary" loading={loading} onClick={handleHold}>Hold booking and pay later</Button1>
          :null}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <Button1 onClick={() => setPaynow(true)}>Pay now</Button1>
          <Button1 className="!btn !bg-primary/90 !text-secondary" loading={loading} onClick={handleHold}>Hold booking and pay later</Button1>
        </div>
      )}
      <Modal
        open={Boolean(paymentUrl)}
        onClose={() => setPaymentUrl(undefined)}
      >
        <div className="h-full max-w-[100%] flex flex-col text-secondary bg-primary/80 items-center justify-center overflow-y-scroll md:overflow-y-hidden">
          {/* <iframe src={paymentUrl} title="Payment" className="w-full h-full" /> */}
          <div className="text-center">
            <div className="text-2xl">Waiting for payment</div>
            <p className="text-secondary">Close the payment window to continue</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
