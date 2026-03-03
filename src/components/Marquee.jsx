export default function Marquee() {
  const marqueeItems = [
    "Problem Solver",
    "Creative Thinker",
    "Fast Learner",
    "Detail Oriented",
    "Team Player",
    "Adaptable"
  ];

  // Repeat items to ensure seamless scroll
  const repeatedMarqueeItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="relative mt-8 mb-16 -rotate-2 scale-105 shadow-[0_15px_40px_rgba(0,0,0,0.6)] z-0">
      <div className="w-full overflow-hidden bg-brand-1/30 backdrop-blur-md py-4 border-y border-brand-accent/40 flex items-center">
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {repeatedMarqueeItems.map((item, index) => (
            <div className="flex items-center gap-6 px-6 text-xl md:text-2xl font-semibold text-white uppercase tracking-widest" key={index}>
              <span className="flex items-center justify-center text-brand-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.8541 9.1459L22 12L14.8541 14.8541L12 22L9.1459 14.8541L2 12L9.1459 9.1459L12 2Z" fill="currentColor"/>
                </svg>
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
