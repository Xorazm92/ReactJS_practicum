
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const CheckoutForm = () => {
  const cart = useSelector((state: RootState) => state.shop.cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
        <form className="space-y-4">
          <div>
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Address</label>
            <textarea
              className="w-full border rounded-lg px-4 py-2"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block mb-2">Phone</label>
            <input
              type="tel"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Place Order
          </button>
        </form>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-4">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span className="text-green-600">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
