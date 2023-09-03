
import React from 'react'
import { Desktop, Mobile } from '../../responsive/Responsive'
import FooterDesktop from './FooterDesktop'
import FooterMobile from './FooterMobile'

export default function Footer() {
  return (
    <div className='lg:ml-[20%] ml-0 bg-white py-5 border-t border-t-[#e5e7eb]'>
      <div className="container-90">
        <Desktop>
          <FooterDesktop />
        </Desktop>
        <Mobile>
          <FooterMobile />
        </Mobile>
      </div>
    </div>
  )
}
