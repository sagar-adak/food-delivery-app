import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  const tax = totalPrice * 0.08; // 8% tax
  const deliveryFee = totalPrice > 0 ? 5.00 : 0;
  const finalTotal = totalPrice + tax + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
        <div className="w-48 h-48 bg-gray-200/50 rounded-full flex items-center justify-center mb-8 text-primary">
          <ShoppingBag size={80} strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven't added any delicious food to your cart yet. Let's fix that!
        </p>
        <Link to="/menu">
          <Button size="lg">Browse Menu</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-soft border border-gray-100">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingBag size={24} className="text-primary"/> 
                  Your Order ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-sm font-medium text-red-500 hover:text-red-600 hover:underline transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="flex flex-col gap-6">
                <AnimatePresence>
                  {cart.map((item) => {
                    const itemId = item._id || item.id;
                    return (
                    <motion.div 
                      key={itemId}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
                      className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-sm"
                      />
                      
                      <div className="flex-1 flex flex-col justify-center text-center sm:text-left w-full sm:w-auto">
                        <Link to={`/product/${itemId}`} className="hover:text-primary transition-colors">
                          <h3 className="font-bold text-xl text-gray-900 mb-1">{item.name}</h3>
                        </Link>
                        <p className="text-gray-500 text-sm mb-4">{item.category}</p>
                        
                        <div className="flex items-center justify-between sm:justify-start gap-8 mt-auto w-full">
                          {/* Quantity Control */}
                          <div className="flex items-center bg-white px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                            <button 
                              onClick={() => updateQuantity(itemId, item.quantity - 1)}
                              className="p-1 text-gray-400 hover:text-primary transition-colors"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(itemId, item.quantity + 1)}
                              className="p-1 text-gray-400 hover:text-primary transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          {/* Item Price */}
                          <div className="font-bold text-lg text-gray-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => removeFromCart(itemId)}
                        className="sm:self-start p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        aria-label="Remove item"
                      >
                        <Trash2 size={24} />
                      </button>
                    </motion.div>
                  )})}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-10 lg:mt-0 sticky top-28 bg-white rounded-[2rem] p-8 shadow-soft border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-6 border-b border-gray-100">Summary</h2>
            
            <div className="space-y-4 mb-8 text-lg">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8%)</span>
                <span className="font-medium text-gray-900">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-medium text-gray-900">₹{deliveryFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-6 border-t border-gray-200 mb-8 mt-4">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-3xl font-extrabold text-primary">₹{finalTotal.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="block">
              <Button size="lg" className="w-full gap-2">
                Proceed to Checkout <ArrowRight size={20} />
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
