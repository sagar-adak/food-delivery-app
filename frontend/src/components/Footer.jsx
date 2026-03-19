import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ShoppingBag } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary text-white p-2 rounded-xl inline-flex">
                <ShoppingBag size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Uni<span className="text-primary">Cuisine</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              Premium quality food delivered to your door. Experience modern gastronomy with organic ingredients and exceptional taste.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors"><Facebook size={18} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors"><Twitter size={18} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors"><Instagram size={18} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary hover:text-white transition-colors"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-primary transition-colors">Our Menu</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/menu?category=pizza" className="hover:text-primary transition-colors">Pizza Collection</Link></li>
              <li><Link to="/menu?category=burger" className="hover:text-primary transition-colors">Gourmet Burgers</Link></li>
              <li><Link to="/menu?category=dessert" className="hover:text-primary transition-colors">Sweet Desserts</Link></li>
              <li><Link to="/menu?category=drinks" className="hover:text-primary transition-colors">Cold Drinks</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>📍 Park Street, Kolkata, West Bengal 700016, India</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ <a href="mailto:support@unicuisine.in" className="hover:text-white transition-colors">support@unicuisine.in</a></li>
              <li className="pt-2">
                <span className="block font-medium text-white mb-1">Opening Hours:</span>
                Mon - Sun: 10:00 AM - 11:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} UniCuisine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
