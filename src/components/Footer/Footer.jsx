
import React from 'react'
import { Desktop, Mobile } from '../../responsive/Responsive'
import FooterDesktop from './FooterDesktop'
import FooterMobile from './FooterMobile'

export default function Footer() {
  return (
    <div className='bg-footer'>
      <div className="container-90 py-20">
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
