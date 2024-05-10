import { InputLabel, MenuItem, Radio, Select } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  singleTourHightlights,
  singleTourImportant,
  singleTourIncludes,
  singleTourLanguages,
  singleTourNotIncludes,
  singleTourPeople,
} from "../../../data/tour/singleTour";

function TourOrderSingleTourPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [language, setLanguage] = useState(null);
  const [people, setPeople] = useState(null);
  const [option, setOption] = useState("a");
  const [optionTime, setOptionTime] = useState(0);

  const handlViewImages = () => {};

  const handleChangePeople = (e) => {
    setPeople(e.target.value);
  };

  const handleChangeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const handleChangeDate = (e) => {};

  const handleCheck = () => {};

  const handleReadMore = () => {};

  const handleCheckMap = () => {};

  const handleChangeOption = (e) => {
    setOption(e.target.value);
  };

  const handleChangeOptionTime = () => {};

  const handleEdit = () => {
    console.log("first");
  };

  const handleBook = () => {
    navigate("/tour/userInfo");
  };

  return (
    <div className={Classname.container}>
      <div className={Classname.content}>
        {/* Page title */}
        <div className={Classname.titleContainer}>
          {`Tour > Orders > New Order >`}{" "}
          <span className={Classname.titleMain}>Single Tour</span>
        </div>
        <span className={Classname.detailTitle}>
          London: London Eye, Big Bus and Thames River Cruise
        </span>
        <div className={Classname.detailLocationContainer}>
          <img
            src="/IconLocationGreen.svg"
            alt=""
            className={Classname.detailLocationIcon}
          />
          <span>Heathrow road | Tour provider: GT Travels</span>
        </div>
        {/* Images container */}
        <div className={Classname.imagesContainer}>
          <div className={Classname.imageCol}>
            <img
              src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className={Classname.imageColElement}
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className={Classname.imageColElement}
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className={Classname.imageColElement}
              alt=""
            />
            <img
              src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className={Classname.imageColElement}
              alt=""
            />
          </div>
          <div className={Classname.mainImageContainer}>
            <span className={Classname.mainImageCategory}>Entry tickets</span>
            <span className={Classname.mainImageCTA} onClick={handlViewImages}>
              View all images
            </span>
            <img
              src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className={Classname.mainImage}
              alt=""
            />
          </div>
          {/* CTA container */}
          <div className={Classname.detailCTAContainer}>
            <span className={Classname.detailCTAPriceContainer}>
              <strong className={Classname.detailCTAPrice}>
                From ₦8,000.00
              </strong>
              <span>per person</span>
            </span>
            <span className={Classname.detailCTASelectTitle}>
              Select date and Travelers
            </span>
            <div className={Classname.detailCTAEditSection}>
              <img
                src="/IconDate.svg"
                alt=""
                className={Classname.detailCTAEditIcon}
              />
              <span className={Classname.detailCTAEditText}>
                Wednesday, Apr 10, 2024
              </span>
              <img
                src="/IconEdit.svg"
                alt=""
                className={Classname.detailCTAEditEditingIcon}
                onClick={handleEdit}
              />
            </div>
            <div className={Classname.detailCTAEditSection}>
              <img
                src="/IconPerson.svg"
                alt=""
                className={Classname.detailCTAEditIcon}
              />
              <span className={Classname.detailCTAEditText}>2 Adults</span>
              <img
                src="/IconEdit.svg"
                alt=""
                className={Classname.detailCTAEditEditingIcon}
                onClick={handleEdit}
              />
            </div>
            {/* <div className={Classname.detailCTAtagsContainer}>
              <span className={Classname.detailCTAtag1}>Likely to sellout</span>
              <span className={Classname.detailCTAtag2}>Top pick</span>
              <span className={Classname.detailCTAtag3}>Best deal</span>
            </div> */}

            <button className={Classname.detailCTAButton} onClick={handleBook}>
              Update Search
            </button>
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
            <div className={Classname.detailCTABenefit}>
              <span className={Classname.detailCTABenefitTitle}>
                Pay nothing today
              </span>
              <div className={Classname.detailCTABenefitDescription}>
                <img
                  src="/IconCheckmark1.svg"
                  alt=""
                  className={Classname.detailCTABenefitIcon}
                />
                <span>Book now and only pay 3 days before</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detail container */}
        <div className={Classname.detailContainer}>
          {/* Detail */}
          <div className={Classname.detailContent}>
            <span className={Classname.detailSelectTitleContainer}>
              Make a selection
            </span>
            <div className={Classname.detailSelectContainer}>
              <div className={Classname.detailSelectOption}>
                <div className={Classname.detailSelectOptionContent}>
                  <Radio
                    checked={option === "a"}
                    onChange={handleChangeOption}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <div className={Classname.detailSelectOptionContentDetail}>
                    <span className={Classname.detailSelectOptionContentTitle}>
                      London Eye, Big Bus and Thames River Cruise
                    </span>
                    <p
                      className={Classname.detailSelectOptionContentDescription}
                    >
                      Experience the best views of London and explore the city
                      at your own pace with a hop-on hop-off bus tour. Enjoy
                      360-degree views from the London Eye, then take a cruise
                      on the River Thames.
                    </p>
                    {option === "a" && (
                      <div
                        className={
                          Classname.detailSelectOptionContentButtonsContainer
                        }
                      >
                        {Array(3)
                          .fill("")
                          .map((_, index) => (
                            <button
                              onClick={() => handleChangeOptionTime(index)}
                              className={`${
                                Classname.detailSelectOptionContentButton
                              } ${
                                index === optionTime
                                  ? Classname.detailSelectOptionContentButtonActive
                                  : Classname.detailSelectOptionContentButtonInActive
                              }`}
                            >
                              9:00 AM
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className={Classname.detailSelectOptionDevider}></div>
                <div className={Classname.detailSelectOptionCTA}>
                  <span className={Classname.detailSelectOptionCTAPrice}>
                    ₦8,000
                  </span>
                  <span className={Classname.detailSelectOptionCTApersonnel}>
                    2 Adults x ₦4,000
                  </span>
                  {option === "a" && (
                    <button
                      onClick={handleBook}
                      className={Classname.detailSelectOptionCTAButton}
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </div>
              <div className={Classname.detailSelectOptionDevider1}></div>
              <div className={Classname.detailSelectOption}>
                <div className={Classname.detailSelectOptionContent}>
                  <Radio
                    checked={option === "b"}
                    onChange={handleChangeOption}
                    value="b"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "B" }}
                  />

                  <div className={Classname.detailSelectOptionContentDetail}>
                    <span className={Classname.detailSelectOptionContentTitle}>
                      London Eye, Big Bus and Thames River Cruise & Hiking
                      activities
                    </span>
                    <p
                      className={Classname.detailSelectOptionContentDescription}
                    >
                      Experience the best views of London and explore the city
                      at your own pace with a hop-on hop-off bus tour. Enjoy
                      360-degree views from the London Eye, then take a cruise
                      on the River Thames.
                    </p>
                    {option === "b" && (
                      <div
                        className={
                          Classname.detailSelectOptionContentButtonsContainer
                        }
                      >
                        {Array(3)
                          .fill("")
                          .map((_, index) => (
                            <button
                              onClick={() => handleChangeOptionTime(index)}
                              className={`${
                                Classname.detailSelectOptionContentButton
                              } ${
                                index === optionTime
                                  ? Classname.detailSelectOptionContentButtonActive
                                  : Classname.detailSelectOptionContentButtonInActive
                              }`}
                            >
                              9:00 AM
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className={Classname.detailSelectOptionDevider}></div>
                <div className={Classname.detailSelectOptionCTA}>
                  <span className={Classname.detailSelectOptionCTAPrice}>
                    ₦8,000
                  </span>
                  <span className={Classname.detailSelectOptionCTApersonnel}>
                    2 Adults x ₦4,000
                  </span>
                  {option === "b" && (
                    <button
                      onClick={handleBook}
                      className={Classname.detailSelectOptionCTAButton}
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </div>
            </div>
            <span className={Classname.detailTitle}>Overview</span>
            <p className={Classname.detailOverviewDescription}>
              Experience the best views of London and explore the city at your
              own pace with a hop-on hop-off bus tour. Enjoy 360-degree views
              from the London Eye, then take a cruise on the River Thames.
            </p>

            <span className={Classname.detailTitle}>Experience</span>
            {/* Highlights */}
            <div className={Classname.detailExperienceContainer}>
              <div className={Classname.detailExperienceTitleContainer}>
                Highlights
              </div>
              <div className={Classname.detailExperienceDetailContainer}>
                {singleTourHightlights.map((highlight, index) => (
                  <div className={Classname.detailExperiencePoint} key={index}>
                    <div className={Classname.detailExperienceBullet}></div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Description */}
            <div className={Classname.detailExperienceContainer}>
              <div className={Classname.detailExperienceTitleContainer}>
                Full Description
              </div>
              <div className={Classname.detailExperienceDetailContainer}>
                <p>
                  Discover the best of London with a hop-on, hop-off tour
                  onboard an open-top, double-decker bus and enjoy a trip on the
                  London Eye as part of your ticket. Enjoy a relaxing river
                  cruise along the Thames as part of your ticket as well.
                </p>
                <a
                  href=""
                  onClick={handleReadMore}
                  className={Classname.detailExperienceLink}
                >
                  Read more
                </a>
              </div>
            </div>
            {/* Includes */}
            <div className={Classname.detailExperienceContainer}>
              <div className={Classname.detailExperienceTitleContainer}>
                Includes
              </div>
              <div className={Classname.detailExperienceDetailContainer}>
                {singleTourIncludes.map((include, index) => (
                  <div className={Classname.detailExperiencePoint} key={index}>
                    <img
                      src="/IconCheckmark.svg"
                      alt=""
                      className={Classname.detailExperienceIcon}
                    />
                    <span>{include}</span>
                  </div>
                ))}
                {singleTourNotIncludes.map((include, index) => (
                  <div className={Classname.detailExperiencePoint} key={index}>
                    <img
                      src="/IconCloseRed.svg"
                      alt=""
                      className={Classname.detailExperienceIcon}
                    />
                    <span>{include}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Meeting point */}
            <div className={Classname.detailExperienceContainer}>
              <div className={Classname.detailExperienceTitleContainer}>
                Meeting point
              </div>
              <div className={Classname.detailExperienceDetailContainer}>
                <p>
                  Speak to a Big Bus representative on arrival at the London Eye
                  bus stop to collect your bus and boat tickets and choose your
                  London eye time slot. The bus stop is right outside the
                  Marriott Hotel, next to the Lion Statue.
                </p>
                <a
                  href=""
                  onClick={handleCheckMap}
                  className={Classname.detailExperienceLink}
                >
                  Check google map
                </a>
              </div>
            </div>
            {/* Important points */}
            <div className={Classname.detailExperienceContainer}>
              <div className={Classname.detailExperienceTitleContainer}>
                Important Information
              </div>
              <div className={Classname.detailExperienceDetailContainer}>
                {singleTourImportant.map((point, index) => (
                  <div className={Classname.detailExperiencePoint} key={index}>
                    <div className={Classname.detailExperienceBullet}></div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Other Information */}
            <div className={Classname.detailExperienceContainer}>
              <div className={Classname.detailExperienceTitleContainer}>
                Other Information
              </div>
              <div className={Classname.detailExperienceDetailContainer1}>
                <div className={Classname.detailAboutTag}>
                  <img
                    src="/IconTime.svg"
                    alt=""
                    className={Classname.detailAboutTagIcon}
                  />
                  <div className={Classname.detailAboutTagContentContainer}>
                    <span className={Classname.detailAboutTagName}>
                      Valid for one(1) day
                    </span>
                    <span className={Classname.detailAboutTagDescription}>
                      from first activation
                    </span>
                  </div>
                </div>
                <div className={Classname.detailAboutTag}>
                  <img
                    src="/IconSound.svg"
                    alt=""
                    className={Classname.detailAboutTagIcon}
                  />
                  <div className={Classname.detailAboutTagContentContainer}>
                    <span className={Classname.detailAboutTagName}>
                      Audio guide included
                    </span>
                    <span className={Classname.detailAboutTagDescription}>
                      English, French, German, Spanish, Italian
                    </span>
                  </div>
                </div>
                <div className={Classname.detailAboutTag}>
                  <img
                    src="/IconWheelchair.svg"
                    alt=""
                    className={Classname.detailAboutTagIcon}
                  />
                  <div className={Classname.detailAboutTagContentContainer}>
                    <span className={Classname.detailAboutTagName}>
                      Wheelchair accessible
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourOrderSingleTourPage;

const Classname = {
  container:
    "flex w-screen min-h-screen relative bg-white flex-col items-center px-3 sm:px-10 font-main",
  content: "flex w-full max-w-7xl flex-col flex-1 ",
  titleContainer: "w-full text-xl font-bold text-gray-400 my-10",
  titleMain: "text-black",

  imagesContainer: "flex flex-wrap w-full gap-6",
  mainImageContainer: "relative h-550px flex-1",
  mainImage: "rounded-xl w-full h-full object-cover",
  mainImageCategory:
    "font-bold text-xxxs absolute top-2 left-2 bg-white/70 py-1 px-2 rounded-md",
  mainImageCTA:
    "font-bold text-xxxs absolute bottom-2 right-2 bg-white/70 py-1 px-2 rounded-md cursor-pointer",
  imageCol: "flex flex-col justify-between max-w-md",
  imageColElement: "w-36 h-32 rounded-xl",

  detailSelectTitleContainer:
    "flex py-4 pb-6 font-bold border-t border-gray-200",
  detailSelectContainer:
    "flex flex-col w-full border border-gray-200 rounded-md py-4 mb-10",
  detailSelectOption: "w-full px-6 py-5 flex items-center gap-10",
  detailSelectOptionContent: "flex items-start flex-1 gap-2",
  detailSelectOptionContentRadio: "",
  detailSelectOptionContentDetail: "flex flex-col",
  detailSelectOptionContentTitle: "font-bold text-xl mb-4",
  detailSelectOptionContentDescription: "text-gray-500",
  detailSelectOptionContentButtonsContainer: "flex gap-3 mt-4",
  detailSelectOptionContentButton:
    "w-32 h-12 font-bold text-sm rounded-md cursor-pointer",
  detailSelectOptionContentButtonActive: "bg-primary1 text-white",
  detailSelectOptionContentButtonInActive: "bg-gray-600 text-gray-300",
  detailSelectOptionDevider: "flex h-full border-r border-gray-200",
  detailSelectOptionDevider1: "flex flex-1 w-full border-t border-gray-200",
  detailSelectOptionCTA:
    "w-full flex flex-col justify-center items-end max-w-sm pr-4",
  detailSelectOptionCTAPrice: "font-bold text-xl",
  detailSelectOptionCTApersonnel: "text-gray-400 mb-2",
  detailSelectOptionCTAButton:
    "bg-primary1 text-white font-bold flex items-center justify-center h-12 w-full max-w-xs rounded-md",

  detailContainer: "flex w-full gap-6 mt-6",
  detailContent: "flex flex-col flex-1",
  detailTitle: "text-xl font-bold mb-1",
  detailLocationContainer: "flex items-center gap-2 text-gray-400 mb-10",
  detailLocationIcon: "",
  detailDescription: "text-gray-600 mb-6",
  detailAboutTagsContainer: "flex flex-wrap gap-4 mb-6",
  detailAboutTag: "flex items-center h-20 bg-primary1/10 px-6 gap-4 rounded-md",
  detailAboutTagIcon: "",
  detailAboutTagContentContainer: "flex flex-col",
  detailAboutTagName: "font-bold text-lg",
  detailAboutTagDescription: "text-sm text-gray-600",
  detailContentFormInputs: "flex flex-wrap gap-2 w-full mt-10 mb-20",
  detailContentFormInputContainer: "flex flex-col flex-1",
  detailContentFormInputLabel: "font-bold mb-1 text-gray-600",
  datailContentFormDateInput:
    "w-full border border-primary/20 rounded-md p-2 h-14",
  detailContentFormButton:
    "flex bg-primary1 font-bold text-white rounded-lg h-14 items-center justify-center mt-7",
  detailOverviewDescription: "mb-10",

  detailExperienceContainer:
    "flex flex-1 items-center border-t py-4 border-gray-300 my-4 gap-4",
  detailExperienceTitleContainer: "w-28 flex items-center font-bold",
  detailExperienceDetailContainer: "flex flex-1 flex-col gap-2 text-gray-500",
  detailExperienceDetailContainer1: "flex flex-1 gap-3 text-gray-500",
  detailExperienceBullet: "w-3 h-3 rounded-full bg-primary1",
  detailExperienceIcon: "",
  detailExperiencePoint: "flex items-center gap-2",
  detailExperienceLink: "text-primary1  underline underline-offset-2",

  detailCTAContainer:
    "flex flex-col flex-1 max-w-sm border-2 border-gray-300 p-4 h-fit rounded-lg",
  detailCTAtagsContainer: "flex flex-wrap gap-4 mb-4",
  detailCTAtag1:
    "text-sm font-semibold text-red-700 bg-red-600/20 px-2 py-1 rounded-md",
  detailCTAtag2:
    "text-sm font-semibold text-yellow-800 bg-yellow-600/20 px-2 py-1 rounded-md",
  detailCTAtag3:
    "text-sm font-semibold text-green-600 bg-green-600/20 px-2 py-1 rounded-md",
  detailCTATitleContainer:
    "flex items-center justify-between text-sm text-gray-600 mb-6",
  detailCTATitleProvider: "text-lg font-bold mt-4 text-black",

  detailCTABenefit:
    "flex bg-blue-600/10 rounded-md w-full py-4 px-4 flex-col mb-2",
  detailCTABenefitTitle: "text-lg font-bold mb-1",
  detailCTABenefitDescription: "flex items-center gap-2 text-sm text-gray-600",
  detailCTABenefitIcon: "",
  detailCTAPriceContainer: "text-gray-600 flex flex-col mb-4",
  detailCTASelectTitle: "font-bold text-lg mb-2",
  detailCTAEditSection:
    "h-14 w-full border border-gray-400 rounded-md flex items-center px-4 gap-2 mb-3",
  detailCTAEditIcon: "",
  detailCTAEditEditingIcon: "cursor-pointer p-2",
  detailCTAEditText: "flex flex-1",
  detailCTAPrice: "font-bold text-xl text-black",
  detailCTAButton:
    "flex w-full items-center justify-center bg-primary1 rounded-lg h-12 font-bold text-white mb-4",
};
