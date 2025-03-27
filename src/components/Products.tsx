
import { Card } from 'antd'
import Image from 'next/image'

const products = [
  {
    id: 1,
    name: "Succulent Plant",
    price: 39.99,
    image: "/products/plant1.jpg"
  },
  {
    id: 2,
    name: "Dragon Plant",
    price: 29.99,
    image: "/products/plant2.jpg"
  },
  {
    id: 3,
    name: "Ravenea Plant",
    price: 25.99,
    image: "/products/plant3.jpg"
  }
]

const Products = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} hoverable className="border rounded-lg overflow-hidden">
            <div className="relative w-full h-[300px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-primary font-bold mt-2">${product.price}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Products
