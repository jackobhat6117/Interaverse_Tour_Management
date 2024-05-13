import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/DIsplay/Nav/BreadCrumb";
import { Link } from "react-router-dom";
import Button1 from "../../../../components/form/Button1";
import TextInput from "../../../../components/form/TextInput";
import { Menu, OrderMenus } from "../../OrdersData";
import Modal1 from "../../../../components/DIsplay/Modal/Modal1";
import RadioGroup from "../../../../components/form/RadioGroup";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import FlightDoc from "./FlightDoc";
import Insurance from "./Insurance";
import EmailExport from "./EmailExport";
import StatusBar from "./StatusBar";
import ShareViaEmail from "./SareViaEmail";
import PriceSummary from "./PriceSummary";
import PassengerInfo from "./PassengerInfo";
import FlightInfo from "./FlightInfo";
import { useParams } from "react-router-dom";
import getBooking from "../../../../controllers/booking/getBooking";
import { LinearProgress } from "@mui/material";
import { getPassengerCategory } from "../../../../utils/getPassengerCategory";
import PolicyStatus from "../../../../components/flight/PolicyStatus";
import CustomMenu from "../../../../components/utils/CustomMenu";
import Icon from "../../../../components/HOC/Icon";
import PaymentMethod from "../../../../components/flight/PaymentMethod";
import { shareFlightBookingPDF } from "../../../../controllers/Flight/shareFlightBookingPDF";
import { useSnackbar } from "notistack";
import CancelOrder from "../../cancelOrder";
import TicketIssue from "../../IssueTicket";
import { def } from "../../../../config";
import ApproveTicket from "../../ApproveTicket";

