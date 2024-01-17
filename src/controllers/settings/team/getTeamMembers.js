import fetchServer from "../../fetchServer"

export default async function getTeamMembers(query) {
  let result = {return: 0,msg: 'Something went wrong fetching members!'}

  await fetchServer({method: 'GET',url: '/main/v1/team?populate=member&'+query})
  .then((res) => {
    // console.log(" => ",res)
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res?.data?.data}
    } else if(res?.data?.error) result['msg'] = res.data.error
  })
  .catch((err) => {
    result['msg'] = err?.message;
    console.log(err?.message)
  })

  return result;
}