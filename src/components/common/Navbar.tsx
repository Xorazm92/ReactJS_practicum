
import React from 'react';
import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-green-600">
            GREENSHOP
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <Link href="/shop" className="hover:text-green-600">Shop</Link>
            <Link href="/blog" className="hover:text-green-600">Blog</Link>
          </div>

          <div className="flex items-center space-x-6">
            <FiSearch className="w-6 h-6 cursor-pointer hover:text-green-600" />
            <FiShoppingCart className="w-6 h-6 cursor-pointer hover:text-green-600" />
            <FiUser className="w-6 h-6 cursor-pointer hover:text-green-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
