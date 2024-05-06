import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneNumberInput from "../../../components/form/PhoneNumberInput";
import ConfirmTourBookingModal from "../../../components/modal/ConfirmTourBookingModal.jsx";
import ConfirmHotelBookingModal from "../../../components/modal/ConfirmHotelBookingModal.jsx";

function AccommodationUserInfoPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [language, setLanguage] = useState(null);
  const [people, setPeople] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [personType, setPersonType] = useState("adult");
  const [payOption, setPayOption] = useState("now");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlViewImages = () => {};

  const handleChangePeople = (e) => {
    setPeople(e.target.value);
  };

  const handleChangeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const handleChangeEmail = (e) => {};

  const handleChangePhone = (e) => {};

  const handleChangePerson = (e) => {
    setPersonType(e.target.value);
  };

  const handlePayOptionChoose = (text) => {
    setPayOption(text);
  };

  const handleBook = () => {
    setModalOpen(true);
  };

  const handleCancelModal = () => {
    setModalOpen(false);
  };

  const handleConfirmModal = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/accommodation/payment");
    }, 3000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={Classname.container}>
      <div className={Classname.content}>
        {/* Page title */}
        <div className={Classname.titleContainer}>
          {`Stays > Orders > New Order >`}{" "}
          <span className={Classname.titleMain}>Single Stay</span>
        </div>
        <ConfirmHotelBookingModal
          open={modalOpen}
          setOpen={setModalOpen}
          loading={loading}
          onConfirm={handleConfirmModal}
          onBack={handleCancelModal}
        />
        {/* Detail container */}
        <div className={Classname.detailContainer}>
          {/* Detail */}
          <div className={Classname.detailContent}>
            <div className={Classname.detailPrivacyContainer}>
              <img
                src="/IconLock.svg"
                alt=""
                className={Classname.detailPrivacyIcon}
              />
              <span>
                We take privacy issues seriously. You can be sure that your
                personal data is securely protected.
              </span>
            </div>

            <div className={Classname.detailTitleContainer}>
              <span className={Classname.detailTitle}>Contact details</span>
            </div>

            <div className={Classname.detailInputsContainer}>
              <div className={Classname.detailInputContainer}>
                <span className={Classname.detailInputLabel}>
                  Enter order email*
                </span>
                <div className={Classname.detailInput}>
                  <input
                    type="text"
                    value={email}
                    onChange={handleChangeEmail}
                    className={Classname.detailInputBar}
                    placeholder="e.g xyz@gmil.coom"
                  />
                </div>
              </div>
              <div className={Classname.detailInputContainer}>
                <span className={Classname.detailInputLabel}>
                  Enter order phone number*
                </span>
                <PhoneNumberInput className={Classname.detailPhoneInput} />
              </div>
            </div>

            <div className={Classname.detailInfoContainer}>
              <img
                src="/IconInfo.svg"
                alt=""
                className={Classname.detailInfoIcon}
              />
              <span>
                Use all given names and surnames exactly as they appear in your
                passport/ID to avoid boarding complications
              </span>
            </div>

            {/* Guest one */}

            <div className={Classname.detailTitleContainer}>
              <span className={Classname.detailTitle}>Guest 1</span>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={personType}
                  onChange={handleChangePerson}
                >
                  <MenuItem value="adult">Adult (over 12 years)</MenuItem>
                  <MenuItem value="child">Child (under 12 years)</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={Classname.detailInputsContainer}>
              <div className={Classname.detailInputContainer}>
                <span className={Classname.detailInputLabel}>Given names*</span>
                <div className={Classname.detailInput}>
                  <input
                    type="text"
                    className={Classname.detailInputBar}
                    placeholder="e.g John Chiemena"
                  />
                </div>
              </div>
              <div className={Classname.detailInputContainer}>
                <span className={Classname.detailInputLabel}>Surname*</span>
                <div className={Classname.detailInput}>
                  <input
                    type="text"
                    className={Classname.detailInputBar}
                    placeholder="e.g Doe"
                  />
                </div>
              </div>
            </div>
            {/* Guest two */}

            <div className={Classname.detailTitleContainer}>
              <span className={Classname.detailTitle}>Guest 2</span>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={personType}
                  onChange={handleChangePerson}
                >
                  <MenuItem value="adult">Adult (over 12 years)</MenuItem>
                  <MenuItem value="child">Child (under 12 years)</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className={Classname.detailInputsContainer}>
              <div className={Classname.detailInputContainer}>
                <span className={Classname.detailInputLabel}>Given names*</span>
                <div className={Classname.detailInput}>
                  <input
                    type="text"
                    className={Classname.detailInputBar}
                    placeholder="e.g John Chiemena"
                  />
                </div>
              </div>
              <div className={Classname.detailInputContainer}>
                <span className={Classname.detailInputLabel}>Surname*</span>
                <div className={Classname.detailInput}>
                  <input
                    type="text"
                    className={Classname.detailInputBar}
                    placeholder="e.g Doe"
                  />
                </div>
              </div>
            </div>

            <div className={Classname.detailTitleContainer1}>
              <span className={Classname.detailTitle}>Meeting Point</span>
            </div>
            <p className={Classname.detailDescription}>
              Berlin City Boat Tour Starting at Friedrichstraße
            </p>
            <div className={Classname.detailTitleContainer1}>
              <span className={Classname.detailTitle}>Tour Language</span>
            </div>
            <p className={Classname.detailDescription}>English</p>
            <div className={Classname.detailTitleContainer1}>
              <span className={Classname.detailTitle}>Guide</span>
            </div>
            <p className={Classname.detailDescription}>Yes</p>
            <div className={Classname.detailTitleContainer1}>
              <span className={Classname.detailTitle}>
                Special requirements
              </span>
            </div>
            <textarea
              className={Classname.detailTextArea}
              placeholder="e.g. dietary needs, accessibility"
              name=""
              id=""
              cols="30"
              rows="10"
            />
            <div className={Classname.detailTitleContainer1}>
              <span className={Classname.detailTitle}>
                Paying now, or later?
              </span>
            </div>
            <p className={Classname.detailDescription}>
              Decide whether you want to pay for your trip now in its entirety,
              or whether you'd like to put a hold on the order, and pay at a
              later date. Be aware that you cannot currently select seats or
              baggage when holding an order.
            </p>
            <div className={Classname.detailPayOptionsContainer}>
              <div
                className={`${Classname.detailPayOption} ${
                  payOption === "now"
                    ? Classname.detailPayOptionActive
                    : Classname.detailPayOptionInActive
                }`}
                onClick={() => handlePayOptionChoose("now")}
              >
                <div className={Classname.detailPayOptionIconContainer}>
                  {payOption === "now" ? (
                    <img
                      src="/IconCheckmark3.svg"
                      alt=""
                      className={Classname.detailPayOptionIcon}
                    />
                  ) : (
                    <div
                      className={Classname.detailPayOptionIconInActive}
                    ></div>
                  )}
                </div>
                <div className={Classname.detailPayOptionDetail}>
                  <span className={Classname.detailPayOptionTitle}>
                    Pay now
                  </span>
                  <p className={Classname.detailPayOptionDescription}>
                    Pay now and confirm seat and baggage selection.
                  </p>
                </div>
              </div>
              <div
                className={`${Classname.detailPayOption} ${
                  payOption === "later"
                    ? Classname.detailPayOptionActive
                    : Classname.detailPayOptionInActive
                }`}
                onClick={() => handlePayOptionChoose("later")}
              >
                <div className={Classname.detailPayOptionIconContainer}>
                  {payOption === "later" ? (
                    <img
                      src="/IconCheckmark3.svg"
                      alt=""
                      className={Classname.detailPayOptionIcon}
                    />
                  ) : (
                    <div
                      className={Classname.detailPayOptionIconInActive}
                    ></div>
                  )}
                </div>
                <div className={Classname.detailPayOptionDetail}>
                  <span className={Classname.detailPayOptionTitle}>
                    Book on hold
                  </span>
                  <p className={Classname.detailPayOptionDescription}>
                    Hold price and pay at a later date.
                  </p>
                </div>
              </div>
            </div>
            <div className={Classname.detailButtonsContainer}>
              <button
                className={Classname.detailBackButton}
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className={Classname.detailContinueButton}
                onClick={handleBook}
              >
                Continue
              </button>
            </div>
          </div>

          {/* CTA container */}
          <div className={Classname.detailCTAContainer}>
            <div className={Classname.detailCTANameContainer}>
              <img
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className={Classname.detailCTAImage}
              />
              <span className={Classname.mainDetailName}>
                London: London Eye, Big Bus and Thames River Cruise
              </span>
            </div>
            <div className={Classname.mainDetailPoint}>
              <img
                src="/tourIconLocation.svg"
                alt=""
                className={Classname.mainDetailIcon}
              />
              <span>Berlin City Boat Tour Starting at Friedrichstraße</span>
            </div>
            <div className={Classname.mainDetailPoint}>
              <img
                src="/tourIconPerson.svg"
                alt=""
                className={Classname.mainDetailIcon}
              />
              <span>1 Adult (Age 14 - 99)</span>
            </div>
            <div className={Classname.mainDetailPoint}>
              <img
                src="/tourIconDate.svg"
                alt=""
                className={Classname.mainDetailIcon}
              />
              <span>1 room x 6 nights</span>
            </div>
            <div className={Classname.mainDetailPoint}>
              <img
                src="/tourIconTime.svg"
                alt=""
                className={Classname.mainDetailIcon}
              />
              <span>Sign-in Time: Sat 22 Jul, 2023 from 10:45 AM</span>
            </div>
            <div className={Classname.mainDetailPoint}>
              <img
                src="/tourIconTime.svg"
                alt=""
                className={Classname.mainDetailIcon}
              />
              <span>Sign-out Time: Sat 22 Jul, 2023 from 10:45 AM</span>
            </div>

            <div className={Classname.detailCTAPriceTitleContainer}>
              <span className={Classname.detailCTAPriceTitle}>
                Price Summary
              </span>
            </div>
            <div className={Classname.detailCTADetailContainer}>
              <span>Tourist adult one (1):</span>
              <span>₦1,000,000.00</span>
            </div>
            <div className={Classname.detailCTADetailContainer}>
              <span>Tourist child one (1):</span>
              <span>₦900,000.00</span>
            </div>
            <div className={Classname.detailCTADetailContainer}>
              <span>Taxes and fees:</span>
              <span>₦100,000.00</span>
            </div>
            <div className={Classname.detailCTATotalContainer}>
              <span>Tour total:</span>
              <span>₦1,100,000.00</span>
            </div>

            <div className={Classname.detailCTABenefit}>
              <span className={Classname.detailCTABenefitTitle}>
                Free cancellation
              </span>
              <div className={Classname.detailCTABenefitDescription}>
                <img
                  src="/IconCheckmark1.svg"
                  alt=""
                  className={Classname.detailCTABenefitIcon}
                />
                <span>Until 24hrs before your activities starts</span>
              </div>
            </div>
            <div className={Classname.detailCTATitleContainer}>
              <span>Tour Provider</span>
              <span className={Classname.detailCTATitleProvider}>
                gt Travels
              </span>
            </div>
            <button className={Classname.detailCTAButton} onClick={handleBook}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccommodationUserInfoPage;

