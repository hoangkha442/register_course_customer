
import React from 'react'
import { Desktop, Mobile } from '../../responsive/Responsive'
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'

export default function Header() {
  return (
    <header className='w-full'>
      <div>
          <Desktop>
            <HeaderDesktop />
          </Desktop>
          <Mobile>
            <HeaderMobile />
          </Mobile>
        </div>
    </header>
  )
}
