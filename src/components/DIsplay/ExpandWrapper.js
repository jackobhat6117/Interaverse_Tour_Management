import React, { createContext, useEffect, useState } from 'react'

const State = createContext();
export default function ExpandWrapper({children,open:gotOpen}) {
    const [open,setOpen] = useState(gotOpen);

    useEffect(() => {
      setOpen(gotOpen)
    },[gotOpen])

  return (
    <div>
        <State.Provider value={{open,setOpen}}>
          <State.Consumer>
            {children}
          </State.Consumer>
        </State.Provider>
    </div>
  )
}
