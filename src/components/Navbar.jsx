import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className={`fixed top-0 w-full flex justify-end md:justify-center transition-all duration-300 z-[100] ${scrolled ? 'pt-2 md:pt-2' : 'pt-4 md:pt-6'} px-4 md:px-0 pointer-events-none`}>
      <nav className={`pointer-events-auto flex items-center justify-between md:justify-center gap-4 md:gap-12 lg:gap-20 bg-transparent md:bg-[#010101]/80 backdrop-blur-none md:backdrop-blur-xl border-none md:border border-brand-accent/20 p-2 md:pl-6 rounded-full w-auto md:w-max shadow-none md:shadow-2xl transition-all duration-300 ${scrolled ? 'md:py-2 md:px-6' : 'md:p-2 md:pl-6'}`}>
        <a href="/" className="hidden md:flex items-center gap-2 font-bold text-lg text-white no-underline tracking-tight z-50">
          <div className="w-7 h-7 bg-brand-2 text-brand-dark rounded-full flex items-center justify-center font-black text-sm -rotate-12">M</div>
        </a>
        
        <ul className="hidden md:flex gap-8 list-none m-0 p-0 text-sm font-medium">
          <li><a href="#home" className="text-white hover:text-white transition-colors duration-300">Home</a></li>
          <li><a href="#projects" className="text-white hover:text-white transition-colors duration-300">Projects</a></li>
          <li><a href="#achievements" className="text-white hover:text-white transition-colors duration-300">Achievements</a></li>
          <li><a href="#about" className="text-white hover:text-white transition-colors duration-300">About me</a></li>
          <li><a href="#skills" className="text-white hover:text-white transition-colors duration-300">Skills</a></li>
          <li><a href="#contact" className="text-white hover:text-white transition-colors duration-300">Reach</a></li>
        </ul>

        <div className="flex items-center gap-4 pointer-events-auto z-50">
          <a href="https://drive.google.com/file/d/1vt4k-jAcqkrxw1yyo_EY4CfBp70BJSc3/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="relative z-10 hidden xs:flex md:flex items-center gap-2 bg-transparent text-white border border-brand-2 hover:bg-brand-2/80 hover:text-black px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 group cursor-pointer no-underline">
            Resume 
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-y-0.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12L12 16L16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden text-white hover:text-brand-2 transition-all p-2 ${
              isMobileMenuOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 pointer-events-auto scale-100'
            }`}
            aria-label="Open menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#010101]/95 backdrop-blur-3xl z-[100] transition-all duration-500 md:hidden flex flex-col justify-center items-center ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Close Button Inside Overlay */}
        <button onClick={closeMobileMenu} className="absolute top-6 right-6 text-white hover:text-brand-2 p-2 z-[110]">
          <FiX size={32} />
        </button>

        <ul className="flex flex-col gap-8 list-none m-0 p-0 text-2xl font-semibold text-center mt-10">
          <li style={{ transitionDelay: '100ms' }} className={`transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}><a onClick={closeMobileMenu} href="#home" className="text-white hover:text-brand-2 transition-colors duration-300 block w-full">Home</a></li>
          <li style={{ transitionDelay: '150ms' }} className={`transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}><a onClick={closeMobileMenu} href="#projects" className="text-white hover:text-brand-2 transition-colors duration-300 block w-full">Projects</a></li>
          <li style={{ transitionDelay: '200ms' }} className={`transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}><a onClick={closeMobileMenu} href="#achievements" className="text-white hover:text-brand-2 transition-colors duration-300 block w-full">Achievements</a></li>
          <li style={{ transitionDelay: '250ms' }} className={`transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}><a onClick={closeMobileMenu} href="#about" className="text-white hover:text-brand-2 transition-colors duration-300 block w-full">About me</a></li>
          <li style={{ transitionDelay: '300ms' }} className={`transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}><a onClick={closeMobileMenu} href="#skills" className="text-white hover:text-brand-2 transition-colors duration-300 block w-full">Skills</a></li>
          <li style={{ transitionDelay: '350ms' }} className={`transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}><a onClick={closeMobileMenu} href="#contact" className="text-white hover:text-brand-2 transition-colors duration-300 block w-full">Reach me</a></li>
        </ul>
        
        <a 
          style={{ transitionDelay: '400ms' }} 
          onClick={closeMobileMenu}
          href="https://drive.google.com/file/d/1vt4k-jAcqkrxw1yyo_EY4CfBp70BJSc3/view?usp=sharing" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`mt-10 mb-8 z-10 flex xs:hidden items-center gap-2 bg-transparent text-white border border-brand-2 hover:bg-brand-2/80 hover:text-black px-8 py-3 rounded-full text-base font-medium transition-all duration-500 group no-underline ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
            Resume 
            <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12L12 16L16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </a>
      </div>
    </div>
  );
}
