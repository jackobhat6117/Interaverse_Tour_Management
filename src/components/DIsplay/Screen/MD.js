import React from 'react'

export default function MD(props) {
  const display = props.display || 'flex';
  const direction = props?.lt ? `sm:hidden` : `hidden sm:${display}`;
  return (
    <div className={`${direction} ${props.className}`}>{props.children}</div>
  )
}
