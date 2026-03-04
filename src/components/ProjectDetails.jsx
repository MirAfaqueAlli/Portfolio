import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Tiny helpers
───────────────────────────────────────────── */
const STYLES = `
  @keyframes tech-marquee {
    0%   { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  @keyframes tech-marquee-reverse {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0%); }
  }
  @keyframes float-y {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-18px) rotate(3deg); }
  }
  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes shimmer-line {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes blink-bar {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  .animate-tech-marquee {
    animation: tech-marquee 22s linear infinite;
    display: flex; width: max-content;
  }
  .animate-tech-marquee-reverse {
    animation: tech-marquee-reverse 28s linear infinite;
    display: flex; width: max-content;
  }
  .text-outline-ghost {
    -webkit-text-stroke: 1px rgba(255,255,255,0.12);
    color: transparent;
  }
  .shimmer-text {
    background: linear-gradient(90deg, rgba(255,255,255,0.15) 0%, #27CA84 40%, #fff 50%, #27CA84 60%, rgba(255,255,255,0.15) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer-line 4s linear infinite;
  }
  @keyframes border-trace {
    0%   { stroke-dashoffset: 1000; }
    100% { stroke-dashoffset: 0; }
  }
  @keyframes slash-wipe {
    0%   { transform: skewX(-12deg) translateX(-120%); }
    100% { transform: skewX(-12deg) translateX(0%); }
  }
  @keyframes code-slide-in {
    0%   { transform: translateX(30px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }
  .cursor-blink::after {
    content:'|';
    animation: blink-bar 1s step-end infinite;
    color: #27CA84;
    font-weight: 300;
  }
  .glass-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
  }
  .glass-card:hover {
    background: rgba(255,255,255,0.055);
    border-color: rgba(39,202,132,0.25);
  }
  .noise-overlay::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none; border-radius: inherit;
  }
  .pill-tag {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(39,202,132,0.07);
    border: 1px solid rgba(39,202,132,0.2);
    border-radius: 999px;
    padding: 6px 16px;
    font-size: 11px; font-family: 'Outfit', monospace;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: #27CA84; font-weight: 600;
    transition: background 0.3s, border-color 0.3s, transform 0.3s;
  }
  .pill-tag:hover {
    background: rgba(39,202,132,0.15);
    border-color: rgba(39,202,132,0.5);
    transform: translateY(-2px);
  }
  .pill-tag .dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #27CA84;
    box-shadow: 0 0 8px #27CA84;
    animation: blink-bar 2s step-end infinite;
  }
  .magnetic-btn {
    transition: transform 0.4s cubic-bezier(0.19,1,0.22,1), box-shadow 0.4s;
  }
  .section-label {
    font-family: 'Outfit', monospace;
    font-size: 10px; letter-spacing: 0.3em;
    text-transform: uppercase; color: rgba(255,255,255,0.3);
    display: flex; align-items: center; gap: 12px;
  }
  .section-label::before {
    content:'';
    display: inline-block; width: 32px; height: 1px;
    background: rgba(39,202,132,0.5);
  }
  .stat-counter {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-weight: 800;
    background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }
  .divider-grid {
    display: grid; grid-template-columns: 1fr auto 1fr;
    align-items: center; gap: 24px;
    width: 100%;
  }
  .divider-grid .line {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  }
`;

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

/** Animated stat block */
const StatBlock = ({ value, label, suffix = '' }) => (
  <div className="flex flex-col gap-2 group">
    <span className="stat-counter text-4xl md:text-5xl xl:text-6xl">
      {value}{suffix}
    </span>
    <span className="section-label !text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
      {label}
    </span>
  </div>
);

/** Individual tech pill */
const TechPill = ({ name }) => (
  <span className="pill-tag">
    <span className="dot" />
    {name}
  </span>
);



