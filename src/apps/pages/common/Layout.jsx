/* eslint-disable react/prop-types */
import React from 'react'
import NavbarGuest from '../../components/common/Navbar'
import FooterCommon from '../../components/common/Footer'

const LayoutCommon = ({ children }) => {
  return (
    <>
      <NavbarGuest/>
        <main>{children}</main>
      <FooterCommon/>
    </>
  )
}

export default LayoutCommon
