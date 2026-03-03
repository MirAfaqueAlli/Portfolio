import React from 'react';
import { FaReact, FaJs, FaNodeJs, FaHtml5, FaPython, FaJava, FaGithub, FaExchangeAlt, FaLightbulb } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiMysql, SiBootstrap } from 'react-icons/si';

export const skillsData = [
  { name: 'React', icon: <FaReact className="w-full h-full text-[#61DAFB]" />, className: 'cursor-none text-[4rem] sm:text-[6rem] md:text-[8rem] font-display font-black text-white hover:text-brand-2 transition-colors duration-500', style: {} },
  { name: 'JavaScript', icon: <FaJs className="w-full h-full text-[#F7DF1E]" />, className: 'cursor-none text-[3rem] sm:text-[5rem] md:text-[7rem] font-sans font-bold text-transparent hover:text-brand-accent transition-all duration-500', style: { WebkitTextStroke: '2px rgba(255,255,255,0.7)' } },
  { name: 'Node.js', icon: <FaNodeJs className="w-full h-full text-[#339933]" />, className: 'cursor-none text-[3.5rem] sm:text-[4.5rem] md:text-[6.5rem] font-display font-semibold text-white/80 hover:text-white transition-colors duration-500', style: {} },
  { name: 'MongoDB', icon: <SiMongodb className="w-full h-full text-[#47A248]" />, className: 'cursor-none text-[3rem] sm:text-[4rem] md:text-[5rem] font-display font-medium text-brand-2 opacity-80 hover:opacity-100 transition-opacity duration-500', style: {} },
  { name: 'Express.js', icon: <SiExpress className="w-full h-full text-white" />, className: 'cursor-none text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-sans font-light text-white/40 hover:text-white/80 transition-colors duration-500', style: {} },
  { name: 'HTML/CSS', icon: <FaHtml5 className="w-full h-full text-[#E34F26]" />, className: 'cursor-none text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-display font-black text-white/70 hover:text-brand-accent transition-colors duration-500', style: {} },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-full h-full text-[#06B6D4]" />, className: 'cursor-none text-[2.5rem] sm:text-[3rem] md:text-[4rem] font-sans font-normal text-white/50 hover:text-white transition-colors duration-500', style: {} },
  { name: 'Python', icon: <FaPython className="w-full h-full text-[#3776AB]" />, className: 'cursor-none text-[3.5rem] sm:text-[4.5rem] md:text-[6rem] font-display font-bold text-transparent hover:text-brand-2 transition-all duration-500', style: { WebkitTextStroke: '2px rgba(39,202,132,0.8)' } },
  { name: 'SQL', icon: <SiMysql className="w-full h-full text-[#4479A1]" />, className: 'cursor-none text-[3rem] sm:text-[4rem] md:text-[5rem] font-sans font-bold text-white/60 hover:text-white transition-colors duration-500', style: {} },
  { name: 'REST API', icon: <FaExchangeAlt className="w-full h-full text-[#0096D6]" />, className: 'cursor-none text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] font-display font-semibold text-white/50 hover:text-white/90 transition-colors duration-500', style: {} },
  { name: 'Java', icon: <FaJava className="w-full h-full text-[#007396]" />, className: 'cursor-none text-[2rem] sm:text-[3rem] md:text-[4rem] font-sans font-medium text-white/30 hover:text-white/60 transition-colors duration-500', style: {} },
  { name: 'Git & GitHub', icon: <FaGithub className="w-full h-full text-white" />, className: 'cursor-none text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-sans font-light text-white/40 hover:text-white/80 transition-colors duration-500', style: {} },
  { name: 'Bootstrap', icon: <SiBootstrap className="w-full h-full text-[#7952B3]" />, className: 'cursor-none text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] font-display font-normal text-white/30 hover:text-white/60 transition-colors duration-500', style: {} },
  { name: 'Problem Solving', icon: <FaLightbulb className="w-full h-full text-[#FFD43B]" />, className: 'cursor-none text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] font-sans font-medium text-brand-accent/50 hover:text-brand-accent transition-colors duration-500 w-full text-center mt-4 sm:mt-12', style: {} },
];
