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

export default function FlightOrder() {
  const { id } = useParams();
  const [onChangedData, setOnChangedData] = useState(true);
  const [openExport, setOpenExport] = useState(false);
  const [openEmailExport, setOpenEmailExport] = useState(false);
  const [openPDFExport, setOpenPDFExport] = useState(false);
  const [openInsurance, setOpenInsurance] = useState(false);
  const [selectedOption, setSelectedOption] = useState();
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);

  function handleOption() {
    if (selectedOption === "email") setOpenEmailExport(true);
    else if (selectedOption === "pdf") {
      setOpenPDFExport(true);
      setTimeout(() => handlePDFExport(), 2000);
    }

    setOpenExport(false);
  }

  function handlePDFExport() {
    // Get the component element
    const component = document.getElementById("flightDoc");

    // Capture screenshot using html2canvas
    html2canvas(component).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Create a new jsPDF instance
      const pdf = new jsPDF();

      // Calculate the width and height of the PDF document
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the screenshot image to the PDF document
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Download the PDF
      pdf.save(order?.booking?.bookingId + ".pdf");
    });
  }

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await getBooking(id);
      setLoading(false);
      if (res.return) {
        setOrder(res.data);
      }
    };
    fetch();
  }, [id]);

  const orderData = order?.booking?.flightBooking?.at(0)
  let orderType = (orderData) ? 'flight' : ''
  console.log(order)
  
  return (
    <div className="flex flex-col gap-4 pd-md py-4">
      <BreadCrumb>
        <Link to="/order">Orders</Link>
        <label>Confirmation</label>
      </BreadCrumb>

      {loading ? (
        <LinearProgress /> //TODO: change this
      ) : (
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex gap-4 items-center">
              <h5>Flight details</h5>

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
                          className="!min-w-[180px] !text-primary flex gap-2 !bg-primary/10 p-2 px-3"
                        >
                          Manage this order
                          <Icon icon='mdi:arrow-down-drop' />
                        </button>
                      }
                    >

                    <OrderMenus data={{id,status: orderData?.status,orderType}} inDetail
                      actions={{
                        addInsurance: (id) => setOpenInsurance(id)
                      }}
                    />
                    </CustomMenu>
                  {/* </TextInput> */}
                </div>
              </div>
            </div>

            <hr />
            {order?.booking?.flightBooking[0]?.needsReview ? (
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <div className="flex flex-1 justify-start gap-2 ">
                    <div className="">
                      <button
                        className={`${onChangedData ? "!btn" : "btn-light"}`}
                        onClick={() => setOnChangedData(true)}
                      >
                        New Details
                      </button>
                    </div>
                    <div className="">
                      <button
                        className={`${!onChangedData ? "!btn" : "btn-light"}`}
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
                  value={false}
                  text="This order is not changeable"
                />
              </div>
              <div className="flex-1">
                <PolicyStatus
                  title="Order Refund Policy"
                  value={true}
                  text="This order is refundable up until the initial departure date"
                />
              </div>
            </div>

            <div className="py-4">
              {order?.orderDetail?.travelers &&
                Array.isArray(order?.orderDetail?.travelers) &&
                order?.orderDetail?.travelers?.map((traveler) => (
                  <PassengerInfo
                    label={getPassengerCategory(traveler.dateOfBirth)}
                    traveler={traveler}
                    order={order}
                  />
                ))}
              {/* <PassengerInfo label={"Adult"} />
              <PassengerInfo label={"Child"} /> */}
            </div>
            <PriceSummary data={order} />
            <ShareViaEmail />
          </div>

          <div>
            <StatusBar
              needsReview={order?.booking?.flightBooking[0]?.needsReview}
              data={order}
            />
          </div>
        </div>
      )}

      <Modal1 open={openEmailExport} setOpen={setOpenEmailExport}>
        <EmailExport />
      </Modal1>

      <Modal1 open={openExport} setOpen={setOpenExport}>
        <div className="card p-10 flex flex-col gap-4">
          <h5 className="self-center">Export Order</h5>
          <RadioGroup
            options={[
              {
                title: "Export to Email",
                description: "Select the option to export the order via email",
                value: "email",
              },
              {
                title: "Export as PDF",
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
        <FlightDoc />
      </Modal1>

      <Modal1 open={openInsurance} setOpen={setOpenInsurance}>
        <Insurance cancel={() => setOpenInsurance(false)} />
      </Modal1>
    </div>
  );
}
