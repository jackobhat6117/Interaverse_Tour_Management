import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import bookingDataReducer from "./reducers/flight/flightBookingSlice";


export const store = configureStore({
  reducer: {
    flightBooking: bookingDataReducer,
    user: userReducer,
  }
})