import mergeRecursive from "../../features/utils/mergeRecursive";
import { getTestLevel } from "../../utils/testLevel";

//  Intra1A = Amadeus
//  Intra2A = AmadeuSoapNG
//  Intra3A = AmadeusSoapDXB
//  Intra1T = Travelport
//  Intra1S = Sabre
//  Intra1K = TravX
export const offerSearchTemp = {
  supplier: [
    "Intra1A",
    // "Intra1T",
    // "Intra1S",
    'Intra1PK',
    "Intra1FR",
    "Intra2A",
    "Intra3A",
    'Intra1K'
  ]?.filter(val => !(['Intra1K']?.includes(val) && (getTestLevel() === getTestLevel('qa')))
    && !(['Intra1FR']?.includes(val) && (getTestLevel() > getTestLevel('qa')))
  ),
  currency: "NGN",
  maxSolutions: 100,
  originDestinations: [
    {
      from: "",
      to: "",
      departure: {
        date: "2023-11-24",
      },
    },
    {
      from: "",
      to: "",
      departure: {
        date: "2023-11-28",
      },
    },
  ],
  passengers: {
    adult: 1,
  },
  cabinClass: [
    "Economy",
    //   "PremiumEconomy",
    //   "Business",
    //   "FirstClass"
  ],
  //   "flightFilters": {
  // "allowedCarriers": [],
  // "excludedCarriers": [
  //     "AA"
  // ],
  // "preferredCarriers": []
  //   }
  // adjustment: {
  //   type: '', // Markup, Markdown
  //   method: '', // Fixed, Percentage
  //   adjustment: 0,
  // }
};

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
  let data = mergeRecursive({ ...obj }, offerSearchTemp);
  return data;
}
