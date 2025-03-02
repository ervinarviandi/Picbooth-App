import React from 'react'
import Popup from '@/components/organism/Popup'

const Header = () => {
  return (
    <>
    <div className='w-full mt-5 '>
        <div className='lg:max-w-6xl mx-auto px-5 flex justify-end'>
          <Popup/>
        </div>
    </div>
    </>
  )
}

export default Header