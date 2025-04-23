import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react'; // Icon for close button

// Define the type for a portfolio item (ensure this matches the one in PortfolioSection.tsx)
interface PortfolioItem {
    id: number;
    src: string;
    title: string;
    category: string;
    description: string;
    // Add more fields if needed, e.g., date, client, specific services
}

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: PortfolioItem | null; // Use the defined type
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose, project }) => {

  // Prevent background scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to reset overflow when component unmounts or isOpen changes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Close modal on overlay click
    >
      <div
        className="bg-background-light dark:bg-background-dark rounded-lg max-w-4xl w-full relative shadow-xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row border border-custom"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside content
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-text-light/70 dark:text-text-dark/70 hover:text-primary-light dark:hover:text-primary-dark transition-colors z-10 bg-background-light/50 dark:bg-background-dark/50 rounded-full p-1"
          aria-label="Close project details"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative flex-shrink-0">
          <Image
            src={project.src}
            alt={project.title}
            fill // Use fill
            className="rounded-t-lg md:rounded-l-lg md:rounded-t-none object-cover" // Add object-cover
            unoptimized
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-text-light dark:text-text-dark">{project.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">{project.category}</p>
          <p className="text-base text-text-light dark:text-text-dark mb-6">
            {project.description}
          </p>

          {/* Optional: Add more details like a list */}
          <h4 className="font-semibold mb-2 text-text-light dark:text-text-dark">Project Details:</h4>
          <ul className="list-disc list-inside text-sm space-y-1 text-text-light dark:text-text-dark">
            <li>Service: Tree Removal (Example)</li>
            <li>Duration: 2 days (Example)</li>
            <li>Location: {project.location || 'N/A'} (Add location to data if available)</li>
            {/* Add more relevant details */}
          </ul>

          {/* Optional: Call to Action */}
          {/* <button className="mt-6 bg-primary-light dark:bg-primary-dark text-white px-4 py-2 rounded hover:opacity-90 transition-opacity">
            Request Similar Service
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
