# Boost Tree Co. - Modern Tree Removal Website

This is a modern, single-page website built for "Boost Tree Co.", a fictional tree removal company. The site is designed with a sleek, professional, and minimalist aesthetic, inspired by premium brands like Apple and Tesla.

Built with Next.js, TypeScript, and Tailwind CSS, it features smooth animations using GSAP, theme switching (light/dark mode) via `next-themes`, and a contact form integrated with Google Forms using `react-hook-form` and `zod` for validation.

The project is configured for static export (`output: 'export'`) making it suitable for deployment on platforms like GitHub Pages.

## Features

*   **Modern & Minimalist Design:** Clean layout, bold typography, high-quality visuals.
*   **Responsive:** Mobile-first design ensures optimal viewing on all devices.
*   **Light/Dark Mode:** Theme toggle with persistence via local storage.
*   **Smooth Animations:** Subtle scroll-triggered and hover animations powered by GSAP.
*   **Sticky Header:** Navigation bar sticks to the top on scroll, with a mobile hamburger menu.
*   **Component-Based:** Built with reusable React components.
*   **Static Export Ready:** Configured for easy deployment on static hosting platforms.
*   **Contact Form:** Includes validation and asynchronous submission to a Google Form.

## Sections

*   Hero Section
*   Services
*   Portfolio (with Modal for details)
*   Why Choose Us
*   Partners & Certifications
*   Testimonials
*   Contact Form
*   Footer

## Technology Stack

*   **Framework:** Next.js 14+ (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Animations:** GSAP (GreenSock Animation Platform)
*   **Icons:** react-icons, lucide-react
*   **Theme Switching:** next-themes
*   **Form Handling:** react-hook-form
*   **Validation:** zod

## Project Setup & Installation

1.  **Clone the repository (or ensure you have the project files):**
    ```bash
    git clone <repository-url>
    cd tree-company-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

## Development

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev