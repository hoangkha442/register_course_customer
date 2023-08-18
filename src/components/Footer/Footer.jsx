
import React from 'react'
import { Desktop, Mobile } from '../../responsive/Responsive'
import FooterDesktop from './FooterDesktop'
import FooterMobile from './FooterMobile'

export default function Footer() {
  return (
    <div className='ml-[20%] bg-[#f9fafb] py-5 border-t border-t-[#e5e7eb]'>
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
