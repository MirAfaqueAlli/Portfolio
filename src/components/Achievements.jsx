import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight } from 'react-icons/fa';
import { achievementsData } from '../data/achievementsData';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 320px)", () => {
      // Background parallax
      gsap.to(".achievements-bg-orb", {
        y: "30vh",
        rotation: 45,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Animate title in
      gsap.from(".achievements-title", {
        y: 80,
        opacity: 0,
        filter: "blur(20px)",
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      // Stagger cards
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const isLeft = i % 2 === 0;

        gsap.set(card, {
          opacity: 0,
          y: 80,
          x: isLeft ? -30 : 30,
          scale: 0.93,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "top 55%",
            scrub: 1,
          }
        });

        tl.to(card, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          ease: "power3.out"
        });
      });

      // Timeline line grow
      gsap.fromTo(".timeline-line-glow",
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 1
          }
        }
      );
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative w-full min-h-screen bg-[#020202] py-20 sm:py-24 md:py-32 overflow-hidden flex flex-col items-center z-10"
    >
      {/* Abstract Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="achievements-bg-orb absolute top-0 left-[10%] w-[40vw] h-[40vw] bg-brand-2/10 rounded-full blur-[150px] mix-blend-screen opacity-50"></div>
        <div className="achievements-bg-orb absolute bottom-0 right-[10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[180px] mix-blend-screen opacity-40"></div>
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[30vw] h-[60vh] bg-brand-2/5 rounded-full blur-[120px] mix-blend-screen opacity-30 animate-pulse"></div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 w-full text-center px-4 mb-14 sm:mb-20 md:mb-28">
        {/* Ghost big title */}
        <h2 className="achievements-title text-[14vw] sm:text-[12vw] md:text-[8vw] font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-transparent uppercase tracking-tighter leading-none opacity-50 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] select-none">
          RECOGNITIONS
        </h2>
        {/* Sub-label sits below the big title — no absolute positioning on mobile */}
        <p className="achievements-title mt-2 sm:mt-3 text-brand-2 font-mono text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] uppercase font-bold drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]">
          Milestones &amp; Growth
        </p>
      </div>

      {/* Timeline Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col z-20"
      >

        {/* ── Timeline vertical line ──
            Mobile  : 20px from left edge of container (after px-4 padding)
            Desktop : centered (left-1/2)                                    */}
        <div className="absolute top-0 bottom-0
                        left-[calc(1rem+10px)] sm:left-[calc(1.5rem+10px)] md:left-1/2
                        w-[2px] -translate-x-1/2
                        bg-gradient-to-b from-transparent via-white/10 to-transparent">
          <div className="timeline-line-glow w-full bg-gradient-to-b from-transparent via-brand-2 to-brand-accent shadow-[0_0_20px_#2dd4bf] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-white to-transparent opacity-80 animate-pulse"></div>
          </div>
        </div>

        {achievementsData.map((item, index) => {
          const Icon = item.icon;
          const isLeft = index % 2 === 0;

          return (
            <div
              key={item.id}
              ref={el => cardsRef.current[index] = el}
              className={`
                relative w-full flex items-start
                mb-10 sm:mb-14 md:mb-24
                /* Mobile: always left-aligned after dot */
                justify-start
                /* Desktop: alternate sides */
                md:justify-between
                ${isLeft ? 'md:flex-row-reverse' : ''}
              `}
            >

              {/* Timeline Dot — always at the timeline line position */}
              <div className="absolute
                              top-6
                              left-[10px] sm:left-[10px] md:left-1/2
                              w-4 h-4 sm:w-5 sm:h-5
                              rounded-full bg-[#020202]
                              border-[3px] border-brand-2
                              -translate-x-1/2
                              flex items-center justify-center
                              z-30
                              shadow-[0_0_20px_rgba(45,212,191,0.8)]">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-brand-2 rounded-full animate-ping"></div>
              </div>

              {/* Connecting Line (Desktop only) */}
              <div
                className={`hidden md:block absolute top-8 -translate-y-1/2 w-[5%] h-[2px] z-20 ${isLeft ? 'right-[50%]' : 'left-[50%]'}`}
              >
                <div className={`w-full h-full bg-gradient-to-r ${isLeft ? 'from-transparent to-brand-2/50' : 'from-brand-2/50 to-transparent'}`}></div>
              </div>

              {/* Empty spacer for desktop alternating pattern */}
              <div className="hidden md:block w-[45%] shrink-0"></div>

              {/* ── CARD ──
                  Mobile  : full width, offset right of the dot with pl
                  Desktop : exactly 45% width, no pl needed               */}
              <div className="
                w-full
                pl-[30px] sm:pl-[32px]
                md:pl-0 md:w-[45%]
                relative group cursor-pointer z-30 shrink-0
              ">
                {/* Hover glow border */}
                <div
                  className="absolute -inset-[1px] rounded-[24px] sm:rounded-[28px] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${item.glow}, transparent, ${item.glow})` }}
                ></div>
                <div
                  className="absolute -inset-[1px] rounded-[24px] sm:rounded-[28px] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${item.glow}, transparent, ${item.glow})` }}
                ></div>

                <div
                  className="relative bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-[20px] sm:rounded-[28px] p-4 sm:p-6 md:p-8 overflow-hidden transition-all duration-500 group-hover:bg-[#111111]/95 group-hover:-translate-y-1"
                  style={{ boxShadow: `0 10px 40px -10px rgba(0,0,0,0.8), 0 0 30px -15px ${item.glow}` }}
                >
                  {/* Inner glows */}
                  <div className="absolute -top-24 -right-24 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-700 pointer-events-none" style={{ background: item.glow, opacity: 0.3 }}></div>
                  <div className="absolute -bottom-24 -left-24 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-700 pointer-events-none" style={{ background: item.glow, opacity: 0.15 }}></div>

                  {/* Card inner layout — always a row on mobile too, just use smaller icon */}
                  <div className="flex flex-row gap-3 sm:gap-5 items-start relative z-10">

                    {/* Icon */}
                    <div className="shrink-0 relative">
                      <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-[#1a1a1a] shadow-inner border border-white/10 flex items-center justify-center backdrop-blur-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 ease-out relative z-10 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${item.accent} drop-shadow-[0_0_10px_currentColor]`} />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      {/* Date badge */}
                      <div className="flex flex-wrap items-center gap-2 mb-1.5 sm:mb-2">
                        <span className="text-white/70 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] font-bold uppercase border border-white/10 bg-white/5 px-2.5 py-0.5 rounded-full group-hover:border-white/20 group-hover:bg-white/10 transition-colors">
                          {item.date}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-xl md:text-2xl font-display font-black text-white mb-1 sm:mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
                        {item.title}
                      </h3>

                      {/* Issuer */}
                      <h4 className={`text-xs sm:text-sm md:text-base font-sans font-semibold mb-2 sm:mb-3 ${item.accent} tracking-wide`}>
                        {item.issuer}
                      </h4>

                      {/* Description */}
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 font-sans group-hover:text-white/80 transition-colors">
                        {item.desc}
                      </p>

                      {/* CTA button */}
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] md:text-xs font-black tracking-[0.15em] sm:tracking-[0.2em] font-mono uppercase text-white hover:text-white transition-colors group/link px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 overflow-hidden relative w-fit"
                      >
                        <span className="absolute inset-0 bg-white/5 opacity-0 group-hover/link:opacity-100 transition-opacity"></span>
                        <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                          View Certificate
                          <FaArrowRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transform group-hover/link:translate-x-1 sm:group-hover/link:translate-x-1.5 transition-transform ${item.accent}`} />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Achievements;
