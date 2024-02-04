import React, { useRef, useState } from 'react';
import Icon from '../HOC/Icon';

const CopyText = (props) => {
    const inputRef = useRef();
    const [copied,setCopied] = useState(false);

    const handleCopy = (ev) => {
        ev?.stopPropagation();

        if (inputRef.current) {
          inputRef.current.select();
          navigator.clipboard.writeText(inputRef.current.value)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false),2000)
            })
            .catch((error) => {
              console.error('Failed to copy text:', error);
            });
        }
      };

  return (
    <div className='flex gap-2 items-center'>
        {React.cloneElement(props.children, { ref: inputRef })}
      <button onClick={handleCopy} className='relative w-5 h-5'>
        <div className={copied?'hidden':'block'}>
            <Icon icon='ion:copy-outline' className={'text-primary/50 !w-4 !h-4'} />
        </div>
        {copied?
            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center swipe-animation duration-400'>
                <Icon icon='ic:round-check' className='text-green-600' />
            </div>
        :null}
      </button>
    </div>
  );
};

export default CopyText;