import moment from "moment";
import { formatMoney } from "../formatMoney";

function convertPriceToNumber(price) {
  if(typeof price !== 'string') return price
  
  var regex = /^[A-Za-z\s]+/;
  var numericPrice = parseFloat(price.replace(regex, '').replaceAll(',',''));
  return numericPrice;
}
export default function convertFlightObject(newObj) {

  var oldObj = {
    farePrice: {
      fareTotal: convertPriceToNumber(newObj.pricingInformation.price.totalPrice),
      convertedTotal: convertPriceToNumber(newObj.pricingInformation.price.totalPrice)
    },
    passengers:newObj?.pricingInformation.passengerFares,
    totalAmount: convertPriceToNumber(newObj.pricingInformation.price.totalPrice),
    segments: [],
    ...newObj
  };
  for (const key in oldObj.passengers) {
    if (Object.hasOwnProperty.call(oldObj.passengers, key)) {
      const obj = oldObj.passengers[key];
      obj.total = obj.passengerCount;
      obj.totalAmountWithoutTax = convertPriceToNumber(obj.basePrice);
      obj.totalAmount = convertPriceToNumber(obj.totalPrice);
      // delete obj.totalPrice;
    }
  }

  newObj.directions.forEach(function(direction) {
    let departureDate = moment(direction[0].departure.date);
    let arrivalDate = moment(direction[direction.length - 1].arrival.date);
    var segment = {
      flights: [],
      departureLocation: direction[0].departure.location,
      arrivalLocation: direction[direction.length - 1].arrival.location,
      departureDate: departureDate.format('YYYY-MM-DD'),
      departureTime: direction[0].departure.time,
      arrivalDate: arrivalDate.format('YYYY-MM-DD'),
      arrivalTime: direction[direction.length - 1].arrival.time,
    };

    direction.forEach(function(flight) {
      var oldFlight = {
        carrierIcon: flight.airline.image.url,
        carrierName: flight.airline.image.description,
        marketingCarrier: flight.airline.marketing,
        equipment: flight.aircraftType,
        flightNumber: flight.flightNumber,
        cabin: flight.cabinClass,
        bookingClass: flight.bookingClass,
        // departureTime: flight.departure.time,
        departureTime: direction[0].departure.time,
        departureDate: flight.departure.date,
        departureTerminal: flight.departure.terminal,
        departureLocation: flight.departure.location,
        // arrivalTime: flight.arrival.time,
        arrivalTime: direction[direction.length - 1].arrival.time,
        arrivalDate: flight.arrival.date,
        arrivalTerminal: flight.arrival.terminal,
        arrivalLocation: flight.arrival.location,
        duration: flight.duration,
        numberOfStops: flight.numberOfStops || (direction.length - 1),
        baggage: flight.baggage
      };

      segment['duration'] = flight.duration
      segment.flights.push(oldFlight);
    });

    segment.numberOfStops = Math.max(0,direction.length - 1)

    oldObj.segments.push(segment);
  });

  return oldObj;
}

