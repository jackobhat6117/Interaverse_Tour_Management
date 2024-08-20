import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
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
import filterTruthyValues, { filterOutNullValues } from "../../../../features/utils/filterTruthyObjectValues";
import { flightSuppliers } from "../../../../data/ENUM/FlightProviders";
import Icon from "../../../../components/HOC/Icon";
import RadioGroup from "../../../../components/form/RadioGroup";
import ListAirlines from "./ListAirlines";

const initData = {
  appliedTo: "Flight",
  method: "Percentage",
  airlines: [],
  excludedAirlines: [],
  excludedAirline: undefined, 
  type: "Markup",
  amount: 0,
  name: "",
  minPrice: undefined,
  maxPrice: undefined,
  currency: undefined,
  passengerType: undefined,
  flightRoute: undefined,
  airline: undefined,
  departureAirport: undefined,
  excludedDepartureAirports: [],
  arrivalAirport: undefined,
  transitAirport: undefined,
  cabinClass: undefined,
  ticketClass: undefined,
  arrivalTime: undefined,
  departureTime: undefined,
}

export default function CreateMarkup({
  reload,
  footer,
  forType,
  data: defData,
  update,
}) {
  const [data, setData] = useState(defData || initData);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  let currency = def.currencyCode;

  async function handleSubmit(ev) {
    ev.preventDefault();
    // return console.log('data: ',data)
    
    if (data.appliedTo === "" || data.method === "")
      return enqueueSnackbar("Please fill required fields!", {
        variant: "error",
      });

    setLoading(true);
    let res = { return: false, msg: "Error", data: [] };
    let {_id,createdAt,updatedAt,id,...modData} = filterOutNullValues({...data,
      departureAirport: data?.departureAirport?.iata || data?.departureAirport,
      arrivalAirport: data?.arrivalAirport?.iata || data?.arrivalAirport,
      amount: Number(data?.amount),
    })
    if (!update) res = await createFlightPriceAdjustment({ ...modData, currency });
    else res = await updateFlightPriceAdjustment(data?._id,{ ...modData });

    setLoading(false);
    if (res.return) {
      if(!update)
        setData(defData || initData)
      enqueueSnackbar(update ? "Markup updated" : "Markup created.", {
        variant: "success",
      });
      reload && reload();
    } else enqueueSnackbar(res.msg, { variant: "error" });
  }

  useEffect(() => {
    setData(defData);
  }, [defData]);

  console.log(data)

  const [allAirline, setAllAirline] = useState(data?.airlines?.length ? 'Specific' : "All");

  useEffect(() => {
    if (allAirline === "All") setData({ ...data, airlines: [] });
    else setData({ ...data, airline: undefined });
    //eslint-disable-next-line
  }, [allAirline]);

  
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

        <TextInput
          label={"Markup Title"}
          placeholder={"e.g Virgin Air Markup"}
          required
          value={data?.name}
          onChange={(ev) => setData({ ...data, name: ev.target.value })}
        />

        <div className="self-start flex flex-col items-center gap-4 justify-between w-full">
          <span className="w-full text-sm text-gray-500 -mb-3">
            Applicable to
          </span>
          <div className="w-full">
            <RadioGroup
              value={allAirline}
              options={[
                { value: "All", label: "All Airline" },
                { value: "Specific", label: "Specific Airlines" },
              ]}
              className="flex gap-4 whitespace-nowrap w-full"
              onChange={(val) => setAllAirline(val)}
            />
            {/* <Checkbox value={allAirline} onChange={(ev) => ev.target.checked && setData({...data,airline: 'ALL'}) && setAllAirline(ev.target.checked)}>
              All Airlines
            </Checkbox> */}
          </div>
          {allAirline === "Specific" ? (
            <div className="w-full">
              <AirlinesInput
                label={"Airline"}
                placeholder="Search or select airline"
                // disabled={allAirline}
                val={data?.airline}
                returnData={(val) => {
                  if(val?.id)
                    setData({
                      ...data,
                      airline: '',
                      // airline: val?.id,
                      airlines: [...data?.airlines||[],val?.id]
                    });
                }}
              />
              <div className="py-2">
                <ListAirlines list={data?.airlines} setList={(airlines) => setData({...data,airlines})} />
              </div>
            </div>
          ) : null}

          <div className="w-full">
            <AirlinesInput
              label={"Excluded Airlines"}
              placeholder="Search or select airline"
              // disabled={allAirline}
              val={data?.excludedAirline}
              returnData={(val) => {
                if(val?.id)
                  setData({
                    ...data,
                    excludedAirline: '',
                    // airline: val?.id,
                    excludedAirlines: [...data?.excludedAirlines||[],val?.id]
                  });
              }}
            />
            <div className="py-2">
              <ListAirlines list={data?.excludedAirlines} setList={(excludedAirlines) => setData({...data,excludedAirlines})} />
            </div>
          </div>
        </div>
        {/* <div className="self-start">
          <AirlinesInput
            label={"Airline"}
            placeholder="Search or select airline"
            val={data?.airline}
            returnData={(val) => {
              setData({
                ...data,
                airline: val?.id,
              });
            }}
          />
        </div> */}
        <TextInput label='Suppliers' select required
          SelectProps={{ multiple: true }}
          value={data?.suppliers || []}
          onChange={(ev) => setData({...data,suppliers: ev?.target?.value})}>
          {Object.entries(flightSuppliers)?.map(([key,value],i) => (
            <MenuItem key={i} value={key}>{key}</MenuItem>
          ))}
        </TextInput>

        <div className="flex flex-row gap-2">
          <TextInput
            select
            required
            value={data?.type || ""}
            label="Type"
            onChange={(e) => setData({ ...data, type: e.target.value })}
          >
            <MenuItem value="Markup">Mark Up</MenuItem>
            <MenuItem value="Markdown">Mark Down</MenuItem>
          </TextInput>
          <TextInput
            select
            required
            value={data?.method || ""}
            label="Markup Method"
            onChange={(e) => setData({ ...data, method: e.target.value })}
          >
            <MenuItem value="Fixed">Fixed</MenuItem>
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
          <TextInput
            select
            required
            value={data?.currency || ""}
            label="Currency"
            onChange={(e) => setData({ ...data, currency: e.target.value })}
          >
            <MenuItem value="NGN">NGN</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
          </TextInput>
          <TextInput
            required
            value={data?.amount || ""}
            label="Value"
            onChange={(e) => setData({ ...data, amount: e.target.value })}
          />
        </div>
        <div className="flex gap-2">
          <TextInput
            value={data?.minPrice || ""}
            label="Price Range from"
            onChange={(e) => setData({ ...data, minPrice: Number(e.target.value) })}
          />
          <TextInput
            value={data?.maxPrice || ""}
            label="Price Range To"
            onChange={(e) => setData({ ...data, maxPrice: Number(e.target.value) })}
          />
        </div>
        <div>
          <small>Applied To *</small>
          <div className="flex gap-2">
            <Checkbox
              labelClassName="w-full"
              name="flight"
              value="Flight"
              checked={data?.appliedTo === "Flight"}
              onChange={(e) => {
                setData({
                  ...data,
                  appliedTo: e.target.checked ? "Flight" : "Ancillary",
                });
              }}
            >
              Flight
            </Checkbox>
            <Checkbox
              labelClassName="w-full"
              name="Ancillary"
              value="Ancillary"
              checked={data?.appliedTo === "Ancillary"}
              onChange={(e) => {
                setData({
                  ...data,
                  appliedTo: e.target.checked ? "Ancillary" : "Flight",
                });
              }}
            >
              Ancillaries
            </Checkbox>
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
                    checked={data?.passengerType === "Adult"}
                    onChange={(e) => {
                      setData({
                        ...data,
                        passengerType: e.target.checked ? "Adult" : "",
                      });
                    }}
                    value="Adult"
                  >
                    Adult
                  </Checkbox>
                  <Checkbox
                    labelClassName="flex-1"
                    name="type"
                    checked={data?.passengerType === "Child"}
                    onChange={(e) => {
                      setData({
                        ...data,
                        passengerType: e.target.checked ? "Child" : "",
                      });
                    }}
                    value="Child"
                  >
                    Child
                  </Checkbox>
                  <Checkbox
                    labelClassName="flex-1"
                    name="type"
                    checked={data?.passengerType === "Infant"}
                    onChange={(e) => {
                      setData({
                        ...data,
                        passengerType: e.target.checked ? "Infant" : "",
                      });
                    }}
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
                    checked={data?.flightRoute === "Oneway"}
                    onChange={(e) => {
                      setData({
                        ...data,
                        flightRoute: e.target.checked ? "Oneway" : "",
                      });
                    }}
                    value="Oneway"
                  >
                    Oneway
                  </Checkbox>
                  <Checkbox
                    labelClassName="flex-1 whitespace-nowrap"
                    name="type"
                    checked={data?.flightRoute === "RoundTrip"}
                    onChange={(e) => {
                      setData({
                        ...data,
                        flightRoute: e.target.checked ? "RoundTrip" : "",
                      });
                    }}
                    value="RoundTrip"
                  >
                    Round Trip
                  </Checkbox>
                  <Checkbox
                    labelClassName="flex-1 whitespace-nowrap"
                    name="type"
                    checked={data?.flightRoute === "MultiCity"}
                    onChange={(e) => {
                      setData({
                        ...data,
                        flightRoute: e.target.checked ? "MultiCity" : "",
                      });
                    }}
                    value="MultiCity"
                  >
                    Multi City
                  </Checkbox>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {/* <CitiesInput
                label="Departure Airport"
                size="small"
                placeholder="e.g LHR"
                value={data?.departureAirport || ""}
                onChange={(val) =>
                  setData({ ...data, departureAirport: val })
                }
              /> */}
              {/* <div className='relative flex items-center justify-center  cursor-pointer'>
                  <div className='absolute items-center justify-center flex'>
                    <span className='bg-secondary shadow-lg rounded-full p-1 hover:rotate-180 transition-all' onClick={() => swipeLoc()}>
                      <Icon icon='mdi:exchange' className='!w-5 !h-5' />
                    </span>
                  </div>
                </div> */}
              {/* <CitiesInput
                label={"Arrival Airport"}
                size="small"
                placeholder="e.g LOS"
                value={data?.arrivalAirport || ""}
                onChange={(val) =>
                  setData({ ...data, arrivalAirport: val })
                }
              /> */}
              <TextInput
                select
                label={"Arrival Time"}
                value={data?.arrivalTime}
                onChange={(ev) =>
                  setData({ ...data, arrivalTime: ev.target.value })
                }
              >
                <MenuItem value={undefined}></MenuItem>
                <MenuItem value="Morning">Morning</MenuItem>
                <MenuItem value="Afternoon">Afternoon</MenuItem>
                <MenuItem value="Evening">Evening</MenuItem>
              </TextInput>

            </div>

            <ArrivalAirport data={data?.arrivalAirports||[]} setData={(val) => setData({...data,arrivalAirports: val})} />
            <ExcludedArrivalAirport data={data?.excludedArrivalAirports} setData={(val) => setData({...data,excludedArrivalAirports: val})} />

            <div className="py-4">
              <hr />
            </div>
            <div className="flex gap-2">
              <TextInput
                select
                label={"Departure Time"}
                value={data?.departureTime}
                onChange={(ev) =>
                  setData({ ...data, departureTime: ev.target.value })
                }
              >
                <MenuItem value={undefined}></MenuItem>
                <MenuItem value="Morning">Morning</MenuItem>
                <MenuItem value="Afternoon">Afternoon</MenuItem>
                <MenuItem value="Evening">Evening</MenuItem>
              </TextInput>
            </div>

            <DepartureAirport data={data?.departureAirports||[]} setData={(val) => setData({...data,departureAirports: val})} />
            <ExcludedDepartureAirport data={data?.excludedDepartureAirports} setData={(val) => setData({...data,excludedDepartureAirports: val})} />

            <hr />
            
            <div className="flex gap-2">
              <TextInput
                select
                label={"Cabin Class"}
                value={data?.cabinClass}
                onChange={(ev) =>
                  setData({ ...data, cabinClass: ev.target.value })
                }
              >
                <MenuItem value={undefined}></MenuItem>
                <MenuItem value="Economy">Economy</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="PremiumEconomy">Premium Economy</MenuItem>
                <MenuItem value="FirstClass">First Class</MenuItem>
              </TextInput>
              <TextInput
                select
                label={"Ticket Class"}
                value={data?.ticketClass}
                onChange={(ev) =>
                  setData({ ...data, ticketClass: ev.target.value })
                }
              >
                <MenuItem value={undefined}></MenuItem>
                <MenuItem value="Z">Z</MenuItem>
              </TextInput>
            </div>
          </div>
        ) : null}

        <div className="self-start">
          <Checkbox value={'Append'} name='Append' checked={data?.append} onChange={(ev) => setData({...data,append: ev?.target?.checked})}>
            Append with other markups
          </Checkbox>
        </div>

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

