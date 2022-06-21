import React from 'react'
import Footer from '../module/footer/footer'
// import Navbar from '../module/Navbar'
// import Head from 'next/head'
import Navbar from "../module/navbar/navbar"

const Layout1 = ({children}) => {
  return (
    <>
    <Navbar />
    {children}
    <Footer/>
    </>
  )
}

export default Layout1