import './Navbar.css'
import logo from '../../assets/logo.svg'
import hamburger from '../../assets/icon-hamburger.svg'
import iconclose from '../../assets/icon-close.svg'
import { useState } from 'react'
const Navbar = ({open,setOpen}) => {


  return (
    
      <div className="nav container">
            
            <img src={logo} alt="" />
            <ul className={open?'nav-bar show':'nav-bar'}>
                <li>Pricing</li>
                <li>Product</li>
                <li>About Us</li>
                <li>Careers</li>
                <li>Community</li>
            </ul>
            <button className="btn btn-red hide">Get Stared</button>
            <div className="hamburger" onClick={()=>setOpen(!open)}>
              {open?<img src={iconclose} alt="" on/>
                 :<img src={hamburger} alt="" on/>}  
            </div>
            
      </div>  
        
    
  )
}

export default Navbar