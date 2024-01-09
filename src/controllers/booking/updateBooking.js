import fetchServer from "../fetchServer";

/**
 *
 * @param {{
 *   "supplier": "Amadeus",
 *   "offers": [
 *       {
 *           "id": string,
 *           "ancillaryServices": [
 *               {
 *                   "travelerId": string,
 *                   "segmentDetails": [
 *                       {
 *                           "segmentId": string,
 *                           "additionalServices": {
 *                               "chargeableSeatNumber": string
 *                           }
 *                       }
 *                   ]
 *               }
 *           ]
 *       }
 *   ],
 *   "travelersInfo": [
 *       {
 *           "lastName": string,
 *           "firstName": string,
 *           "birthDate": string,
 *           "gender": "Male"|"Female",
 *           "type": "ADT"|"CNN"|"INF",
 *           "phone": [
 *               {
 *                   "countryCode": string,
 *                   "location": string,
 *                   "number": string
 *               }
 *           ],
 *           "email": string,
 *           "document": {
 *               "documentType": string,
 *               "birthPlace": string,
 *               "issuanceLocation": string,
 *               "issuanceDate": string,
 *               "number": string,
 *               "expiryDate": string,
 *               "issuanceCountry": string,
 *               "validityCountry": string,
 *               "nationality": string,
 *               "holder": boolean
 *           }
 *       }
 *   ]
 *}} data
 * @param {string} pnr
 * @returns
 */
export default async function updateBooking(pnr, data) {
  let result = {
    return: 0,
    msg: "Something went wrong updating booking!",
  };

  await fetchServer({
    method: "PATCH",
    url: `/product/v1/flightOrder/${pnr}`,
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
