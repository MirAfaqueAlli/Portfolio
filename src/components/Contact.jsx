import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef();
  const formRef = useRef();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formState, setFormState] = useState('idle'); // 'idle', 'sending', 'success', 'error'

  const handleMouseMove = (e) => {
    if(!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');

    const formData = {
      from_name: formRef.current.name.value,
      from_email: formRef.current.email.value,
      message: formRef.current.message.value,
      subject: 'Portfolio Contact' // fallback subject mapping
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formData,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
        setFormState('success');
        formRef.current.reset();
        
        // Reset status after a few seconds
        setTimeout(() => setFormState('idle'), 4000);
    }, (error) => {
        console.error('EmailJS Error:', error);
        setFormState('error');
        setTimeout(() => setFormState('idle'), 4000);
    });
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse',
      }
    });

    // Main structural reveals
    tl.from('.contact-line', {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1.5,
      ease: 'power3.out'
    })
    .from('.header-reveal', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.1
    }, '-=1')
    .from('.info-card', {
      y: 50,
      opacity: 0,
      rotateX: -15,
      duration: 1,
      ease: 'back.out(1.5)',
      stagger: 0.15
    }, '-=0.8')
    .from('.form-container', {
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    }, '-=1');

    // Continuous floating for background elements
    gsap.to('.ambient-blob', {
      y: '40px',
      x: '20px',
      rotation: 15,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 1
    });

    // Slow spin for functional rings
    gsap.to('.spin-ring', {
      rotation: 360,
      duration: 25,
      repeat: -1,
      ease: 'linear'
    });

    // Magnetic button effect on hover logic via GSAP
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach((magnet) => {
      magnet.addEventListener('mousemove', (e) => {
        const rect = magnet.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(magnet, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.4,
          ease: 'power2.out'
        });
      });

      magnet.addEventListener('mouseleave', () => {
        gsap.to(magnet, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      id="contact" 
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#010101] overflow-hidden py-32 z-10 text-white mt-[-1rem]"
      style={{ perspective: '1000px' }}
    >
      
      {/* Dynamic Cursor Light tracking mouse within section */}
      <div 
        className="absolute w-[800px] h-[800px] bg-brand-2/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-300 ease-out z-0"
        style={{ transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)` }}
      />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(39,202,132,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(39,202,132,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      ></div>

      {/* Ambient Blobs */}
      <div className="ambient-blob absolute top-20 right-[10%] w-[400px] h-[400px] bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="ambient-blob absolute bottom-10 left-[5%] w-[500px] h-[500px] bg-brand-1/40 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Decorative Technical Top Line */}
      <div className="contact-line absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-2 to-transparent z-20"></div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24">
          <div className="relative">
            {/* Accents rings */}
            <div className="spin-ring absolute -top-12 -left-12 w-32 h-32 border border-brand-2/20 rounded-full border-dashed opacity-50 hidden md:block"></div>
            <div className="spin-ring absolute -top-8 -left-8 w-24 h-24 border border-brand-2/10 rounded-full opacity-50 hidden md:block" style={{animationDirection: 'reverse'}}></div>
            
            <div className="header-reveal inline-flex items-center gap-3 px-5 py-2 rounded-none border-l-4 border-brand-2 bg-brand-2/5 backdrop-blur-md mb-6 relative z-10">
              <span className="w-2 h-2 bg-brand-2 animate-ping rounded-full"></span>
              <p className="text-sm font-mono font-bold text-brand-2 uppercase tracking-[0.2em]">
                System://Initiate_Contact
              </p>
            </div>
            
            <h2 className="header-reveal font-display text-6xl md:text-[6rem] lg:text-[8rem] font-black leading-[0.85] tracking-tighter uppercase relative z-10">
              Start The <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-brand-2 to-brand-1 italic relative inline-block">
                Dialogue.
                <div className="absolute -bottom-4 left-0 w-full h-1 bg-brand-2 blur-sm"></div>
              </span>
            </h2>
          </div>

          <div className="header-reveal text-right hidden lg:block">
             <div className="font-mono text-xs text-brand-2/60 mb-2 border-b border-brand-2/20 pb-2">CONNECTION_STATUS: <span className="text-brand-2">ONLINE</span></div>
             <p className="text-[#8a8d86] text-lg max-w-[300px] font-light leading-relaxed">
               Open for challenging projects, innovative ideas, and pushing the boundaries of the digital realm.
             </p>
          </div>
        </div>

        {/* Content Section - Complex Grid Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-20">
          
          {/* Left Column: Contact Methods (Cards) */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-center gap-10 lg:pr-8">
            
            {/* Email Card */}
            <div className="info-card group relative bg-brand-1/10 border border-brand-2/10 p-10 md:p-12 rounded-2xl overflow-hidden backdrop-blur-xl hover:border-brand-2/40 transition-colors duration-500">
              <div className="absolute inset-0 bg-brand-2/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <div className="relative z-10 flex flex-col gap-6 lg:gap-10">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-mono text-[#8a8d86] uppercase tracking-widest">Protocol://Email</p>
                  <div className="w-10 h-10 rounded-full bg-[#010101] border border-brand-2/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <svg className="w-5 h-5 text-brand-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </div>
                </div>
                <a href="mailto:mirafaquealli9@gmail.com" className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[1.3rem] xl:text-[1.6rem] font-bold text-white break-all hover:text-brand-2 transition-colors">
                  mirafaquealli9@gmail.com
                </a>
              </div>
            </div>

            {/* Social Icons Tech Grid */}
            <div className="info-card flex flex-col gap-4 mt-2">
              <p className="text-xs font-mono text-[#8a8d86] uppercase tracking-widest border-b border-brand-2/10 pb-2">Protocol://Social_Nodes</p>
              <div className="grid grid-cols-3 gap-3">
                  {[
                    { 
                      name: 'LinkedIn', 
                      url: 'https://www.linkedin.com/in/mir-afaque-alli',
                      svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> 
                    },
                    { 
                      name: 'GitHub', 
                      url: 'https://github.com/MirAfaqueAlli',
                      svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> 
                    },
                    { 
                      name: 'Twitter (X)', 
                      url: 'https://x.com/AlliAfaque',
                      svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> 
                    }
                  ].map((social, idx) => (
                    <a 
                      key={idx} 
                      href={social.url} 
                      title={social.name}
                      className="group relative h-16 bg-transparent border border-brand-2/20 flex items-center justify-center overflow-hidden transition-colors z-10"
                      style={{ borderRadius: '0', clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)' }}
                    >
                      {/* Technical Line Fill */}
                       <div className="absolute inset-0 bg-brand-2 opacity-0 group-hover:opacity-10 transition-opacity z-0"></div>
                       {/* SVG Icon */}
                       <div className="text-[#8a8d86] group-hover:text-brand-2 transition-colors duration-300 relative z-10">
                          {social.svg}
                       </div>
                    </a>
                  ))}
              </div>
            </div>

          </div>

          {/* Right Column: Console/Terminal Form */}
          <div className="form-container col-span-1 lg:col-span-7 relative h-full">

            {/* Terminal Window Frame */}
            <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col shadow-2xl relative z-10">
              
              {/* Terminal Header */}
              <div className="bg-[#0a0a0a] border-b border-white/5 py-3 px-6 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="font-mono text-xs text-white/30">user@afaque: ~/contact</div>
                <div></div>
              </div>

              {/* Form Content */}
              <form ref={formRef} className="p-8 md:p-12 flex flex-col gap-8 flex-grow" onSubmit={handleFormSubmit}>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2 relative group">
                    <label className="text-xs font-mono text-brand-2/80 mb-1">const name =</label>
                    <input type="text" name="name" placeholder="'John Doe'" className="bg-transparent border-b border-white/10 py-2 text-white font-mono focus:outline-none focus:border-brand-2 transition-colors placeholder:text-white/20" required />
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-2 transition-all duration-300 group-focus-within:w-full"></span>
                  </div>
                  
                  <div className="flex flex-col gap-2 relative group">
                    <label className="text-xs font-mono text-brand-2/80 mb-1">const email =</label>
                    <input type="email" name="email" placeholder="'john@doe.com'" className="bg-transparent border-b border-white/10 py-2 text-white font-mono focus:outline-none focus:border-brand-2 transition-colors placeholder:text-white/20" required />
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand-2 transition-all duration-300 group-focus-within:w-full"></span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 relative group flex-grow">
                  <label className="text-xs font-mono text-brand-2/80 mb-1">const message =</label>
                  <textarea name="message" placeholder="'Describe your idea here...'" className="bg-transparent border border-white/10 rounded-xl p-4 text-white font-mono focus:outline-none focus:border-brand-2 transition-colors resize-none h-[180px] placeholder:text-white/20 custom-scrollbar" required></textarea>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                   <div className="font-mono text-xs text-white/30 hidden md:block">{'>'} await sendMessage(name, email, message)</div>
                   <button 
                     type="submit" 
                     disabled={formState === 'sending'}
                     className={`magnetic relative overflow-hidden font-bold text-sm px-10 py-4 rounded-full group transition-all duration-300 shadow-[0_0_20px_rgba(39,202,132,0.15)] ${
                        formState === 'success' ? 'bg-green-500 text-black shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 
                        formState === 'error' ? 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 
                        formState === 'sending' ? 'bg-brand-2/50 text-white cursor-wait' : 
                        'bg-brand-2 text-[#010101] hover:scale-105'
                     }`}
                   >
                    {formState === 'idle' && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>}
                    <span className="relative z-10 flex items-center gap-2">
                       {formState === 'idle' && (
                         <>
                           EXECUTE
                           <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                         </>
                       )}
                       {formState === 'sending' && (
                         <>
                           <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                           EXECUTING...
                         </>
                       )}
                       {formState === 'success' && (
                         <>
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                           SYS_CONFIRM
                         </>
                       )}
                       {formState === 'error' && (
                         <>
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12"/></svg>
                           SYS_FAIL
                         </>
                       )}
                    </span>
                   </button>
                </div>

              </form>
            </div>

            {/* Technical grid backdrop for form */}
            <div className="absolute -inset-4 border border-brand-2/20 border-dashed rounded-[2rem] z-0 pointer-events-none hidden md:block"></div>
            <div className="absolute -inset-1 border border-brand-2/10 rounded-[1.5rem] z-0 pointer-events-none hidden md:block"></div>

          </div>

        </div>

      </div>
    </section>
  );
}
