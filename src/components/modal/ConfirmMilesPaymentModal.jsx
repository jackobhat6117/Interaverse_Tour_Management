import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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

export default function ConfirmMilesPaymentModal({
  onBack,
  onConfirm,
  open,
  setOpen,
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
            <div className={Classname.content}>
              <span className={Classname.modalTitle}>
                Pay with Miles Balance
              </span>
              <p className={Classname.modalDescription}>
                By selecting this option, we will automatically debit
                ₦1,000,000.00 from your account balance.
              </p>
            </div>
            <div className={Classname.bottomContent}>
              <button
                className={`${Classname.button} ${Classname.backButton}`}
                onClick={onBack}
              >
                Go Back
              </button>
              <button
                className={`${Classname.button} ${Classname.confirmButton}`}
                onClick={onConfirm}
              >
                Confirm payment
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const Classname = {
  container: "flex flex-col font-main",
  content: "flex flex-col items-center",
  modalTitle: "text-3xl font-bold mb-6 mt-10",
  modalDescription: "text-gray-600 mb-6 flex text-center max-w-sm",
  modalTourName: "font-bold items-center text-center",
  bottomContent:
    "w-full flex items-center justify-center gap-4 py-10 bg-gray-100",
  button: "h-16 rounded-md flex items-center justify-center w-60 font-bold",
  backButton: "text-black",
  confirmButton: "text-white bg-primary1",
  wait: "font-bold",
};
