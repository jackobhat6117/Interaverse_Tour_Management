import { createSlice } from "@reduxjs/toolkit"

let initialState = {
  userData: {
    loggedIn: false,
    accessToken: null,
    id: null,
    user: {
      id: null,
      username: null,
      firstName: ''
    }
  }
}

const UDStorage = window.localStorage.getItem('userData');
if(UDStorage)
  initialState = {userData: JSON.parse(UDStorage)};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state,action) => {
      state.userData = action.payload;
      window.localStorage.setItem('userData',JSON.stringify(action.payload))
    },
    setUser: (state,action) => {
      state.userData.user = action.payload;
      window.localStorage.setItem('userData',JSON.stringify(state.userData))
    },
    logout: (state) => {
      state.userData = initialState;
      window.localStorage.removeItem('userData');
    }

  }
})

export const {setUserData,setUser,logout} = userSlice.actions;

export default userSlice.reducer;