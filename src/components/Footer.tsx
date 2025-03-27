
import { MdOutlineLocationOn, MdOutlineMailOutline } from 'react-icons/md'
import { BsTelephoneOutbound } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Garden Care</h3>
            <ul className="space-y-2">
              <li>Our Services</li>
              <li>About Us</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Plant Guide</h3>
            <ul className="space-y-2">
              <li>Plant Care</li>
              <li>Growing Tips</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>Blog</li>
              <li>Events</li>
              <li>Forum</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <MdOutlineLocationOn className="text-xl mr-2" />
                <span>70 West Buckingham Ave. NY 11735</span>
              </div>
              <div className="flex items-center">
                <MdOutlineMailOutline className="text-xl mr-2" />
                <span>support@greenshop.com</span>
              </div>
              <div className="flex items-center">
                <BsTelephoneOutbound className="text-xl mr-2" />
                <span>+88 123 456 789</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