function DepartureAirport({data,setData}) {
  const [departureAirport,setDepartureAirport] = useState("");

  const Tag = ({value}) => (
    <div className="flex items-center border rounded-full text-sm border-primary/30">
      <span className="px-2 py-[2px]">
        {value || ""}
      </span>
      <span className="hover:text-red-400 flex-1 py-[2px] rounded-r-full cursor-pointer pr-2 inline-block h-full"
       onClick={() => handleRemove(value)} 
      >
        <Icon icon='mdi:close' className='!w-4 !h-4' />
      </span>
    </div>
  )

  function handleRemove(iata) {
    setData && setData(data?.filter(val => val !== iata))
  }

  function handleChange(val) {
    setDepartureAirport(val)
    if(val?.iata)
      setData && setData([ ...(data || []), val?.iata ])
  }
  
  return (
    <div className="flex flex-col">
      <small>Departure Airports</small>
      <div className="flex gap-2 items-center max-w-[500px] overflow-x-auto pb-1 my-2">
        {(data)?.map((val,i) => 
          <Tag value={val} key={i} />
        )}
      </div>
      <CitiesInput
        label={""}
        size="small"
        placeholder="e.g LOS"
        value={departureAirport || ""}
        onChange={(val) =>
          handleChange(val)
        }
      />
    </div>
  )
}

