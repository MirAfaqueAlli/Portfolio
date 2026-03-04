import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor
 *
 * Single solid circle with mix-blend-mode: difference.
 * Changes color dynamically depending on the text/background it hovers over.
 * It's not just an outline; it's a full circle.
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const viewRef = useRef(null);
  
  const [isTouchDevice, setIsTouchDevice] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    const handleMediaChange = (e) => setIsTouchDevice(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const view = viewRef.current;

    let rx = -100, ry = -100;
    const lerp = (a, b, t) => a + (b - a) * t;

    let currentX = -100;
    let currentY = -100;
    let activeTarget = null;
    const TARGETS_SEL = 'a, button, [data-cursor-hover], [data-cursor-text], [data-cursor-hide]';

    const updateHoverState = (target) => {
      if (target === activeTarget) return;
      activeTarget = target;

      if (target) {
        const cursorHide = target.hasAttribute('data-cursor-hide');
        const cursorText = target.getAttribute('data-cursor-text');
        
        if (cursorHide) {
          gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.2 });
          gsap.to(view, { scale: 0, opacity: 0, duration: 0.2 });
        } else if (cursorText) {
          if (view) view.innerText = cursorText;
          gsap.to(view, { scale: 1, opacity: 1, duration: 0.4, ease: 'expo.out' });
          gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.2 });
        } else {
          // Hover state: Circle expands to encompass the element more widely
          gsap.to(cursor, { 
            scale: 2.5, 
            opacity: 1, 
            duration: 0.4, 
            ease: 'expo.out' 
          });
          gsap.to(view, { scale: 0, opacity: 0, duration: 0.2 });
        }
      } else {
        // Idle state: Normal solid circle
        gsap.to(cursor, { 
          scale: 1, 
          opacity: 1, 
          duration: 0.4, 
          ease: 'power3.out' 
        });
        gsap.to(view, { scale: 0, opacity: 0, duration: 0.2 });
      }
    };

    let currentColor = '#ffffff';

    const checkHover = () => {
      if (currentX === -100 && currentY === -100) return;
      const el = document.elementFromPoint(currentX, currentY);
      if (el) {
        updateHoverState(el.closest(TARGETS_SEL));
        
        const isGreen = el.closest('.text-brand-2, .from-brand-2, .text-brand-accent, .bg-brand-2, .text-\\[\\#27CA84\\]');
        // Setting it to black inverses difference mode so green underneath stays solid and hover stays non-red.
        const targetColor = isGreen ? '#000000' : '#ffffff';
        if (currentColor !== targetColor) {
          currentColor = targetColor;
          gsap.to(cursor, { backgroundColor: targetColor, duration: 0.2 });
        }
      } else {
        updateHoverState(null);
        if (currentColor !== '#ffffff') {
          currentColor = '#ffffff';
          gsap.to(cursor, { backgroundColor: '#ffffff', duration: 0.2 });
        }
      }
    };

    const onMove = ({ clientX, clientY }) => {
      if (currentX === -100) {
        rx = clientX;
        ry = clientY;
      }
      currentX = clientX;
      currentY = clientY;

      gsap.set(view, { x: clientX, y: clientY, xPercent: -50, yPercent: -50 });
      checkHover();
    };

    const onScroll = () => {
      checkHover();
    };

    // Smooth lerp for the solid circle
    let rafId;
    const tick = () => {
      rx = lerp(rx, currentX, 0.2); // Responsive but smooth
      ry = lerp(ry, currentY, 0.2);
      gsap.set(cursor, { x: rx, y: ry, xPercent: -50, yPercent: -50 });
      rafId = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });

    const onLeaveWindow = () => gsap.to(cursor, { opacity: 0, duration: 0.3 });
    const onEnterWindow = () => gsap.to(cursor, { opacity: 1, duration: 0.3 });
    document.documentElement.addEventListener('mouseleave', onLeaveWindow);
    document.documentElement.addEventListener('mouseenter', onEnterWindow);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll, { capture: true });
      cancelAnimationFrame(rafId);
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
      document.documentElement.removeEventListener('mouseenter', onEnterWindow);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* ── Solid full circle with difference blend mode ──────────────── */}
      <div
        id="custom-cursor-solid"
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transformOrigin: 'center center',
        }}
      />

      {/* ── View/Text Cursor ─────────────────────────────────────────────── */}
      <div
        ref={viewRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          padding: '10px 20px',
          borderRadius: '9999px',
          backgroundColor: '#ffffff',
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontFamily: "'Outfit', var(--font-sans), sans-serif",
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          opacity: 0,
          transform: 'scale(0)',
          pointerEvents: 'none',
          zIndex: 100001,
          willChange: 'transform, opacity',
        }}
      />
    </>
  );
}
