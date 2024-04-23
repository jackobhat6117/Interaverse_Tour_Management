import React, { useState } from "react";
// import CustomButton from "../components/CustomButton";
import { placeholderImage } from "../../data/tour/tourData";
import RoomCardButton from "../button/RoomCardButton";
import CarouselButtons from "../button/CarouselButtons";
import { useNavigate } from "react-router-dom";

const RoomCard = () => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleDetailsToggle = () => {
    setShowDetails(!showDetails);
  };

  const [selectedGroup1Value, setSelectedGroup1Value] = useState(null);
  const [selectedGroup2Value, setSelectedGroup2Value] = useState(null);

  const handleButtonClickGroup1 = (value) => {
    setSelectedGroup1Value(value);
  };

  const handleButtonClickGroup2 = (value) => {
    setSelectedGroup2Value(value);
  };

  const handleNextImage = () => {};

  const handlePreviousImage = () => {};

  const handleReserve = () => {
    navigate("/accommodation/userinfo");
  };

  return (
    <div className="w-80 border-2 font-main text-sm flex flex-shrink-0 flex-col">
      <div className="relative h-48">
        <img src={placeholderImage} className="w-full h-full object-cover" />
        <CarouselButtons
          next={handleNextImage}
          previous={handlePreviousImage}
        />
      </div>
      <div className="p-2 text-md ">
        <div className="gap-2 flex flex-col">
          <h2 className="text-sm font-black">
            Room, 2 Twin Beds (Runway View, High Floor)
          </h2>
          <p className="text-gray-400 text-xs">9.2/10 Wonderful!</p>
          <div className="flex gap-2">
            <img src="/IconFt.svg" alt="" />
            <p>411sq ft</p>
          </div>
          <div className="flex gap-2">
            <img src="/IconPeople.svg" alt="" />
            <p>Sleeps two (2)</p>
          </div>
          <div className="flex gap-2">
            <img src="/IconBed.svg" alt="" />
            <p>One (1) king size bed</p>
          </div>
        </div>
        {showDetails && (
          <div className="mt-2">
            <p className="text-gray-600">Additional room features include...</p>
          </div>
        )}
        <button
          onClick={handleDetailsToggle}
          className="text-blue-500 hover:text-blue-700 mt-2 underline"
        >
          {showDetails ? "Less details" : "More details"}
        </button>

        <div className="border-t border-gray-300 my-3"></div>

        <h2 className="text-sm font-bold">Cancellation Policy</h2>
        <p className="text-gray-600">More details on all policies</p>

        <div id="group1">
          <RoomCardButton
            text="Nonrefundable"
            value="₦ +0"
            isSelected={selectedGroup1Value === "₦ +0"}
            onClick={handleButtonClickGroup1}
          />
          <RoomCardButton
            text="Fully refundable till july 19"
            text2="Reserve now, Pay later"
            value="₦ +12"
            isSelected={selectedGroup1Value === "₦ +12"}
            onClick={handleButtonClickGroup1}
          />
          <RoomCardButton
            text="Fully refundable till july 24"
            text2="Reserve now, Pay later"
            value="₦ +32"
            isSelected={selectedGroup1Value === "₦ +32"}
            onClick={handleButtonClickGroup1}
          />
        </div>

        <div className="border-t border-gray-300 my-3"></div>

        <h2 className="text-sm font-bold">Extras</h2>

        <div id="group2">
          <RoomCardButton
            text="No Extras"
            value="₦ +0"
            isSelected={selectedGroup2Value === "₦ +0"}
            onClick={handleButtonClickGroup2}
          />
          <RoomCardButton
            text="Breakfast"
            value="₦ +12"
            isSelected={selectedGroup2Value === "₦ +12"}
            onClick={handleButtonClickGroup2}
          />
        </div>

        <div className="border-t border-gray-300 my-3" />

        <h2 className="text-sm font-bold">Pricing</h2>
        <div className="pr-4 mt-2">
          <div className="flex items-center justify-between">
            <div className="text-xs">One room</div>
            <div className="font-bold text-lg">₦ 55,000</div>
          </div>
          <div className="flex items-center mt-2 justify-between">
            <div className="text-xs">Total</div>
            <div className="font-bold text-lg">₦ 110,000</div>
          </div>
        </div>
        <div className="text-xs mt-3 text-right mr-4 mb-4">
          Tax not included
        </div>

        <div className="bg-blue-600 text-center pt-2 text-white rounded-lg h-12">
          <div
            className="text-white font-bold text-lg my-auto cursor-pointer"
            onClick={handleReserve}
          >
            Reserve 2 rooms
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
