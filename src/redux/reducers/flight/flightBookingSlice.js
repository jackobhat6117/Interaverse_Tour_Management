import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  bookingData: {

  },
}
const UDStorage = window.localStorage.getItem('bookingData');
if(UDStorage) {
  try {
    initialState = {bookingData: JSON.parse(UDStorage)};
  } catch(ex) {console.log("Failed reading bookingData from storage")}
  // console.log(" from LS : ",JSON.parse(UDStorage))
} 
else console.log("Got none from LS")

export const flightBookingSlice = createSlice({
  name: 'flightBooking',
  initialState,
  reducers: {
    setBookingData: (state,action) => {
      try {
        state.bookingData = action.payload;
        window.localStorage.setItem('bookingData',JSON.stringify(action.payload))
      } catch(ex) {console.log('Failed reading booking data from storage')}
    },
    clearBookingData: (state) => {
      state.bookingData = initialState;
      window.localStorage.removeItem('bookingData');
    }
  },
})

export const {setBookingData,clearBookingData} = flightBookingSlice.actions;

export default flightBookingSlice.reducer;