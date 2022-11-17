import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'
import { useAppDispatch } from '../Redux/Hook'
import { sidebarToggle } from '../Redux/Slices/CommonSlice'

export const AppSidebarNav = ({ items }:any) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navLink = (name:any, icon:any, badge?:any) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item:any, index:any) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
        onClick={() => dispatch(sidebarToggle())}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item:any, index:any) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item:any, index:any) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>

      {items &&
        items.map((item:any, index:any) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
