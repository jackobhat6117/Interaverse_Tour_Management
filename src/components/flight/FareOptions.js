import React, { useEffect, useState } from 'react'
import { def } from '../../config'
import Button1 from '../form/Button1'
import getBrandedFares from '../../controllers/Flight/getBrandedFares';
import { convertBrandedFareObject } from '../../features/utils/flight/flightOfferObj';
import { formatMoney, getNumber } from '../../features/utils/formatMoney';
import { useSelector } from 'react-redux';
import Icon from '../HOC/Icon';
import LoadingBar from '../animation/LoadingBar';


export default function FareOptions({data,handleReturn}) {
  const [options,setOptions] = useState([])
  const [selected,setSelected] = useState();
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    if(data)
      load();
    //eslint-disable-next-line
  },[data])

  async function load() {
    setLoading(true);
    const res = await getBrandedFares({offers: [data],supplier: data?.supplier});
    if(res.return) {
      setOptions(res?.data || [])
    } else setOptions(null)
    setLoading(false);
  }

  function handleSelect(i) {
    handleReturn && handleReturn(options[i])
  }

  return (
    <div className='flex flex-col gap-2 p-6 max-w-[1000px] items-center'>
      <div className='flex gap-4 flex-wrap'>
        {loading ? 
          <div className=''>
            <div>
              Please wait, we are searching.
            </div>
            <LoadingBar duration={8} />
          </div>
        : !options ?
          <p className='text-center self-center w-full'>No Fare Options Available</p>
        : 
        <div>
          {
          options?.map((obj,i) => (
            <FareOption key={i} data={convertBrandedFareObject(obj)} activate={() => setSelected(i)} selected={selected===i} select={() => handleSelect(i)} />
            ))
          }
        </div>
        }
      </div>
    </div>
  )
}

export function FareOption({selected,data: gotData,select,activate}) {
  const initStyle = {
    bg: 'bg-theme1/10',
  }
  const [data,setData] = useState(gotData)
  const [style,setStyle] = useState(initStyle)

  const {bookingData} = useSelector(state => state.flightBooking);

  const lastPath = bookingData?.offer?.at((bookingData?.offer?.length || 1) - 1)


  useEffect(() => {
    if(gotData)
      setData(gotData)
  },[gotData])
  // let data = {
  //   title: 'ECONOMY',
  //   subTitle: 'Economy lightbag',
  //   flexibility: [
  //     {label: 'No data on change',value: false},
  //     {label: 'No data on refunds',value: false},
  //     {label: 'Hold on time: (12h)',value: true},
  //   ],
  //   bags: [
  //     {label: 'No carry-on bags',value: false},
  //     {label: 'Includes 1 checked bag',value: true}
  //   ],
  //   totalAmount: 239900
  // }

  function handleStyle(ev) {
    ev?.stopPropagation();

    setStyle({...style,bg: 'bg-primary text-secondary'})
    // select && select()
    activate && activate();
  }

  const prevPrice = getNumber(lastPath?.totalAmount || 0)
  const curPrice = getNumber(data.totalAmount);
  return data && (
    <div className={`min-w-[300px] flex-1 flex flex-col border rounded-md border-primary/20 overflow-hidden ${selected?' border-primary/100 !border-[3px] ':''} `} onClick={handleStyle}>
      {selected?<small className='bg-primary text-white p-2 block'>Selected</small>:null}
      <div className=' p-4 flex-1 flex flex-col gap-3'>
        <div>
          <p>{data.title}</p>
          <div>{data.subTitle}</div>
        </div>
        <hr />
        <h6>Flexibility</h6>
        <div className='flex flex-col gap-1'>
          {data.flexibility.map((obj,i) => (
            <p className='flex gap-2 items-center'>
              {/* <div className='border w-3 h-3 flex justify-center items-center p-2'>
                {obj.value?'':'X'}
              </div> */}
              <Icon icon='game-icons:check-mark' className='border !w-[14px] !h-[14px] p-[2px]' />
              <span>{obj.label}</span>
            </p>
          ))}
        </div>
        <h6>Bags</h6>
        <div className='flex flex-col gap-1'>
          {data.bags.map((obj,i) => (
            <p className='flex gap-2 items-center'>
              {/* <div className='border w-3 h-3 flex justify-center items-center p-2'>
                {obj.value?'':'X'}
              </div> */}
              <Icon icon='game-icons:check-mark' className='border !w-[14px] !h-[14px] p-[2px]' />
              <span>{obj.label}</span>
            </p>
          ))}
        </div>
      </div>
      {/* {prevPrice} {curPrice} */}
      <div className={` p-4 flex flex-col gap-4 ${selected?'bg-primary text-secondary':'bg-theme1/10'} `}>
        <div className='flex gap-4'>
          <p className='!text-inherit'>Total amount for one traveler</p>
          <h4 className='!flex flex-row gap-1 !flex-nowrap'>
            {/* {lastPath?'+':''}  */}
            <span>
              {lastPath ? ((curPrice - prevPrice) >= 0 ? '+' : '-') : null}
            </span>
            {formatMoney(Math.abs(curPrice - prevPrice))}
          </h4>
        </div>
        {/* <div className='flex flex-col gap-2'>
          <small>prev: {formatMoney(prevPrice)}</small>
          <small>cur: {formatMoney(curPrice)}</small>
        </div> */}
        <Button1 onClick={select}>Select Fare</Button1>
      </div>
    </div>
  )
}