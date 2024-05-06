import React, { useState } from "react";
import { useSelector } from "react-redux";
import getFlightOfferPrice from "../../controllers/Flight/getOfferPrice";
import Modal1 from "../DIsplay/Modal/Modal1";
import Icon from "../HOC/Icon";


export default function ViewFareRule({data,button}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fareRules, setFareRules] = useState();
  const [miniRules,setMiniRules] = useState(data?.fareRules?.rules);
  const { bookingData } = useSelector((state) => state.flightBooking);

  async function showDetail() {
    let userId = null;
    if (bookingData.as) userId = bookingData.as.id;
    const req = {
      supplier: data?.supplier,
      offers: [data]
    }

    setLoading(true);
    const res = await getFlightOfferPrice(req, userId);
    setLoading(false);
    if (res.return) {
      setFareRules(res?.data?.data?.map((obj,i) => Object.values(obj.fareRules)));
    }
  }

  function openFareRule() {
    setOpen(true);
    console.log(miniRules,' --> ')
    if(!miniRules.length)
      showDetail();
    else setOpen(false);
  }

  // console.log('farerule : ',fareRules)
  // console.log(Object.values(fareRules || {})?.map((rule,i) => rule))

  return (
    <div>
      {button ? 
        React.cloneElement(button,{onClick: openFareRule})
      :
        <button onClick={openFareRule} className="py-4 text-theme1">
          View fare rule
        </button>
      }
      <Modal1 open={open} setOpen={setOpen}>
        <div className="card p-5 flex flex-col gap-4 border-primary relative w-[500px] max-w-full ">
          <Icon icon='carbon:close-filled' className="btn_close self-end sticky top-2" onClick={() => setOpen(false)} />
          {loading ? <div className="load self-center"></div> : null}
          {loading ? <div className="text-center">Please Wait, we are searching.</div> : null}
          {miniRules ? 
            miniRules?.map((obj,h) => (
              <div key={h}>
                {
                  Object.entries(obj)?.map(([key,val],i) => (
                    <div className="flex flex-col gap-3 items-center justify-between" key={i}>
                      {key === 'category' ? <b>{val}</b> 
                      : 
                      <div>
                        {key}: {val}
                      </div>
                      }
                    </div>
                  ))
                }
              </div>
            ))
          :
            fareRules?.slice(0,1)?.map((fareRule,i) => (
              <div className={`${i!==0?'border-t my-3':''}`}>
                {
                  fareRule?.slice(0,1).map((rule,j) => (
                    <div className="flex flex-col gap-3">
                      {
                        rule?.fareNotes?.descriptions?.map((description,k) => (
                          <div key={`${i}${j}${k}`}>
                            <h5>{description.descriptionType}</h5>
                            <p>{description.text}</p>
                            {/* <Collapsible header={
                            } value={i===0 && j === 0}>
                            </Collapsible> */}
                          </div>
                        ))
                      }
                      <hr /><br />
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </Modal1>
    </div>
  );
}
