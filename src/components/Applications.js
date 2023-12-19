import React from 'react'
import Icon from './HOC/Icon'
import CustomMenu from './utils/CustomMenu'
import { Link } from 'react-router-dom'

export default function Applications() {
    const lists = [
        {name: 'Flights',link: '/order/new/flight',icon: <Icon icon='emojione:airplane' className='-rotate-45' />},
        {name: 'Stays',link: '/order/new/hotel',icon: <Icon icon='emojione:hotel' />},
        {name: 'Tours',link: '/order/new/tour',icon: <Icon icon='twemoji:palm-tree' />},
        {name: 'Earning',link: '/order/new/tour',icon: <Icon icon='solar:hand-money-outline' className='text-[#0070FF]' />},
        {name: 'Developers',link: '/order/new/tour',icon: <Icon icon='material-symbols:developer-mode-tv-rounded' className='text-[#0070FF]' />},
        {name: 'Templates',link: '/order/new/tour',icon: <Icon icon='icon-park-solid:page-template' className='text-[#0070FF]'/>},
        {name: 'Website',link: '/order/new/tour',icon: <Icon icon='gridicons:domains' className='text-[#0070FF]'/>},
        {name: 'Widget',link: '/order/new/tour',icon: <Icon icon='streamline:add-layer-2' className='text-[#0070FF]'/>},
        {name: 'Embed Link',link: '/order/new/tour',icon: <Icon icon='ic:sharp-link' className='text-[#0070FF]'/>},
        {name: 'Suppliers',link: '/order/new/tour',icon: <Icon icon='carbon:scis-transparent-supply' className='text-[#0070FF]'/>},
        {name: 'Team',link: '/order/new/tour',icon: <Icon icon='fluent:people-team-add-20-filled' className='text-[#0070FF]'/>},
        {name: 'Miles Points',link: '/order/new/tour',icon: <Icon icon='dashicons:awards' className='text-[#0070FF]'/>},
    ]

    const ListItem = ({obj: {name,link,icon}}) => (
        <div className='flex flex-col w-[100px] h-[80px] gap-2 justify-center items-center hover:border rounded-md cursor-pointer'>
            {icon}
            <Link to={link} className='text-sm'>{name}</Link>
        </div>
    )
  return (
    <div>
        <CustomMenu 
            element={(
                <Icon icon="subway:menu" />
            )}
            >
            <div className='card p-10 grid grid-cols-3 gap-3'>
                {lists.map((list,i) => (
                    <ListItem key={i} obj={list} />
                ))}
            </div>
        </CustomMenu>
    </div>
  )
}
