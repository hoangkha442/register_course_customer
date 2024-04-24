import React from 'react'
import NavBar from './NavBar/NavBar'
import Banner from './Banner/Banner'
import FeaturedClasses from './FeaturedClasses/FeaturedClasses'
import Categories from './Categories/Categories'

export default function HomePage() {
  return (
    
        <>
          <Banner />
          <div className="bg-[#f9fafb]"  id='FeaturedClasses'>
            <div className="pb-14">
              <FeaturedClasses />
            </div>
          </div>
          <Categories />
        </>

  )
}
