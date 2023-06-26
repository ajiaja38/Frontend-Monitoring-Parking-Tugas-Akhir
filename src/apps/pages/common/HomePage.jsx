import React from 'react'
import LayoutCommon from './Layout'
import HeaderCommon from '../../components/common/Header'
import AboutUs from '../../components/common/About'

const HomePage = () => {
  return (
    <LayoutCommon>
      <HeaderCommon/>
      <AboutUs/>
    </LayoutCommon>
  )
}

export default HomePage
