import heritageXImg from '../assets/HeritageX.png';
import cosmicWatchImg from '../assets/Cosmic_Watch.png';
import aavaranImg from '../assets/Aavaran.png';
import aavaran2Img from '../assets/Aavaran-2.png';
import blackMirrorImg from '../assets/BlackMirror.png';
import blackMirror2Img from '../assets/BlackMirror-2.png';

export const projectsData = [
  {
    id: 1,
    title: "HERITAGEX",
    subtitle: "AI-Powered Cultural Heritage Digitization & Preservation Platform",
    cat: "AI & WEB3D",
    tech: "React, Three.js, WebGL, Python, AI/ML",
    image: heritageXImg,
    index: "01",
    githubRepo: null,
    liveUrl: "https://heritagex.vercel.app/",
    moreInfo: "https://heritagex.vercel.app/",
    description: "HeritageX is a state-of-the-art Web3D and Artificial Intelligence platform designed to digitize, preserve, and showcase cultural artifacts. Developed for the Utkalpreneur E-Fest 2026 Hackathon at NIT Bhubaneswar, the platform bridges physical museums with the digital landscape, enabling interactive 3D replication, AI-driven structural health monitoring, and accessible regional language storytelling.",
    challenge: "Replicating delicate physical cultural artifacts into photorealistic, interactive 3D digital twins while embedding automated structural flaw detection and multi-lingual regional audio narration.",
    solution: "Combined cutting-edge Web3D rendering with AI computer vision pipelines for structural health diagnostics and modular speech synthesis for culturally authentic regional storytelling."
  },
  {
    id: 2,
    title: "COSMIC WATCH",
    subtitle: "Real-Time Near-Earth Object (NEO) 3D Visualization & Monitoring Platform",
    cat: "REAL-TIME WEB3D",
    tech: "Next.js, Three.js, React, NASA NeoWs API, TailwindCSS",
    image: cosmicWatchImg,
    index: "02",
    githubRepo: "https://github.com/MirAfaqueAlli/CosmicWatch",
    liveUrl: "https://cosmic-watch-theta.vercel.app/",
    moreInfo: "https://cosmic-watch-theta.vercel.app/",
    description: "Cosmic Watch is a premium, full-stack monitoring platform designed to translate complex scientific astronomical datasets into intuitive, accessible planetary defense insights. By parsing and analyzing real-time orbital trajectory feeds from NASA’s Near-Earth Object Web Service (NeoWs), the application calculates risk assessments and delivers an immersive, interactive 3D interface for astronomers, researchers, and space enthusiasts.",
    challenge: "Parsing and rendering high-volume, real-time astronomical orbital datasets from NASA's NeoWs API into smooth 3D trajectories with zero frame-rate drop and precise celestial coordinate projections.",
    solution: "Engineered hardware-accelerated Three.js orbital models combined with Next.js server caching and optimized math routines to deliver seamless 60fps planetary interaction and instant risk calculations."
  },
  {
    id: 3,
    title: "AAVARAN",
    subtitle: "Privacy-First On-Device Autonomous Browser Agent | Smart India Hackathon 2026",
    cat: "AI & CYBERSECURITY",
    tech: "Next.js 14, WebAssembly, MediaPipe, Tesseract.js, Gemini Flash, Mistral AI",
    image: aavaranImg,
    images: [aavaranImg, aavaran2Img],
    index: "03",
    githubRepo: "https://github.com/OmPrakash-X/aavaranAI",
    liveUrl: null,
    moreInfo: "https://github.com/OmPrakash-X/aavaranAI",
    description: "Aavaran is a privacy-first, on-device autonomous browser agent engineered for Smart India Hackathon 2026. It enforces a strict Zero-Knowledge Client-Side Security Boundary: sensitive biometric data and PII are redacted 100% locally in the browser sandbox using WebAssembly before masked pixels and abstracted DOM tokens are dispatched to multi-model cloud VLM cascades.",
    challenge: "Preventing biometric, PII, and credential leakage when autonomous AI browser agents transmit screen captures and DOM trees to cloud Vision-Language Models without sacrificing sub-second response times.",
    solution: "Engineered a 4-tier on-device WASM extraction pipeline (MediaPipe, Tesseract.js, Regex, DOM Grounder) with destructive canvas pixel masking and client-side credential tokenization, achieving sub-second agentic loops with zero cloud exposure."
  },
  {
    id: 4,
    title: "BLACK MIRROR",
    subtitle: "High-Performance Full-Stack AI Deep Learning Application",
    cat: "FULL-STACK AI",
    tech: "React, Node.js, FastAPI, TensorFlow",
    image: blackMirrorImg,
    images: [blackMirrorImg, blackMirror2Img],
    index: "04",
    githubRepo: "https://github.com/MirAfaqueAlli/BlackMirror",
    liveUrl: "https://blackmirror-orpin.vercel.app/",
    moreInfo: "https://blackmirror-orpin.vercel.app/",
    description: "An advanced full-stack AI platform built with FastAPI and TensorFlow for real-time intelligent deep learning inferences, coupled with a responsive, high-performance React web application.",
    challenge: "Minimizing inference latency and managing complex asynchronous data pipelines between the Python AI backend and client-side visualization layer.",
    solution: "Implemented asynchronous API routing, optimized neural network weight loading, and a modular component architecture ensuring instantaneous user feedback."
  }
];
