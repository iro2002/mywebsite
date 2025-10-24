import React, { useState, useEffect } from 'react';
import Profile from './components/Profile';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Education from './components/Education';
import { FaBars, FaTimes } from 'react-icons/fa';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-black text-white min-h-screen font-mono overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black/95 backdrop-blur-md border-b border-gray-800 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              CI
            </span>
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            {['Profile', 'Skills', 'Certifications','Education', 'Projects'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-gray-300 transition-colors duration-300 font-extrabold"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="px-6 py-2 bg-white text-black rounded-full font-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <ul className="md:hidden flex flex-col items-center space-y-4 mt-4 pb-4 border-t border-gray-800">
            {['Profile', 'Skills', 'Certifications', 'Projects'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-gray-300 transition-colors duration-300 font-extrabold text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="px-6 py-2 bg-white text-black rounded-full font-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Profile />
        <Skills />
        <Certifications />
        <Education />
        <Projects />

        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-t from-gray-900 to-black text-center py-12 border-t border-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '30px 30px',
            }}
          ></div>
        </div>
        <div className="relative z-10 space-y-4">
          <p className="text-gray-400 font-extrabold">&copy; 2025 Chamindu Irosh. All rights reserved.</p>
 
        </div>
      </footer>
    </div>
  );
}

export default App;
