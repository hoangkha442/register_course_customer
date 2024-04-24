import React from 'react'
import Header from '../../components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../pages/HomePage/NavBar/NavBar'

export default function UserTemplate() {
  return (
    <div>
      <Header />
      <div className="h-max-content min-h-screen w-full bg-cover flex overflow-hidden bg-[#f9fafb]">
          <div className="pt-[70px] lg:block hidden fixed h-screen top-0 w-[20%] bg-white flex-shrink-0  border-r border-r-[#e5e7eb]">
            <NavBar />
          </div>
          <div className="min-h-screen lg:w-[80%] w-full ml-auto">
            <Outlet />
            </div>
          </div>
      <Footer />
    </div>
  )
}
