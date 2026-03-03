import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef();

  useGSAP(() => {
    // Parallax & scale of the huge text
    gsap.from('.footer-huge-text', {
      y: 100,
      scale: 0.8,
      opacity: 0,
      rotateX: 20,
      duration: 1.5,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Staggered reveal for footer links
    gsap.from('.footer-link-group', {
       y: 40,
       opacity: 0,
       stagger: 0.15,
       ease: 'power3.out',
       scrollTrigger: {
         trigger: containerRef.current,
         start: 'top 70%',
       }
    });

    // Ambient floating blob animation
    gsap.to('.ambient-blob-footer', {
      y: '-40px',
      x: '30px',
      rotation: -25,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 1.5
    });

  }, { scope: containerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={containerRef} 
      className="relative w-full overflow-hidden bg-[#000000] pt-24 border-t border-brand-2/10 mt-[-2rem] z-0"
      style={{ perspective: '1000px' }}
    >
      
      {/* Ambient Blobs */}
      <div className="ambient-blob-footer absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-brand-2/10 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen"></div>
      <div className="ambient-blob-footer absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[150px] pointer-events-none z-0 mix-blend-screen"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      ></div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col items-center">
        
         {/* Top Section of Footer */}
         <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-10 border-b border-brand-2/10 pb-16">
            <div className="flex flex-col items-start gap-4">
               <div className="flex items-center gap-3 bg-brand-2/10 px-4 py-1.5 rounded-full border border-brand-2/20 backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-brand-2 animate-pulse shadow-[0_0_10px_rgba(39,202,132,0.8)]"></div>
                  <span className="font-mono text-brand-2 text-xs uppercase tracking-[0.2em] font-bold">Open For New Opportunities</span>
               </div>
               <h3 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
                  Let's engineer the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-2 to-[#11998E] italic font-black pr-2">future</span>.
               </h3>
            </div>
            
            <button 
               onClick={scrollToTop}
               className="group relative h-16 w-16 md:w-auto md:px-8 bg-[#050505] border border-brand-2/20 flex items-center justify-center overflow-hidden hover:border-brand-2/50 transition-colors z-10 shrink-0"
               style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)' }}
            >
               <div className="absolute inset-0 bg-brand-2/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
               <span className="relative z-10 flex items-center gap-3 font-mono text-sm text-[#8a8d86] group-hover:text-white transition-colors">
                  <span className="hidden md:inline">BACK TO TOP</span>
                  <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform text-brand-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
               </span>
               <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-brand-2/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
         </div>

         {/* Navigation and Info Grid */}
         <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24 relative z-10">
            
            <div className="footer-link-group col-span-1 md:col-span-2 flex flex-col gap-4">
               <p className="font-mono text-[#8a8d86] text-xs uppercase tracking-widest border-b border-white/5 pb-2 w-max">About The Engineer</p>
               <p className="text-white/60 text-lg leading-relaxed max-w-sm font-light">
                 Crafting modern, high-performance web applications. Focused on exceptional design aesthetics, clean code architectures, and pushing digital boundaries.
               </p>
            </div>

            <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4 sm:gap-8">
               <div className="footer-link-group flex flex-col gap-3">
                  <p className="font-mono text-brand-2 text-xs uppercase tracking-widest border-b border-brand-2/10 pb-2 w-max">Directories</p>
                  {['Home', 'Projects', 'Achievements', 'About', 'Contact'].map((item) => (
                     <a key={item} href={`#${item.toLowerCase()}`} className="group w-max flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 font-display text-lg">
                        <span className="w-0 h-0.5 bg-brand-2 transition-all duration-300 group-hover:w-4"></span>
                        {item}
                     </a>
                  ))}
               </div>

               <div className="footer-link-group flex flex-col gap-3">
                  <p className="font-mono text-brand-2 text-xs uppercase tracking-widest border-b border-brand-2/10 pb-2 w-max">Social Nodes</p>
                  {[
                    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mir-afaque-alli' },
                    { name: 'GitHub', url: 'https://github.com/MirAfaqueAlli' },
                    { name: 'X (Twitter)', url: 'https://x.com/AlliAfaque' },
                    { name: 'Email', url: 'mailto:mirafaquealli9@gmail.com' }
                  ].map((social) => (
                     <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="group w-max flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 font-display text-lg">
                        <span className="text-brand-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">/</span>
                        {social.name}
                     </a>
                  ))}
               </div>
            </div>

         </div>
      </div>

      {/* Massive Typographic Footer Logo */}
      <div className="relative w-full overflow-hidden flex justify-center items-center pointer-events-none pt-10 pb-4">
         
         <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-[#000000] to-transparent z-20"></div>
         
         <h1 
            className="footer-huge-text text-[15vw] md:text-[18vw] font-display font-black leading-[0.7] m-0 p-0 text-transparent relative z-10 w-full text-center tracking-tighter select-none" 
            style={{ 
               WebkitTextStroke: '2px rgba(39, 202, 132, 0.4)',
               backgroundImage: 'linear-gradient(to bottom, rgba(39, 202, 132, 0.3), rgba(39, 202, 132, 0))',
               WebkitBackgroundClip: 'text'
            }}
         >
            AFAQUE
         </h1>
      </div>

      {/* Tech Status Bar */}
      <div className="w-full py-6 border-t border-white/5 relative z-20 bg-[#050505] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
         <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] sm:text-xs font-mono text-[#8a8d86]">
            <p className="tracking-widest flex items-center gap-2">
               <svg className="w-4 h-4 text-brand-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
               DESIGNED & ENGINEERED BY AFAQUE
            </p>
            
            <div className="flex items-center gap-4 bg-[#0a0a0a] border border-white/5 px-4 py-2 rounded-lg">
               <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  ALL SYSTEMS ONLINE
               </p>
               <span className="text-white/20">|</span>
               <p>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata', hour12: false })} IST</p>
            </div>

            <p className="tracking-widest">
               {new Date().getFullYear()} © ALL RIGHTS RESERVED.
            </p>
         </div>
      </div>

    </footer>
  );
}
