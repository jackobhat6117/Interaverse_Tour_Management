import {store} from '../../../redux/store'
import fetchServer from "../../fetchServer"

export default async function getTeamMembers() {
  let result = {return: 0,msg: 'Something went wrong fetching members!'}

  let token = store.getState().user.userData.accessToken;
  let headers = {
    Authorization: 'Bearer '+token,
  }
  await fetchServer({method: 'GET',url: '/main/v1/team',
    headers
  })
  .then((res) => {
    // console.log(" => ",res)
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res?.data?.data}
    } else if(res?.data?.error) result['msg'] = res.data.error
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}