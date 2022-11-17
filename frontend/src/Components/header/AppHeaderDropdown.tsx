import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  // CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  // cilCreditCard,
  // cilCommentSquare,
  cilEnvelopeOpen,
  // cilFile,
  // cilLockLocked,
  // cilSettings,
  // cilTask,
  // cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
// import { useAppState } from '../../Redux/Hook'
import { ProfileOutlined } from '@ant-design/icons'
import { useAppState } from '../../Redux/Hook'
import { Link } from 'react-router-dom'
import { Login } from '@mui/icons-material'

const CDropdownToggleCustom = CDropdownToggle as any

const AppHeaderDropdown = () => {
  const auth = useAppState(state => state.user.auth)
  const cart = useAppState(state => state.user.user?.cart || state.cart.cart).length
  const orders = useAppState(state => state.common.orders)?.length

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggleCustom placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={"/assets/profile.jpg"} size="md" />
      </CDropdownToggleCustom>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <Link to="/cart" className='tw-w-full tw-text-gray-500 tw-flex tw-justify-start tw-items-center tw-gap-x-1 tw-py-1.5 tw-mt-1.5 hover:tw-bg-gray-300'>
          <CIcon icon={cilBell} className="me-2 tw-ml-4" />
          Cart
          <CBadge color="info" className="ms-2">
            {cart}
          </CBadge>
        </Link>
        {auth && <Link to="/u/orders" className='tw-w-full tw-text-gray-500 tw-flex tw-justify-start tw-items-center tw-gap-x-1 tw-py-1.5 hover:tw-bg-gray-300'>
          <CIcon icon={cilEnvelopeOpen} className="me-2 tw-ml-4" />
          Orders
          <CBadge color="success" className="ms-2">
            {orders}
          </CBadge>
        </Link>}

        <CDropdownDivider />
        {auth && <Link to="/u/profile" className='tw-w-full tw-text-gray-500 tw-flex tw-justify-start tw-items-center tw-gap-x-1 tw-py-1.5 hover:tw-bg-gray-300'>
          <ProfileOutlined className="me-2 tw-text-gray-700 tw-ml-4" />
          Profile
        </Link>}
        {!auth && <Link to="/signin" className='tw-w-full tw-text-gray-500 tw-flex tw-justify-start tw-items-center tw-gap-x-1 tw-py-1.5 hover:tw-bg-gray-300'>
          <Login className="me-2 tw-text-gray-700 tw-ml-4" width={"28"} style={{color:"rgb(55 65 81)"}} />
          Sign In
        </Link>}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
