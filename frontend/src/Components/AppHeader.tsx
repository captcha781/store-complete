import React from 'react'
import { Link } from 'react-router-dom'

import {
  CContainer,
  CHeader,
  // CHeaderBrand,
  // CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavbarText
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCart, cilGift, cilMenu, cilUserX } from '@coreui/icons'

// import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
// import { logo } from '../assets/brand/logo'
import { useAppDispatch, useAppState } from '../Redux/Hook'
import { sidebarToggle } from '../Redux/Slices/CommonSlice'


const AppHeader = () => {
  const dispatch = useAppDispatch()
  const authStatus = useAppState(state => state.user.auth)
  const sidebarShow = useAppState((state) => state.common.sidebarShow)
  let auth = authStatus;



  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => {
            dispatch(sidebarToggle())
            const elemmain = document.getElementById("shrinked-custom") as HTMLDivElement
            if (window.innerWidth >= 768) {
              elemmain.style.paddingLeft = "18em"
              if (sidebarShow) {
                elemmain.style.paddingLeft = "0em"
              }
            }
          }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <div className="mx-auto d-md-none">
          <Link to="/" className="sidebar-brand-full"><h1 className='mb-2 tw-font-fredoka tw-bg-gradient-to-r tw-from-orange-600 tw-to-pink-500  tw-text-transparent tw-object-fill tw-bg-clip-text'>KeyStone</h1></Link>
        </div>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/"}><CNavbarText>Store</CNavbarText></Link>
          </CNavItem>
          <CNavItem>
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/cart"}><CNavbarText>Cart</CNavbarText></Link>
          </CNavItem>
          {auth && <CNavItem>
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/u/orders"}><CNavbarText>Orders</CNavbarText></Link>
          </CNavItem>}
          {auth && <CNavItem>
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/u/profile"}><CNavbarText>Account</CNavbarText></Link>
          </CNavItem>}
          {auth && <CNavItem>
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/u/signout"} onClick={() => localStorage.setItem("entryurl", "/u/signout")}><CNavbarText>SignOut</CNavbarText></Link>
          </CNavItem>}
          {!auth && <CNavItem>
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/signin"}><CNavbarText>Sign In</CNavbarText></Link>
          </CNavItem>}
          {!auth && <CNavItem>
            <Link className='tw-no-underline tw-text-slate-500 tw-mx-2' to={"/signup"}><CNavbarText>Sign Up</CNavbarText></Link>
          </CNavItem>}
        </CHeaderNav>
        <CHeaderNav className='tw-items-center tw-gap-x-3'>
          <CNavItem>
            <Link className='tw-text-slate-500' to={"/cart"}>
              <CIcon icon={cilCart} size="lg" />
            </Link>
          </CNavItem>
          {auth && <CNavItem>
            <Link className='tw-text-slate-500' to="/u/orders">
              <CIcon icon={cilGift} size="lg" />
            </Link>
          </CNavItem>}
          {auth && <CNavItem>
            <Link className='tw-text-slate-500' to="/u/signout">
              <CIcon icon={cilUserX} size="lg" />
            </Link>
          </CNavItem>}
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      {/* <CHeaderDivider /> */}
      {/* <CContainer fluid>
        <AppBreadcrumb /> 
        <div>Hello</div>
      </CContainer> */}
    </CHeader>
  )
}

export default React.memo(AppHeader)
