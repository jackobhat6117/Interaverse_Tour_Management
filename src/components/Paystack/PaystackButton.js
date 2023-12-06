import PropTypes from "prop-types";
import React from "react";
import { usePaystackPayment } from "react-paystack";
import { PAYSTACK_PUBLIC_KEY } from "../../constant/config";

const PaystackButton = ({ onSuccess, onClose, config, children }) => {
  const initializePayment = usePaystackPayment({
    ...config,
    publicKey: PAYSTACK_PUBLIC_KEY,
  });
  return (
    <div
      style={{ width: "100%" }}
      onClick={() => {
        initializePayment(onSuccess, onClose);
      }}
    >
      {children}
    </div>
  );
};

PaystackButton.propTypes = {
  config: PropTypes.shape({
    reference: PropTypes.string.isRequired,
    email: PropTypes.string,
    amount: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default PaystackButton;
