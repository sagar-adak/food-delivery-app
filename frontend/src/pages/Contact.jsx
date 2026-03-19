import { Mail, MapPin, Phone } from 'lucide-react';
import Button from '../components/Button';

export default function Contact() {
  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Have a question, feedback, or need help with a large order? 
            Reach out to our team. We're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Details */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-50 p-4 rounded-full text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-1">Our Hub</h3>
                    <p className="text-gray-600 text-lg">Park Street, Kolkata, West Bengal 700016, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-50 p-4 rounded-full text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-1">Phone Number</h3>
                    <p className="text-gray-600 text-lg">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-50 p-4 rounded-full text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-1">Email Address</h3>
                    <p className="text-gray-600 text-lg">
                      <a href="mailto:support@unicuisine.in" className="hover:text-primary transition-colors">support@unicuisine.in</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>


          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-soft border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Rahul Sharma"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="rahul@example.com"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea required rows="5" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Write your message here..."></textarea>
              </div>
              <Button type="submit" size="lg" className="w-full py-4 text-lg">Send Message</Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
