
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/courses', label: 'Courses' },
    { path: '/fee-structure', label: 'Fee Structure' },
    { path: '/academic-calendar', label: 'Calendar' },
    { path: '/resources', label: 'Resources' },
    { path: '/contact', label: 'Contact' },
  ];

 
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.header
      className="w-full fixed top-0 left-0 z-50 bg-white shadow-md"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mobile Header */}
        <div className="sm:hidden flex items-center justify-between py-3">
          <div className="flex items-center flex-1">
            <img
              src={logo}
              alt="AlMaahir Logo"
              className="h-14 w-auto object-contain mr-2"
            />
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-sm font-bold text-primary leading-tight whitespace-nowrap">
                Heart Aligned, Word Divine
              </h2>
              <p className="text-xs text-gray-600 whitespace-nowrap">
                The People of Quran
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Toggle Menu"
            className="text-primary hover:text-accent p-1 ml-2"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:block">
          <div className="flex">
            <div className="flex items-start pt-2">
              <img
                src={logo}
                alt="AlMaahir Logo"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain mr-4"
              />
            </div>

            <div className="flex-1">
              <div className="bg-gradient-to-r from-white via-purple-200 to-white py-2 sm:py-3 border-b">
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold sm:font-extrabold tracking-wide text-center text-primary">
                  Heart Aligned, Word Divine - People of Quran
                </h2>
              </div>

              <div className="flex items-center justify-center py-3">
                <nav className="flex gap-4 md:gap-6">
                  {links.map(({ path, label }) => (
                    <Link
                      key={path}
                      to={path}
                      className={`text-sm md:text-base text-primary hover:text-accent transition ${
                        location.pathname === path ? 'font-semibold underline' : ''
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden bg-white overflow-hidden"
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col py-3 px-4 border-t">
                {links.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={`py-3 px-3 text-base text-primary hover:bg-purple-50 transition ${
                      location.pathname === path ? 'font-semibold bg-purple-100' : ''
                    }`}
                    >
                    {label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
