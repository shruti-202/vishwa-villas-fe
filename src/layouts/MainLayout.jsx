import React from 'react'
import Header from '../components/main/Header'
import Footer from '../components/main/Footer'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default MainLayout
