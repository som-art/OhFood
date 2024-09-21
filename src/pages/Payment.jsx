import React, { useState } from "react";
import Input from "../components/Input";

const Payment = () => {
  const [cardNo, setCardNo] = useState("");
  const [name, setName] = useState("");
  return (
    <div>
      <p>Payment</p>
      <Input
        label={"Card"}
        value={cardNo}
        onChange={(e) => {
          setCardNo(e.target.value);
        }}
      />
      <Input
        label={"Name"}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </div>
  );
};

export default Payment;