function ExcludedDepartureAirport({data,setData}) {
  const [excludedDepartureAirport,setExcludedDepartureAirport] = useState("");

  const Tag = ({value}) => (
    <div className="flex items-center border rounded-full text-sm border-primary/30">
      <span className="px-2 py-[2px]">
        {value || ""}
      </span>
      <span className="hover:text-red-400 flex-1 py-[2px] rounded-r-full cursor-pointer pr-2 inline-block h-full"
       onClick={() => handleRemove(value)} 
      >
        <Icon icon='mdi:close' className='!w-4 !h-4' />
      </span>
    </div>
  )

  function handleRemove(iata) {
    setData && setData(data?.filter(val => val !== iata))
  }

  function handleChange(val) {
    setExcludedDepartureAirport(val)
    if(val?.iata)
      setData && setData([ ...(data || []), val?.iata ])
  }
  
  return (
    <div className="flex flex-col">
      <small>Excluded Departure Airports</small>
      <div className="flex gap-2 items-center max-w-[500px] overflow-x-auto pb-1 my-2">
        {(data)?.map((val,i) => 
          <Tag value={val} key={i} />
        )}
      </div>
      <CitiesInput
        label={""}
        size="small"
        placeholder="e.g LOS"
        value={excludedDepartureAirport || ""}
        onChange={(val) =>
          handleChange(val)
        }
      />
    </div>
  )
}

