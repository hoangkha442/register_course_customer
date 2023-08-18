import React from 'react'
import NavBar from './NavBar/NavBar'
import Banner from './Banner/Banner'
import FeaturedClasses from './FeaturedClasses/FeaturedClasses'

export default function HomePage() {
  return (
    <div className='grid grid-cols-12 overflow-hidden'>
      <div className="col-span-2 pt-[70px] fixed top-0 w-[20%] bg-white">
        <NavBar />
      </div>
      <div className="col-span-12 border-l border-l-[#e5e7eb]">
        <Banner />
        <div className="bg-[#f9fafb] ml-[20%]">
          <div className=" border-l border-l-[#e5e7eb] pb-14">
            <FeaturedClasses />
          </div>
        </div>
      </div>
    </div>
  )
}
