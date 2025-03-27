
import React from 'react';
import { Card } from 'antd';

const products = [
  {
    id: 1,
    name: "Barberton Daisy",
    price: 119.00,
    image: "/plants/1.jpg"
  },
  {
    id: 2,
    name: "Angel Wing Begonia",
    price: 169.00,
    image: "/plants/2.jpg"
  },
  // Boshqa mahsulotlarni qo'shish mumkin
];

const Products = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} hoverable className="product-card">
              <div className="flex flex-col items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-primary font-bold">${product.price}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
