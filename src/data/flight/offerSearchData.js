import mergeRecursive from "../../features/utils/mergeRecursive";

export const offerSearchTemp = {
  "destinations": [
      {
          "departureLocation": "",
          // "departureLocation": "BRU",
          "arrivalLocation": "",
          // "arrivalLocation": "FCO",
          "date": ""
          // "date": "2023-06-20"
      },
      // {
      //     "departureLocation": "FCO",
      //     "arrivalLocation": "BRU",
      //     "date": "2023-06-30"
      // }
  ],
  "flex": "true",
  "nonStop": "false",
  "passengers": {
      "adults": "1"
  },
  "travelClass": "ECONOMY"
}

export function templateOfferSearch(obj) {
  let data = mergeRecursive({...obj},offerSearchTemp);
  return data;
}
