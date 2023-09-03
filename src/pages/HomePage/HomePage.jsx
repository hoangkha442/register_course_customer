import React from 'react'
import NavBar from './NavBar/NavBar'
import Banner from './Banner/Banner'
import FeaturedClasses from './FeaturedClasses/FeaturedClasses'
import Categories from './Categories/Categories'

export default function HomePage() {
  return (
    <div className='h-max-content min-h-screen w-full bg-cover bg-white flex overflow-hidden'>
      <div className="pt-[70px] lg:block hidden fixed h-screen top-0 w-[20%] bg-white flex-shrink-0  border-r border-r-[#e5e7eb]">
        <NavBar />
      </div>
      <div className="min-h-screen lg:w-[80%] ml-auto w-full">
        <Banner />
        <div className="bg-[#f9fafb]"  id='FeaturedClasses'>
          <div className="pb-14">
            <FeaturedClasses />
          </div>
        </div>
        <Categories />
      </div>
    </div>
  )
}
