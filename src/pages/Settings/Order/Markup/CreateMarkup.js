import { useSnackbar } from "notistack";
import { useState } from "react";
import { def } from "../../../../config";
import TextInput from "../../../../components/form/TextInput";
import RadioInput from "../../../../components/form/RadioInput";
import CitiesInput from "../../../../components/form/CitiesInput";
import { Checkbox, MenuItem, RadioGroup } from "@mui/material";
import Button1 from "../../../../components/form/Button1";
import createFlightPriceAdjustment from "../../../../controllers/flightPriceAdjustment/createFlightPriceAdjustment";
import updateFlightPriceAdjustment from "../../../../controllers/flightPriceAdjustment/updateFlightPriceAdjustment";

export default function CreateMarkup({
  reload,
  footer,
  forType,
  data: defData,
  update,
}) {
  const [data, setData] = useState(
    defData || {
      appliedTo: "",
      method: "",
      type: "MarkUp",
      amount: "",
      name: "",
      appliedType: "",
    },
  );
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    const { value } = event.target;
    let newval;
    setData((data) => {
      if (data.appliedTo.includes(value)) {
        newval = data.appliedTo.filter((val) => val !== value);
      } else {
        newval = [...data.appliedTo, value];
      }
      return { ...data, appliedTo: newval };
    });

    // returnData({...data,interestedIn: newval})

    // console.log('selected: ',selectedValues,newval)
  };

  let currency = def.currencyCode;

  async function handleSubmit(ev) {
    ev.preventDefault();

    if (data.appliedTo === "" || data.method === "")
      return enqueueSnackbar("Please fill required fields!", {
        variant: "error",
      });

    setLoading(true);
    let res = { return: false, msg: "Error", data: [] };
    if (!update) res = await createFlightPriceAdjustment({ ...data, currency });
    else await updateFlightPriceAdjustment({ ...data });

    setLoading(false);
    if (res.return) {
      enqueueSnackbar(update ? "Markup updated" : "Markup created.", {
        variant: "success",
      });
      reload();
    } else enqueueSnackbar(res.msg, { variant: "error" });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
        <h5>
          {update ? "Update Markup" : "Create a new Markup for " + forType}
        </h5>

        {/* <p>Select product to markup</p> */}
        {/* <div className='flex flex-wrap gap-4 justify-between self-stretch pb-4'>
            <Checkbox labelClassName='flex-1' name='type' checked={data.appliedTo.includes('Flight')} onChange={handleChange} value='Flight'>Flight</Checkbox>
            <Checkbox labelClassName='flex-1' name='type' checked={data.appliedTo.includes('Stay')} onChange={handleChange} value='Stay'>Stay</Checkbox>
            <Checkbox labelClassName='flex-1' name='type' checked={data.appliedTo.includes('Tour')} onChange={handleChange} value='Tour'>Tour</Checkbox>
            <Checkbox labelClassName='' name='type' checked={data.appliedTo.includes('Protection')} onChange={handleChange} value='Protection'>Protection</Checkbox>
          </div> */}
        <div className="flex flex-row gap-2">
          <TextInput
            label={"Markup name"}
            placeholder={"e.g flight markup"}
            required
            value={data.name}
            onChange={(ev) => setData({ ...data, name: ev.target.value })}
          />
          <TextInput
            select
            value={data.type || ""}
            label="Type"
            onChange={(e) => setData({ ...data, type: e.target.value })}
          >
            <MenuItem value="MarkUp">Mark Up</MenuItem>
            <MenuItem value="MarkDown">Mark Down</MenuItem>
          </TextInput>
        </div>

        <small>Method</small>
        <RadioGroup
          name="method"
          required
          value={data.method}
          onChange={(ev) => setData({ ...data, method: ev.target.value })}
          className="flex flex-col gap-2"
        >
          <RadioInput value="Value" checked={data.method === "Value"}>
            <div className="flex flex-col ">
              <h6>Value</h6>
              <p>
                This will add the amount you choose to any ticket you want to
                sell
              </p>
            </div>
          </RadioInput>
          <RadioInput value="Percentage" checked={data.method === "Percentage"}>
            <div className="flex flex-col ">
              <h6>Percentage</h6>
              <p>
                This will add the percentage you choose to any ticket you want
                to sell
              </p>
            </div>
          </RadioInput>
        </RadioGroup>
        <div className="flex gap-4">
          {forType === "Stays" ? (
            <CitiesInput placeholder="DXB" label="City Code" />
          ) : null}
          <TextInput
            required
            label={"Figure"}
            placeholder={"e.g 24,000"}
            InputProps={{ endAdornment: currency }}
            value={data.amount}
            onChange={(ev) => setData({ ...data, amount: ev.target.value })}
          />
        </div>
        {forType === "Flights" ? (
          <div className="flex flex-col gap-4">
            <TextInput
              select
              label={"Applied To"}
              value={data.appliedType}
              onChange={(ev) =>
                setData({ ...data, appliedType: ev.target.value })
              }
            >
              <MenuItem value={undefined}>None</MenuItem>
              <MenuItem value="passenger">Passenger Type</MenuItem>
            </TextInput>
            {data?.appliedType === "passenger" ? (
              <div>
                <div className="flex flex-wrap gap-4 justify-between self-stretch pb-4">
                  <Checkbox
                    labelClassName="flex-1"
                    name="type"
                    checked={data.appliedTo.includes("Adult")}
                    onChange={handleChange}
                    value="Adult"
                  >
                    Adult
                  </Checkbox>
                  <Checkbox
                    labelClassName="flex-1"
                    name="type"
                    checked={data.appliedTo.includes("Child")}
                    onChange={handleChange}
                    value="Child"
                  >
                    Child
                  </Checkbox>
                  <Checkbox
                    labelClassName="flex-1"
                    name="type"
                    checked={data.appliedTo.includes("Infant")}
                    onChange={handleChange}
                    value="Infant"
                  >
                    Infant
                  </Checkbox>
                </div>
                <div className="tooltip">Leave blank if applied to all</div>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="flex gap-4">
          {footer}
          <Button1 loading={loading} type="submit">
            {update ? "Update Markup" : "Create Markup"}
          </Button1>
        </div>
      </form>
    </div>
  );
}
