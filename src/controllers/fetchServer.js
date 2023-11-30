import axios from "axios";
import {store} from '../redux/store'
import { logout } from "../redux/reducers/userSlice";

export default async function fetchServer({
      method,url,data,headers={},
      api=process.env.API || 'https://miles-staging-gateway.onrender.com/api'
  }) {

  // console.log('api: ',api,process.env.REACT_APP_API)

  try {
    let token = store.getState().user.userData.accessToken;

    // const {accessToken} = store.getState()?.user?.userData;
    if(token) {
      headers.Authorization = 'Bearer '+token
    } else headers.Authorization = null;


  } catch(ex) {}

  const res = await axios({
    method,
    url: api+url,
    data,
    headers
  })
  .catch(err => {
    if(err?.response?.status === 401) {
      store.dispatch(logout())
    }
    throw new Error(err?.response?.status || "Network Error!")
    // return err?.response?.data;
  })

  return res;
}