import fetchServer from "../fetchServer";

/**
 *
 * @param {{
 *   name: string
 *   type: "Markup"|"Markdown"
 *   method: "Fixed"|"Percentage"
 *   currency: string
 *   amount: string
 *   appliedTo: "Flight"|"Ancillary"
 *   passengerType: "Adult"| "Child"| "Infant"
 *   flightRoute: "Oneway"|"RoundTrip"|"MultiCity"
 *   airline: string
 *   departureAirport: string
 *   arrivalAirport: string
 *   transitAirport: string
 *   cabinClass: "Economy"| "PremiumEconomy"| "Business"| "FirstClass"
 *   ticketClass: string
 *   arrivalTime: "Morning"| "Afternoon"| "Evening"
 *   departureTime: "Morning"| "Afternoon"| "Evening"
 * }} data
 * @returns
 */
export default async function createFlightPriceAdjustment(data) {
  let result = {
    return: 0,
    msg: "Something went wrong creating Price Adjustment!",
  };

  await fetchServer({
    method: "POST",
    url: "/product/v1/flightPriceAdjustment",
    data,
  })
    .then((res) => {
      if (res?.data && !res?.data?.error) {
        result = { return: 1, msg: "Successful", data: res?.data };
      } else result["msg"] = res?.data?.error || result["msg"];
    })
    .catch((err) => {
      console.log("Network Error!");
    });

  return result;
}
