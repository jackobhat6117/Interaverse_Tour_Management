import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import GoogleMapReact from "google-map-react";
import CustomRadio from "../common/CustomRadio";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function MeetingPointAddressModal({
  onBack,
  onConfirm,
  open,
  setOpen,
}) {
  const [vehicle, setVehicle] = useState("Van");
  const [precise, setPrecise] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelect = (e) => {
    setVehicle(e.target.value);
  };

  const handleCancel = () => {
    setVehicle("");
    handleClose();
  };
  const handleSave = () => {
    if (vehicle) {
      onConfirm(vehicle);
    }
    handleClose();
  };

  const defaultProps = {
    center: {
      lat: 51.5074,
      lng: -0.1278,
    },
    zoom: 15,
  };

  const handleSearch = () => {};

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={Classname.container}>
            <div className={Classname.content}>
              <div className={Classname.modalTitleContainer}>
                <img
                  src="/IconClose1.svg"
                  alt=""
                  className={Classname.modalCloseIcon}
                  onClick={handleClose}
                />
                <span className={Classname.modalTitle}>
                  Add meeting point address
                </span>
                <div></div>
              </div>

              <div className={Classname.modalContent}>
                <span className="font-bold">Meeting point address</span>
                <p className="text-sm">
                  This is where customers can come and find you to start the
                  activity. To make it as specific as possible, zoom in and drag
                  the pin to the right place.
                </p>
                <div className={Classname.modalSearchContainer}>
                  <div className="flex flex-1">
                    <input
                      type="text"
                      className={Classname.modalInput}
                      placeholder="Search"
                    />
                  </div>
                  <button className={Classname.modalSearchButton}>
                    <img src="/IconSearchWhite.svg" alt="" />
                  </button>
                </div>
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
                <span className="font-bold mt-4 mb-2">
                  How precise is this meeting point?
                </span>
                <CustomRadio
                  label="This is exactly where customers should come."
                  value="true"
                  selected={precise}
                  onSelect={(val) => setPrecise(val)}
                />
                <CustomRadio
                  label="It's not possible to set an exact location. This is approximate."
                  value="false"
                  selected={precise}
                  onSelect={(val) => setPrecise(val)}
                />
              </div>

              <div className={Classname.buttonsContainer}>
                <button
                  className={Classname.cancelButton}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className={Classname.saveButton} onClick={handleSave}>
                  Save address
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const Classname = {
  container: "flex flex-col font-main",
  content: "flex flex-col items-center px-4",
  modalTitleContainer: "flex w-full items-center justify-between mb-6 mt-10",
  modalTitle: "text-xl font-bold ",
  modalCloseIcon: " cursor-pointer",
  modalDescription: "text-gray-600 mb-6 flex text-center max-w-sm",
  modalTourName: "font-bold items-center text-center",
  buttonsContainer: "w-full flex items-center justify-end mt-10 mb-10 gap-4",
  cancelButton:
    "h-11 flex items-center justify-center px-4 font-bold rounded-md border border-primary1 text-primary1",
  saveButton:
    "h-11 flex items-center justify-center px-4 font-bold rounded-md bg-primary1 text-white",

  modalContent: "flex flex-col w-full px-3",
  modalSearchContainer: "flex items-center gap-2 mt-4",
  modalInput: "flex w-full h-14 border border-gray-400 rounded-md px-4",
  modalSearchButton:
    "w-16 h-14 rounded-md flex items-center justify-center cursor-pointer bg-primary1",
  detailMap: "h-56 mt-4 mb-2",
};
