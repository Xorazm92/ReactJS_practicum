import React from 'react';
import { useRouter } from 'next/router';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">GreenShop</h1>
        <div className="flex items-center space-x-6">
          <button className="hover:text-primary">Home</button>
          <button className="hover:text-primary">Shop</button>
          <button className="hover:text-primary">Plant Care</button>
          <button className="hover:text-primary">Blogs</button>
        </div>
        <div className="flex items-center space-x-4">
          <ShoppingCartOutlined className="text-2xl cursor-pointer hover:text-primary" />
          <UserOutlined className="text-2xl cursor-pointer hover:text-primary" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;