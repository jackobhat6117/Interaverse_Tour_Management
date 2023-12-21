import React from 'react'
import Icon from './HOC/Icon'
import CustomMenu from './utils/CustomMenu'
import { Link } from 'react-router-dom'
import addLayer from '../assets/icons/Applications/add-layer.svg'
import chess from '../assets/icons/Applications/chess.svg'
import coding from '../assets/icons/Applications/coding.svg'
import earnings from '../assets/icons/Applications/earnings.svg'
import flight from '../assets/icons/Applications/flight.svg'
import hotel from '../assets/icons/Applications/hotel.svg'
import link from '../assets/icons/Applications/link.svg'
import reward from '../assets/icons/Applications/reward.svg'
import team from '../assets/icons/Applications/team.svg'
import template from '../assets/icons/Applications/template.svg'
import tree from '../assets/icons/Applications/tree.svg'
import website from '../assets/icons/Applications/website.svg'

export default function Applications() {
    const lists = [
        {name: 'Flights',link: '/order/new/flight',icon: flight},
        {name: 'Stays',link: '/order/new/hotel',icon: hotel},
        {name: 'Tours',link: '/order/new/tour',icon: tree},
        {name: 'Earning',link: '/settings/order/commission',icon: earnings},
        {name: 'Developers',link: '/settings/agency/developer',icon: coding},
        {name: 'Templates',link: '/settings/order/emailTemplates',icon: template},
        {name: 'Website',link: '/settings/agency/developer?view=webhook',icon: website},
        {name: 'Widget',link: '/order/new/tour',icon: addLayer},
        {name: 'Embed Link',link: '/order/new/tour',icon: link},
        {name: 'Suppliers',link: '/settings/order/suppliers',icon: chess},
        {name: 'Team',link: '/settings/team',icon: team},
        {name: 'Miles Points',link: '/settings/order/points',icon: reward},
    ]

    const ListItem = ({obj: {name,link,icon}}) => (
        <Link to={link} className='flex flex-col w-[100px] h-[80px] gap-2 justify-center items-center hover:border rounded-md cursor-pointer'>
            <img src={icon} alt='' className='w-8 h-8' />
            <span className='text-sm'>{name}</span>
        </Link>
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
