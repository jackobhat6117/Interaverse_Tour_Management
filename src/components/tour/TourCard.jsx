import React from "react";
import { useNavigate } from "react-router-dom";

function TourCard({ tour }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/tour/singleTour");
  };
  return (
    <div className={Classname.container} onClick={handleClick}>
      <div className={Classname.imageContainer}>
        <span className={Classname.category}>{tour.category}</span>
        <img src={tour.image} className={Classname.image} />
      </div>
      <div className={Classname.nameContainer}>
        <span>{tour.name}</span>
      </div>

      <div className={Classname.tagsContainer}>
        {tour.tags.map((tag, index) => (
          <span>
            {" "}
            {tag} {index !== tour.tags.length - 1 && "|"}
          </span>
        ))}
      </div>
      <div className="flex flex-1"></div>
      <div className={Classname.cardTagsContainer}>
        {tour.likeyToSellout && (
          <div className={Classname.likelyTag}>Likely to sellout</div>
        )}
        {tour.topPick && <div className={Classname.topTag}>Top Pick</div>}
      </div>
      <div className={Classname.priceContainer}>
        <span>
          From <strong>₦{tour.price.toLocaleString()}</strong>
        </span>
        <span>Per Person</span>
      </div>
    </div>
  );
}

export default TourCard;

const Classname = {
  container:
    "w-56 h-80 p-1 rounded-lg border border-gray-200 flex flex-col cursor-pointer",
  imageContainer: "w-full h-28 flex items-center justify-center relative",
  image: "w-full h-full object-cover rounded-md",
  category:
    "font-bold text-xxxs absolute top-2 left-2 bg-white/60 py-1 px-2 rounded-md",
  nameContainer: "text-sm font-bold min-h-50px mb-1 mt-2",
  tagsContainer: "text-xxs text-gray-700",
  cardTagsContainer: "flex flex-wrap gap-2 mt-2",
  likelyTag:
    "text-xxxs font-semibold text-red-700 bg-red-600/20 px-2 py-1 rounded-md",
  topTag:
    "text-xxxs font-semibold text-yellow-800 bg-yellow-600/20 px-2 py-1 rounded-md",
  priceContainer: "flex flex-col text-sm text-gray-700 py-4",
};
