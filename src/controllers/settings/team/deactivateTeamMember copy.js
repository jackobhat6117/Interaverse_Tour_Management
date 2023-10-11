import fetchServer from "../../fetchServer"

export default async function deactivateTeamMember(id) {
  let result = {return: 0,msg: 'Something went wrong deactivating member!'}

  await fetchServer({method: 'PATCH',url: '/main/v1/team/deactivate/'+id})
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