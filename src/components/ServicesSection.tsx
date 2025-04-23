'use client';

import React, { useEffect, useRef } from 'react';
import { FaHardHat, FaDraftingCompass, FaHammer, FaBuilding, FaHome, FaProjectDiagram } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: FaHardHat,
    title: 'General Contracting',
    description: 'Comprehensive management and execution of construction projects from start to finish.'
  },
  {
    icon: FaDraftingCompass,
    title: 'Design-Build',
    description: 'Integrated design and construction services for seamless project delivery.'
  },
  {
    icon: FaHammer,
    title: 'Renovations & Remodeling',
    description: 'Transform and modernize existing spaces with expert renovation solutions.'
  },
  {
    icon: FaBuilding,
    title: 'Commercial Construction',
    description: 'Construction of office buildings, retail spaces, and commercial facilities.'
  },
  {
    icon: FaHome,
    title: 'Residential Construction',
    description: 'Custom homes, additions, and residential developments built to last.'
  },
  {
    icon: FaProjectDiagram,
    title: 'Project Management',
    description: 'Professional oversight to ensure your project is on time and on budget.'
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const title = titleRef.current;
    const cards = cardsRef.current.filter(el => el !== null) as HTMLDivElement[];
    const section = sectionRef.current;

    if (section && title && cards.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      });

      tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo(cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out',
          }, '-=0.5');
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-4 opacity-0">
          Our Construction Services
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Comprehensive solutions for every stage of your construction project, delivered with quality and expertise.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="bg-card p-6 rounded-lg shadow-md text-center flex flex-col items-center border border-custom opacity-0"
            >
              <service.icon className="text-4xl text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
