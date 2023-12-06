import mergeRecursive from "../../features/utils/mergeRecursive";

export const offerSearchTemp = {
  "supplier": [
      "Amadeus",
      "Travelport",
      "Sabre"
  ],
  "currency": "NGN",
  "maxSolutions": 20,
  "originDestinations": [
      {
          "from": "LOS",
          "to": "LHR",
          "departure": {
              "date": "2023-11-24"
          }
      },
      {
          "from": "LHR",
          "to": "LOS",
          "departure": {
              "date": "2023-11-28"
          }
      }
  ],
  "passengers": {
      "adult": 1
  },
  "cabinClass": [
      "Economy"
  ],
//   "flightFilters": {
      // "allowedCarriers": [],
      // "excludedCarriers": [
      //     "AA"
      // ],
      // "preferredCarriers": []
//   }
}

// export const old = {
//   "destinations": [
//       {
//           "departureLocation": "",
//           // "departureLocation": "BRU",
//           "arrivalLocation": "",
//           // "arrivalLocation": "FCO",
//           "date": ""
//           // "date": "2023-06-20"
//       },
//       // {
//       //     "departureLocation": "FCO",
//       //     "arrivalLocation": "BRU",
//       //     "date": "2023-06-30"
//       // }
//   ],
//   "flex": "true",
//   "nonStop": "false",
//   "passengers": {
//       "adults": "1"
//   },
//   "travelClass": "ECONOMY"
// }


export function templateOfferSearch(obj) {
  let data = mergeRecursive({...obj},offerSearchTemp);
  return data;
}
