import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div className='tw-font-outfit'>
        <a className='tw-text-gray-700 tw-font-medium' href="https://captcha781.github.io/portfolio" target="_blank" rel="noopener noreferrer">
          Iamrealbhuvi
        </a>
        <span className="ms-1">&copy; 2022</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Handcrafted by</span>
        <a className=' tw-font-medium' href="https://github.com/captcha781" target="_blank" rel="noopener noreferrer">
          Captcha781
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
