import axios from "axios";
import {store} from '../redux/store'
import { logout } from "../redux/reducers/userSlice";

export default async function fetchServer({
      method,url,data,headers={},
      api=process.env.API || 'https://miles-staging-gateway.onrender.com/api',
      onDownloadProgress
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
    onDownloadProgress,
    headers
  })
  .catch(err => {
    if(err?.response?.status === 401) {
      store.dispatch(logout())
    }
    if(!err?.response?.status)
      throw new Error(err?.response?.status || "Network Error! Please check your network connectivity.")

    return err?.response?.data;
  })

  return res;
}

axios.interceptors.request.use(config => {
  config.metadata = { startTime: new Date() }; // Store the request start time
  return config;
});

axios.interceptors.response.use(response => {
  const { startTime } = response.config.metadata;
  const elapsedTime = new Date() - startTime; // Calculate the elapsed time
  const progress = Math.round((elapsedTime / 1000) * 10); // Assuming 10 milliseconds per percentage point
  response.config.metadata.progress = progress;
  
  return response;
});