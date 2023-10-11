import fetchServer from "../../fetchServer"

export default async function deleteAPIKey(id) {
  let result = {return: 0,msg: 'Something went wrong removing access key!'}

  await fetchServer({method: 'DELETE',url: '/main/v1/apikey/remove/'+id})
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