import fetchServer from "../fetchServer";

export default async function getMarkups() {
  let result = {return: 0,msg: 'Something went wrong fetching Markup!'}

  await fetchServer({method: 'GET',url: '/product/v1/priceAdjustment?filterBy=type&filterValue=Markup'})
  .then((res) => {
    if(res?.data && !res?.data?.error) {
      result = {return: 1,msg: 'Successfull',data: res?.data}
    } else result['msg'] = res?.data?.error || result['msg']
  })
  .catch((err) => {
    console.log('Network Error!')
  })

  return result;
}