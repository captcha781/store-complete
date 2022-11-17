import React, { Suspense } from 'react'
import AppFooter from '../../Components/AppFooter'
import AppHeader from '../../Components/AppHeader'
import AppSidebar from '../../Components/AppSidebar'
import { CContainer, CSpinner } from '@coreui/react'
import StoreLayout from '../../Components/Store/StoreLayout'
import { ArrowUpwardOutlined } from "@mui/icons-material"
import Wrapper from '../../Components/Wrappers/Wrapper'
const Store = () => {
  // console.log("Store");
  document.title = "KeyStone | Store"




  return (
    <div>
      <AppSidebar />
      <Wrapper>
        <AppHeader />
        <div className="body flex-grow-1 md:px-3">
          <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
              <StoreLayout />
              <div className='tw-fixed tw-w-14 tw-h-14 tw-bg-black tw-flex tw-justify-center tw-items-center tw-rounded-full tw-bottom-9 tw-right-9 tw-cursor-pointer' style={{ zIndex: "10000 !important" }} onClick={() => { window.scrollTo({ top: 0 }) }}><ArrowUpwardOutlined className='tw-text-white' /></div>
            </Suspense>
          </CContainer>
        </div>
        <AppFooter />
      </Wrapper>
    </div >
  )
}

export default Store