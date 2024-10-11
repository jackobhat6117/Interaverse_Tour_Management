import React from 'react';
import Modal from './Modal';

const PaymentTimeLimitModal = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Payment Time Limit">
    <div>
      {/* Add your payment time limit functionality here */}
    </div>
  </Modal>
);

export default PaymentTimeLimitModal;
