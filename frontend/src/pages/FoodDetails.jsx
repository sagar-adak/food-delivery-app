import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, Minus, Plus, ShoppingCart, CheckCircle, CreditCard, Edit, Trash2 } from 'lucide-react';
import { menuItems as mockMenuItems } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

export default function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isAdmin = userInfo?.role === 'admin';

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/foods/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data._id) {
          setItem(data);
        } else {
          const fallback = mockMenuItems.find(m => String(m.id) === String(id) || String(m._id) === String(id));
          setItem(fallback || null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        const fallback = mockMenuItems.find(m => String(m.id) === String(id) || String(m._id) === String(id));
        setItem(fallback || null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="pt-32 pb-20 text-center min-h-screen">Loading...</div>;
  }

  if (!item) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <h2 className="text-3xl font-bold mb-4">Item Not Found</h2>
        <Button onClick={() => navigate('/menu')}>Back to Menu</Button>
      </div>
    );
  }

  const handleAdd = () => {
    if (!user) {
      alert('Please login or create an account to place an order.');
      navigate('/login');
      return;
    }
    addToCart(item, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Image Gallery area */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/2 w-full"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-gray-100 aspect-square">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold shadow-sm text-lg">
                ₹{item.price.toFixed(2)}
              </div>
            </div>
          </motion.div>

          {/* Details Area */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:w-1/2 w-full flex flex-col"
          >
            <div className="bg-orange-100 text-primary px-4 py-1.5 rounded-full w-fit text-sm font-bold mb-6">
              {item.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {item.name}
            </h1>
            
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
              <Star size={20} className="fill-yellow-400 text-yellow-400" />
              <span className="text-base">
                <strong className="text-gray-900">{item.rating}</strong> rating based on <strong className="text-gray-900">{item.reviews}</strong> reviews
              </span>
            </div>

            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              {item.description}
            </p>

            {/* Quantity and Actions */}
            {isAdmin ? (
              <div className="flex gap-4 mt-8">
                <Button 
                  onClick={() => navigate(`/admin/edit-food/${item._id}`)}
                  size="lg" 
                  variant="outline"
                  className="w-full sm:flex-1 gap-2 text-lg justify-center relative overflow-hidden"
                >
                  <Edit size={24} /> Edit Food
                </Button>
                <Button 
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to delete this item?")) {
                      try {
                        const res = await fetch(`http://localhost:5000/api/foods/${item._id}`, {
                          method: 'DELETE',
                          headers: { Authorization: `Bearer ${userInfo?.token}` }
                        });
                        if (res.ok) {
                          navigate('/menu');
                        } else {
                          alert('Failed to delete food item');
                        }
                      } catch (err) {
                        console.error(err);
                      }
                    }
                  }}
                  size="lg" 
                  className="w-full sm:flex-1 gap-2 text-lg justify-center relative overflow-hidden bg-red-600 hover:bg-red-700 text-white border-0"
                >
                  <Trash2 size={24} /> Delete Food
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  
                  <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100 w-full sm:w-auto justify-between">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 -ml-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <Minus size={24} />
                    </button>
                    <span className="font-bold text-xl w-8 text-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 -mr-2 text-gray-400 hover:text-primary transition-colors"
                    >
                      <Plus size={24} />
                    </button>
                  </div>

                  <div className="text-2xl font-bold w-full sm:w-auto text-center sm:text-right">
                    <span className="text-gray-400 text-sm font-normal block mb-1">Total Price</span>
                    ₹{(item.price * quantity).toFixed(2)}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={handleAdd}
                    size="lg" 
                    variant="outline"
                    className="w-full sm:flex-1 gap-2 text-lg justify-center relative overflow-hidden"
                  >
                    <AnimatePresence mode="popLayout">
                      {isAdded ? (
                        <motion.div
                          key="added"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle size={24} /> Added
                        </motion.div>
                      ) : (
                        <motion.div
                          key="add"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingCart size={24} /> Add to Cart
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                  <Button 
                    onClick={() => {
                      if (!user) {
                        alert('Please login or create an account to place an order.');
                        navigate('/login');
                        return;
                      }
                      addToCart(item, quantity);
                      navigate('/checkout');
                    }}
                    size="lg" 
                    className="w-full sm:flex-1 gap-2 text-lg justify-center relative overflow-hidden"
                  >
                    <CreditCard size={24} /> Buy Now
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
