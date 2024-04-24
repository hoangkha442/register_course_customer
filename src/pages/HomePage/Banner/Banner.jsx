import React from 'react'
import { Carousel } from 'antd';
import './Banner.css'
export default function Banner() {
  return (
    <div className='w-full'>
    <Carousel autoplay>
    <div className=''>
      <figure className='banner-item hover:before:left-[125%] relative overflow-hidden cursor-pointer rounded-lg'>
        <img className='md:h-[470px] h-[350px] object-cover rounded-lg' src='./img/banner2.jpg' alt='banner1' />
          <figcaption className='absolute left-0 bottom-0 w-full h-[100%] transition-all rounded-lg'>
            <div className='figcaption-text w-[80%] h-full mx-auto flex flex-col justify-center mt-5 sm:mt-10'>
              <p className='text-white font-bold text-3xl md:text-4xl'>Học từ những Giảng viên tốt nhất</p>
              <p className='md:font-[500] font-[300] text-base text-white my-2 md:my-4'>  Choose from 130,000 online video courses with new  <br /> additions published every month</p>
              <div className="mt-5">
                <button className='py-2 px-5 hover:text-[#2a41e8] transition-all duration-500 rounded bg-white text-[#585757] font-[500] text-[18px]'>Get Started</button>
              </div>
            </div>
          </figcaption>
      </figure>
    </div>
    <div>
      <figure className='banner-item hover:before:left-[125%] relative overflow-hidden cursor-pointer rounded-lg'>
        <img className='md:h-[470px] h-[350px] object-cover rounded-lg' src='./img/banner1.jpg' alt='banner1' />
          <figcaption className=' absolute left-0 bottom-0 w-full h-[100%] transition-all rounded-lg'>
            <div className='figcaption-text w-[80%] h-full mx-auto flex flex-col justify-center mt-5 sm:mt-10'>
              <p className='text-white font-bold text-3xl md:text-4xl'>Học từ những Giảng viên tốt nhất</p>
              <p className='md:font-[500] font-[300] text-base text-white my-2 md:my-4'> Choose from 130,000 online video courses with new <br /> additions published every month</p>
              <div className="mt-5">
                <button className='py-2 px-5 hover:text-[#2a41e8] transition-all duration-500 rounded bg-white text-[#585757] font-[500] text-[18px]'>Get Started</button>
              </div>
            </div>
          </figcaption>
      </figure>
    </div>
  </Carousel>
    </div>
  )
}
