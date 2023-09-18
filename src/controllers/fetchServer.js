import axios from "axios";
import {store} from '../redux/store'
import { logout } from "../redux/reducers/userSlice";

export default async function fetchServer({
      method,url,data,headers,
      api=process.env.API || 'https://miles-staging-gateway.onrender.com/api'
  }) {

    console.log('api: ',api,process.env)

  try {
    const {accessToken} = store.getState()?.user?.userData;
    if(accessToken) {
      headers.Authorization = 'Bearer '+accessToken
    } else headers.Authorization = null;


  } catch(ex) {}

  const res = await axios({
    method,
    url: api+url,
    data,
    headers
  })
  .catch(err => {
    if(err.response.status === 401) {
      store.dispatch(logout())
    }
    return err?.response?.data;
  })

  return res;
}