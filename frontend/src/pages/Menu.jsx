import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import clsx from 'clsx';

const DEFAULT_CATEGORIES = [
  'Pizza', 'Burger', 'Pasta', 'Sandwich', 'French Fries',
  'Fried Chicken', 'Cold Coffee', 'Milkshake', 'Dessert', 'Soft Drink'
];

export default function Menu() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/foods')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMenuItems(data);
        }
      })
      .catch(err => {
        console.error('Error fetching foods:', err);
      });
  }, []);

  const categories = useMemo(() => {
    const fetchedCats = menuItems.map(f => f.category).filter(Boolean);
    const allCats = Array.from(new Set([...DEFAULT_CATEGORIES, ...fetchedCats]));
    return [
      { id: 'all', name: 'All' },
      ...allCats.map(cat => ({ id: cat, name: cat }))
    ];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const activeCatLower = activeCategory?.toLowerCase() || 'all';
      const itemCatLower = item.category?.toLowerCase() || '';
      
      const matchCategory = activeCatLower === 'all' || itemCatLower === activeCatLower;
      
      const queryLower = searchQuery?.toLowerCase() || '';
      const matchSearch = (item.name?.toLowerCase() || '').includes(queryLower) || 
                          (item.description?.toLowerCase() || '').includes(queryLower);
                          
      return matchCategory && matchSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Explore our wide variety of premium, freshly prepared dishes just for you.
          </p>
        </div>

        {/* Filters and Search Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 relative z-10">
          
          {/* Category Filter */}
          <div className="flex overflow-x-auto pb-2 -mb-2 w-full md:w-auto gap-3 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={clsx(
                  'px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-semibold transition-all duration-300 shadow-sm border border-transparent',
                  activeCategory === category.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-primary hover:border-orange-100'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item._id || item.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <FoodCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No food found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-6 text-primary font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
