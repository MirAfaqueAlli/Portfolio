import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectDetails from './ProjectDetails';

gsap.registerPlugin(ScrollTrigger);

import { projectsData } from '../data/projectsData';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const mousePosRef = useRef({ x: -200, y: -200 });

  React.useEffect(() => {
    const onMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 320px)", () => {
      // Create a master timeline that pins the section and scrubs
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${projectsData.length * 150}%`, // Allows enough length to scrub through smoothly
          pin: true,
          scrub: 1.5, // Smoother scrubbing
          onUpdate: () => {
            // Disable heavy calculation on mobile to prevent scrolling lag
            if (window.innerWidth < 768) return;

            const { x, y } = mousePosRef.current;
            if (x === -200 && y === -200) return;
            // Temporarily hide CustomCursor doc layer if it conflicts? No it's pointerEvents: none.
            const el = document.elementFromPoint(x, y);
            const hoveredCard = el ? el.closest('.project-card') : null;

            cardsRef.current.forEach(card => {
              if (!card) return;
              if (card === hoveredCard) {
                card.classList.add('is-hovered');
              } else {
                card.classList.remove('is-hovered');
              }
            });
          }
        }
      });

      cardsRef.current.forEach((card, index) => {
        const isOdd = index % 2 !== 0;
        const startX = index === 0 ? '120vw' : (isOdd ? '-120vw' : '120vw');
        const startRot = index === 0 ? 15 : (isOdd ? -15 : 15);
        const startRotY = index === 0 ? 25 : (isOdd ? -25 : 25);

        // Initial setup for the massive 3D entrance
        gsap.set(card, {
          x: startX,
          y: '60vh',
          rotationZ: startRot,
          rotationY: startRotY,
          rotationX: 30, // Tilted forward initially like a falling paper
          z: -1000, // Starts way back in space
          opacity: 0,
        });

        if (index === 0) {
          tl.to(card, {
            x: 0,
            y: 0,
            rotationZ: 0,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out"
          });
        } else {
          // Push old cards back dynamically
          const prevCards = cardsRef.current.slice(0, index);
          tl.to(prevCards, {
            y: (i) => -((index - i) * 6) + "vh", // Shift up slightly
            z: (i) => -((index - i) * 250), // Push deep into the z-axis
            rotationX: (i) => -((index - i) * 4), // Tilt backwards visually
            opacity: (i) => 1 - ((index - i) * 0.15),
            ...(window.innerWidth >= 768 && { filter: (i) => `blur(${(index - i) * 6}px)` }),
            duration: 2.5,
            ease: "expo.inOut"
          }, "+=0.3"); // Pause to let the user admire before the next sweeps in

          // Bring new card in
          tl.to(card, {
            x: 0,
            y: 0,
            rotationZ: 0,
            rotationY: 0,
            rotationX: 0,
            z: 0,
            opacity: 1,
            duration: 2.5,
            ease: "expo.out"
          }, "<+0.2");
        }
      });

      // OUTRO: After all cards are stacked, animate them flying away upwards smoothly
      tl.to(cardsRef.current, {
        y: '-100vh',
        opacity: 0,
        rotationZ: (i) => i % 2 === 0 ? -10 : 10,
        rotationX: -20,
        stagger: 0.1,
        duration: 2.5,
        ease: "power3.inOut"
      }, "+=1");
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full min-h-screen bg-[#010101] flex items-center justify-center overflow-hidden"
    >
      {/* Deep Space Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-brand-1/10 rounded-full blur-[80px] md:blur-[160px] opacity-40 mix-blend-screen md:mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] bg-brand-accent/5 rounded-full blur-[100px] md:blur-[200px] opacity-40 mix-blend-screen md:mix-blend-screen"></div>
      </div>

      <div className="absolute top-8 md:top-16 w-full text-center z-0 pointer-events-none">
        <h2 className="text-[15vw] font-display font-black text-white/[0.50] uppercase tracking-tight leading-none px-4">
          PORTFOLIO
        </h2>
      </div>

      {/* Cards Container with extreme Perspective for true 3D stacking */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[1400px] mx-auto px-4 md:px-8 h-screen flex items-center justify-center z-10"
        style={{ perspective: "2500px" }}
      >

        {projectsData.map((project, index) => (
          <div
            key={project.id}
            ref={el => cardsRef.current[index] = el}
            // CINEMATIC POSTER CARD DESIGN — No generic "left/right" splits
            className={`project-card absolute left-0 right-0 mx-auto w-full max-w-[92vw] md:max-w-[95vw] lg:max-w-5xl aspect-video md:aspect-auto h-auto md:h-[75vh] rounded-[24px] md:rounded-[48px] overflow-hidden group shadow-2xl md:shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/10 bg-[#020202] ${activeCardIndex === index ? 'is-hovered' : ''}`}
            onClick={() => {
              if (window.innerWidth < 768) {
                setActiveCardIndex(activeCardIndex === index ? null : index);
              }
            }}
            style={{
               zIndex: index + 10,
               willChange: "transform, opacity",
              /* Removed transformStyle: 'preserve-3d' as it breaks overflow: hidden */
            }}
          >
            {/* Full Cover Image Background */}
            <div className="absolute inset-x-0 bottom-0 h-full w-full z-0 overflow-hidden rounded-[24px] md:rounded-[48px]" style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform scale-100 group-hover:scale-[1.08] group-[.is-hovered]:scale-[1.08] transition-all duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] filter blur-0 grayscale-0 group-hover:blur-[6px] group-[.is-hovered]:blur-[6px] group-hover:opacity-60 group-[.is-hovered]:opacity-60"
              />
              {/* Heavy vignette to ensure text readability (appears on hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/60 to-[#020202]/20 opacity-0 group-hover:opacity-100 group-[.is-hovered]:opacity-100 transition-opacity duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 mix-blend-multiply pointer-events-none opacity-0 group-hover:opacity-100 group-[.is-hovered]:opacity-100 transition-opacity duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
            </div>

            {/* Big Floating Index (Top Right) */}
            <div className="absolute top-4 md:top-12 right-6 md:right-12 z-20 overflow-hidden">
              <span className="block text-white/10 font-display font-black text-3xl md:text-8xl select-none translate-y-full group-hover:translate-y-0 group-[.is-hovered]:translate-y-0 transition-transform duration-[1.2s] ease-out">
                [{project.index}]
              </span>
            </div>

            {/* Massive Center Title that subtly reacts to hover (Hidden by Default) */}
            <div className="absolute top-[45%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-20 w-fit text-center pointer-events-none px-4 opacity-0 group-hover:opacity-100 group-[.is-hovered]:opacity-100 group-hover:-translate-y-[65%] group-[.is-hovered]:-translate-y-[65%] transition-all duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)]">
              <h3
                className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-display font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/10 tracking-tighter leading-none whitespace-nowrap scale-95 group-hover:scale-100 group-[.is-hovered]:scale-100 transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{ filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.9))" }}
              >
                {project.title}
              </h3>
            </div>

            {/* The "Control Dock" - Floating Glass Information Panel at the bottom */}
            <div className="absolute bottom-3 left-3 right-3 md:bottom-8 md:left-8 md:right-8 z-30 transition-all duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] translate-y-8 opacity-0 group-hover:translate-y-0 group-[.is-hovered]:translate-y-0 group-hover:opacity-100 group-[.is-hovered]:opacity-100">

              <div className="w-full bg-[#111111]/90 md:bg-[#111111]/70 backdrop-blur-md md:backdrop-blur-3xl border border-white/10 rounded-[16px] md:rounded-[32px] p-3 md:p-8 flex flex-col xl:flex-row items-center justify-between gap-3 md:gap-6 shadow-xl md:shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">

                {/* Glossy inner top-edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                {/* Left: Metadata */}
                <div className="flex flex-col gap-1 md:gap-2 w-full xl:w-[20%] text-center xl:text-left shrink-0">
                  <div className="text-brand-2 font-mono text-[9px] md:text-xs tracking-[0.4em] uppercase flex items-center justify-center xl:justify-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-2 animate-pulse shadow-[0_0_10px_#2dd4bf]"></span>
                    {project.cat}
                  </div>
                </div>

                {/* Center: Tech Stack Badges */}
                <div className="flex-1 min-w-0 w-full flex flex-wrap justify-center gap-1 md:gap-3 my-2 md:my-4 xl:my-0">
                  {project.tech.split(',').map(t => (
                    <span
                      key={t}
                      className="text-white/80 text-[8px] md:text-xs font-sans uppercase tracking-[0.2em] py-1.5 px-3 md:py-2 md:px-5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md hover:bg-white/10 transition-colors cursor-default whitespace-nowrap"
                    >
                      {t.trim()}
                    </span>
                  ))}
                </div>

                {/* Right: Action Buttons */}
                <div className="flex gap-2 md:gap-4 w-full xl:w-min justify-center xl:justify-end shrink-0">
                  <a
                    href={project.githubRepo}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 xl:flex-none flex items-center justify-center py-2.5 md:py-4 px-4 md:px-6 rounded-[10px] md:rounded-2xl bg-white text-black text-[8px] md:text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-2 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.5)] whitespace-nowrap"
                  >
                    GITHUB
                  </a>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="flex-1 xl:flex-none flex items-center justify-center py-2.5 md:py-4 px-4 md:px-6 rounded-[10px] md:rounded-2xl bg-transparent border border-white/20 text-white hover:bg-white/10 text-[8px] md:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] relative z-50"
                  >
                    DETAILS
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Render the details overlay when a project is selected */}
      {selectedProject && (
        <ProjectDetails 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Projects;
