import fetchServer from "../fetchServer";

/**
 *
 * @param {string} id
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
export default async function updateFlightPriceAdjustment(id, data) {
  let result = {
    return: 0,
    msg: "Something went wrong updating bank account!",
  };

  await fetchServer({
    method: "PATCH",
    url: `/payment/v1/personalAccount/updateFlightPriceAdjustment/${id}`,
    data,
  })
    .then((res) => {
      if (res?.data && !res?.data?.error) {
        result = { return: 1, msg: "Successful", data: res?.data?.data };
      } else if (res?.data?.error) result["msg"] = res.data.error;
    })
    .catch((err) => {
      console.log("Network Error!");
    });

  return result;
}
