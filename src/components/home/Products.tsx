
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ProductCard from './ProductCard';

const Products = () => {
  const products = useSelector((state: RootState) => state.shop.products);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
