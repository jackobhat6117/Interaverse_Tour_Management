import { Clear } from '@mui/icons-material'
import React from 'react'

export default function Modal1({open,setOpen,children,className,config={bg: true}}) {
  function handleCLickAway(ev) {
    ev?.stopPropagation();
    if(ev.target.parentElement.getAttribute('name') && (ev.target.getAttribute('name') !== 'modalChild'))
      setOpen && setOpen(false);
  }
  return (
    <div className={`fixed top-0 left-0 w-screen h-screen justify-center items-center bg-black/30 z-[99]  ${open?'':'hidden'} `} 
      onClick={(ev) => handleCLickAway(ev)}
      style={{ transform: 'translate3d(0, 0, 0)' }}
      name='ModalParent'
    >
      <div className={'flex flex-col relative items-center justify-center h-full p-4 '+className} >
        {/* <ClickAwayListener onClickAway={() => setOpen(false)}> */}
          <div className='flex flex-col gap-3 max-h-screen p-4 relative max-w-full' name='modalChild'>
            <div className={'block sm:hidden  text-primary p-2 rounded-md self-end cursor-pointer hover:scale-[.9] '+(config.bg === true?'bg-secondary':config.bg||'')} onClick={() => setOpen(false)}>
              <Clear />
            </div>
            <div className={' rounded-md overflow-hidden overflow-y-auto '+(config.bg === true?'bg-secondary':config.bg||'test')}>
              {children}
            </div>
          </div>
        {/* </ClickAwayListener> */}
      </div>
    </div>
  )
}
