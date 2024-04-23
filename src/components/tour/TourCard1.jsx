import React from "react";
import { useNavigate } from "react-router-dom";

function TourCard1({ tour }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/tour/singleTour");
  };
  return (
    <div className={Classname.container} onClick={handleClick}>
      <div className={Classname.imageContainer}>
        <img src={tour.image} className={Classname.image} />
      </div>

      <div className={Classname.content}>
        <div className={Classname.nameContainer}>
          <span className={Classname.name}>{tour.name}</span>
          <div className={Classname.priceContainer}>
            <span>from</span>
            <span className={Classname.price}>
              ₦{tour.price.toLocaleString()}
            </span>
            <span>per adult</span>
          </div>
        </div>
        <p className={Classname.description}>
          Would you like to see the city with a native English-speaking tour
          guide who has had the honour of being a full-time tour guide in
          multiple European cities since 2014?
        </p>

        <div className={Classname.ratingContainer}>
          <span>
            Powered by:{" "}
            <span className={Classname.ratingLink}>Discover London</span>{" "}
          </span>
          <span>
            Rating:{" "}
            <span className={Classname.ratingLink}>9.4 (56 reviews)</span>{" "}
          </span>
        </div>
        <div className={Classname.featruesAndButton}>
          <div className={Classname.featruesContainer}>
            <div className={Classname.featrue}>
              <img
                src="/IconBlackGlobe.svg"
                alt=""
                className={Classname.featrueIcon}
              />
              <div className={Classname.featrueContent}>
                <span>Languages</span>
                <span className={Classname.featrueDescription}>English</span>
              </div>
            </div>
            <div className={Classname.featrue}>
              <img
                src="/IconBlackWatch.svg"
                alt=""
                className={Classname.featrueIcon}
              />
              <div className={Classname.featrueContent}>
                <span>Start Time</span>
                <span className={Classname.featrueDescription}>
                  11:00 AM, 2:00 PM
                </span>
              </div>
            </div>
            <div className={Classname.featrue}>
              <img
                src="/IconBlackTimer.svg"
                alt=""
                className={Classname.featrueIcon}
              />
              <div className={Classname.featrueContent}>
                <span>Duration</span>
                <span className={Classname.featrueDescription}>1hr 35mins</span>
              </div>
            </div>
          </div>
          <button className={Classname.selectButton} onClick={handleClick}>
            Select
          </button>
        </div>
        <div className={Classname.cardTagsContainer}>
          {tour.likeyToSellout && (
            <div className={Classname.likelyTag}>Likely to sellout</div>
          )}
          {tour.topPick && <div className={Classname.topTag}>Top Pick</div>}
        </div>
      </div>
    </div>
  );
}

export default TourCard1;

const Classname = {
  container: "w-full min-h-280px rounded-lg shadow-md border-gray-200 flex",
  imageContainer: "w-56 h-full flex items-center justify-center relative",
  image: "w-full h-full object-cover rounded-md rounded-r-none",
  content: "flex flex-1 flex-col px-6 py-4 bg-gray-100",
  nameContainer: "flex gap-2",
  name: "flex flex-1 mb-2 font-bold text-lg",
  priceContainer: "flex flex-col text-gray-600 font-bold",
  price: "font-bold text-lg text-black",
  description: "flex text-sm text-gray-500 mt-2 mb-4",
  ratingContainer:
    "flex w-full justify-between items-center text-sm text-gray-500",
  ratingLink: "text-primary1",
  featruesAndButton: "flex w-full justify-between items-center mt-4",
  featruesContainer: "flex items-center gap-8 font-bold text-sm",
  featrue: "flex items-center gap-2",
  featrueContent: "flex flex-col",
  featrueIcon: "",
  featrueDescription: "font-normal text-gray-500",
  selectButton:
    "h-12 rounded-md px-6 bg-primary1 flex items-center justify-center font-bold text-sm text-white",
  cardTagsContainer: "flex flex-wrap gap-2 mt-2",
  likelyTag:
    "text-xxxs font-semibold text-red-700 bg-red-600/20 px-2 py-1 rounded-md",
  topTag:
    "text-xxxs font-semibold text-yellow-800 bg-yellow-600/20 px-2 py-1 rounded-md",
};
