import React, { useState } from 'react'
import Button1 from '../form/Button1'

export default function CopyButton({id}) {
  const [loading,setLoading] = useState(false);
  function handleCopy() {
    let elem = document.getElementById(id);
    setLoading(true);
    if (elem) {
      if (elem instanceof HTMLInputElement || elem instanceof HTMLTextAreaElement) {
        elem.select();
        document.execCommand('copy');
      } else {
        const range = document.createRange();
        range.selectNodeContents(elem);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
      }
    }
    setTimeout(() => setLoading(false),4000)
  }

  return (
    <Button1 onClick={handleCopy} size='small' className='!w-auto self-start !py-1 sm:!py-1 !px-2 sm:!px-2'>
      {loading?'Copied':'Copy'}
    </Button1>
  )
}
