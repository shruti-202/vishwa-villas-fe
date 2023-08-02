import React from 'react'
import Header from '../components/main/Header'
import Footer from '../components/main/Footer'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <main>
      <Header/>
      <Outlet/>
      <Footer/>
    </main>
  )
}

export default MainLayout
