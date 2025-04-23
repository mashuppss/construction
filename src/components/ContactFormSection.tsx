'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormValues = z.infer<typeof FormSchema>;

// --- Google Form Configuration ---
const GOOGLE_FORM_ACTION_URL = 'YOUR_GOOGLE_FORM_ACTION_URL_HERE';
const NAME_FIELD_ID = 'entry.YOUR_NAME_FIELD_ID';
const EMAIL_FIELD_ID = 'entry.YOUR_EMAIL_FIELD_ID';
const PHONE_FIELD_ID = 'entry.YOUR_PHONE_FIELD_ID';
const MESSAGE_FIELD_ID = 'entry.YOUR_MESSAGE_FIELD_ID';
// ---------------------------------

export default function ContactFormSection() {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const formBoxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, textRef.current], {
        autoAlpha: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.from(formBoxRef.current, {
        autoAlpha: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSubmissionStatus('submitting');
    setSubmissionMessage('');

    const formData = new FormData();
    formData.append(NAME_FIELD_ID, data.name);
    formData.append(EMAIL_FIELD_ID, data.email);
    if (data.phone) {
      formData.append(PHONE_FIELD_ID, data.phone);
    }
    formData.append(MESSAGE_FIELD_ID, data.message);

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      });
      setSubmissionStatus('success');
      setSubmissionMessage('Thank you! Your message has been sent successfully.');
      reset();
      setTimeout(() => {
        setSubmissionStatus('idle');
        setSubmissionMessage('');
      }, 5000);
    } catch {
      setSubmissionStatus('error');
      setSubmissionMessage('An error occurred while sending your message. Please try again later.');
    }
  };

  const inputClasses = "w-full p-3 rounded-md border bg-background-light dark:bg-card-dark text-text-light dark:text-text-dark placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition duration-300 ease-in-out";
  const borderClasses = "border-border-light dark:border-border-dark";
  const focusClasses = "focus:border-primary-light dark:focus:border-primary-dark focus:shadow-[0_0_0_2px_rgba(0,122,255,0.5)] dark:focus:shadow-[0_0_0_2px_rgba(10,132,255,0.5)]";
  const errorClasses = "border-red-500 dark:border-red-400 focus:shadow-[0_0_0_2px_rgba(239,68,68,0.5)] dark:focus:shadow-[0_0_0_2px_rgba(248,113,113,0.5)]";

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-24 bg-background-light dark:bg-background-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-4 text-text-light dark:text-text-dark invisible">
          Request a Construction Quote
        </h2>
        <p ref={textRef} className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto invisible">
          Ready to start your next building project? Fill out the form below and our construction team will contact you soon.
        </p>
        <div ref={formBoxRef} className="max-w-lg mx-auto bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-xl border border-border-light dark:border-border-dark invisible">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your Full Name"
                {...register('name')}
                className={`${inputClasses} ${errors.name ? errorClasses : `${borderClasses} ${focusClasses}`}`}
                aria-invalid={errors.name ? "true" : "false"}
                disabled={submissionStatus === 'submitting'}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register('email')}
                className={`${inputClasses} ${errors.email ? errorClasses : `${borderClasses} ${focusClasses}`}`}
                aria-invalid={errors.email ? "true" : "false"}
                disabled={submissionStatus === 'submitting'}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone <span className="text-xs text-gray-500">(Optional)</span></label>
              <input
                id="phone"
                type="tel"
                placeholder="(123) 456-7890"
                {...register('phone')}
                className={`${inputClasses} ${errors.phone ? errorClasses : `${borderClasses} ${focusClasses}`}`}
                aria-invalid={errors.phone ? "true" : "false"}
                disabled={submissionStatus === 'submitting'}
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea
                id="message"
                placeholder="Tell us about your construction project, timeline, and any special requirements..."
                rows={5}
                {...register('message')}
                className={`${inputClasses} ${errors.message ? errorClasses : `${borderClasses} ${focusClasses}`}`}
                aria-invalid={errors.message ? "true" : "false"}
                disabled={submissionStatus === 'submitting'}
              />
              {errors.message && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message.message}</p>}
            </div>
            <div>
              <button
                type="submit"
                disabled={submissionStatus === 'submitting'}
                className="w-full bg-primary-light dark:bg-yellow-400 text-black font-semibold py-3 px-6 rounded-lg shadow hover:opacity-90 transition-opacity duration-200 flex items-center justify-center border border-primary-light dark:border-yellow-500"
              >
                {submissionStatus === 'submitting' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
            {submissionMessage && (
              <div className={`mt-4 text-center text-sm p-3 rounded-md ${
                submissionStatus === 'success' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                submissionStatus === 'error' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' : ''
              }`}>
                {submissionMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
