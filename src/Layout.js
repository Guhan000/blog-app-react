import React from 'react'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import useWindowSize from './hooks/useWindowSize'
import { useContext } from 'react';
import DataContext from './context/DataContext';

const Layout = () => {

  const {search,setSearch} = useContext(DataContext);

  const { width } = useWindowSize();
  return (
    <div className="App">
      <Header title="Bloggy Blog" width={width}/>
      <Nav search={search} setSearch={setSearch}/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout