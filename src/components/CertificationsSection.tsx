'use client'; // Add "use client" directive

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Define certification/partner logo data
const certifications = [
  { src: '/assets/certifications/791-7916366_master-shingle-applicator-certainteed-logo-master-shingle-applicator.png', alt: 'Master Shingle Applicator' },
  { src: '/assets/certifications/Atlas-768x469.png', alt: 'Atlas' },
  { src: '/assets/certifications/br-logo-w-roof-tile-components-print-1-e1574450520947.jpg', alt: 'BR Logo' },
  { src: '/assets/certifications/eagle-roofing-logo.png', alt: 'Eagle Roofing' },
  { src: '/assets/certifications/FRSA-blue-website-member-300dpi-1-768x768.jpg', alt: 'FRSA Member' },
  { src: '/assets/certifications/gaf-logo.png', alt: 'GAF' },
  { src: '/assets/certifications/NEW.png', alt: 'New Certification' }, // Placeholder alt text
  { src: '/assets/certifications/tamko-logo-768x576.png', alt: 'Tamko' },
  { src: '/assets/certifications/TRI-logo-removebg-preview.png', alt: 'TRI' },
];

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const logosRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const logos = logosRef.current.filter(el => el !== null) as HTMLDivElement[];
    const title = titleRef.current;
    const text = textRef.current;
    const section = sectionRef.current;

    if (section && title && text && logos.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          // markers: true, // Uncomment for debugging
        }
      });

      tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo(text, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .fromTo(logos,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)', // Use a 'back' ease for a slight overshoot effect
          }, '-=0.5');
    }

    // Cleanup ScrollTrigger instances on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="py-16 md:py-24 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-6 opacity-0">
          Our Construction Certifications & Partners
        </h2>
        <p ref={textRef} className="text-center max-w-2xl mx-auto mb-12 opacity-0 text-muted-foreground">
          We partner with leading manufacturers and hold industry certifications, ensuring your project meets the highest standards of quality and safety.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-center">
          {certifications.map((cert, index) => (
            <div
              key={index}
              ref={el => logosRef.current[index] = el}
              className="flex justify-center items-center p-4 bg-card rounded-lg shadow-sm opacity-0 border border-custom"
            >
              <Image
                src={cert.src}
                alt={cert.alt}
                width={150} // Adjust size as needed
                height={80} // Adjust size as needed
                className="object-contain" // Add object-contain
                style={{ height: 'auto', width: 'auto', maxHeight: '80px', maxWidth: '150px' }} // Add style for auto sizing within bounds
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
