import { Col, Row } from 'antd'
import React from 'react'

export default function FooterMobile() {
  return (
    <Row gutter={52}>
          <Col span={24}>
            <div className="logo mt-2 mb-2">
              <p className='font-bold text-xl text-[#585757]'>COURSEPLUS</p>
            </div>
            <div className="text-[#727374] text-[14px] font-[500] tracking-wider">
            209, Nguyen Van Luong, GoVap, HCM
            </div>
            <div className="text-[#727374] text-[14px] font-[500] tracking-wider mt-1">
              Call us: <span className='text-[#585757] text-base'><a href="tel: 092023426789">(+09) 202 342 6789</a></span>
            </div>
          </Col>
          <Col className='mt-2' span={12}>
            <p className='text-[16px] font-bold text-[#585757] mt-2'>Resources</p>
            <ul className='text-[#727374] text-[14px] font-[500]  tracking-wider mt-1'>
              <li><a className='transition-all duration-700 hover:text-[#f64a6e]' href="#">About CoursePlus</a></li>
              <li className='mt-1 '><a className='transition-all duration-700 hover:text-[#f64a6e]' href="#">Contact Us</a></li>
              <li className='mt-1 '><a className='transition-all duration-700 hover:text-[#f64a6e]' href="#">Forums</a></li>
              <li className='mt-1 '><a className='transition-all duration-700 hover:text-[#f64a6e]' href="#">Blog</a></li>
              <li className='mt-1 '><a className='transition-all duration-700 hover:text-[#f64a6e]' href="#">Help Center</a></li>
            </ul>
          </Col>
          <Col span={12}>
              <p className='text-[16px] font-bold text-[#585757]  mt-2'>Products</p>
              <ul className='text-[#727374] text-[14px] font-[500]  tracking-wider mt-1'>
                <li><a  className='transition-all duration-700 hover:text-[#f64a6e]' href="https://capstone-movie-one.vercel.app/">MovieCapstone</a></li>
                <li className='mt-1'><a  className='transition-all duration-700 hover:text-[#f64a6e]' href="https://register-courses.vercel.app/">RegisterCourse</a></li>
              </ul>
          </Col>
          <Col className='mt-2' span={24}>
              <p className='text-[16px] font-bold text-[#585757] mt-2 uppercase'>CoursePlus EDUCATION TECHNOLOGY JOINT STOCK COMPANY</p>
              <ul className='text-[#727374] text-[14px] font-[400]  tracking-wider mt-1'>
                <li><a className='transition-all duration-700 hover:text-[#f64a6e]' href="#">Tax code: 01099256322
</a></li>
                <li className='mt-1'><a className='transition-all duration-700 hover:text-[#f64a6e]' href="#">Established date: 08/08/2023</a></li>
                <li className='mt-1'><a className='transition-all duration-700 hover:text-[#f64a6e]' href="#">Areas: Technology, education, programming. CoursePlus builds and develops products that bring value to the community.</a></li>
              </ul>
          </Col>
    </Row>
  )
}
