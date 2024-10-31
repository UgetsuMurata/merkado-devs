import React from 'react'
import { images } from '../GLOBAL_VARIABLES'

export default function Header({ className }) {
    return (
        <div className={'h-12 w-full bg-theme-dark-pink align-middle py-2 ps-6 flex font-quicksand ' + className}>
            <img src={images.LOGO.src} alt={images.LOGO.alt}/>
            <span className='text-white leading-8 ms-2 select-none'>Merkado - Bugs and Version Control</span>
        </div>
    )
}
