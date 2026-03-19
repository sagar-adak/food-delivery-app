import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Package } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const response = await fetch('http://localhost:5000/api/orders/myorders', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 flex flex-col items-center justify-start text-center px-4">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-left">My Orders</h1>
        
        {loading ? (
          <p className="text-lg text-gray-500 text-left">Loading your orders...</p>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-6 font-medium text-left">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="w-48 h-48 bg-gray-200/50 rounded-full flex items-center justify-center mb-8 text-primary">
              <ShoppingBag size={80} strokeWidth={1} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No recent orders</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Looks like you haven't placed any orders yet. Let's fix that!
            </p>
            <Button onClick={() => navigate('/menu')} size="lg">Browse Menu</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white p-6 rounded-[2rem] shadow-soft border border-gray-100 text-left">
                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gray-100 pb-4 mb-4 gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Order ID: {order._id}</h3>
                    <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold flex items-center gap-2">
                       <Package size={16} />
                       {order.orderStatus || 'Processing'}
                    </span>
                    <span className="text-xl font-extrabold text-primary">₹{order.totalPrice?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Items</h4>
                  {order.orderItems.map((item, idx) => (
                    <div key={item.product || item._id || idx} className="flex items-center gap-6 py-2">
                       <div className="flex-grow">
                          <p className="text-gray-900 font-medium text-lg">{item.name}</p>
                          <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
                       </div>
                       <div className="font-bold text-gray-900 pr-4">
                          ₹{((item.price || 0) * (item.qty || 1)).toFixed(2)}
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
