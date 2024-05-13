import React from 'react'

export default function SM(props) {
  const display = props.display || 'flex';
  return (
    <div className={`${props.className} hidden sm:${display}`}>{props.children}</div>
  )
}