/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const ProjectDetails = ({ project, onClose }) => {
  const overlayRef    = useRef(null);
  const contentRef    = useRef(null);
  const imageRef      = useRef(null);
  const titleRef      = useRef(null);
  const statsRef      = useRef(null);
  const closeBtnRef   = useRef(null);
  const infoRef       = useRef(null);

  // ── scroll-animated section refs ──
  const marqueeRef    = useRef(null);
  const visionRef     = useRef(null);
  const statsGridRef  = useRef(null);
  const pillsRef      = useRef(null);
  const challengeRef  = useRef(null);
  const solutionRef   = useRef(null);
  const dividerRef    = useRef(null);
  const ctaRef        = useRef(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = project.images?.length > 0
    ? project.images
    : [project.image, project.image, project.image];

  const techList = project.tech
    ? project.tech.split(',').map(t => t.trim()).filter(Boolean)
    : [];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev + 1) % carouselImages.length);
  };
  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  /* ── Smooth scroll for overlay ── */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const lenis = new Lenis({
      wrapper: overlayRef.current,
      content: contentRef.current,
      lerp: 0.1, // Faster lerp stops it falling too far behind system scroll
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);

    // Tell ScrollTrigger to use the overlay element as its scroller
    ScrollTrigger.scrollerProxy(overlayRef.current, {
      scrollTop(value) {
        if (arguments.length) {
          overlayRef.current.scrollTop = value;
        }
        return overlayRef.current.scrollTop;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: overlayRef.current?.style?.transform ? 'transform' : 'fixed',
    });

    let rafId;
    let isRunning = true;

    function raf(time) {
      if (!isRunning) return;
      if (lenis) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      isRunning = false;
      document.body.style.overflow = '';
      cancelAnimationFrame(rafId);
      ScrollTrigger.scrollerProxy(overlayRef.current, null);
      if (overlayRef.current) {
        ScrollTrigger.getAll().forEach(t => {
          if (t.scroller === overlayRef.current) t.kill();
        });
      }
      lenis.destroy();
    };
  }, []);

  /* ── Entrance animation ── */
  useGSAP(() => {
    gsap.set(overlayRef.current,         { clipPath: 'circle(0% at 50% 100%)' });
    gsap.set(imageRef.current,           { scale: 1.5, filter: 'blur(20px)' });
    gsap.set(closeBtnRef.current,        { scale: 0, rotation: -180 });
    gsap.set(infoRef.current?.children,  { y: 50, opacity: 0 });

    const tl = gsap.timeline();
    tl.to(overlayRef.current, { clipPath: 'circle(150% at 50% 100%)', duration: 1.5, ease: 'power4.inOut' })
      .to(imageRef.current,   { scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }, '-=1')
      .to(infoRef.current?.children,  { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to(closeBtnRef.current, { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' }, '-=0.8');
  }, []);

  /* ── ScrollTrigger animations (runs after Lenis proxy is set up) ── */
  useEffect(() => {
    // We bind Lenis and ScrollTrigger manually
    const stUpdate = () => ScrollTrigger.update();
    const lenis = document.body.lenisInstance; // just for reference if we had it global, but we use strict binding
    
    // Wait one tick so the proxy is registered
    const timer = setTimeout(() => {
      const scroller = overlayRef.current;
      if (!scroller) return;

      const st = (trigger, vars) => ScrollTrigger.create({
        trigger,
        scroller,
        start: 'top 88%',
        ...vars,
      });

      // ── MARQUEE: fade in + slight up ──
      if (marqueeRef.current) {
        gsap.set(marqueeRef.current, { opacity: 0, y: 40 });
        st(marqueeRef.current, {
          onEnter: () => gsap.to(marqueeRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }),
        });
      }

      // ── TITLE & STATS ──
      if (titleRef.current) {
        gsap.set(titleRef.current, { y: 100, opacity: 0, rotationX: -90 });
        st(titleRef.current, {
          start: 'top 95%',
          onEnter: () => gsap.to(titleRef.current, { y: 0, opacity: 1, rotationX: 0, duration: 1.2, ease: 'expo.out' }),
        });
      }
      if (statsRef.current) {
        gsap.set(statsRef.current.children, { y: 50, opacity: 0 });
        st(statsRef.current, {
          start: 'top 95%',
          onEnter: () => gsap.to(statsRef.current.children, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'back.out(1.7)' }),
        });
      }

      // ── VISION SECTION: heading chars + paragraph ──
      if (visionRef.current) {
        const heading = visionRef.current.querySelector('.vision-heading');
        const para    = visionRef.current.querySelector('.vision-para');
        const line    = visionRef.current.querySelector('.vision-line');

        if (heading) gsap.set(heading, { y: 80, opacity: 0, skewY: 4 });
        if (para)    gsap.set(para,    { y: 50, opacity: 0 });
        if (line)    gsap.set(line,    { scaleY: 0, transformOrigin: 'top center' });

        st(visionRef.current, {
          start: 'top 80%',
          onEnter: () => {
            const vtl = gsap.timeline();
            if (heading) vtl.to(heading, { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: 'expo.out' });
            if (line)    vtl.to(line,    { scaleY: 1, duration: 1, ease: 'power3.out' }, '-=0.8');
            if (para)    vtl.to(para,    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.8');
          },
        });
      }

      // ── STATS GRID: each cell explodes in with clip-path ──
      if (statsGridRef.current) {
        const cells = statsGridRef.current.querySelectorAll('.stat-cell');
        gsap.set(cells, { clipPath: 'inset(100% 0% 0% 0%)', y: 30 });
        st(statsGridRef.current, {
          start: 'top 82%',
          onEnter: () => gsap.to(cells, {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: 'expo.out',
          }),
        });
      }

      // ── TECH PILLS: wave stagger ──
      if (pillsRef.current) {
        const pills = pillsRef.current.querySelectorAll('.pill-tag, .section-label');
        gsap.set(pills, { opacity: 0, y: 20, scale: 0.9 });
        st(pillsRef.current, {
          start: 'top 85%',
          onEnter: () => gsap.to(pills, {
            opacity: 1, y: 0, scale: 1,
            stagger: { each: 0.07, ease: 'power2.out' },
            duration: 0.6,
            ease: 'back.out(1.7)',
          }),
        });
      }

      // ── CHALLENGE card: slide in from left ──
      if (challengeRef.current) {
        gsap.set(challengeRef.current, { x: -80, opacity: 0, rotationY: -8 });
        st(challengeRef.current, {
          start: 'top 80%',
          onEnter: () => gsap.to(challengeRef.current, {
            x: 0, opacity: 1, rotationY: 0,
            duration: 1.2, ease: 'expo.out',
          }),
        });
      }

      // ── SOLUTION card: slide in from right ──
      if (solutionRef.current) {
        gsap.set(solutionRef.current, { x: 80, opacity: 0, rotationY: 8 });
        st(solutionRef.current, {
          start: 'top 80%',
          onEnter: () => gsap.to(solutionRef.current, {
            x: 0, opacity: 1, rotationY: 0,
            duration: 1.2, ease: 'expo.out',
            delay: 0.15,
          }),
        });
      }

      // ── DIVIDER: lines grow from centre ──
      if (dividerRef.current) {
        const lines = dividerRef.current.querySelectorAll('.line');
        const label = dividerRef.current.querySelector('span');
        gsap.set(lines, { scaleX: 0 });
        if (label) gsap.set(label, { opacity: 0, letterSpacing: '1em' });
        st(dividerRef.current, {
          onEnter: () => {
            gsap.to(lines, { scaleX: 1, duration: 1, ease: 'expo.out', stagger: 0.1 });
            if (label) gsap.to(label, { opacity: 1, letterSpacing: '0.4em', duration: 1, ease: 'power3.out', delay: 0.3 });
          },
        });
      }

      // ── CTA BUTTONS: rise from below with spring ──
      if (ctaRef.current) {
        const btns = ctaRef.current.querySelectorAll('a');
        gsap.set(btns, { y: 70, opacity: 0 });
        st(ctaRef.current, {
          start: 'top 90%',
          onEnter: () => gsap.to(btns, {
            y: 0, opacity: 1,
            stagger: 0.15,
            duration: 1.1,
            ease: 'back.out(1.5)',
          }),
        });
      }

    }, 100);

    return () => {
      clearTimeout(timer);
      if (overlayRef.current) {
        ScrollTrigger.getAll().forEach(t => {
          if (t.scroller === overlayRef.current) {
            t.kill();
          }
        });
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Exit animation ── */
  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to([statsRef.current?.children, infoRef.current?.children, titleRef.current], {
        y: -50, opacity: 0, stagger: 0.05, duration: 0.5, ease: 'power2.in',
      })
      .to(closeBtnRef.current, { scale: 0, rotation: 180, duration: 0.4, ease: 'power2.in' }, '<')
      .to(overlayRef.current,  { clipPath: 'circle(0% at 50% 100%)', duration: 1, ease: 'power4.inOut' }, '-=0.2');
  };

  /* ── Magnetic button micro-interaction ── */
  const handleMagnet = (e) => {
    const btn  = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 20;
    const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * 20;
    gsap.to(btn, { x, y, duration: 0.4, ease: 'power2.out' });
  };
  const handleMagnetLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' });
  };

  /* ══════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════ */
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] bg-[#030303] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      style={{ perspective: '1200px' }}
    >
      <style>{STYLES}</style>

      {/* ── Ambient glow ── */}
      <div className="fixed top-0 left-1/4 w-[50vw] h-[50vw] bg-[#27CA84]/8 rounded-full blur-[200px] pointer-events-none mix-blend-screen opacity-40" />
      <div className="fixed bottom-0 right-0 w-[30vw] h-[30vw] bg-[#11393E]/20 rounded-full blur-[150px] pointer-events-none" />

      {/* ── Close button ── */}
      <button
        ref={closeBtnRef}
        onClick={handleClose}
        className="fixed top-6 right-6 md:top-10 md:right-10 z-[100] w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group hover:bg-white hover:text-black transition-colors duration-300"
      >
        <span className="relative w-5 h-5 flex items-center justify-center">
          <span className="absolute w-full h-[2px] bg-white group-hover:bg-black rotate-45 transition-colors duration-300" />
          <span className="absolute w-full h-[2px] bg-white group-hover:bg-black -rotate-45 transition-colors duration-300" />
        </span>
      </button>

      <div ref={contentRef} className="relative min-h-screen w-full pb-40">

        {/* ════════════════════════════
            HERO IMAGE CAROUSEL
        ════════════════════════════ */}
        <div className="w-full px-4 md:px-8 lg:px-12 pt-24 md:pt-32 pb-4 flex justify-center">
          <div className="relative w-full max-w-[1600px] aspect-video md:aspect-auto h-auto md:h-[75vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-[0_0_80px_rgba(39,202,132,0.1)] border border-white/10 z-20">
            <div ref={imageRef} className="absolute inset-0 bg-[#000] z-0 overflow-hidden rounded-[2rem] md:rounded-[3rem]">
              {carouselImages.map((img, idx) => {
                const isActive = idx === currentImageIndex;
                return (
                  <img
                    key={idx} 
                    src={img} 
                    alt={`${project.title} – ${idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:block"
                    style={{ 
                      opacity: isActive ? 0.6 : 0,
                      transform: isActive 
                        ? 'translate3d(0,0,0) scale(1.05)' // End hover scale target dynamically via CSS 
                        : 'translate3d(0,0,0) scale(1.01)',
                      transition: isActive
                        ? 'opacity 1.2s ease, transform 30s cubic-bezier(0.16, 1, 0.3, 1)'
                        : 'opacity 1.2s ease, transform 0s', // Quick transform reset
                      willChange: 'transform, opacity',
                      zIndex: isActive ? 10 : 0
                    }}
                  />
                );
              })}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-[#030303]/40 z-[5] pointer-events-none" />
              <div className="absolute inset-0 bg-[#27CA84]/5 mix-blend-overlay z-[5] pointer-events-none" />
            </div>

            {/* Glowing inner border effect */}
            <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] border-2 border-[#27CA84]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-[15] shadow-[inset_0_0_100px_rgba(39,202,132,0.2)]" />

            {/* Carousel arrows */}
            {carouselImages.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 z-[25] pointer-events-none transition-opacity duration-500">
                <button onClick={prevImage} className="pointer-events-auto w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-black hover:border-transparent hover:scale-110 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button onClick={nextImage} className="pointer-events-auto w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-black hover:border-transparent hover:scale-110 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            )}
            {carouselImages.length > 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[25] flex gap-3 pointer-events-none">
                {carouselImages.map((_, idx) => (
                  <button key={idx} onClick={e => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                    className={`pointer-events-auto h-2 rounded-full transition-all duration-500 shadow-md ${idx === currentImageIndex ? 'w-12 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'w-3 bg-white/40 hover:bg-white/80'}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ════════════════════════════
            TITLE + META BAR
        ════════════════════════════ */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-16 mt-12 md:mt-20 flex flex-col gap-8 relative z-10">
          <div className="overflow-hidden">
            <h1
              ref={titleRef}
              className="text-[10vw] md:text-[6vw] font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/30 uppercase leading-none tracking-tighter"
              style={{ transformOrigin: 'bottom left' }}
            >
              {project.title}
            </h1>
          </div>

          <div ref={statsRef} className="flex flex-wrap gap-6 md:gap-10 border-t border-white/8 pt-6">
            <div className="flex flex-col gap-1">
              <span className="section-label">Index</span>
              <span className="text-white text-xl font-display font-bold">{project.index}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="section-label">Category</span>
              <span className="text-[#27CA84] text-xl font-display font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#27CA84] animate-pulse shadow-[0_0_10px_#27CA84]" />
                {project.cat}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="section-label">Role</span>
              <span className="text-white text-xl font-display font-bold">Lead Developer / Designer</span>
            </div>
          </div>
        </div>

        {/* ════════════════════════════
            DETAILS SECTION
        ════════════════════════════ */}
        <div ref={infoRef} className="w-full relative z-10 text-white overflow-hidden">

          {/* ── 1. TECH MARQUEE (subtle atmosphere) ── */}
          <div ref={marqueeRef} className="w-full overflow-hidden flex flex-col gap-1 mt-24 mb-20 relative">
            <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />
            <div className="animate-tech-marquee">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-6 md:gap-12 px-6 items-center">
                  {techList.map((t, j) => (
                    <React.Fragment key={j}>
                      <span className="text-[8vw] md:text-[5vw] lg:text-[4vw] font-display font-black text-white/[0.04] uppercase leading-none tracking-tighter hover:text-white/10 transition-colors duration-500 cursor-default whitespace-nowrap">
                        {t}
                      </span>
                      <span className="text-[#27CA84]/30 text-3xl flex-shrink-0">✦</span>
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
            <div className="animate-tech-marquee-reverse -mt-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-6 md:gap-12 px-6 items-center">
                  {[...techList].reverse().map((t, j) => (
                    <React.Fragment key={j}>
                      <span className="text-[8vw] md:text-[5vw] lg:text-[4vw] font-display font-medium text-outline-ghost uppercase leading-none tracking-widest cursor-default whitespace-nowrap hover:text-white/5 transition-all duration-500">
                        {t}
                      </span>
                      <span className="w-8 md:w-16 h-px bg-white/8 flex-shrink-0" />
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ── MAIN EDITORIAL GRID ── */}
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 flex flex-col gap-0">

            {/* ── 2. CASE STUDY HEADER (split editorial) ── */}
            <div ref={visionRef} className="relative w-full mb-20 md:mb-32">
              {/* Big ghost number */}
              <span className="absolute -top-8 -left-4 md:-left-8 text-[18vw] font-display font-black text-white/[0.025] leading-none tracking-tighter select-none pointer-events-none z-0">
                01
              </span>
              <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
                <div className="flex flex-col gap-4 flex-shrink-0">
                  <span className="section-label">Case Study</span>
                  <h2 className="vision-heading text-[15vw] md:text-[9vw] xl:text-[7vw] font-display font-black uppercase leading-[0.88] tracking-tighter text-white">
                    The<br />
                    <span className="shimmer-text">Vision</span>
                  </h2>
                </div>

                {/* Paragraph */}
                <div className="flex items-start gap-8 md:gap-12 xl:pl-10 flex-1">
                  <div className="relative pl-6 md:pl-8 py-2 flex-1">
                    <div className="vision-line absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#27CA84] via-[#27CA84]/40 to-transparent" />
                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-[#27CA84] shadow-[0_0_12px_#27CA84]" />
                    <p className="vision-para text-lg md:text-2xl xl:text-3xl text-white/50 font-sans font-light leading-relaxed tracking-tight">
                      This project was born from the desire to create a{' '}
                      <span className="text-white font-semibold bg-white/5 px-2 py-0.5 rounded">truly unique digital experience</span>{' '}
                      — pushing aesthetic boundaries while maintaining flawless, purposeful engineering that sets a new standard.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 3. STATS ROW ── */}
            <div ref={statsGridRef} className="w-full grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/[0.06] rounded-3xl overflow-hidden mb-20 md:mb-32 glass-card">
              {[
                { value: '100', suffix: '%', label: 'Custom Built' },
                { value: techList.length > 0 ? String(techList.length) : '5', suffix: '+', label: 'Technologies Used' },
                { value: '∞',  suffix: '',   label: 'Scalability' },
                { value: 'A+', suffix: '',   label: 'Performance Score' },
              ].map((stat, i) => (
                <div key={i} className={`stat-cell relative flex flex-col gap-3 p-8 md:p-10 xl:p-12 group hover:bg-white/[0.03] transition-colors duration-500 ${i < 3 ? 'border-r border-white/[0.06]' : ''} ${i >= 2 ? 'border-t border-white/[0.06] md:border-t-0' : ''}`}>
                  {/* Accent corner dot */}
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#27CA84]/0 group-hover:bg-[#27CA84] transition-colors duration-500 shadow-[0_0_8px_#27CA84]" />
                  <span className={`stat-counter text-4xl md:text-5xl xl:text-6xl`}>{stat.value}{stat.suffix}</span>
                  <span className="section-label !text-[9px]">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* ── 4. TECH STACK PILLS ── */}
            <div ref={pillsRef} className="flex flex-col gap-6 mb-20 md:mb-32">
              <span className="section-label">Tech Stack</span>
              <div className="flex flex-wrap gap-3">
                {techList.length > 0
                  ? techList.map((t, i) => <TechPill key={i} name={t} />)
                  : ['React', 'GSAP', 'Tailwind', 'Node.js'].map((t, i) => <TechPill key={i} name={t} />)
                }
              </div>
            </div>

            {/* ── 5. CHALLENGE / SOLUTION — HIGH-CONTRAST DUALITY ── */}
            <div className="w-full mb-20 md:mb-32">
              <span className="section-label mb-8 block">The Process</span>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full items-stretch">

                {/* CHALLENGE — dark editorial */}
                <div ref={challengeRef} className="relative group rounded-[2.5rem] overflow-hidden flex flex-col justify-between p-8 md:p-12 min-h-[480px] md:min-h-[580px] noise-overlay"
                  style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #060d0b 100%)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {/* Ghost text bg */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <span className="text-[22vw] md:text-[12vw] font-display font-black text-white/[0.02] uppercase tracking-tighter select-none group-hover:text-white/[0.04] transition-all duration-[2s] group-hover:scale-110">
                      PAIN
                    </span>
                  </div>

                  {/* Corner accent lines */}
                  <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                    <div className="absolute top-6 left-6 w-6 h-px bg-white/20" />
                    <div className="absolute top-6 left-6 w-px h-6 bg-white/20" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                    <div className="absolute bottom-6 right-6 w-6 h-px bg-[#27CA84]/30" />
                    <div className="absolute bottom-6 right-6 w-px h-6 bg-[#27CA84]/30" />
                  </div>

                  {/* Top row */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.3em]">Chapter 01</span>
                      <h3 className="text-5xl md:text-6xl xl:text-7xl font-display font-black text-white leading-[0.9] tracking-tight">
                        The<br />
                        <span className="italic font-light text-white/30">Challenge</span>
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="relative z-10 mt-auto border-l-2 border-white/10 group-hover:border-[#27CA84]/40 transition-colors duration-700 pl-6 py-2">
                    <p className="text-white/35 group-hover:text-white/60 text-base md:text-lg leading-relaxed transition-colors duration-700 font-light">
                      Navigating the technical complexity of integrating multiple systems — achieving fluid, zero-latency visuals despite heavyweight background data processing and demanding real-time interactions.
                    </p>
                  </div>
                </div>

                {/* SOLUTION — calming deep emerald/charcoal */}
                <div ref={solutionRef} className="relative group rounded-[2.5rem] overflow-hidden flex flex-col justify-between p-8 md:p-12 min-h-[480px] md:min-h-[580px] lg:mt-10 noise-overlay"
                  style={{ background: 'linear-gradient(135deg, #020a07 0%, #04140d 100%)', border: '1px solid rgba(39,202,132,0.1)', color: '#fff' }}
                >
                  {/* Ghost text */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <span className="text-[22vw] md:text-[12vw] font-display font-black text-[#27CA84]/[0.03] uppercase tracking-tighter select-none group-hover:scale-105 group-hover:text-[#27CA84]/[0.05] transition-all duration-[2s]">
                      WIN
                    </span>
                  </div>

                  {/* Corner accent lines */}
                  <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                    <div className="absolute top-6 left-6 w-6 h-px bg-white/20" />
                    <div className="absolute top-6 left-6 w-px h-6 bg-white/20" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                    <div className="absolute bottom-6 right-6 w-6 h-px bg-[#27CA84]/30" />
                    <div className="absolute bottom-6 right-6 w-px h-6 bg-[#27CA84]/30" />
                  </div>

                  {/* Top row */}
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] text-white/20 uppercase tracking-[0.3em]">Chapter 02</span>
                      <h3 className="text-5xl md:text-6xl xl:text-7xl font-display font-black text-white leading-[0.9] tracking-tight">
                        The<br />
                        <span className="text-[#27CA84] font-black">Solution</span>
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="relative z-10 mt-auto border-l-2 border-white/10 group-hover:border-[#27CA84]/40 transition-colors duration-700 pl-6 py-2">
                    <p className="text-white/35 group-hover:text-white/60 text-base md:text-lg leading-relaxed transition-colors duration-700 font-light">
                      Meticulous optimisation through cutting-edge technologies — hardware-accelerated animations, deeply considered architecture, and a striking UI that brings both{' '}
                      <span className="text-white font-semibold bg-white/5 px-2 py-0.5 rounded">award-winning aesthetics</span>{' '}
                      and bulletproof functionality to life.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 6. FULL-WIDTH DIVIDER ── */}
            <div ref={dividerRef} className="divider-grid mb-20 md:mb-32">
              <div className="line" style={{ transformOrigin: 'right center' }} />
              <span className="font-mono text-[10px] text-white/15 uppercase tracking-[0.4em] whitespace-nowrap">End of Study</span>
              <div className="line" style={{ transformOrigin: 'left center' }} />
            </div>

            {/* ── 7. CTA BUTTONS — magnetic, editorial ── */}
            <div ref={ctaRef} className="flex flex-col md:flex-row gap-5 md:gap-6 w-full">

              {/* GitHub — Slash-wipe + glowing border trace */}
              <a
                href={project.githubRepo}
                target="_blank" rel="noreferrer"
                className={`magnetic-btn group relative overflow-hidden rounded-[1.75rem] transition-all duration-700 ${(project.moreInfo && project.moreInfo !== '#') ? 'flex-1' : 'w-full md:max-w-[600px] mx-auto'}`}
                style={{
                  background: '#0d0d0d',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 0 0 0 rgba(39,202,132,0)',
                  transition: 'background-color 0.4s ease, border-color 0.4s ease',
                }}
                onMouseMove={handleMagnet}
                onMouseLeave={handleMagnetLeave}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(39,202,132,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(39,202,132,0.4)';
                }}
              >
                <div className="relative z-10 flex items-center justify-between p-8 md:p-10">
                  <div className="flex flex-col gap-3">
                    {/* Code bracket badge — slides in on hover */}
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span
                        className="font-mono text-[10px] text-white/25 uppercase tracking-[0.3em] transition-colors duration-500 group-hover:text-[#27CA84]/70"
                      >Repository</span>
                      <span
                        className="font-mono text-[10px] text-[#27CA84] bg-[#27CA84]/10 border border-[#27CA84]/20 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all duration-500"
                        style={{ transform: 'translateX(20px)', transition: 'opacity 0.4s 0.2s, transform 0.4s 0.2s' }}
                        ref={el => {
                          if (!el) return;
                          const a = el.closest('a');
                          const show = () => { el.style.opacity = '1'; el.style.transform = 'translateX(0)'; };
                          const hide = () => { el.style.opacity = '0'; el.style.transform = 'translateX(20px)'; };
                          a.addEventListener('mouseenter', show);
                          a.addEventListener('mouseleave', hide);
                        }}
                      >&lt;/&gt;</span>
                    </div>
                    <span className="text-2xl md:text-3xl font-display font-bold text-white leading-tight tracking-tight">
                      Review<br />Source Code
                    </span>
                  </div>

                  {/* Icon: GitHub mark */}
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center rounded-full border border-white/15 bg-white/5 group-hover:bg-[#27CA84] group-hover:border-[#27CA84] transition-all duration-400">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover:text-black transition-colors duration-400" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>

              {/* Live Project */}
              {(project.moreInfo && project.moreInfo !== '#') && (
                <a
                  href={project.moreInfo}
                  target="_blank" rel="noreferrer"
                  className={`magnetic-btn group relative overflow-hidden rounded-[1.75rem] transition-all duration-700 ${(project.githubRepo && project.githubRepo !== '#') ? 'flex-1' : 'w-full md:max-w-[600px] mx-auto'}`}
                  style={{
                    background: '#27CA84',
                    transition: 'background-color 0.4s ease',
                  }}
                  onMouseMove={handleMagnet}
                  onMouseLeave={handleMagnetLeave}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1ea86c'}
                >
                  <div className="relative z-10 flex items-center justify-between p-8 md:p-10">
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] text-black/50 group-hover:text-black/80 uppercase tracking-[0.3em] transition-colors duration-300">Live</span>
                      <span className="text-2xl md:text-3xl font-display font-black text-black leading-tight tracking-tight transition-colors duration-300">
                        Launch<br />Live Project
                      </span>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-black/20 flex items-center justify-center flex-shrink-0 group-hover:bg-black transition-all duration-400">
                      <svg className="text-black group-hover:text-[#27CA84] transition-colors duration-400" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </div>
                  </div>
                </a>
              )}

            </div>

          </div>{/* /editorial grid */}
        </div>{/* /details section */}

      </div>{/* /contentRef */}
    </div>
  );
};

export default ProjectDetails;
