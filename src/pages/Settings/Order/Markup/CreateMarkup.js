import { useSnackbar } from "notistack";
import { useState } from "react";
import { def } from "../../../../config";
import TextInput from "../../../../components/form/TextInput";
import CitiesInput from "../../../../components/form/CitiesInput";
import { MenuItem } from "@mui/material";
import Button1 from "../../../../components/form/Button1";
import createFlightPriceAdjustment from "../../../../controllers/flightPriceAdjustment/createFlightPriceAdjustment";
import updateFlightPriceAdjustment from "../../../../controllers/flightPriceAdjustment/updateFlightPriceAdjustment";
import AirlinesInput from "../../../../components/form/AirlinesInput";
import ToolTip from "../../../../components/DIsplay/ToolTip";
import Checkbox from "../../../../components/form/Checkbox";

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
        <div className="self-start">
          <AirlinesInput label={'Airline'} placeholder='Search or select airline' />
        </div>
        <TextInput
          label={"Markup Title"}
          placeholder={"e.g Virgin Air Markup"}
          required
          value={data.name}
          onChange={(ev) => setData({ ...data, name: ev.target.value })}
        />
        <div className="flex flex-row gap-2">
          <TextInput select required
            value={data.type || ""}
            label="Type"
            onChange={(e) => setData({ ...data, type: e.target.value })}
          >
            <MenuItem value="MarkUp">Mark Up</MenuItem>
            <MenuItem value="MarkDown">Mark Down</MenuItem>
          </TextInput>
          <TextInput select required
            value={data.method || ""}
            label="Markup Method"
            onChange={(e) => setData({ ...data, method: e.target.value })}
          >
            <MenuItem value="Value">Value</MenuItem>
            <MenuItem value="Percentage">Percentage</MenuItem>
          </TextInput>

          {/* <small>Method</small>
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
          </RadioGroup> */}
        </div>
        <div className="flex gap-2">
          <TextInput select required
            value={data.currency || ""}
            label="Currency"
            onChange={(e) => setData({ ...data, currency: e.target.value })}
          >
            <MenuItem value="NGN">NGN</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
          </TextInput>
          <TextInput required
            value={data.markup || ""}
            label="Value"
            onChange={(e) => setData({ ...data, markup: e.target.value })}
          >
            <MenuItem value="Value">Value</MenuItem>
            <MenuItem value="Percentage">Percentage</MenuItem>
          </TextInput>

        </div>
        <div>
          <small>Applied To *</small>
          <div className="flex gap-2">
            <Checkbox labelClassName='w-full' name='flight' value='Flight' checked={data?.appliedTo?.includes('Flight')}> Flight</Checkbox>
            <Checkbox labelClassName='w-full' name='ancilaries' value='Ancilaries' checked={data?.appliedTo?.includes('Ancilaries')}> Ancilaries</Checkbox>
          </div>
        </div>
        <div>
          <h5>More Options</h5>
          <ToolTip>Leave blank if applied to all</ToolTip>
        </div>
        <div className="flex gap-4">
          {forType === "Stays" ? (
            <CitiesInput placeholder="DXB" label="City Code" />
          ) : null}
          {/* <TextInput
            required
            label={"Figure"}
            placeholder={"e.g 24,000"}
            InputProps={{ endAdornment: currency }}
            value={data.amount}
            onChange={(ev) => setData({ ...data, amount: ev.target.value })}
          /> */}
        </div>
        {forType === "Flights" ? (
          <div className="flex flex-col gap-4">
            <div>
              <div>
                <small>Passenger Type</small>
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
              </div>
              <div>
                <small>Flight route</small>
                <div className="flex flex-wrap gap-4 justify-between self-stretch pb-4">
                  <Checkbox
                    labelClassName="flex-1"
                    name="type"
                    checked={data.appliedTo.includes("Oneway")}
                    onChange={handleChange}
                    value="Oneway"
                  >
                    Oneway
                  </Checkbox>
                  <Checkbox
                    labelClassName="flex-1"
                    name="type"
                    checked={data.appliedTo.includes("Return")}
                    onChange={handleChange}
                    value="Return"
                  >
                    Return
                  </Checkbox>
                  <Checkbox
                    labelClassName="flex-1 whitespace-nowrap"
                    name="type"
                    checked={data.appliedTo.includes("MultiCity")}
                    onChange={handleChange}
                    value="MultiCity"
                  >
                    Multi City
                  </Checkbox>
                </div>
              </div>
            </div>
              <div className="flex gap-2">
                <CitiesInput label='Departure Airport' size='small' placeholder='e.g LHR'
                  value={data?.from || ''}
                  onChange={(val) => setData({...data,from: val})}
                />
                {/* <div className='relative flex items-center justify-center z-10 cursor-pointer'>
                  <div className='absolute items-center justify-center flex'>
                    <span className='bg-secondary shadow-lg rounded-full p-1 hover:rotate-180 transition-all' onClick={() => swipeLoc()}>
                      <Icon icon='mdi:exchange' className='!w-5 !h-5' />
                    </span>
                  </div>
                </div> */}
                <CitiesInput label={'Arrival Airport'} size='small' placeholder='e.g LOS' 
                  value={data?.to || ''}
                  onChange={(val) => setData({...data,to: val})}            
                />

              </div>
              <div className="flex gap-2">
                <TextInput select label={'Departure Time'} 
                  value={data?.departureTime}
                  onChange={(ev) => setData({...data,departureTime: ev.target.value})}
                >
                  <MenuItem value='Morning'>Morning</MenuItem>
                </TextInput>
                <TextInput select label={'Arrival Time'} 
                  value={data?.arrivalTime}
                  onChange={(ev) => setData({...data,arrivalTime: ev.target.value})}
                >
                  <MenuItem value='Afternoon'>Afternoon</MenuItem>
                </TextInput>
              </div>

              <div className="flex gap-2">
                <TextInput select label={'Cabin Class'} 
                  value={data?.cabinClass}
                  onChange={(ev) => setData({...data,cabinClass: ev.target.value})}
                >
                  <MenuItem value='Economy'>Economy</MenuItem>
                  <MenuItem value='BusinessEconomy'>Business</MenuItem>
                  <MenuItem value='FistClass'>First Class</MenuItem>
                </TextInput>
                <TextInput select label={'Ticket Class'} 
                  value={data?.ticketClass}
                  onChange={(ev) => setData({...data,ticketClass: ev.target.value})}
                >
                  <MenuItem value='Z'>Z</MenuItem>
                </TextInput>
              </div>
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
