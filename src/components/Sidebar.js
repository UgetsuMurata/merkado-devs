import React from 'react'
import Header from './Header'
import { webpages } from '../GLOBAL_VARIABLES';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ children, setItem, resetValues }) {
    return (
        <div className='h-auto min-h-screen relative bg-white'>
            <Header className={"fixed top-0 left-0 z-20"} />
            <div className={"h-full w-60 fixed shadow-xl bg-theme-pink pt-20 z-10"}>
                {
                    webpages.map((item) => {
                        return <SidebarItems itemName={item.itemName} itemLink={item.itemLink}/>;
                    })
                }
            </div>
            <div className='w-full h-full min-h-max pt-12 ps-60'>
                {children}
            </div>
        </div>
    )
}

function SidebarItems({ itemName, itemLink }) {
    const navigate = useNavigate();
    return (
        <div
            className={'w-full p-2 ps-10 text-base text-black font-quicksand hover:bg-theme-light-pink cursor-pointer'}
            onClick={()=> navigate(itemLink) }>
            {itemName}
        </div>
    )
}