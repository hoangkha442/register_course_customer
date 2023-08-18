import React from 'react'
import { Carousel } from 'antd';
import './Banner.css'
export default function Banner() {
  return (
    <div className='w-full ml-[20%]'>
    <Carousel autoplay>
    <div className=''>
      <figure className='banner-item hover:before:left-[125%] relative overflow-hidden cursor-pointer rounded-lg'>
        <img className='h-[470px] object-cover rounded-lg' src='./img/banner2.jpg' alt='banner1' />
          <figcaption className='overlay absolute left-0 bottom-0 w-full h-[100%] bg-overlay transition-all rounded-lg'>
            <div className='figcaption-text w-[80%] h-full mx-auto flex flex-col justify-center mt-10'>
              <p className='text-white font-bold text-4xl tracking-wider'>Learn form the best</p>
              <p className='font-[500] text-base text-white my-4'> Choose from 130,000 online video courses with new <br /> additions published every month</p>
              <div className="mt-5">
                <button className='py-2 px-5 hover:text-[#2a41e8] transition-all duration-500 rounded bg-white text-[#585757] font-[500] text-[18px]'>Get Started</button>
              </div>
            </div>
          </figcaption>
      </figure>
    </div>
    <div>
      <figure className='banner-item hover:before:left-[125%] relative overflow-hidden cursor-pointer rounded-lg'>
        <img className='h-[470px] object-cover rounded-lg' src='./img/banner1.jpg' alt='banner1' />
          <figcaption className='overlay absolute left-0 bottom-0 w-full h-[100%] bg-overlay transition-all rounded-lg'>
            <div className='figcaption-text w-[80%] h-full mx-auto flex flex-col justify-center mt-10'>
              <p className='text-white font-bold text-4xl tracking-wider'>Learn form the best</p>
              <p className='font-[500] text-base text-white my-4'> Choose from 130,000 online video courses with new <br /> additions published every month</p>
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
