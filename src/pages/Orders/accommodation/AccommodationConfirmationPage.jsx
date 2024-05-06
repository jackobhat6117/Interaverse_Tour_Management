import { Radio } from "@mui/material";
import React, { useState } from "react";
import ConfirmMilesPaymentModal from "../../../components/modal/ConfirmMilesPaymentModal";
import { placeholderImage } from "../../../data/tour/tourData";

function AccommodationConfirmationPage() {
  const handleEmail = (type) => {};

  const handleExport = () => {};

  const handleManage = () => {};

  return (
    <div className={Classname.container}>
      <div className={Classname.content}>
        {/* Page title */}
        <div className={Classname.titleContainer}>
          {`Stays > `} <span className={Classname.titleMain}>Confirmation</span>
        </div>
        <div className={Classname.detail}>
          <div className={Classname.tourDetail}>
            <div className={Classname.tourDetailTitleContainer}>
              <span className="font-bold">Stay details</span>
              <div className={Classname.tourDetailTitleButtonContainer}>
                <button
                  className={Classname.tourDetailTitleExportButton}
                  onClick={handleExport}
                >
                  Export itinerary
                </button>
                <button
                  className={Classname.tourDetailTitleManageButton}
                  onClick={handleManage}
                >
                  Manage this order
                </button>
              </div>
            </div>
            <div className={Classname.tourNameContainer}>
              <div className={Classname.tourImageContainer}>
                <img
                  src={placeholderImage}
                  alt=""
                  className={Classname.tourImage}
                />
                <span>gb Travels</span>
              </div>
              <div className={Classname.tourDetailContainer}>
                <span className={Classname.tourName}>
                  London: London Eye, Big Bus and Thames River Cruise
                </span>
                <div className={Classname.tourDetailLocationContainer}>
                  <img
                    src="/IconLocationGreen.svg"
                    alt=""
                    className={Classname.tourDetailLocationIcon}
                  />
                  <span>Berlin City Boat Tour Starting at Friedrichstraße</span>
                </div>
              </div>
            </div>
            <div className={Classname.dateContainer}>
              <div className={Classname.dateFigureContainer}>
                <div className={Classname.datePoint}></div>
                <div className={Classname.dateLine}></div>
                <div className={Classname.datePoint}></div>
              </div>
              <div className={Classname.dateDetailContainer}>
                <div className={Classname.dateDetailDate}>
                  <span className="font-bold">Sat, 08 April 20223, 16:17</span>{" "}
                  Tour start time
                </div>
                <div className={Classname.dateDetailDuration}>
                  Tour duration: 12hours 14mins
                </div>
                <div className={Classname.dateDetailDate}>
                  <span className="font-bold">Sun, 09 April 20223, 05:23</span>{" "}
                  End of tour
                </div>
              </div>
            </div>
            <div className={Classname.tagsContainer}>
              <div className={Classname.tag}>
                <img
                  src="/IconSound.svg"
                  alt=""
                  className={Classname.tagIcon}
                />
                <span>Audio guide</span>
              </div>
              <div className={Classname.tag}>
                <img
                  src="/IconWheelchair.svg"
                  alt=""
                  className={Classname.tagIcon}
                />
                <span>Wheelchair accessible</span>
              </div>
              <div className={Classname.tag}>
                <img
                  src="/tourIconGlobe.svg"
                  alt=""
                  className={Classname.tagIcon}
                />
                <span>German</span>
              </div>
              <div className={Classname.tag}>
                <img
                  src="/tourIconTime.svg"
                  alt=""
                  className={Classname.tagIcon}
                />
                <span>One day validation</span>
              </div>
              <div className={Classname.tag}>
                <img
                  src="/tourIconPerson.svg"
                  alt=""
                  className={Classname.tagIcon}
                />
                <span>1 adult, 1 child</span>
              </div>
            </div>
            <div className={Classname.orderTags}>
              <div className={Classname.orderTag}>
                <span className={Classname.orderTagTitle}>
                  Order change policy
                </span>
                <div className={Classname.orderTagDescription}>
                  <img
                    src="/IconCloseRed1.svg"
                    alt=""
                    className={Classname.orderTagIcon}
                  />
                  <span>This order is not changeable</span>
                </div>
              </div>
              <div className={Classname.orderTag}>
                <span className={Classname.orderTagTitle}>
                  Order refund policy
                </span>
                <div className={Classname.orderTagDescription}>
                  <img
                    src="/IconCheckmark1.svg"
                    alt=""
                    className={Classname.orderTagIcon}
                  />
                  <span>
                    This order is refundable up until the initial departure date
                  </span>
                </div>
              </div>
            </div>
            <span className="font-bold text-lg mb-6">Guest</span>
            <div className={Classname.touristPersonHeader}>
              <div className={Classname.touristPerson}>
                <img
                  src="/IconPersonWhite.svg"
                  alt=""
                  className={Classname.touristPersonIcon}
                />
                <span>Sign-in Guest room one (1)</span>
              </div>
              <div className="flex flex-col">
                <span>Name</span>
                <span className="flex font-bold text-gray-600">
                  Ike Chinedu
                </span>
              </div>
              <div className="flex flex-col">
                <span>Name</span>
                <span className="flex font-bold text-gray-600">
                  {" "}
                  17/10/1956
                </span>
              </div>
              <div className="flex flex-col">
                <span>Name</span>
                <span className="flex font-bold text-gray-600">Male</span>
              </div>
            </div>
            <div
              className={`${Classname.tourNameContainer} p-4 bg-gray-100 mt-10 mb-10 rounded-lg`}
            >
              <div className={Classname.tourDetailContainer}>
                <span className="font-bold text-sm mb-1">Room Info</span>
                <span className={Classname.tourName}>
                  London: London Eye, Big Bus and Thames River Cruise
                </span>
              </div>
            </div>
            <div className={Classname.touristPersonHeader}>
              <div className={Classname.touristPerson}>
                <img
                  src="/IconPersonWhite.svg"
                  alt=""
                  className={Classname.touristPersonIcon}
                />
                <span>Sign-in Guest room one (1)</span>
              </div>
              <div className="flex flex-col">
                <span>Name</span>
                <span className="flex font-bold text-gray-600">
                  Ike Chinedu
                </span>
              </div>
              <div className="flex flex-col">
                <span>Name</span>
                <span className="flex font-bold text-gray-600">
                  {" "}
                  17/10/1956
                </span>
              </div>
              <div className="flex flex-col">
                <span>Name</span>
                <span className="flex font-bold text-gray-600">Male</span>
              </div>
            </div>
            <div
              className={`${Classname.tourNameContainer} p-4 bg-gray-100 mt-10 mb-10 rounded-lg`}
            >
              <div className={Classname.tourDetailContainer}>
                <span className="font-bold text-sm mb-1">Room Info</span>
                <span className={Classname.tourName}>
                  London: London Eye, Big Bus and Thames River Cruise
                </span>
              </div>
            </div>
            <button className={Classname.emailButton} onClick={handleEmail}>
              <img src="/IconMailIcon.svg" alt="" />
              <span>Share via email</span>
            </button>
          </div>
          <div className={Classname.information}>
            <span className={Classname.informationTitle}>Tour Information</span>
            <span className={Classname.informationDateContainer}>
              Last Synced:{" "}
              <strong className={Classname.informationDate}>
                {" "}
                09/04/2023, 16:46
              </strong>{" "}
            </span>
            <span>Status</span>
            <div className={Classname.informationStatus}>Confirmed</div>
            <div className={Classname.informationProviderContainer}>
              <div className={Classname.informationProviderColumn}>
                <span className={Classname.informationTitle}>Provider</span>
                <div className={Classname.informationProviderInfo}>
                  <img
                    src={placeholderImage}
                    alt=""
                    className={Classname.informationProviderImage}
                  />
                  <span>gb Travels</span>
                </div>
              </div>
              <div className={Classname.informationProviderColumn1}>
                <span className={Classname.informationTitle}>Issuing Date</span>
                <span className={Classname.informationProviderInfo}>
                  09/04/2023
                </span>
              </div>
            </div>
            <span className="mt-4">Order ID</span>
            <span className="font-bold">ff5g6WRg2</span>
            <span className="mt-4">Ticket Number</span>
            <span className={Classname.informationShow}>show</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccommodationConfirmationPage;

const Classname = {
  container:
    "flex w-screen min-h-screen relative bg-white flex-col items-center px-3 sm:px-10 font-main",
  content: "flex w-full max-w-7xl flex-col flex-1",
  titleContainer: "w-full text-xl font-bold text-gray-400 my-10",
  titleMain: "text-black",
  detail: "flex w-full gap-10",
  tourDetail: "flex flex-col flex-1",
  tourDetailTitleContainer: "flex items-center justify-between w-full",
  tourDetailTitleButtonContainer: "gap-6 ",
  tourDetailTitleExportButton:
    "h-12 px-4 rounded-md border-2 border-gray-300 font-bold mr-3",
  tourDetailTitleManageButton: "h-12 px-4 rounded-md bg-gray-300 font-bold",

  tourNameContainer: "flex flex-1 items-center gap-10",
  tourImageContainer: "flex flex-col w-24 items-center gap-2 font-bold text-sm",
  tourImage: "w-full h-24 object-cover",
  tourDetailContainer: "flex flex-col",
  tourName: "text-xl font-bold",
  tourDetailLocationContainer: "gap-2 flex items-center",
  tourDetailLocationIcon: "",

  dateContainer: "flex w-full gap-4 mt-6",
  dateFigureContainer: "flex flex-col items-center py-1",
  datePoint: "w-3 h-3 rounded-full bg-primary1",
  dateLine: "border-r flex flex-1 border-primary1",
  dateDetailContainer: "flex flex-col gap-4",
  dateDetailDate: "flex items-center gap-4",
  dateDetailDuration: "text-sm",

  tagsContainer: "flex items-center flex-wrap gap-4 mt-6",
  tag: "flex gap-2 items-center text-sm text-gray-500",
  tagIcon: "w-4 h-4 object-contain",

  orderTags: "flex w-full gap-6 mt-6 mb-10",
  orderTag: "flex bg-blue-600/10 rounded-md w-full py-4 px-4 flex-col mb-2",
  orderTagTitle: "text-lg font-bold mb-1",
  orderTagDescription: "flex items-center gap-2 text-sm text-gray-600",
  orderTagIcon: "",

  touristPersonHeader: "flex w-full justify-between gap-4",
  touristPerson:
    "text-white bg-primary1 font-bold h-14 px-4 rounded-md flex items-center justify-center gap-2",
  touristPersonIcon: "",

  emailButton:
    "h-24 w-full rounded-lg border-2 border-black text-black mt-10 mb-20 flex items-center justify-center gap-2 font-bold",

  information:
    "flex flex-col flex-1 h-fit max-w-md p-4 rounded-lg border border-gray-400",
  informationTitle: "font-bold mt-2 mb-2",
  informationDateContainer: "flex gap-1 pb-3 border-b border-gray-300 mb-3",
  informationDate: "flex font-bold",
  informationStatus:
    "w-32 h-9 rounded-md border border-green-600 bg-green-600/10 text-green-600 flex items-center justify-center mt-2",
  informationProviderContainer: "flex flex-1 mt-2 mb-2 justify-between",
  informationProviderColumn: "flex flex-col",
  informationProviderColumn1: "flex flex-col items-end",
  informationProviderTitle: "",
  informationProviderInfo: "flex items-center gap-2 text-sm font-bold",
  informationProviderImage: "w-6 h-6 object-contain",
  informationShow: "underline text-primary1 underline-offset-2",
};
