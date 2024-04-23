import React from "react";

function CarouselButtons({ next, previous }) {
  const onNext = () => {
    next();
  };
  const onPrevious = () => {
    previous();
  };
  return (
    <div className={Classname.container}>
      <div className={Classname.buttonsContainer}>
        <div className={Classname.buttonContainer} onClick={onPrevious}>
          <div className={Classname.button}>
            <img
              src="/IconChevronLeftWhite.svg"
              alt=""
              className={Classname.buttonIconSelected}
            />
            <img
              src="/IconChevronLeftPrimary.svg"
              alt=""
              className={Classname.buttonIcon}
            />
          </div>
        </div>
        <div className={Classname.buttonContainer} onClick={onNext}>
          <div className={Classname.button}>
            <img
              src="/IconChevronRightWhite.svg"
              alt=""
              className={Classname.buttonIconSelected}
            />
            <img
              src="/IconChevronRightPrimary.svg"
              alt=""
              className={Classname.buttonIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarouselButtons;

const Classname = {
  container:
    "absolute w-full h-full flex items-center justify-center px-4 top-0 ",
  buttonsContainer: "w-full flex items-center justify-between",
  buttonContainer:
    "w-12 h-12 rounded-full flex items-center justify-center bg-white/50 cursor-pointer",
  button:
    "flex items-center justify-center h-8 w-8 rounded-full border-2 border-primary1 bg-transparent hover:bg-primary1 group",
  buttonIcon: "h-3 w-3 object-contain flex group-hover:hidden",
  buttonIconSelected: "h-3 w-3 object-contain hidden group-hover:flex",
};
