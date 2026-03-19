import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Edit, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function FoodCard({ item }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isAdmin = userInfo?.role === 'admin';

  const handleAdd = () => {
    if (!user) {
      alert('Please login or create an account to place an order.');
      navigate('/login');
      return;
    }
    addToCart(item);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/foods/${item._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${userInfo?.token}`
          }
        });
        if (res.ok) {
          window.location.reload();
        } else {
          alert('Failed to delete food item');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/admin/edit-food/${item._id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-[1.25rem] overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col group cursor-pointer border border-gray-100"
    >
      <Link to={`/product/${item._id}`} className="relative h-56 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold shadow-sm">
          ₹{item.price.toFixed(2)}
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex flex-col mb-2">
          <Link to={`/product/${item._id}`} className="hover:text-primary transition-colors">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-1">{item.name}</h3>
          </Link>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-gray-900">{item.rating}</span>
            <span>({item.reviews} reviews)</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-400">{item.category}</span>
          
          {isAdmin ? (
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="p-2 bg-orange-100 text-orange-600 rounded-xl hover:bg-orange-200 transition-colors"
                title="Edit Food"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                title="Delete Food"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary transition-colors active:scale-95 touch-manipulation"
            >
              <ShoppingCart size={16} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
