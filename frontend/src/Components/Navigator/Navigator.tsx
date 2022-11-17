import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilCart,
    cilHome,
    cilUser,
    cilGift,
    cilAccountLogout,
    cilArrowRight,
    cilUserPlus
} from '@coreui/icons'
// import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { CNavItem } from '@coreui/react'


const Navigator = [
    {
        component: CNavItem,
        name: 'Store',
        to: '/',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
        
    },
    {
        component: CNavItem,
        name: 'Cart',
        to: '/cart',
        icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Profile',
        to: '/u/profile',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Orders',
        to: '/u/orders',
        icon: <CIcon icon={cilGift} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Signout',
        to: '/u/signout',
        icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
    },
    
]

const NavigatorNonAuth = [
    {
        component: CNavItem,
        name: 'Store',
        to: '/',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
        
    },
    {
        component: CNavItem,
        name: 'Cart',
        to: '/cart',
        icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Sign In',
        to: '/signin',
        icon: <CIcon icon={cilArrowRight} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Sign Up',
        to: '/signup',
        icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    },
    
    
]

export {Navigator, NavigatorNonAuth}