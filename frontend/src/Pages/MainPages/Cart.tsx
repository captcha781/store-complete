import React, { Suspense } from 'react'
import AppFooter from '../../Components/AppFooter'
import AppHeader from '../../Components/AppHeader'
import AppSidebar from '../../Components/AppSidebar'
import { CContainer, CSpinner } from '@coreui/react'
import CartLayout from '../../Components/Cart/CartLayout'
import Wrapper from '../../Components/Wrappers/Wrapper'

const Cart = () => {
  document.title = "KeyStone | Cart"
  
  return (

    <div>
      <AppSidebar />
      <Wrapper>
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
              <CartLayout />
            </Suspense>
          </CContainer>
        </div>
        <AppFooter />
      </Wrapper>
    </div>

  )
}

export default Cart