import React from "react";

function SightCard({ tour }) {
  return (
    <div className={Classname.container}>
      <div className={Classname.imageContainer}>
        <span className={Classname.category}>{tour.category}</span>
        <img src={tour.image} className={Classname.image} />
      </div>
    </div>
  );
}

export default SightCard;

const Classname = {
  container: "w-56 h-36 rounded-lg flex flex-col cursor-pointer",
  imageContainer: "w-full h-full flex items-center justify-center relative",
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
