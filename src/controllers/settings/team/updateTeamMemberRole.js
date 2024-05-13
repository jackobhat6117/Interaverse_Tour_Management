import fetchServer from "../../fetchServer"

export default async function updateTeamMemberRole(id,data) {
  let result = {return: 0,msg: 'Something went updating role!'}

  await fetchServer({method: 'PATCH',url: '/main/v1/staff/update/'+id,data})
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