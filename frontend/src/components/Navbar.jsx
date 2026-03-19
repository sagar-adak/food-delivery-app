import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const role = (userInfo?.role || userInfo?.user?.role)?.toLowerCase();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-white/80 md:bg-transparent py-4 md:py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-white p-2 rounded-xl group-hover:scale-105 transition-transform">
            <ShoppingBag size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-primary transition-colors">
            Uni<span className="text-primary">Cuisine</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActive ? 'text-primary' : 'text-gray-600'
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Icons & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary transition-colors">
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center translate-x-1 -translate-y-1 shadow-md"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>

          {/* Auth Section */}
          <div className="hidden md:block">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-sm font-medium hover:bg-orange-50 hover:text-primary transition-colors group"
                >
                  <span className="text-lg">👤</span> {user.name.split(' ')[0]}
                  <ChevronDown size={14} className={clsx("transition-transform", showDropdown && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden"
                    >
                      {role !== 'admin' && (
                        <Link 
                          to="/orders" 
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-primary transition-colors"
                        >
                          <ShoppingBag size={16} /> My Orders
                        </Link>
                      )}
                      {role === 'admin' && (
                        <Link 
                          to="/admin/manage-foods" 
                          onClick={() => setShowDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-primary transition-colors border-t border-gray-100"
                        >
                          <Menu size={16} /> Admin Panel
                        </Link>
                      )}
                      <button 
                        onClick={() => {
                          logout();
                          setShowDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link 
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <div className="w-px h-4 bg-gray-300"></div>
                <Link 
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-orange-600 rounded-xl shadow-sm transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-600 focus:outline-none bg-gray-100 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={clsx(
                      'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      isActive ? 'bg-orange-50 text-primary' : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="h-px bg-gray-100 my-2"></div>
              
              {user ? (
                <>
                  {role !== 'admin' && (
                    <Link
                      to="/orders"
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      My Orders
                    </Link>
                  )}
                  {role === 'admin' && (
                    <Link
                      to="/admin/manage-foods"
                      className="block px-4 py-3 rounded-lg text-base font-medium text-primary bg-orange-50 transition-colors"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    to="/login"
                    className="block text-center px-4 py-3 rounded-xl text-base font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors border border-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block text-center px-4 py-3 rounded-xl text-base font-medium text-white bg-primary shadow-soft hover:shadow-hover transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
