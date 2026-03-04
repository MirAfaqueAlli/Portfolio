import './index.css';
import IDCard from './components/IDCard';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, 
      wheelMultiplier: 1,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 1.5,
    });

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', () => ScrollTrigger.update());

    // Drive Lenis via GSAP's RAF (same tick = no desync)
    const tickerCallback = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* 3D ID Card - Outer wrapper covers full viewport for z-index stacking,
           inner wrapper keeps original 55vh on mobile so card size stays the same */}
      <div className="absolute inset-x-0 top-0 z-[40] h-screen w-full pointer-events-none overflow-visible">
        <div className="w-full h-[55vh] lg:h-full pointer-events-auto overflow-visible">
          <IDCard />
        </div>
      </div>

      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