const Classname = {
  container:
    "flex w-screen min-h-screen relative bg-white flex-col items-center px-3 sm:px-10 font-main",
  content: "flex w-full max-w-7xl flex-col flex-1 ",
  titleContainer: "w-full text-xl font-bold text-gray-400 my-10",
  titleMain: "text-black",

  imagesContainer: "flex flex-wrap w-full gap-6 mb-10",
  mainImageContainer: "relative h-470px flex-1 max-w-xs",
  mainImage: "rounded-xl w-full h-full object-cover",
  mainImageCategory:
    "font-bold text-base absolute top-2 left-2 bg-white/70 py-1 px-2 rounded-md",
  mainImageCTA:
    "font-bold text-xxxs absolute bottom-2 right-2 bg-white/70 py-1 px-2 rounded-md cursor-pointer",
  mainDetailContainer: "flex flex-col flex-1",
  mainDetailName: "text-xl font-bold",
  mainDetailIcon: "",
  mainDetailPoint: "flex items-center gap-2 text-gray-500 mb-2",

  detailContainer: "flex w-full gap-6 mt-6",
  detailContent: "flex flex-col flex-1",
  detailTitleContainer: "flex w-full items-center justify-between mt-2 mb-4",
  detailTitleContainer1: "flex w-full items-center justify-between mt-4 mb-3",
  detailTitle: "text-xl font-bold",
  detailDescription: "mb-2",

  detailPrivacyContainer:
    "w-full bg-blue-500/10 flex items-center gap-2 mb-4 px-6 py-2 rounded-md text-sm",
  detailPrivacyIcon: "",

  detailInfoContainer:
    "w-full bg-blue-500/10 flex items-center gap-2 mb-4 px-6 py-2 rounded-md text-sm mt-6",
  detailInfoIcon: "",

  detailInputsContainer: "flex justify-between gap-4",
  detailInputContainer: "flex flex-col flex-1",
  detailInput: "flex h-12 rounded-md border border-gray-300 px-4 items-center",
  detailTextArea:
    "flex h-28 rounded-md border border-gray-300 px-4 py-4 items-center",
  detailInputBar: "flex flex-1",
  detailInputLabel: "text-gray-600 mb-2",
  detailPhoneInput: "mt-2",
  detailPayOptionsContainer: "flex flex-1 gap-4 mt-6 mb-10",
  detailPayOption: "flex flex-1 h-24 rounded-lg gap-3 py-2 px-3 cursor-pointer",
  detailPayOptionActive:
    "border-2 border-green-700 bg-green-700/20 text-green-700",
  detailPayOptionInActive: "bg-gray-100",
  detailPayOptionIconContainer: "",
  detailPayOptionIcon: "w-5 h-5 object-contain",
  detailPayOptionIconInActive: "w-5 h-5 rounded-full bg-gray-200",
  detailPayOptionDetail: "flex flex-col gap-1",
  detailPayOptionTitle: "font-bold",
  detailPayOptionDescription: "",
  detailButtonsContainer: "flex w-full item-center justify-between mt-10 mb-20",
  detailBackButton: "h-12 w-52 rounded-md text-white font-bold bg-gray-400",
  detailContinueButton: "h-12 w-52 rounded-md text-white font-bold bg-primary1",

  detailCTAContainer:
    "flex flex-col flex-1 max-w-md border-2 border-gray-300 p-4 h-fit rounded-lg",
  detailCTANameContainer: "flex items-center gap-4 mb-3",
  detailCTAImage: "w-24 h-20 rounded-lg object-cover",
  detailCTATitleContainer:
    "flex items-center justify-between text-sm text-gray-600 mt-6",
  detailCTATitleProvider: "text-lg font-bold mt-4 text-black",

  detailCTABenefit:
    "flex bg-blue-600/10 rounded-md w-full py-4 px-4 flex-col mb-2",
  detailCTABenefitTitle: "text-lg font-bold mb-1",
  detailCTABenefitDescription: "flex items-center gap-2 text-sm text-gray-600",
  detailCTABenefitIcon: "",
  detailCTAPriceTitleContainer:
    "flex w-full justify-between text-sm pb-2 border-b-2 border-b-400 mb-4 mt-4",
  detailCTAPriceTitle: "font-bold text-lg",
  detailCTATotalContainer:
    "font-bold text-lg flex w-full justify-between pb-2 pt-3 border-t-2 border-b-400 mb-4 mt-4",
  detailCTADetailContainer: "text-lg flex w-full justify-between text-gray-700",
  detailCTAButton:
    "flex w-full items-center justify-center bg-primary1 rounded-lg h-12 font-bold text-white mt-4",
};
