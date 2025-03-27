
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiShoppingCart, FiSearch, FiUser } from 'react-icons/fi'

const Navbar = () => {
  const router = useRouter()

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            GreenShop
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link href="/" className={`${router.pathname === '/' ? 'text-primary' : ''}`}>
              Home
            </Link>
            <Link href="/shop" className={`${router.pathname === '/shop' ? 'text-primary' : ''}`}>
              Shop
            </Link>
            <Link href="/blog" className={`${router.pathname === '/blog' ? 'text-primary' : ''}`}>
              Blog
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-xl">
              <FiSearch />
            </button>
            <button className="text-xl">
              <FiShoppingCart />
            </button>
            <button className="text-xl">
              <FiUser />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
