import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function TourManagementWelcomeModal({
  open,
  setOpen,
  onContinue,
}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            <span className="font-bold mb-4">
              Welcome to attraction ticket creation on Intraverse! You’ll need
              30 minutes of your time and:
            </span>
            <div className={Classname.numberContainer}>
              <div className={Classname.number}>1</div>
              <span>
                A product description & setup in English; we'll translate to
                multiple languages for you
              </span>
            </div>
            <div className={Classname.numberContainer}>
              <div className={Classname.number}>2</div>
              <span>
                At least 4 high-quality images (ideally 7 or more); they'll help
                attract travellers to your product
              </span>
            </div>
            <div className={Classname.numberContainer}>
              <div className={Classname.number}>3</div>
              <span>
                Your product’s availability and pricing; this'll help travellers
                book with ease
              </span>
            </div>
            <div className={Classname.buttonContainer}>
              <button className={Classname.button} onClick={onContinue}>
                Continue
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const Classname = {
  container: "flex flex-col font-main px-10 py-10",
  numberContainer: "flex gap-2 text-sm text-gray-500 mb-2",
  number:
    "w-8 h-8 rounded-full items-center justify-center bg-gray-300 text-xs flex flex-shrink-0",
  buttonContainer: "flex justify-end mt-4",
  button: "h-12 px-4 font-bold text-white bg-primary1 rounded-md",
};
