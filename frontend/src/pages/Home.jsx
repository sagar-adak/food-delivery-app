import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Clock } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import { menuItems, categories } from '../data/mockData';

export default function Home() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/foods')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFoods(data);
        } else {
          setFoods(menuItems);
        }
      })
      .catch(err => {
        console.error('Error fetching foods, falling back to mockData:', err);
        setFoods(menuItems);
      });
  }, []);

  const popularItems = foods.slice(0, 4);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-orange-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 z-10 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-primary font-medium text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Fast Delivery in 30 mins
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
              Enjoy Premium <br />
              <span className="text-primary">Food Delivery</span> <br />
              at Your Door.
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Experience the best culinary delights from top chefs, 
              prepared with fresh organic ingredients and delivered fast.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu">
                <Button size="lg" className="gap-2">
                  Order Now <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">Our Story</Button>
              </Link>
            </div>
            
            <div className="pt-8 flex items-center gap-6 text-sm font-medium text-gray-500">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" fill="currentColor" size={20} />
                <span className="text-gray-900 font-bold text-lg">4.9</span>
                <span>(12k+ Reviews)</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:w-1/2 mt-12 md:mt-0 relative"
          >
            {/* Using a featured image as the hero graphic */}
            <div className="relative rounded-full w-80 h-80 md:w-[500px] md:h-[500px] mx-auto overflow-hidden shadow-2xl border-8 border-white group">
              <img 
                src={foods.length > 0 ? foods[0].image : '/images/foods/pizza.jpg'} 
                alt="Featured Food" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            {/* Floating badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute top-10 right-0 md:right-10 bg-white p-4 rounded-2xl shadow-soft flex items-center gap-4"
            >
              <div className="bg-orange-100 p-3 rounded-full text-primary">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">Trending</p>
                <p className="text-sm text-gray-500">Top Choices</p>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="absolute bottom-10 left-0 md:left-10 bg-white p-4 rounded-2xl shadow-soft flex items-center gap-4"
            >
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <Clock size={24} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">Fast</p>
                <p className="text-sm text-gray-500">Delivery</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Horizontal List (Optional, can be used for quick navigation) */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
            {categories.filter(c => c.id !== 'all').map((category, idx) => (
              <Link 
                key={idx} 
                to={`/menu?category=${category.name}`}
                className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl bg-gray-50 hover:bg-orange-50 hover:text-primary transition-all group shadow-sm border border-gray-100"
              >
                <span className="font-bold text-lg group-hover:text-primary text-gray-700 transition-colors">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Menu Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-primary font-bold tracking-wider uppercase mb-2">Our Menu</h2>
              <h3 className="text-4xl font-extrabold text-gray-900">Popular Foods</h3>
            </div>
            <Link to="/menu" className="hidden sm:flex text-primary font-medium items-center gap-2 hover:underline">
              View All Menu <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <FoodCard item={item} />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center sm:hidden">
             <Link to="/menu">
               <Button variant="outline" className="w-full">View All Menu</Button>
             </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Hungry? We are open now!</h2>
          <p className="text-xl opacity-90 mb-10">Order now and get 20% off on your first purchase. Use code WELCOME20.</p>
          <Link to="/menu">
            <button className="bg-white text-primary px-10 py-4 rounded-xl text-lg font-bold shadow-xl hover:bg-gray-50 hover:scale-105 transition-all">
              Order Food Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