export default function FlightOrder() {
  const { id } = useParams();
  const [onChangedData, setOnChangedData] = useState(true);
  const [openExport, setOpenExport] = useState(false);
  const [openEmailExport, setOpenEmailExport] = useState(false);
  const [openPDFExport, setOpenPDFExport] = useState(false);
  const [openInsurance, setOpenInsurance] = useState(false);
  const [openIssueTicket, setOpenIssueTicket] = useState(false);
  const [openApproveTicket, setOpenApproveTicket] = useState(false);
  const [openPayment,setOpenPayment] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const [openCancelOrder, setOpenCancelOrder] = useState(false);

  const orderData = order?.booking?.flightBooking?.at(0)

  

  function handleOption() {
    if (selectedOption === "email") setOpenEmailExport(true);
    else if (selectedOption === "pdf") {
      setOpenPDFExport(true);
      setTimeout(() => handlePDFExport(), 500);
    }

    setOpenExport(false);
  }

  function handlePDFExport(callback) {
    const component = document.getElementById('flightDoc');
  
    const desiredWidth = 800; // Set your desired width here
  
    const scaleFactor = desiredWidth / component.offsetWidth;
  
    const desiredHeight = component.offsetHeight * scaleFactor;
  
    component.style.width = `${desiredWidth}px`;
    component.style.height = `${desiredHeight}px`;
  
    const segments = Array.from({ length: Math.floor(component?.offsetHeight / desiredHeight) + 1 }, (_, index) => index * desiredHeight);
    const pdf = new jsPDF();
  
    function captureSegmentScreenshot(index) {
      if (index >= segments.length) {
        if(callback)
          callback(pdf.output('blob'))
        else
          pdf.save(order?.booking?.bookingId + '.pdf');

        component.style.width = 'auto';
        component.style.height = 'auto';
  
        return;
      }
  
      if(index)
        pdf.addPage();
  
      setTimeout(() => html2canvas(component, {useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
  
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        const xPos = (pdfWidth - canvas.width * (pdfHeight / canvas.height)) / 2;
        const yPos = index * (desiredWidth - 500);
  
        pdf.addImage(imgData, 'PNG', xPos, -yPos, canvas.width * (pdfHeight / canvas.height), pdfHeight);
  
        captureSegmentScreenshot(index + 1);
      }),10);
    }
  
    captureSegmentScreenshot(0);
  }

  async function sendPDF(pdf,datas) {
    const bookingId = order?.booking?.bookingId;
    const date = order?.booking?.createdDate
    const departure = order?.orderDetail?.offers?.at(0)?.directions?.at(0)?.at(0)?.departure?.city ||
      orderData?.flights[0]?.departureLocation
    const arrival = order?.orderDetail?.offers?.at(-1)?.directions?.at(0)?.at(0)?.arrival?.city ||
      orderData?.flights[0]?.arrivalLocation

    const formData = new FormData();
    
    datas?.map(data => formData?.append('to',data.email))
    formData.append('subject','Flight Booking Details')
    formData.append('body','Booking details of '+departure+' to '+arrival)
    formData.append('pdf',pdf,bookingId+'--'+date+'.pdf');

    enqueueSnackbar('Sending... (This might take a while if the pdf is large)')
    const res = await shareFlightBookingPDF(formData);
    if(res.return) {
      enqueueSnackbar(res?.msg,{variant: 'success'})
    } else 
      enqueueSnackbar(res?.msg,{variant: 'error'})
  }
  function handleEmailExport(data) {
    setOpenPDFExport(true);
    
    setTimeout(() => handlePDFExport((pdf) => sendPDF(pdf,data)),500)
    setOpenEmailExport(false);
  }
  useEffect(() => {
    fetch();
    //eslint-disable-next-line
  }, [id]);

  const fetch = async () => {
    setLoading(true);
    const res = await getBooking(id);
    setLoading(false);
    if (res.return) {
      setOrder(res.data);
    }
  };

  let orderType = (orderData) ? 'flight' : ''
  console.log(order)

  // const amenities = order?.orderDetail?.pricing?.offers?.at(0)?.directions?.at(0)?.at(0)?.amenities
  // const refundable = amenities?.find(amen => amen.description === 'REFUNDS')
  const refundable = orderData?.isRefundable;
  const changable = orderData?.isChangeable;
  // const changable = amenities?.find(amen => amen.description === "CHANGEABLE TICKET")

  
  return (
    <div className="flex flex-col gap-4 pd-md py-4">
      <BreadCrumb>
        <Link to="/order">Orders</Link>
        <label>Confirmation</label>
      </BreadCrumb>

      {loading ? (
        <LinearProgress /> //TODO: change this
      ) : (
        <div className="flex gap-4 relative flex-wrap">
          <div className="flex flex-col gap-4 flex-1 max-w-full ">
            <div className="flex gap-4 items-center flex-wrap ">
              <h5 className="min-w-[200px]">Flight details</h5>

              <div className="flex flex-1 gap-3 justify-end flex-wrap">
                <div>
                  <Button1
                    variant={"outlined"}
                    className=""
                    onClick={() => setOpenExport(true)}
                  >
                    Export itinerary
                  </Button1>
                </div>
                <div>
                  {/* <TextInput
                    select
                    size="small"
                    label="Manage this order"
                    noShrink
                    className="!min-w-[180px] bg-primary/10"
                  > */}
                    <CustomMenu
                      element={
                        <button
                          className="!min-w-[180px] !text-primary flex gap-2 !bg-primary/10 p-2 px-3 whitespace-nowrap"
                        >
                          Manage this order
                          <Icon icon='mdi:arrow-down-drop' />
                        </button>
                      }
                    >

                    <OrderMenus data={{id,status: orderData?.status,orderType}} inDetail
                      actions={{
                        addInsurance: (id) => setOpenInsurance(id),
                        pay: () => setOpenPayment(orderData?._id),
                        cancelOrder: () => setOpenCancelOrder(orderData?._id),
                        issueTicket: () => setOpenIssueTicket(orderData),
                        approveTicket: () => setOpenApproveTicket(orderData),
                      }}
                    />
                    </CustomMenu>
                  {/* </TextInput> */}
                </div>
              </div>
            </div>

            <hr />
            {orderData?.needsReview ? (
              <div className="flex flex-col gap-4 max-w-full">
                <div className="flex gap-4 items-center flex-wrap-reverse ">
                  <div className="flex flex-1 justify-start flex-wrap gap-2 ">
                    <div className="">
                      <button
                        className={`whitespace-nowrap min-w-[160px] ${onChangedData ? "!btn" : "btn-light"}`}
                        onClick={() => setOnChangedData(true)}
                      >
                        New Details
                      </button>
                    </div>
                    <div className="">
                      <button
                        className={`whitespace-nowrap min-w-[160px] ${!onChangedData ? "!btn" : "btn-light"}`}
                        onClick={() => setOnChangedData(false)}
                      >
                        Previous Details
                      </button>
                    </div>
                  </div>
                  <button className="warn text-sm px-4 font-normal">
                    Changes detected
                  </button>
                </div>
                <hr />
              </div>
            ) : null}

            <FlightInfo data={order} />

            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <PolicyStatus
                  title="Order Change Policy"
                  value={changable}
                  text={changable ? "This order is changeable" : "This order is not changeable"}
                />
              </div>
              <div className="flex-1">
                <PolicyStatus
                  title="Order Refund Policy"
                  value={refundable}
                  text={refundable ? "This order is refundable up until the initial departure date" : 
                    "This order is not refundable"
                  }
                />
              </div>
            </div>

            <div className="py-4">
              {
                orderData?.travelers?.map((traveler,i) => (
                  <PassengerInfo key={i}
                    label={getPassengerCategory(traveler.birthDate)}
                    traveler={traveler}
                    order={order}
                  />
                ))}
              {/* <PassengerInfo label={"Adult"} />
              <PassengerInfo label={"Child"} /> */}
            </div>
            {def?.devTest ? 
              <div className="flex flex-col gap-2 light-bg p-2 px-4">
                <b>Flight Information</b>
                <div className="flex gap-4 text-theme1 overflow-x-auto whitespace-nowrap pb-2">
                  <div className="flex gap-1">
                    <Icon icon='mdi:seat-passenger' />
                    <p>Seat 30J</p>
                  </div>
                  <div className="flex gap-1">
                    <Icon icon='mdi:bag-suitcase' />
                    <p>1 checked bag</p>
                  </div>
                  <div className="flex gap-1">
                    <Icon icon='game-icons:school-bag' />
                    <p>1 carry on bag</p>
                  </div>
                </div>
              </div>
              :null
            }
            <PriceSummary data={order} />
            <ShareViaEmail flightBookingId={order?.booking?.flightBooking?.at(0)?._id}/>
          </div>

          <div className="sticky top-10 self-start w-full sm:w-auto">
            <StatusBar
              changeable={changable}
              needsReview={order?.booking?.flightBooking[0]?.needsReview}
              data={order}
              cancelOrder={() => setOpenCancelOrder(orderData?._id)}
            />
          </div>
        </div>
      )}

      <Modal1 open={openEmailExport} setOpen={setOpenEmailExport}>
        <EmailExport callback={handleEmailExport} />
      </Modal1>

      <Modal1 open={openExport} setOpen={setOpenExport}>
        <div className="card p-10 flex flex-col gap-4">
          <h5 className="self-center">Export Order</h5>
          <RadioGroup
            options={[
              {
                title: "Export PDF to Email",
                description: "Select the option to export the order via email",
                value: "email",
              },
              {
                title: "Download PDF",
                description: "Select the option to export the order via PDF",
                value: "pdf",
              },
            ]}
            className="flex flex-col gap-4"
            radioClass="!items-start"
            render={(obj) => (
              <div className="flex flex-col ">
                <b>{obj.title}</b>
                <p>{obj.description}</p>
              </div>
            )}
            value={selectedOption}
            onChange={(val) => setSelectedOption(val)}
          />

          <Button1 onClick={handleOption}>Confirm</Button1>
        </div>
      </Modal1>

      <Modal1 open={openPDFExport} setOpen={setOpenPDFExport}>
        <FlightDoc data={order} />
      </Modal1>

      <Modal1 open={openInsurance} setOpen={setOpenInsurance}>
        <Insurance cancel={() => setOpenInsurance(false)} />
      </Modal1>

      <Modal1 open={openPayment} setOpen={setOpenPayment}>
        <PaymentMethod callback={() => {fetch();setOpenPayment(false)}} flightBookingId={openPayment} hide={['booklater']} expand />
      </Modal1>

      <CancelOrder open={openCancelOrder} setOpen={setOpenCancelOrder} callback={() => {fetch();setOpenCancelOrder(false)}}/>

      <Modal1 open={openApproveTicket} setOpen={setOpenApproveTicket}>
        <ApproveTicket
          data={openApproveTicket}
          callback={() => {fetch();setOpenApproveTicket(false)}}
          close={() => setOpenApproveTicket(false)} />
      </Modal1>

      <Modal1 open={openIssueTicket} setOpen={setOpenIssueTicket}>
        <TicketIssue
          data={openIssueTicket}
          callback={() => {fetch();setOpenIssueTicket(false)}}
          close={() => setOpenIssueTicket(false)} />
      </Modal1>


    </div>
  );
}
