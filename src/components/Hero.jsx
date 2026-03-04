import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef();

  useGSAP(() => {
    // Award-winning Entry Animation
    gsap.from('.gsap-hero-el', {
      y: 80,
      opacity: 0,
      duration: 1.8,
      stagger: 0.15,
      ease: 'expo.out',
      delay: 0.2
    });

    // Premium Parallax Exit Animation on Scroll
    gsap.to('.gsap-hero-el', {
      y: -120,
      opacity: 0,
      filter: "blur(5px)", // Cinematic out-of-focus blur on scroll
      stagger: 0.05,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#010101] overflow-hidden" id="home">

      {/* Background Gradient exactly from the user's git commit */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(17, 57, 62, 0.8) 0%, rgba(1, 1, 1, 1) 12%, rgba(17, 57, 62, 0.5) 26%, rgba(1, 1, 1, 1) 42%, rgba(17, 57, 62, 0.3) 60%, rgba(1, 1, 1, 1) 78%, rgba(17, 57, 62, 0.1) 100%)'
        }}
      ></div>

      {/* ═══ MOBILE LAYOUT (<lg): Space for ID card on top, then text below ═══ */}
      <div className="relative z-10 flex flex-col lg:hidden min-h-screen">
        {/* Spacer for the ID Card area (card is rendered globally in App.jsx as absolute overlay) */}
        <div className="gsap-hero-el w-full flex-shrink-0" style={{ height: '55vh' }}></div>

        {/* Mobile Text Content */}
        <div className="relative flex flex-col items-center text-center px-4 min-[360px]:px-6 md:px-16 pb-12 sm:pb-20">
          <div className="gsap-hero-el flex items-center gap-3 mb-5 md:mb-8">
            <div className="px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-brand-2/30 bg-brand-2/10 backdrop-blur-md">
              <p className="text-sm font-mono font-semibold text-brand-2 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-2 rounded-full animate-pulse"></span>
                AVAILABLE FOR WORK
              </p>
            </div>
          </div>

          <h1 className="gsap-hero-el font-display text-[12vw] min-[360px]:text-5xl sm:text-6xl font-extrabold leading-[0.95] text-white tracking-tighter mb-5 md:mb-8 max-w-[900px] break-words">
            WEAVING <span className="text-brand-2 italic font-black">CODE</span><br />
            INTO DIGITAL <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand-2 to-white">ART</span>
              <span className="absolute bottom-1 left-0 w-full h-[30%] bg-brand-2/20 -z-10 -rotate-2"></span>
            </span>
          </h1>

          <p className="gsap-hero-el text-[#c0c5b9] text-base sm:text-lg md:text-xl leading-relaxed max-w-[600px] font-light">
            Full-stack MERN developer crafting bleeding-edge web applications. Where exceptional <strong className="text-white font-medium">performance</strong> meets striking <strong className="text-white font-medium">design</strong>.
          </p>
        </div>
      </div>

      {/* ═══ DESKTOP LAYOUT (lg+): Original layout preserved exactly ═══ */}
      <div className="hidden lg:flex relative z-10 w-full max-w-[1400px] mx-auto px-24 pt-36 pb-24 min-h-screen flex-col justify-center pointer-events-none">
        <div className="flex flex-col justify-center items-start text-left w-[50%] z-20 pointer-events-auto">
          <div className="gsap-hero-el flex items-center gap-3 mb-8">
            <div className="px-4 py-1.5 rounded-full border border-brand-2/30 bg-brand-2/10 backdrop-blur-md">
              <p className="text-sm font-mono font-semibold text-brand-2 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-2 rounded-full animate-pulse"></span>
                AVAILABLE FOR WORK
              </p>
            </div>
          </div>

          <h1 className="gsap-hero-el font-display text-[5.5rem] font-extrabold leading-[0.95] text-white tracking-tighter mb-8 max-w-[900px] break-words">
            WEAVING <span className="text-brand-2 italic font-black">CODE</span><br />
            INTO DIGITAL <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand-2 to-white">ART</span>
              <span className="absolute bottom-1 left-0 w-full h-[30%] bg-brand-2/20 -z-10 -rotate-2"></span>
            </span>
          </h1>

          <p className="gsap-hero-el text-[#c0c5b9] text-2xl leading-relaxed max-w-[600px] font-light">
            Full-stack MERN developer crafting bleeding-edge web applications. Where exceptional <strong className="text-white font-medium">performance</strong> meets striking <strong className="text-white font-medium">design</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
