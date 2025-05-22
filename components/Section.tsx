
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className = '', titleClassName = '' }) => {
  return (
    <section className={`bg-gray-800 p-6 rounded-xl shadow-2xl mb-8 ${className}`}>
      <h2 className={`text-2xl font-semibold text-primary-400 mb-6 border-b-2 border-primary-700 pb-2 ${titleClassName}`}>
        {title}
      </h2>
      {children}
    </section>
  );
};

export default Section;
