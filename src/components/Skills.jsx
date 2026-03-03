import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { skillsData as skills } from '../data/skillsData';

const Skills = () => {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const wordsRef = useRef([]);
  const cursorRef = useRef(null);
  const capsuleRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeIcon, setActiveIcon] = useState(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Pin the section securely at top so the user can interact with skills
      ScrollTrigger.create({
        trigger: containerRef.current, // Pin tracks the main container
        pin: pinRef.current, // But actually pins the inner wrapper to avoid layout jumps
        start: "top top",
        end: "+=120%", 
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      });

      // Set perspective for better 3D depth during the assembly animation
      gsap.set(pinRef.current, { perspective: 1200 });

      // 1. Intro Animation (Assembles skills from background chaos)
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });

      introTl.fromTo(wordsRef.current,
        {
          x: "random(-800, 800)",
          y: "random(-500, 500)",
          z: "random(-500, 1000)",
          rotationX: "random(-360, 360)",
          rotationY: "random(-360, 360)",
          rotationZ: "random(-180, 180)",
          scale: "random(0.1, 4)",
          opacity: 0,
          filter: "blur(30px)",
        },
        {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 2.5,
          ease: "expo.out",
          stagger: {
            amount: 1.2,
            from: "random"
          }
        }
      );

      // 2. Outro Animation (Scatters skills towards the camera when scrolling to projects)
      const outroTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top -80%', // Triggers when the user scrolls near the end of the pinned distance
          toggleActions: 'play none none reverse',
        }
      });

      outroTl.to(wordsRef.current, {
        x: "random(-1000, 1000)",
        y: "random(-1000, 1000)",
        z: "random(500, 1500)", // fly straight off the screen towards the user
        rotationX: "random(-360, 360)",
        rotationY: "random(-360, 360)",
        rotationZ: "random(-180, 180)",
        scale: "random(2, 6)", // huge chunks flying past
        opacity: 0,
        filter: "blur(40px)",
        duration: 2.0,
        ease: "power3.inOut",
        overwrite: "auto",
        stagger: {
          amount: 0.8,
          from: "center"
        }
      });
    });

    gsap.set(capsuleRef.current, { xPercent: -50, yPercent: -50, rotation: -20, scale: 0, opacity: 0 });

    // Custom cursor follow logic
    mm.add("(pointer: fine)", () => {
      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" });
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" });

      const moveCursor = (e) => {
        mousePosRef.current = { x: e.clientX, y: e.clientY };
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener('mousemove', moveCursor);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
      };
    });

    return () => mm.revert();
  }, { scope: containerRef });

  useEffect(() => {
    if (hoveredSkill) {
      setActiveIcon(hoveredSkill.icon);
      gsap.to(capsuleRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(2)",
        overwrite: "auto"
      });
    } else {
      gsap.to(capsuleRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.15,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    }
  }, [hoveredSkill]);

  useEffect(() => {
    const handleScroll = () => {
      if (hoveredSkill) {
        const elem = document.elementFromPoint(mousePosRef.current.x, mousePosRef.current.y);
        if (!elem || !elem.closest('.skill-item')) {
          setHoveredSkill(null);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hoveredSkill]);



  return (
    <>
      <section ref={containerRef} id="skills" className="relative w-full bg-brand-dark" style={{ overflow: 'clip' }}>
        <div ref={pinRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-brand-dark">
          {/* Force hide cursor everywhere while hovering over a skill */}
          {hoveredSkill && (
            <style>{`
              * { cursor: none !important; }
              #custom-cursor-solid { opacity: 0 !important; visibility: hidden !important; }
            `}</style>
          )}
          
          {/* Background Glow */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-brand-1/10 rounded-full blur-[120px]"></div>
          </div>

          <div className="z-10 text-center mb-16 sm:mb-24 mt-16 sm:mt-0">
            <h2 className="text-[10px] sm:text-xs font-sans tracking-[0.3em] text-brand-2 uppercase opacity-80">Mastered Skills</h2>
          </div>

          <div className="container mx-auto px-6 z-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-12 sm:gap-y-4 md:gap-x-16 md:gap-y-6 max-w-[1400px] leading-[0.85] tracking-tighter">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                ref={el => wordsRef.current[index] = el}
                className={`skill-item inline-block select-none py-1 sm:py-2 ${skill.className}`}
                style={{ ...skill.style, willChange: 'transform, opacity, filter' }}
                data-skill={skill.name}
                data-cursor-hide="true"
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Cursor Capsule - MOVED OUTSIDE SECTION TO FIX PERSPECTIVE OFFSET */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-normal"
        style={{ width: 0, height: 0, overflow: 'visible' }}
      >
        <div 
          ref={capsuleRef}
          className="absolute top-0 left-0 bg-[#222222] rounded-full w-32 h-16 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center justify-center border border-white/10"
        >
          <div className="w-8 h-8 opacity-100 flex items-center justify-center">
            {activeIcon}
          </div>
        </div>
      </div>
    </>
  );
};

export default Skills;
