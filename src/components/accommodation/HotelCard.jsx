import React from "react";
import { useNavigate } from "react-router-dom";
import { placeholderImage } from "../../data/tour/tourData";
import RatingStars from "../common/RatingStars";

function HotelCard({ tour }) {
  const navigate = useNavigate();
  const rating = 4;

  const handleClick = () => {
    navigate("/accommodation/hotel");
  };
  return (
    <div className={Classname.container} onClick={handleClick}>
      <div className={Classname.imageContainer}>
        <img src={placeholderImage} className={Classname.image} />
      </div>

      <div className={Classname.content}>
        <div className={Classname.nameContainer}>
          <span className={Classname.name}>
            Hilton Garden Inn London Heathrow Terminal{" "}
          </span>
        </div>

        <div className={Classname.ratingContainer}>
          <RatingStars rating={rating} />
          <span>9.2/10 Wonderful</span>
        </div>

        <div className={Classname.locationContainer}>
          <img
            src="/IconLocationGreen.svg"
            alt=""
            className={Classname.locationIcon}
          />
          <span>Heathrow road</span>
        </div>

        <div className={Classname.detailRow}>
          <span className="font-bold">King room with garden view</span>
          <span>3 nights, 2 adults</span>
        </div>
        <div className={Classname.featruesAndButton}>
          <div className={Classname.ctaContainer}>
            <span className="font-bold text-3xl ">₦ 300,500</span>
            <span className="text-gray-600 text-sm mb-2">
              includes taxes and charges
            </span>
            <button className={Classname.selectButton} onClick={handleClick}>
              Check availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;

const Classname = {
  container: "w-full min-h-280px rounded-lg shadow-md border-gray-200 flex",
  imageContainer: "w-72 h-full flex items-center justify-center relative",
  image: "w-full h-full object-cover rounded-md rounded-r-none",
  content: "flex flex-1 flex-col px-6 py-4 bg-gray-100",
  nameContainer: "flex gap-2",
  name: "flex flex-1 mb-2 font-bold text-xl",
  priceContainer: "flex flex-col text-gray-600 font-bold",
  price: "font-bold text-lg text-black",
  description: "flex text-sm text-gray-500 mt-2 mb-4",
  detailRow: "flex w-full justify-between items-center text-sm text-gray-500",
  ratingLink: "text-primary1",
  featruesAndButton: "flex w-full justify-between items-center mt-4",
  ctaContainer: "flex flex-1 flex-col items-end text-sm",
  locationContainer: "flex items-center gap-2 mb-3",
  locationIcon: "",

  ratingContainer: "flex items-center gap-3 mb-2",

  selectButton:
    "h-10 rounded-md px-6 bg-primary1 flex items-center justify-center font-bold text-sm text-white",
  cardTagsContainer: "flex flex-wrap gap-2 mt-2",
  likelyTag:
    "text-xxxs font-semibold text-red-700 bg-red-600/20 px-2 py-1 rounded-md",
  topTag:
    "text-xxxs font-semibold text-yellow-800 bg-yellow-600/20 px-2 py-1 rounded-md",
};
