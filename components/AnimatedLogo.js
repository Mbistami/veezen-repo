import React from 'react'
import LogoTopLeft from '../assets/veezen-top-left.png'
import LogoTopRight from '../assets/veezen-top-right.png'
import LogoBottomRight from '../assets/veezen-bottom-right.png'
import LogoBottomLeft from '../assets/veezen-bottom-left.png'
import styles from '../styles/AnimatedLogo.module.css'

const AnimatedLogo = () => {
  return (
    <div className='main-animated-logo'>
      <div className='main'>
        <div className='main-logo-parts'>
          <div className='top-left-logo'><img src={LogoTopLeft} /></div>
          <div className='top-right-logo'><img src={LogoTopRight} /></div>
          <div className='bottom-left-logo'><img src={LogoBottomLeft} /></div>
          <div className='bottom-right-logo'><img src={LogoBottomRight} /></div>
        </div>
      </div>
    </div>
  )
}
export default AnimatedLogo