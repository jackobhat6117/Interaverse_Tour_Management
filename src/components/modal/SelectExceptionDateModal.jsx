import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CalendarInput1 from "../form/CalendarInput1";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const vehicles = [
  "Van",
  "Jeep",
  "Black cab",
  "Limousine",
  "SUV",
  "Electric car",
];

export default function SelectExceptionDateModal({
  onBack,
  onConfirm,
  open,
  setOpen,
}) {
  const [vehicle, setVehicle] = useState("Van");
  const [date, setDate] = useState("");

  const handleStartDateChange = (text) => {
    setDate(text);
  };

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
    if (date) {
      onConfirm(date);
    }
    handleClose();
  };

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
                  Select Exception date
                </span>
                <div></div>
              </div>
              <div className="flex w-full flex-col">
                <CalendarInput1
                  className={Classname.datePickerInput}
                  value={date}
                  onChange={(value) =>
                    handleStartDateChange(value?.start || value)
                  }
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
                  Save entry
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
  buttonsContainer: "w-full flex items-center justify-end mt-10 mb-4 gap-4",
  cancelButton:
    "h-11 flex items-center justify-center px-4 font-bold rounded-md border border-primary1 text-primary1",
  saveButton:
    "h-11 flex items-center justify-center px-4 font-bold rounded-md bg-primary1 text-white",
  datePickerInput: "w-full border border-primary/20 rounded-md p-2 h-14 mt-2",
};
