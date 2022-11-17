import React from 'react'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import {Navigator,NavigatorNonAuth} from './Navigator/Navigator'
import { useAppDispatch, useAppState } from '../Redux/Hook'
import { sidebarToggle } from '../Redux/Slices/CommonSlice'
import { Link } from 'react-router-dom'

const CSidebarBrandCustom = CSidebarBrand as any
const AppSidebar = () => {
  const dispatch = useAppDispatch()
  const unfoldable = useAppState((state) => state.common.sidebarUnfoldable)
  const sidebarShow = useAppState((state) => state.common.sidebarShow)
  const auth = useAppState(state => state.user.auth)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        // dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrandCustom className="d-none d-md-flex" to="/">
        <Link to="/" className="sidebar-brand-full"><h1 className='mb-2 tw-font-fredoka tw-bg-gradient-to-r tw-from-orange-600 tw-to-pink-500  tw-text-transparent tw-object-fill tw-bg-clip-text'>KeyStore</h1></Link>
        {/* <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrandCustom>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={auth ? Navigator : NavigatorNonAuth} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => {
          dispatch(sidebarToggle())
          const elemmain = document.getElementById("shrinked-custom") as HTMLDivElement
          if (window.innerWidth >= 768) {
            elemmain.style.paddingLeft = "16em"
            if (sidebarShow) {
              elemmain.style.paddingLeft = "0em"
            }
          }
        }}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
