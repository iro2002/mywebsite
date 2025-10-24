import React, { useState } from 'react';
// NEW: Importing icons for a professional look
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(''); // To show submission status

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    // Simulate a network request
    setTimeout(() => {
      // In a real app, you'd handle success/error from your backend here
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      
      // Clear the status message after a few seconds
      setTimeout(() => setStatus(''), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* === UPDATED: More compact heading section === */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </div>

        {/* === UPDATED: Reduced gap and re-ordered for mobile === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Contact Info Card (Now on the left for desktop) */}
          <div className="space-y-6 lg:order-2">
             <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 h-full">
              <h3 className="text-2xl font-bold mb-6 text-white">Get in Touch</h3>
              <div className="space-y-6">
                {[
                  { icon: <FiMail />, title: 'Email', value: 'chaminduirosh927@gmail.com', link: 'mailto:chaminduirosh927@gmail.com' },
                  { icon: <FiPhone />, title: 'Phone', value: '+94 71 62193 38', link: 'tel:+94716219338' },
                  { icon: <FiMapPin />, title: 'Location', value: 'Colombo, Sri Lanka' },
                ].map((contact, i) => (
                  <div key={i} className="flex items-center space-x-4 group">
                    <div className="text-xl text-white transition-transform duration-300">{contact.icon}</div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{contact.title}</p>
                      {contact.link ? 
                        <a href={contact.link} className="text-white hover:text-blue-400 transition-colors text-base">{contact.value}</a> :
                        <p className="text-white text-base">{contact.value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4 lg:order-1">
            <form onSubmit={handleSubmit}>
              <div className="group mb-4">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                />
              </div>
              
              <div className="group mb-4">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                />
              </div>

              <div className="group mb-4">
                <label className="block text-sm font-semibold text-gray-400 mb-2">Your Message</label>
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black p-4 rounded-lg font-bold text-base hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {status && <p className="text-center mt-4 text-green-400">{status}</p>}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;