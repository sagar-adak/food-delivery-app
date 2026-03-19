import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { useState } from 'react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    instructions: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // If cart empty and not placed, redirect
  if (cart.length === 0 && !placed) {
    navigate('/menu');
    return null;
  }

  const tax = totalPrice * 0.08;
  const deliveryFee = totalPrice > 0 ? 5.00 : 0;
  const finalTotal = totalPrice + tax + deliveryFee;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (!userInfo) {
      setError('You must be logged in to place an order.');
      setLoading(false);
      return;
    }

    try {
      const orderItems = cart.map((item) => ({
        name: item.name || item.title,
        qty: item.quantity || item.qty,
        price: item.price,
        product: item._id || item.id,
      }));

      console.log("Order items mapped from cart:", orderItems);

      const shippingAddress = {
        address: formData.address,
        city: 'Kolkata', // Placeholder, could add more form fields
        postalCode: '700017',
        country: 'India',
      };

      const paymentMethod = 'Cash on Delivery'; 

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice: totalPrice,
          taxPrice: tax,
          shippingPrice: deliveryFee,
          totalPrice: finalTotal,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to place order');
      }

      setPlaced(true);
      clearCart();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (placed) {
    return (
      <div className="pt-32 pb-20 min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <CheckCircle size={80} className="text-green-500 mb-6" />
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Order Placed Successfully!</h2>
        <p className="text-lg text-gray-600 max-w-md mb-8">
          Thank you for your order. We are preparing your fresh food and will deliver it within 30 minutes!
        </p>
        <Button onClick={() => navigate('/menu')} size="lg">Order More Food</Button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center md:text-left">Checkout</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          
          {/* Delivery Address Form */}
          <div className="lg:col-span-8 bg-white p-8 rounded-[2rem] shadow-soft border border-gray-100 mb-10 lg:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Delivery Details</h2>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-6 font-medium">
                {error}
              </div>
            )}
            
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Rahul"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Sharma"/>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="+91 98765 43210"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                <input required name="address" value={formData.address} onChange={handleChange} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="221B Park Street, Park Circus, Kolkata, West Bengal 700017"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Instructions (Optional)</label>
                <textarea name="instructions" value={formData.instructions} onChange={handleChange} rows="3" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Leave at the front door..."></textarea>
              </div>
            </form>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-4 sticky top-28 bg-white rounded-[2rem] p-8 shadow-soft border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-6 border-b border-gray-100">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
              {cart.map(item => (
                <div key={item._id || item.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600"><span className="font-bold text-gray-900">{item.quantity}x</span> {item.name}</span>
                  <span className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-100 mb-8 text-sm md:text-base">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span className="font-medium text-gray-900">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="font-medium text-gray-900">₹{deliveryFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-6 border-t border-gray-200 mb-6">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-extrabold text-primary">₹{finalTotal.toFixed(2)}</span>
            </div>

            <Button type="submit" form="checkout-form" size="lg" className="w-full" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
