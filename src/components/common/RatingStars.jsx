import React from "react";

function RatingStars({ rating }) {
  return (
    <div className={Classname.ratingStars}>
      <img src="/IconStarActive.svg" alt="" className={Classname.ratingIcon} />
      <img
        src={rating > 1 ? "/IconStarActive.svg" : "/IconStar.svg"}
        alt=""
        className={Classname.ratingIcon}
      />
      <img
        src={rating > 2 ? "/IconStarActive.svg" : "/IconStar.svg"}
        alt=""
        className={Classname.ratingIcon}
      />
      <img
        src={rating > 3 ? "/IconStarActive.svg" : "/IconStar.svg"}
        alt=""
        className={Classname.ratingIcon}
      />
      <img
        src={rating > 4 ? "/IconStarActive.svg" : "/IconStar.svg"}
        alt=""
        className={Classname.ratingIcon}
      />
    </div>
  );
}

export default RatingStars;

const Classname = {
  ratingContainer: "flex items-center gap-3 mb-2",
  ratingStars: "gap-2 flex items-center mb-1",
  ratingIcon: "h-5 object-contain",
};
