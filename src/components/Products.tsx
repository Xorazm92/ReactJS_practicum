
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/shopSlice';
import { Card, Button } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';

const products = [
  {
    id: 1,
    name: "Barberton Daisy",
    price: 119.00,
    image: "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower1.png?alt=media&token=0b53d608-7264-4c54-b497-a9bf054fcd9d",
  },
  // Add more products as needed
];

const Products = () => {
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            hoverable
            cover={<img alt={product.name} src={product.image} className="p-4" />}
            actions={[
              <HeartOutlined key="favorite" />,
              <ShoppingCartOutlined key="add" onClick={() => dispatch(addToCart(product))} />
            ]}
          >
            <Card.Meta
              title={product.name}
              description={`$${product.price}`}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
