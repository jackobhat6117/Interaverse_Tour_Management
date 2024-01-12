import React, { useEffect, useRef, useState } from "react";
import Icon from "../../../../components/HOC/Icon";
import { TextField } from "@mui/material";

const supplierFields = {
  amadeus: [
    {
      name: "clientId",
      label: "Client Id",
      placeholder: "ex. 7d82cbe28obcehdw8c76eycedc",
    },
    {
      name: "clientSecret",
      label: "Client Secret",
      placeholder: "ex.39ee3heyudgw",
    },
  ],
  travelport: [
    {
      name: "username",
      label: "Username",
      placeholder: "ex.Universal API/6372dgt72dt32732c322 ",
    },
    { name: "password", label: "Password", placeholder: "ex. &gybe2ccs " },
    {
      name: "targetBranch",
      label: "Target Branch",
      placeholder: "ex. UB489DS",
    },
  ],
  sabre: [
    {
      name: "userId",
      label: "User ID",
      placeholder: "ex. V1:userid:group:domain",
    },
    { name: "password", label: "Password", placeholder: "ex. yd2389gcye2" },
  ],
};

export default function SupplierForm({ name, data: prevData, footer }) {
  const [data, setData] = useState(prevData);
  const [form, setForm] = useState({});
  const [selectedSupplier, setSelectedSupplier] = useState("amadeus");
  let selectedSupplierIcon = "carbon:scis-transparent-supply";

  useEffect(() => {
    prevData && setData(prevData);
  }, [prevData]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-4">
        <h5>{`Update supplier your details for ${selectedSupplier}`}</h5>
        <div className="flex gap-2">
          <Icon icon={selectedSupplierIcon} />
          <select
            onChange={(e) => {
              setSelectedSupplier(e.target.value);
              setForm({});
            }}
          >
            <option value={"amadeus"}>Amadeus</option>
            <option value={"travelport"}>Travelport</option>
            <option value={"sabre"}>Sabre</option>
          </select>
        </div>
      </div>
      <p>
        You information is private and cannot be accessed by thrid-party
        competitors
      </p>
      <form className="flex flex-col gap-4">
        {supplierFields[selectedSupplier]?.map((field) => (
          <TextField
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            defaultValue={
              data &&
              data[selectedSupplier] &&
              data[selectedSupplier][field.name]
                ? data[selectedSupplier][field.name]
                : ""
            }
            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
          />
        ))}
      </form>
      {footer && footer(selectedSupplier, form)}
    </div>
  );
}
