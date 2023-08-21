import React from 'react'
import NavBar from './NavBar/NavBar'
import Banner from './Banner/Banner'
import FeaturedClasses from './FeaturedClasses/FeaturedClasses'

export default function HomePage() {
  return (
    <div className='h-max-content min-h-screen w-full bg-cover bg-white flex overflow-hidden'>
      <div className="pt-[70px] fixed h-screen top-0 w-[20%] bg-white flex-shrink-0  border-r border-r-[#e5e7eb]">
        <NavBar />
      </div>
      <div className="min-h-screen w-[80%] ml-auto">
        <Banner />
        <div className="bg-[#f9fafb]">
          <div className="pb-14">
            <FeaturedClasses />
          </div>
        </div>
      </div>
    </div>
  )
}
