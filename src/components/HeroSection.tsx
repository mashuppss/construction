'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const text = textRef.current;
    const button = buttonRef.current;

    if (title && text && button) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(title, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(text, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
        .fromTo(button, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.5');
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex items-center justify-center h-screen min-h-[600px] text-white overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-[-1]">
        <Image
          src="/assets/homepage09.jpg"
          alt="Construction site with cranes and workers"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      {/* Content */}
      <div className="container mx-auto px-4 text-center z-10">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 opacity-0"
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
        >
          Expert Construction & Building Services
        </h1>
        <p
          ref={textRef}
          className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-0"
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
        >
          From concept to completion, we deliver quality, safety, and value for every project.
        </p>
        <div ref={buttonRef} className="inline-block opacity-0">
          <Link href="#contact">
            <button
              type="button"
              className="text-lg px-8 py-3 rounded-full bg-gradient-to-r from-primary to-yellow-500 text-white shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 ease-out border-2 border-primary/80 focus:outline-none focus:ring-4 focus:ring-primary/30"
            >
              Request a Free Quote
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
