
import React, { useState } from 'react';
import { MenuIcon } from './icons/MenuIcon';
import { XIcon } from './icons/XIcon';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#threats', text: 'รูปแบบภัยคุกคาม' },
    { href: '#advisor', text: 'ที่ปรึกษาด้านการป้องกัน' },
    { href: '#threat-briefing', text: 'สรุปภัยคุกคาม' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wider">
          <a href="#/" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <span className="text-cyan-400">Cyber</span> Explainer
          </a>
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 font-medium"
            >
              {link.text}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-slate-300 hover:text-cyan-400 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
            aria-label="Open main menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-700">
          <nav className="flex flex-col px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-slate-300 hover:text-cyan-400 hover:bg-slate-800 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;