export const newFlightObj = {
  "id": "1",
  "directions": [
    [
      {
        "segmentRef": "15",
        "airline": {
          "image": {
            "url": "https://pics.avs.io/200/200/AF@2x.png",
            "description": "AF"
          },
          "marketing": "AF",
          "operating": "AF"
        },
        "aircraftType": "332",
        "seatAvailability": 2,
        "flightNumber": "149",
        "cabinClass": "ECONOMY",
        "bookingClass": "T",
        "departure": {
          "time": "23:30",
          "date": "Nov,24,2023",
          "terminal": "I",
          "location": "LOS"
        },
        "arrival": {
          "time": "06:00",
          "date": "Nov,25,2023",
          "terminal": "2E",
          "location": "CDG"
        },
        "duration": "PT6H30M",
        "numberOfStops": 0,
        "baggage": "1 pc"
      },
      {
        "segmentRef": "16",
        "airline": {
          "image": {
            "url": "https://pics.avs.io/200/200/AF@2x.png",
            "description": "AF"
          },
          "marketing": "AF",
          "operating": "AF"
        },
        "aircraftType": "321",
        "seatAvailability": 2,
        "flightNumber": "1680",
        "cabinClass": "ECONOMY",
        "bookingClass": "L",
        "departure": {
          "time": "07:35",
          "date": "Nov,25,2023",
          "terminal": "2E",
          "location": "CDG"
        },
        "arrival": {
          "time": "08:00",
          "date": "Nov,25,2023",
          "terminal": "4",
          "location": "LHR"
        },
        "duration": "PT1H25M",
        "numberOfStops": 0,
        "baggage": "1 pc"
      }
    ],
    [
      {
        "segmentRef": "42",
        "airline": {
          "image": {
            "url": "https://pics.avs.io/200/200/KL@2x.png",
            "description": "KL"
          },
          "marketing": "KL",
          "operating": "KL"
        },
        "aircraftType": "73W",
        "seatAvailability": 2,
        "flightNumber": "128",
        "cabinClass": "ECONOMY",
        "bookingClass": "L",
        "departure": {
          "time": "20:25",
          "date": "Nov,28,2023",
          "terminal": "3",
          "location": "LHR"
        },
        "arrival": {
          "time": "22:40",
          "date": "Nov,28,2023",
          "location": "AMS"
        },
        "duration": "PT1H15M",
        "numberOfStops": 0,
        "baggage": "1 pc"
      },
      {
        "segmentRef": "43",
        "airline": {
          "image": {
            "url": "https://pics.avs.io/200/200/KL@2x.png",
            "description": "KL"
          },
          "marketing": "KL",
          "operating": "KL"
        },
        "aircraftType": "332",
        "seatAvailability": 2,
        "flightNumber": "587",
        "cabinClass": "ECONOMY",
        "bookingClass": "N",
        "departure": {
          "time": "13:50",
          "date": "Nov,29,2023",
          "location": "AMS"
        },
        "arrival": {
          "time": "20:35",
          "date": "Nov,29,2023",
          "terminal": "I",
          "location": "LOS"
        },
        "duration": "PT6H45M",
        "numberOfStops": 0,
        "baggage": "1 pc"
      }
    ]
  ],
  "pricingInformation": {
    "price": {
      "basePrice": "USD 499",
      "totalPrice": "USD 1,612.6",
      "taxes": "USD 0"
    },
    "passengerFares": {
      "adult": {
        "totalPrice": "USD 895.3",
        "basePrice": "USD 284",
        "taxes": "USD 0",
        "passengerCount": 1
      },
      "child": {
        "totalPrice": "USD 717.3",
        "basePrice": "USD 215",
        "taxes": "USD 0",
        "passengerCount": 1
      }
    }
  },
  "destinations": [
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
  "supplier": "Amadeus"
}

export function createFlightCat(oldObjects) {
  var cat = {
    cheapest: [],
    quickest: [],
    best: [],
    earliestTakeoff: [],
    earliestLanding: [],
    earliestReturnTakeoff: [],
    earliestReturnLanding: []
  };

  var cheapestPrices = [];
  var quickestDurations = [];
  var bestScores = [];
  var earliestTakeoffTimes = [];
  var earliestLandingTimes = [];
  var earliestReturnTakeoffTimes = [];
  var earliestReturnLandingTimes = [];

  oldObjects.forEach(function(oldObj, index) {
    var currentPrice = 0;
    var currentDuration = 0;
    var currentTakeoffTime = Number.MAX_VALUE;
    var currentLandingTime = Number.MAX_VALUE;
    var currentReturnTakeoffTime = Number.MAX_VALUE;
    var currentReturnLandingTime = Number.MAX_VALUE;

    oldObj.segments.forEach(function(segment) {
      segment.flights.forEach(function(flight) {
        // Calculate total price
        var price = convertPriceToNumber(oldObj.totalAmount);
        if (typeof price === 'number') {
          currentPrice += price;
        } 
        // else if (typeof price === 'string') {
        //   var numericPrice = parseFloat(price.replace(/^[A-Z]{3}\s/, ''));
        //   currentPrice += numericPrice;
        // }

        // Calculate total duration
        currentDuration += flight.duration;

        // Calculate earliest takeoff time
        var takeoffTime = new Date(flight.departureDate).getTime();
        if (takeoffTime < currentTakeoffTime) {
          currentTakeoffTime = takeoffTime;
        }

        // Calculate earliest landing time
        var landingTime = new Date(flight.arrivalDate).getTime();
        if (landingTime < currentLandingTime) {
          currentLandingTime = landingTime;
        }
      });
    });

    // Cheapest
    cheapestPrices.push(oldObj.totalAmount);

    // Quickest
    quickestDurations.push(currentDuration);

    // Best (Combination of Price and Duration)
    var currentScore = oldObj.totalAmount + currentDuration;
    bestScores.push(currentScore);

    // Earliest Takeoff
    earliestTakeoffTimes.push(currentTakeoffTime);

    // Earliest Landing
    earliestLandingTimes.push(currentLandingTime);

    // Earliest Return Takeoff
    var returnTakeoffTime = new Date(oldObj.segments[oldObj.segments.length - 1].flights[0].departureDate).getTime();
    earliestReturnTakeoffTimes.push(returnTakeoffTime);

    // Earliest Return Landing
    var returnLandingTime = new Date(oldObj.segments[oldObj.segments.length - 1].flights[oldObj.segments[oldObj.segments.length - 1].flights.length - 1].arrivalDate).getTime();
    earliestReturnLandingTimes.push(returnLandingTime);
  });

  // Sort indices based on categories
  cat.cheapest = sortIndices(cheapestPrices);
  cat.quickest = sortIndices(quickestDurations);
  cat.best = sortIndices(bestScores);
  cat.earliestTakeoff = sortIndices(earliestTakeoffTimes);
  cat.earliestLanding = sortIndices(earliestLandingTimes);
  cat.earliestReturnTakeoff = sortIndices(earliestReturnTakeoffTimes);
  cat.earliestReturnLanding = sortIndices(earliestReturnLandingTimes);

  return cat;
}

function sortIndices(arr) {
  return arr
    .map(function(_, index) {
      return index;
    })
    .sort(function(a, b) {
      return arr[a] - arr[b];
    });
}



export function convertBrandedFareObject(obj) {
  const segment = obj?.fareDetailsBySegment?.at(0);
  let data = {
    title: segment?.cabin,
    subTitle: segment?.brandedFare,
    flexibility: [
      // {label: 'No data on change',value: false},
    ],
    bags: [
      // {label: 'No carry-on bags',value: false},
    ],
    totalAmount: formatMoney(obj?.pricingInformation?.price?.totalPrice),
    ...obj,
  }
  segment?.amenities?.map(obj => {
    if(obj?.amenityType === 'BAGGAGE')
      data.bags.push({label: obj?.description,value: true,...obj})
    else if(obj?.amenityType === 'BRANDED_FARES')
      data.flexibility.push({label: obj?.description,value: true,...obj})
    return true;
  })

  return data;
}