import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/DIsplay/Nav/BreadCrumb";
import { Link } from "react-router-dom";
import Button1 from "../../../../components/form/Button1";
import TextInput from "../../../../components/form/TextInput";
import { Menu } from "../../OrdersData";
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

export default function FlightOrder() {
  let obj = {
    needsReview: true,
    orderId: "F34FJJ6",
  };
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
      pdf.save(obj?.orderId + ".pdf");
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
                  <TextInput
                    select
                    size="small"
                    label="Manage this order"
                    noShrink
                    className="!min-w-[180px] bg-primary/10"
                  >
                    <div className="menuItem">
                      <Menu
                        value={"pending"}
                        label="Add Seats"
                        hideFor={["confirmed"]}
                      />
                      <Menu
                        value={"pending"}
                        label="Add Bags"
                        hideFor={["confirmed"]}
                      />
                      <Menu
                        value={"pending"}
                        label="Add Insurance"
                        hideFor={["confirmed"]}
                        onClick={() => setOpenInsurance(true)}
                      />
                      <Menu
                        value={"pending"}
                        label="Confirm Payment"
                        showFor={["pending", "on hold"]}
                      />
                      <Menu
                        value={"pending"}
                        label="Edit PNR"
                        hideFor={["confirmed"]}
                      />
                      <Menu
                        value={"pending"}
                        label="Hold Order"
                        hideFor={["confirmed"]}
                      />
                      <Menu
                        value={"pending"}
                        label="Cancel Order"
                        className="!bg-red-500 !text-white !rounded-md"
                      />
                    </div>
                  </TextInput>
                </div>
              </div>
            </div>

            <hr />
            {obj?.needsReview ? (
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
            <div className="py-4">
              <PassengerInfo label={"Adult"} />
              <PassengerInfo label={"Child"} />
            </div>
            <PriceSummary data={order} />
            <ShareViaEmail />
          </div>

          <div>
            <StatusBar data={order} />
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
