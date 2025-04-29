import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
        <Link to="/addProduct">Add Product</Link>
        <Link to="/stock-in">Stock-In</Link>
        <Link to="/stock-out">Stock-Out</Link>
        <Link to="/report">Report</Link>
      
    </div>
  )
}

export default Navbar