function ArrivalAirport({data,setData}) {
  const [ArrivalAirport,setArrivalAirport] = useState("");

  const Tag = ({value}) => (
    <div className="flex items-center border rounded-full text-sm border-primary/30">
      <span className="px-2 py-[2px]">
        {value || ""}
      </span>
      <span className="hover:text-red-400 flex-1 py-[2px] rounded-r-full cursor-pointer pr-2 inline-block h-full"
       onClick={() => handleRemove(value)} 
      >
        <Icon icon='mdi:close' className='!w-4 !h-4' />
      </span>
    </div>
  )

  function handleRemove(iata) {
    setData && setData(data?.filter(val => val !== iata))
  }

  function handleChange(val) {
    setArrivalAirport(val)
    if(val?.iata)
      setData && setData([ ...(data || []), val?.iata ])
  }
  
  return (
    <div className="flex flex-col">
      <small>Arrival Airports</small>
      <div className="flex gap-2 items-center max-w-[500px] overflow-x-auto pb-1 my-2">
        {(data)?.map((val,i) => 
          <Tag value={val} key={i} />
        )}
      </div>
      <CitiesInput
        label={""}
        size="small"
        placeholder="e.g LOS"
        value={ArrivalAirport || ""}
        onChange={(val) =>
          handleChange(val)
        }
      />
    </div>
  )
}

function ExcludedArrivalAirport({data,setData}) {
  const [excludedArrivalAirport,setExcludedArrivalAirport] = useState("");

  const Tag = ({value}) => (
    <div className="flex items-center border rounded-full text-sm border-primary/30">
      <span className="px-2 py-[2px]">
        {value || ""}
      </span>
      <span className="hover:text-red-400 flex-1 py-[2px] rounded-r-full cursor-pointer pr-2 inline-block h-full"
       onClick={() => handleRemove(value)} 
      >
        <Icon icon='mdi:close' className='!w-4 !h-4' />
      </span>
    </div>
  )

  function handleRemove(iata) {
    setData && setData(data?.filter(val => val !== iata))
  }

  function handleChange(val) {
    setExcludedArrivalAirport(val)
    if(val?.iata)
      setData && setData([ ...(data || []), val?.iata ])
  }
  
  return (
    <div className="flex flex-col">
      <small>Excluded Arrival Airports</small>
      <div className="flex gap-2 items-center max-w-[500px] overflow-x-auto pb-1 my-2">
        {(data)?.map((val,i) => 
          <Tag value={val} key={i} />
        )}
      </div>
      <CitiesInput
        label={""}
        size="small"
        placeholder="e.g LOS"
        value={excludedArrivalAirport || ""}
        onChange={(val) =>
          handleChange(val)
        }
      />
    </div>
  )
}