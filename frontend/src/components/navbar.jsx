import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './navbar.css'
import {LogOut,PlusCircle,FileText,ArrowDown,ArrowUp,Bot} from 'lucide-react' 

function Navbar() {

  const navigate= useNavigate();

  const handleLogout= () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/addProduct">
        <PlusCircle size={18} />
        Add Product
      </Link>
      <Link to="/stock-in">
        <ArrowDown size={18} />
        Stock-In
      </Link>
      <Link to="/stock-out">
        <ArrowUp size={18} />
        Stock-Out
      </Link>
      <Link to="/report">
        <FileText size={18} />
        Report
      </Link>
      
      <span
        onClick={handleLogout}
        className="log"
        style={{ cursor: "pointer" }}
      >
        <LogOut size={18} />
        Logout
      </span>
    </div>
  );
}

export default Navbar
