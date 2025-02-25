import  './Footer.css'
import logo from '../../assets/logo-white.svg'
import facebook from '../../assets/icon-facebook.svg'
import youtube from '../../assets/icon-youtube.svg'
import twitter from '../../assets/icon-twitter.svg'
import pinterest from '../../assets/icon-pinterest.svg'
import instagram from '../../assets/icon-instagram.svg'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-container container">
             <div className="social">
                <img src={logo} alt="" />
                  
                        <ul className="social-links">
                            <li><img src={facebook} alt="" /></li>
                            <li><img src={youtube} alt="" /></li>
                            <li><img src={twitter} alt="" /></li>
                            <li><img src={pinterest} alt="" /></li>
                            <li><img src={instagram} alt="" /></li>
                        </ul>
                  
              </div>   
              <div className='menu-footer'>
                <ul className='footer-submenu'>
                    <li>Home</li>
                      <li>Pricing</li>
                      <li>Product</li>
                      <li>About Us</li>
                      
                  </ul>
                  <ul className='footer-submenu'>                   
                      <li>Careers</li>
                      <li>Community</li>
                      <li>Privacy Policy</li>
                  </ul>
              </div>
               
                <div className="newsletter">
                   <div className="input-container">
                        <input type="text" placeholder='Update your inbox'/>
                        <button className="btn btn-footer">Go</button>
                   </div>
                  
                </div>
               
            
        </div>
        <p>Copyright 2020. All Rights Reversed</p>
    </div>
  )
}

export default Footer