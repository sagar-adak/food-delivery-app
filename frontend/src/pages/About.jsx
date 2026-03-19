import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Story</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At UniCuisine, we believe that great food should be just a few clicks away. Founded in 2026, our mission is to bring delicious, restaurant-quality meals directly to your home with speed, convenience, and reliability.
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-4">
            We understand that in today’s fast-paced life, people want tasty food without the hassle of cooking or going out. That’s why UniCuisine connects you with a wide variety of freshly prepared dishes, delivered straight to your doorstep.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20 relative">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quality & Freshness</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We ensure that every meal is prepared using fresh ingredients and hygienic processes. Our partner kitchens and chefs focus on delivering food that is not only delicious but also safe and satisfying.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Fast & Reliable Delivery</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our delivery system is designed to get your food to you as quickly as possible. Whether it's lunch, dinner, or a quick snack, UniCuisine makes sure your order arrives hot and fresh.
              </p>
            </div>

            <div className="pt-4 mt-8 border-t border-gray-100">
              <p className="text-lg font-medium text-orange-600 italic">
                At UniCuisine, we don’t just deliver food — we deliver convenience, taste, and happiness to your door.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-orange-100 rounded-3xl h-48 md:h-64 mt-8 overflow-hidden shadow-soft">
               <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop)' }}></div>
            </div>
            <div className="bg-gray-100 rounded-3xl h-48 md:h-64 overflow-hidden shadow-soft">
               <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=800&auto=format&fit=crop)' }}></div>
            </div>
          </motion.div>
        </div>

        <div className="bg-gray-50 rounded-[3rem] p-10 md:p-16 text-center border border-gray-100 shadow-soft">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Executive Chef</h2>
          <div className="w-32 h-32 mx-auto rounded-full bg-gray-300 mb-6 overflow-hidden shadow-md">
            <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop" alt="Chef" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Alessandro Rossi</h3>
          <p className="text-primary font-medium mb-6">Head of Culinary Arts</p>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg italic">
            "Cooking is an art, but baking is a science. At UniCuisine, we strive to perfect both disciplines 
            so that every meal delivered is as flawless as the one before."
          </p>
        </div>

      </div>
    </div>
  );
}
