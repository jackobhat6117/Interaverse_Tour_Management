import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RatingStars from "../../../components/common/RatingStars";
import GoogleMapReact from "google-map-react";
import CalendarInput1 from "../../../components/form/CalendarInput1";
import { FormControl, MenuItem, Select } from "@mui/material";
import RoomCard from "../../../components/accommodation/RoomCard";

function AccommodationHotelPage() {
  const [readMore, setReadMore] = useState(false);
  const [map, setMap] = useState(null);
  const navigate = useNavigate();
  const roomRef = useRef();

  const about =
    "Tribe London Canary Wharf is located in Canary Wharf, a neighborhood in London, and is near a metro station. O2 Arena and The British Museum are cultural highlights, and some of the area's popular attractions include London Eye and Natural History Museum. Looking to enjoy an event or a game? See what's going on at ExCeL Exhibition Centre or Wembley Stadium.";

  const OnReadMore = () => {
    setReadMore(true);
  };

  const handlViewImages = () => {};

  const defaultProps = {
    center: {
      lat: 51.5074,
      lng: -0.1278,
    },
    zoom: 15,
  };

  const handleNextRoom = () => {
    if (roomRef.current) {
      roomRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handlePreviousRoom = () => {
    if (roomRef.current) {
      roomRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    navigate("/accommodation/userinfo");
  };

  return (
    <div className={Classname.container}>
      <div className={Classname.content}>
        {/* Page title */}
        <div className={Classname.titleContainer}>
          {`Stays > Orders > New Order >`}{" "}
          <span className={Classname.titleMain}>Hotel Name</span>
        </div>
        {/* Images container */}
        <div className={Classname.imagesContainer}>
          <div className={Classname.mainImageContainer}>
            <span className={Classname.mainImageCTA} onClick={handlViewImages}>
              View all images
            </span>
            <img
              src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className={Classname.mainImage}
              alt=""
            />
          </div>
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
          </div>
        </div>

        {/* Detail container */}
        <div className={Classname.detailContainer}>
          {/* Detail */}

          <div className={Classname.detailContent}>
            <div className={Classname.detailNameContainer}>
              <div className={Classname.detailNameContent}>
                <span className={Classname.detailName}>
                  Hilton Garden Inn London Heathrow Terminal 2 and 3
                </span>
                <p className="mb-3">
                  Experience the best views of London and explore the city at
                  your own pace with a hop-on hop-off bus tour. Enjoy 360-degree
                  views from the London Eye, then take a cruise on the River
                  Thames.
                </p>
              </div>
              <div className={Classname.detailRatingContainer}>
                <span>9.2/10 Wonderful</span>
                <span className="flex text-xs mb-2">{`See all 20 reviews >`}</span>
                <RatingStars rating={4} />
              </div>
            </div>
            <span className={Classname.detailTitle}>Popular Amenities</span>
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
            <span className={Classname.detailTitle}>About</span>
            <div className="flex flex-1 relative pb-4">
              <p>{readMore ? about : about.slice(0, 300) + " ...."}</p>
              {!readMore && (
                <div
                  className={Classname.detailReadMoreButton}
                  onClick={OnReadMore}
                >
                  read more
                </div>
              )}
            </div>
            <span className={Classname.detailTitle}>This property</span>
            <p>
              Tribe London Canary Wharf is located in Canary Wharf, a
              neighborhood in London, and is near a metro station. O2 Arena and
              The British Museum are cultural highlights, and some of the area's
              popular attractions include London Eye and Natural History Museum.
              Looking to enjoy an event or a game? See what's going on at ExCeL
              Exhibition Centre or Wembley Stadium.
            </p>
            <span className={Classname.detailTitle}>Map</span>
            <div style={{ width: "100%" }} className={Classname.detailMap}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key:
                    process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
                    "AIzaSyCGPY_hsHcarYRmtuyvZCTOyoRWGN7-JGA",
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              ></GoogleMapReact>
            </div>

            <div className={Classname.detailChangeContainer}>
              <div className={Classname.detailInputContainer}>
                <span>From</span>
                <CalendarInput1 className={Classname.detailInput} />
              </div>
              <div className={Classname.detailInputContainer}>
                <span>To</span>
                <CalendarInput1 className={Classname.detailInput} />
              </div>
              <div className={Classname.detailInputContainer}>
                <span>Travelers</span>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Age"
                    className="h-10"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>2 travelers, 1 room</MenuItem>
                    <MenuItem value={20}>2 travelers, 1 room</MenuItem>
                    <MenuItem value={30}>2 travelers, 1 room</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <button className={Classname.detailChangeButton}>
                Check availability
              </button>
            </div>
            <span className={Classname.detailTitle}>Choose a room</span>
            <div className={Classname.detailRoomButtons}>
              <div
                className={Classname.detailRoomButton}
                onClick={handleNextRoom}
              >{`<`}</div>
              <span>---</span>
              <div
                className={Classname.detailRoomButton}
                onClick={handlePreviousRoom}
              >{`>`}</div>
            </div>

            <div ref={roomRef} className={Classname.detailRoomsContainer}>
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
              <RoomCard />
            </div>
            <span className={Classname.detailTitle}>Amenities</span>
            <div className={Classname.detailAmenitiesContainer}>
              <div className={Classname.detailAmenities}>
                <div className={Classname.detailAmenitiesTitleContainer}>
                  <span>Property</span>
                </div>
                <div className={Classname.detailAmenitiesDetailContainer}>
                  {Array(2)
                    .fill("")
                    .map((_, index) => (
                      <div
                        className={Classname.detailAmenitiesDetailRow}
                        key={index}
                      >
                        {Array(3)
                          .fill("")
                          .map((_, index) => (
                            <div
                              className={Classname.detailAmenity}
                              key={index}
                            >
                              <div
                                className={
                                  Classname.detailAmenityTitleContainer
                                }
                              >
                                <img
                                  src="/IconWifi.svg"
                                  alt=""
                                  className={Classname.detailAmenityIcon}
                                />
                                <span>Internet</span>
                              </div>
                              <div className={Classname.detailAmenityDetail}>
                                <li>Available in all rooms: Free WiFi</li>
                                <li>
                                  In-room WiFi speed: 100+ Mbps (good for 1–2
                                  people or up to 6 devices)
                                </li>
                                <li>
                                  Available in some public areas: Free WiFi
                                </li>
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className={Classname.ctaButtonContainer}>
              <button className={Classname.ctaButton} onClick={handleNext}>
                Choose a room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccommodationHotelPage;

const Classname = {
  container:
    "flex w-screen min-h-screen relative bg-white flex-col items-center px-3 sm:px-10 font-main",
  content: "flex w-full max-w-7xl flex-col flex-1 ",
  titleContainer: "w-full text-xl font-bold text-gray-400 my-10",
  titleMain: "text-black",

  imagesContainer: "flex flex-wrap w-full gap-2",
  mainImageContainer: "relative h-550px flex-1",
  mainImage: "rounded-xl w-full h-full object-cover",
  mainImageCategory:
    "font-bold text-xxxs absolute top-2 left-2 bg-white/70 py-1 px-2 rounded-md",
  mainImageCTA:
    "font-bold text-xxxs absolute bottom-2 right-2 bg-white/70 py-1 px-2 rounded-md cursor-pointer",
  imageCol: "flex flex-col flex-1 justify-between max-w-sm gap-2",
  imageColElement: "flex-1 w-full h-32 rounded-xl object-cover",

  detailContainer: "flex w-full gap-6 mt-6",
  detailContent: "flex flex-col flex-1 w-full",
  detailTitle: "text-xl font-bold mb-1 mt-8",
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

  detailNameContainer: "flex w-full justify-between gap-10",
  detailName: "font-bold text-xl mb-2",
  detailNameContent: "flex flex-col flex-1",
  detailRatingContainer: "flex flex-col items-end",
  detailMap: "h-80",

  detailRoomsContainer: "w-full flex gap-10 overflow-scroll scroll-hide",

  detailChangeContainer: "flex w-full gap-4 mt-20 mb-4",
  detailInputContainer: "flex flex-col flex-1",
  detailInput: "w-full border border-primary/20 rounded-md p-2",
  detailChangeButton:
    "flex flex-1 h-12 items-center justify-center rounded-md text-white bg-primary1 font-bold mt-5",
  detailRoomButtons:
    "w-full flex items-center gap-3 justify-center font-bold text-xl mb-10",
  detailRoomButton:
    "flex w-12 h-12 rounded-md bg-gray-200 items-center justify-center font-bold text-lg hover:text-white hover:bg-primary1 cursor-pointer",

  detailReadMoreButton:
    "w-full h-10 flex items-center justify-center cursor-pointer absolute bottom-0 bg-white/80",

  detailExperienceDetailContainer1: "flex flex-1 gap-3 text-gray-500 mt-3",
  detailAmenitiesContainer: "flex flex-1 flex-col",
  detailAmenities: "flex gap-10 pt-10",
  detailAmenitiesTitleContainer: "flex w-72 font-bold",
  detailAmenitiesDetailContainer: "flex flex-col flex-1 gap-20 mb-20",
  detailAmenitiesDetailRow: "flex flex-1 gap-6",
  detailAmenity: "flex flex-col",
  detailAmenityTitleContainer: "flex items-center gap-2 mb-2",
  detailAmenityIcon: "",
  detailAmenityDetail: "text-sm text-gray-500",
  ctaButtonContainer: "w-full flex items-center justify-center mb-20",
  ctaButton: "w-72 rounded-md bg-primary1 font-bold text-white h-12",
};
