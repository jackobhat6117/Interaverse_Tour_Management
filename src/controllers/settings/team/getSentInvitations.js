import fetchServer from "../../fetchServer"

export default async function getSentInvitations(query) {
  let result = {return: 0,msg: 'Something went wrong fetching members!'}

  await fetchServer({method: 'GET',url: '/main/v1/team/sentInvitations'+(query?'?'+query:'')})
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