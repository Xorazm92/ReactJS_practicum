
import { useState } from 'react';
import { FiShoppingCart, FiSearch, FiUser } from 'react-icons/fi';
import Link from 'next/link';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-[#46A358]">
            GreenShop
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#46A358]">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-[#46A358]">
              Shop
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-[#46A358]">
              Blog
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <FiSearch className="w-6 h-6 text-gray-600 cursor-pointer" />
            <FiShoppingCart className="w-6 h-6 text-gray-600 cursor-pointer" />
            <FiUser className="w-6 h-6 text-gray-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
