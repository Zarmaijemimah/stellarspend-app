'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 160 }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      r:     Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.0004 + 0.0001,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const flicker = s.alpha + Math.sin(t * s.speed * 1000 + s.phase) * 0.15;
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${Math.max(0, flicker)})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-6 py-24"
      aria-label="StellarSpend hero section"
    >
      <Starfield />

      {/* Glow orbs — fixed pixel sizes, truly absolute so they don't affect layout */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '560px',
          height: '560px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,184,75,0.13) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-100px',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,169,232,0.11) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Main content — centered column */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: 'easeOut' }}>
          <span
            className="inline-flex items-center gap-2 pl-2 pr-4 py-1 mb-8 rounded-full text-[#e8b84b] text-xs font-medium tracking-widest uppercase border border-[#e8b84b]/20 bg-[#e8b84b]/[0.08]"
            aria-label="Built on Stellar blockchain"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#e8b84b] animate-pulse"
              aria-hidden="true"
            />
            Built on Stellar
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-display text-white mb-6 leading-[1.1] tracking-tight"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)' }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Take{' '}
          <em className="not-italic italic text-[#e8b84b]">full control</em>
          {' '}of your money
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="font-body font-light text-[#7a8aaa] max-w-lg mx-auto mb-10 leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          StellarSpend tracks every transaction on the Stellar blockchain 
          budgeting, analytics, and savings goals built for the people who
          need them most.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-4 w-full p-0.5 "
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Primary */}
          <Link
            href="/sign-in"
            aria-label="Get started — go to sign in"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full font-semibold text-base transition-all duration-200
                       bg-[#e8b84b] text-[#1a0f00]
                       hover:bg-[#f0c85a] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(232,184,75,0.35)]
                       active:translate-y-0
                       focus-visible:outline focus-visible:outline-[#e8b84b] focus-visible:outline-offset-2"
          >
            Get started
            <ArrowRight size={18} aria-hidden="true" />
          </Link>

          {/* Secondary */}
          <Link
            href="/docs"
            role="button"
            aria-label="Read the documentation"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full font-medium text-base transition-all duration-200
                       border border-white/10 text-[#e8edf8]
                       hover:border-white/25 hover:bg-white/5 hover:-translate-y-0.5
                       active:translate-y-0
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e8b84b] focus-visible:outline-offset-2"
          >
            <BookOpen size={17} aria-hidden="true" />
            Read the docs
          </Link>
        </motion.div>
        {/* Divider */}
        <motion.div
          className="w-full max-w-sm h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-12"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        />

        {/* Stats strip */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 w-full"
          variants={fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          aria-label="Platform highlights"
        >
          <div className="flex flex-col items-center gap-1">
            <p
              className="font-display text-white leading-none"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              0.01¢
            </p>
            <p className="text-[#7a8aaa] text-[0.68rem] tracking-widest uppercase">per transaction</p>
          </div>

          <div className="hidden sm:block w-px h-8 bg-white/10" aria-hidden="true" />

          <div className="flex flex-col items-center gap-1">
            <p
              className="font-display text-white leading-none"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              9
            </p>
            <p className="text-[#7a8aaa] text-[0.68rem] tracking-widest uppercase">languages</p>
          </div>

          <div className="hidden sm:block w-px h-8 bg-white/10" aria-hidden="true" />

          <div className="flex flex-col items-center gap-1">
            <p
              className="font-display text-white leading-none"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              No KYC
            </p>
            <p className="text-[#7a8aaa] text-[0.68rem] tracking-widest uppercase">wallet = identity</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#7a8aaa] text-[0.65rem] tracking-[0.12em] uppercase"
        aria-hidden="true"
      >
        <span>scroll</span>
        <span className="block w-px h-8 bg-linear-to-b from-[#7a8aaa] to-transparent" />
      </div>
    </section>
  );
}