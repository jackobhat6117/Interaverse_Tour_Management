import { Radio } from "@mui/material";
import React, { useState } from "react";
import ConfirmMilesPaymentModal from "../../../components/modal/ConfirmMilesPaymentModal";
import { useNavigate } from "react-router-dom";

function TourOrderPaymentPage() {
  const navigate = useNavigate();
  const [payment, setPayment] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleChoosePay = (type) => {
    setPayment(type);
  };

  const handleCancelModal = () => {
    setModalOpen(false);
  };

  const handleConfirmModal = () => {
    navigate("/tour/confirmation");
  };

  const handlePay = () => {
    setModalOpen(true);
  };

  return (
    <div className={Classname.container}>
      <div className={Classname.content}>
        <ConfirmMilesPaymentModal
          open={modalOpen}
          setOpen={setModalOpen}
          onConfirm={handleConfirmModal}
          onBack={handleCancelModal}
        />
        {/* Page title */}
        <div className={Classname.titleContainer}>
          {`Tour > Orders > London > New Order > Single Tour > Tourist Details > `}{" "}
          <span className={Classname.titleMain}>Payment</span>
        </div>
        <div className={Classname.detail}>
          <div className={Classname.boxTitleContainer}>
            <div className={Classname.boxTitleContent}>
              <span className={Classname.boxTitleContentTitle}>
                London Eye, Big Bus and Thames River Cruise
              </span>
              <img
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className={Classname.boxTitleContentImage}
              />
              <div
                className={`${Classname.boxTitleTitleRow} ${Classname.boxTitleTitleRow1}`}
              >
                <span>Price Summary</span>
                <span className={Classname.boxTitleAmount}>Amount</span>
              </div>
              <div className={`${Classname.boxTitleTitleRow} `}>
                <span>Payable to Intraverse: </span>
                <span>₦900,000</span>
              </div>
              <div className={`${Classname.boxTitleTicketContainer} `}>
                <span>Ticketing fee:</span>
                <span>+₦3,000</span>
              </div>
              <div
                className={`${Classname.boxTitleTitleRow} ${Classname.boxTitleTitleRow2}`}
              >
                <span>Total due:</span>
                <span>₦903,000</span>
              </div>
            </div>
          </div>
          <div className={Classname.methodsContainer}>
            <div className={Classname.methodTitleContainer}>
              Choose payment method
            </div>
            <div
              className={Classname.method}
              onClick={() => handleChoosePay("new")}
            >
              <img
                src="/IconNewCard.svg"
                alt=""
                className={Classname.methodIcon}
              />
              <div className={Classname.methodDetail}>
                <div className={Classname.methodContent}>
                  <span className={Classname.methodContentTitle}>
                    Pay with a new card
                  </span>
                  <span className={Classname.methodContentDescription}>
                    Pay with a debit or credit card
                  </span>
                </div>
                <Radio
                  checked={payment === "new"}
                  onChange={() => handleChoosePay("new")}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
              </div>
            </div>
            <div
              className={Classname.method}
              onClick={() => handleChoosePay("stored")}
            >
              <img
                src="/IconStoredCard.svg"
                alt=""
                className={Classname.methodIcon}
              />
              <div className={Classname.methodDetail}>
                <div className={Classname.methodContent}>
                  <span className={Classname.methodContentTitle}>
                    Pay with stored card
                  </span>
                  <span className={Classname.methodContentDescription}>
                    Pay with stored card
                  </span>
                </div>
                <Radio
                  checked={payment === "stored"}
                  onChange={() => handleChoosePay("stored")}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
              </div>
            </div>
            <div
              className={Classname.method}
              onClick={() => handleChoosePay("miles")}
            >
              <img
                src="/IconMiles.svg"
                alt=""
                className={Classname.methodIcon}
              />
              <div className={Classname.methodDetail}>
                <div className={Classname.methodContent}>
                  <span className={Classname.methodContentTitle}>
                    Pay with miles balance
                  </span>
                  <span className={Classname.methodContentDescription}>
                    Pay from your miles wallet balance
                  </span>
                </div>
                <Radio
                  checked={payment === "miles"}
                  onChange={() => handleChoosePay("miles")}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
              </div>
            </div>
            <button className={Classname.payButton} onClick={handlePay}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourOrderPaymentPage;

const Classname = {
  container:
    "flex w-screen min-h-screen relative bg-white flex-col items-center px-3 sm:px-10 font-main",
  content: "flex w-full max-w-7xl flex-col flex-1",
  titleContainer: "w-full text-xl font-bold text-gray-400 my-10",
  titleMain: "text-black",
  detail: "flex flex-1 flex-col items-center",
  boxTitleContainer:
    "w-full max-w-lg rounded-lg p-4 border border-gray-400 mt-20 flex flex-col mb-4",
  boxTitleContent: "w-full rounded-md p-4 border border-gray-400",
  boxTitleContentTitle: "font-bold text-lg mb-2",
  boxTitleContentImage: "w-full rounded-lg h-64 object-cover mt-4 mb-2",
  boxTitleTitleRow:
    "flex w-full justify-between font-bold text-lg items-center ",
  boxTitleTitleRow1: "border-b border-gray-300 pb-2 mb-4",
  boxTitleTitleRow2: "border-t border-gray-300 pt-2 mt-4",
  boxTitleAmount: "text-sm font-normal",
  boxTitleTicketContainer: "mb-6 flex justify-between w-full items-center",
  methodsContainer:
    "w-full max-w-lg rounded-lg p-4 border border-gray-400 mt-4 flex flex-col mb-10",
  methodTitleContainer: "font-bold text-lg border-b border-gray-300 pb-2",
  method:
    "flex w-full gap-3 items-center pt-3 cursor-pointer pb-4 border-b border-gray-300",
  methodIcon: "",
  methodDetail: "flex flex-1 items-center gap-2",
  methodContent: "flex flex-col flex-1",
  methodContentTitle: "text-lg font-semibold",
  methodContentDescription: "text-sm",
  payButton:
    "w-full flex items-center justify-center font-bold text-white bg-primary1 rounded-md mt-4 mb-2 h-14",
};
