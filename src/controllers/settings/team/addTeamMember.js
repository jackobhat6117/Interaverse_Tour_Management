import {store} from '../../../redux/store'
import fetchServer from "../../fetchServer"

export default async function addTeamMember(data) {
  let result = {return: 0,msg: 'Something went wrong adding member!'}

  let token = store.getState().user.userData.accessToken;
  let headers = {
    Authorization: 'Bearer '+token,
  }
  await fetchServer({method: 'POST',url: '/main/v1/staff/invite',data,
    headers
  })
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res?.data?.data}
    } else if(res?.data?.error) result['msg'] = res.data.error
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}