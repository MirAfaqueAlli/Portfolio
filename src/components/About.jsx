import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import profileImg from '../assets/Self_img.jpg';

// Registered once globally in App.jsx — do NOT re-register here (causes duplicate events)

const About = () => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const cardRef = useRef(null);
  const cardContainerRef = useRef(null);
  const rightContentRef = useRef(null);
  const bgTextRef = useRef(null);
  const statsRef = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP & TABLET LANDSCAPE (≥1024px): Full cinematic pinned animation ──
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinRef.current,
        start: "top top",
        end: "+=400%",
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1.5,
          invalidateOnRefresh: true,
        }
      });

      tl.fromTo(cardRef.current,
        { y: "40vh", rotationZ: -10, opacity: 0 },
        { y: 0, rotationZ: -3, opacity: 1, duration: 1.5, ease: "power3.out" },
        0
      );

      tl.fromTo(bgTextRef.current,
        { xPercent: 0 },
        { xPercent: -85, ease: "none", duration: 9 },
        0
      );

      tl.to(cardContainerRef.current, {
        x: "-5%",
        duration: 1,
        ease: "power2.inOut"
      }, 0.8);

      tl.fromTo(rightContentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        1.2
      );

      const innerWords = headingRef.current.querySelectorAll('.word-inner');
      tl.fromTo(innerWords,
        { yPercent: 120 },
        { yPercent: 0, duration: 0.7, stagger: 0.1, ease: "back.out(1.2)" },
        1.3
      );

      tl.fromTo(statsRef.current.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" },
        1.6
      );

      tl.to({}, { duration: 6.3 }, 2.2);

      const outroStart = 8.5;

      tl.to(cardRef.current, {
        scale: 0.4,
        rotationZ: -20,
        rotationX: 45,
        y: "-30vh",
        opacity: 0,
        filter: "blur(20px)",
        duration: 0.8,
        ease: "power2.in"
      }, outroStart);

      tl.to(cardContainerRef.current, {
        x: "0%",
        duration: 0.8,
        ease: "power2.in"
      }, outroStart);

      tl.to(rightContentRef.current, {
        scale: 1.8,
        y: "20vh",
        opacity: 0,
        filter: "blur(30px)",
        duration: 0.7,
        ease: "power2.in"
      }, outroStart + 0.1);

      tl.to(bgTextRef.current, {
        scale: 4,
        opacity: 0,
        filter: "blur(40px)",
        duration: 0.8,
        ease: "power2.in"
      }, outroStart);

      tl.to(".bg-glow", {
        scale: 0.1,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in"
      }, outroStart + 0.2);
    });

    // ── MOBILE & TABLET PORTRAIT (<1024px): Enhanced scroll animations ──
    mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
      // Clear any previous desktop props
      gsap.set([cardRef.current, rightContentRef.current], { clearProps: "all" });
      gsap.set(statsRef.current.children, { clearProps: "all" });
      const innerWords = headingRef.current.querySelectorAll('.word-inner');
      gsap.set(innerWords, { clearProps: "all" });

      // Subtle parallax for the giant background text
      gsap.fromTo(bgTextRef.current,
        { xPercent: 10 },
        {
          xPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );

      // Card animation: bouncy enter, reverses on scroll up/down
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60, scale: 0.95, rotationZ: 5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationZ: -3,
          duration: 1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          }
        }
      );

      // Right Content Timeline: stagger text and stats, reverses gracefully
      const tlRight = gsap.timeline({
        scrollTrigger: {
          trigger: rightContentRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      });

      tlRight.fromTo(rightContentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
      .fromTo(innerWords,
        { yPercent: 120 },
        { yPercent: 0, duration: 0.5, stagger: 0.08, ease: "back.out(1.2)" },
        "-=0.2"
      )
      .fromTo(Array.from(statsRef.current.children),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.2"
      );
    });

    // ── REDUCED MOTION: just show everything ──
    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([cardRef.current, rightContentRef.current], { opacity: 1, y: 0, clearProps: "all" });
      gsap.set(statsRef.current.children, { opacity: 1, y: 0, clearProps: "all" });
      const innerWords = headingRef.current.querySelectorAll('.word-inner');
      gsap.set(innerWords, { yPercent: 0, clearProps: "all" });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="about" className="relative w-full">

      {/* ── DESKTOP: pinned h-screen panel (handled by GSAP) ── */}
      {/* ── MOBILE:  natural-flow tall section, no pin ──       */}
      <div
        ref={pinRef}
        className="relative w-full bg-brand-dark flex flex-col justify-center
                   h-auto py-20 sm:py-24 lg:h-screen lg:py-0"
        style={{ overflow: 'clip' }}
      >

        {/* Deep Background Glows */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="bg-glow absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-brand-1/15 rounded-full blur-[80px]"></div>
          <div className="bg-glow absolute bottom-[-10%] right-[10%] w-[35vw] h-[35vw] bg-brand-accent/8 rounded-full blur-[70px]"></div>
        </div>

        {/* Massive Animated Background Typography */}
        <div className="absolute top-[45%] left-0 -translate-y-1/2 w-[250vw] pointer-events-none z-0 opacity-[0.25] flex select-none">
          <h2
            ref={bgTextRef}
            className="text-[20vw] font-display font-black tracking-tighter whitespace-nowrap text-transparent uppercase"
            style={{ WebkitTextStroke: '3px white', willChange: 'transform' }}
          >
            ARCHITECT OF THE WEB - ORIGINS
          </h2>
        </div>

        {/* Main Interface Layout */}
        <div className="container mx-auto px-5 sm:px-8 lg:px-12 xl:px-20 z-10 w-full
                        flex flex-col lg:flex-row items-center
                        gap-8 sm:gap-10 lg:gap-10 xl:gap-24 relative">

          {/* L E F T: Cinematic Card */}
          <div
            ref={cardContainerRef}
            className="w-full lg:w-5/12 flex flex-col justify-center items-center lg:items-end relative flex-shrink-0"
          >
            <div
              ref={cardRef}
              className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden
                         shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/5 group
                         opacity-0
                         w-[260px] h-[370px]
                         sm:w-[310px] sm:h-[440px]
                         md:w-[340px] md:h-[480px]
                         lg:w-[340px] lg:h-[480px]
                         shrink-0 -rotate-[3deg] lg:-rotate-[10deg]"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Inner glowing ring */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[24px] sm:rounded-[32px] z-20 pointer-events-none"></div>

              {/* Portrait image */}
              <img
                src={profileImg}
                alt="Mir Afaque Alli"
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.06]"
                loading="eager"
                decoding="async"
              />

              {/* Shadow Gradient at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 pointer-events-none"></div>

              {/* Hover Revealed Data */}
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-20 overflow-hidden pr-6 sm:pr-8">
                <div className="transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]">
                  <div className="text-brand-2 font-sans font-bold tracking-[0.2em] text-xs mb-2 sm:mb-3 uppercase flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-2 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-2"></span>
                    </span>
                    System Online
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium text-white tracking-tight">Mir Afaque Alli</h3>
                </div>
              </div>

              {/* Premium Spinning Ring Badge */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 lg:-top-12 lg:-right-12
                              w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36
                              z-30 animate-[spin_12s_linear_infinite] opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <path id="badge-curve" fill="transparent" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                  <text fontSize="10.5" fill="white" letterSpacing="1.8" fontWeight="600" className="font-sans uppercase">
                    <textPath href="#badge-curve">Creative Developer • MERN Stack •</textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 m-auto w-3 h-3 bg-brand-accent rounded-full"></div>
              </div>
            </div>
          </div>

          {/* R I G H T: Revealing Typography */}
          <div
            ref={rightContentRef}
            className="w-full lg:w-7/12 flex flex-col justify-center z-20
                       opacity-0
                       px-2 sm:px-0"
            style={{ willChange: 'opacity, transform' }}
          >

            {/* Giant Staggered Heading */}
            <div
              ref={headingRef}
              className="mb-4 sm:mb-6 lg:mb-8 flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1
                         text-[12vw] min-[400px]:text-[11vw] sm:text-5xl xl:text-[80px]
                         leading-[1.05] font-display font-black tracking-tighter text-white uppercase"
            >
              <span className="inline-block overflow-hidden pb-1"><span className="word-inner inline-block">Building</span></span>
              <span className="inline-block overflow-hidden pb-1">
                <span className="word-inner inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-2 to-brand-accent italic font-medium lowercase tracking-normal pr-2">Scalable</span>
              </span>
              <br className="hidden lg:block" />
              <span className="inline-block overflow-hidden pb-1"><span className="word-inner inline-block">Digital</span></span>
              <span className="inline-block overflow-hidden pb-1"><span className="word-inner inline-block text-white/40 pr-2">Realities</span></span>
            </div>

            {/* Description */}
            <div className="space-y-4 sm:space-y-6 text-white/85 font-sans
                            text-sm sm:text-base lg:text-[1.1rem]
                            max-w-2xl leading-[1.8] relative
                            pl-4 sm:pl-6 border-l-2 border-brand-accent/40">
              <p>
                I engineer seamless web solutions from the ground up. As a <strong className="text-white font-medium">MERN Stack Developer</strong>, my focus is strictly on architectural integrity, performance, and delivering premium user experiences.
              </p>
              <p>
                It's not just about writing code; it's about solving complex problems with elegance. When I'm not in the editor, I'm analyzing system architectures or contributing to the tech community.
              </p>
            </div>

            {/* Stats & Social Row */}
            <div ref={statsRef} className="mt-8 sm:mt-10 lg:mt-16 flex flex-wrap items-center gap-6 sm:gap-8 lg:gap-12">
              <div className="group cursor-pointer opacity-0 translate-y-6">
                <div className="text-3xl sm:text-4xl font-display font-black text-white group-hover:text-brand-2 transition-colors duration-300">5<span className="text-brand-accent">+</span></div>
                <div className="text-[10px] sm:text-xs font-sans tracking-[0.2em] text-white/65 uppercase mt-1 sm:mt-2">Projects</div>
              </div>

              <div className="w-px h-10 sm:h-12 bg-white/10 opacity-0 translate-y-6"></div>

              <div className="group cursor-pointer opacity-0 translate-y-6">
                <div className="text-3xl sm:text-4xl font-display font-black text-white group-hover:text-brand-2 transition-colors duration-300">10<span className="text-brand-accent">+</span></div>
                <div className="text-[10px] sm:text-xs font-sans tracking-[0.2em] text-white/65 uppercase mt-1 sm:mt-2">Repositories</div>
              </div>

              <div className="w-px h-10 sm:h-12 bg-white/10 hidden sm:block opacity-0 translate-y-6"></div>

              {/* Social Icons — wraps below on very small screens */}
              <div className="w-full sm:w-auto sm:ml-auto mt-2 sm:mt-0 flex items-center gap-3 sm:gap-4 opacity-0 translate-y-6">
                <a href="https://github.com/MirAfaqueAlli" target="_blank" rel="noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-brand-dark hover:scale-110 transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/mir-afaque-alli" target="_blank" rel="noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#0077B5] hover:border-transparent hover:text-white hover:scale-110 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="mailto:mirafaquealli9@gmail.com"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-brand-2 hover:border-transparent hover:text-brand-dark hover:scale-110 transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
