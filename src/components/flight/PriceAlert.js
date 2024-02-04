import React, { useState } from 'react'
import EmailInput, { isValidEmail } from '../form/EmailInput'
import Button1 from '../form/Button1'
import Icon from '../HOC/Icon';
import Modal1 from '../DIsplay/Modal/Modal1';
import { ThemeProvider, createTheme } from '@mui/material';
import IOSSwitch from '../form/IOSSwitch';

export default function PriceAlert({callback}) {
    const [data,setData] = useState({email: ''})
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);

    const [priceAlertSet,setPriceAlertSet] = useState(window?.localStorage?.getItem('priceAlert'))

    async function handleSubmit(ev) {
        ev?.preventDefault();

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve,2000));
        
        window.localStorage.setItem('priceAlert',true)
        setPriceAlertSet(true)
        callback && callback()

        setLoading(false);
    }

    function handleChange(ev,val) {
        if(!val) {
            window.localStorage.removeItem('priceAlert')
            setPriceAlertSet(false)
        } else
            setOpen(true);
    }
  return (
    <div>
        <div className='pt-4 px-6 flex flex-col gap-1'>
            <div>
            <div className='flex gap-2 justify-between'>
                <b>Setup price alerts</b>
                <ThemeProvider theme={createTheme({
                    palette: {
                        mode: 'dark'
                    }
                })}>
                    <IOSSwitch checked={priceAlertSet} onChange={handleChange} />
                </ThemeProvider>
            </div>
            <p>Receive alerts when the prices for this route change.</p>
            </div>
        </div>
        <div>
            <Modal1 open={open} setOpen={setOpen} >
                <div className='card p-8 max-w-[500px]'>
                {!priceAlertSet ? (
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6' >
                        <h5 className='self-center'>Create a Price Alert</h5>
                        <p>Ticket prices change all the time. We can't prevent it, but we can let you know.</p>
                        <EmailInput value={data.email} onChange={(ev) => setData({...data,email: ev.target.value})} />
                        <Button1 variant='text' disabled={!isValidEmail(data.email)} loading={loading} type='submit'>Next</Button1>
                    </form>
                ) : (
                    <div className='flex flex-col items-center gap-6 text-center'>
                        <Icon icon='mdi:bell-ring' className='w-[90px] h-[90px] rotate-45' />
                        <h3 className='my-6'>Thanks</h3>
                        <div>
                            <div>Your price alert has been created.</div>
                            We will send you an email when price change.
                        </div>
                        <div>
                            <Button1 className='!btn' onClick={() => setOpen(false)}>Back to results</Button1>
                        </div>
                    </div>
                )}
                </div>
            </Modal1>
        </div>
    </div>
  )
}
