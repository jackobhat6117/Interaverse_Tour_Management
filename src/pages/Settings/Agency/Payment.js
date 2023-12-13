import React from "react";
import Button1 from "../../../components/form/Button1";
import PaystackButton from "../../../components/Paystack/PaystackButton";
import { generateRef } from "../../../utils/generateRef";
import { useSelector } from "react-redux";
import addCard from "../../../controllers/settings/finance/addCard";

export default function PaymentSetting() {
  const { user } = useSelector((state) => state.user.userData);

  const handleAddCard = async (reference) => {
    await addCard(reference);
  };

  return (
    <div className="content-max-w flex flex-col gap-4">
      <p>
        Our pricing model is designed to be flexible and cost-effective. With
        pay as you go, there are no initial fees or monthly obligations. You
        only pay for the specific services or resources you utilize. If you
        don't possess IATA accreditation, you have the option to utilize our
        Serviced Content, which incurs a charge of 1% based on the total order
        value.
      </p>
      <p>
        We offer automatic volume discounts, ensuring you receive the most
        competitive prices available. If you have any inquiries or would like to
        explore enterprise pricing options, please don't hesitate to contact our
        Sales team.
      </p>
      <h5>Payment Method</h5>
      <p>
        You can make your initial wallet top-up using a credit/debit card, and
        subsequent tops-ups by bank transfer.
      </p>
      <span className="self-start">
        <PaystackButton
          config={{
            amount: 5000,
            reference: generateRef("AC-"),
            email: user?.email,
          }}
          onSuccess={(reference) => {
            handleAddCard(reference?.reference);
          }}
        >
          <Button1>Add Card</Button1>
        </PaystackButton>
      </span>
    </div>
  );
}
