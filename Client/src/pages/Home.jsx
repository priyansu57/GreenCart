import React from 'react'
import MainBanner from '../component/HomeComponent/MainBanner'
import Categories from '../component/HomeComponent/Categories'
import BestSeller from '../component/HomeComponent/BestSeller'
import ButtonBanner from '../component/HomeComponent/ButtonBanner'
import NewLetter from '../component/HomeComponent/NewLetter'


function Home() {
    return (
        <div className='mt-10'>
            <MainBanner />
            <Categories />
            <BestSeller />
            <ButtonBanner />
            <NewLetter />
           
        </div>
    )
}

export default Home
