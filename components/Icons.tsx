
import React from 'react';

export const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12v-.008z" />
  </svg>
);

export const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg>
);

export const ResetIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.03 1.123 0 1.131.094 1.976 1.057 1.976 2.192V7.5M8.25 7.5h7.5M8.25 7.5c0 1.135-.845 2.098-1.976 2.192a48.424 48.424 0 00-1.123 0c-1.131-.094-1.976-1.057-1.976-2.192M8.25 7.5c0-1.135.845-2.098 1.976-2.192a48.424 48.424 0 011.123 0c1.131.094 1.976 1.057 1.976 2.192m0 0H12m1.5 0c0 1.135.845 2.098 1.976 2.192a48.424 48.424 0 001.123 0c1.131-.094 1.976-1.057 1.976-2.192m0 0H12m4.5 0c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123 0c-1.131.094-1.976-1.057-1.976-2.192m0 0A23.921 23.921 0 0012 5.25c-2.403 0-4.68.623-6.577 1.713M16.5 7.5c-.621 2.987-3.03 5.25-5.75 5.25S5.621 10.487 5 7.5M12 21a8.966 8.966 0 007.743-4.818" />
  </svg>
);

export const MathIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm.375-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm2.25-6.75h.008v.008H11.25v-.008zm0 2.25h.008v.008H11.25v-.008zm0 2.25h.008v.008H11.25v-.008zm0 2.25h.008v.008H11.25v-.008zm2.25-6.75h.008v.008H13.5v-.008zm0 2.25h.008v.008H13.5v-.008zm0 2.25h.008v.008H13.5v-.008zm0 2.25h.008v.008H13.5v-.008zM4.5 6.75A2.25 2.25 0 016.75 4.5h10.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25V6.75z" />
  </svg>
);


export const CubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

export const CogIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m1.5 0H21m-1.5 0H3.375m17.25 0c-.248-.928-.735-1.78-1.36-2.53M4.875 9.47c-.625.75-.111 1.603-.36 2.53m14.25-2.53c.625.75.111 1.603.36 2.53m-14.25-2.53c-.663-.787-1.323-1.412-2.043-1.87M3.375 12H21m-17.625 0c.248.928.735 1.78 1.36 2.53m14.25-2.53c-.625-.75-.111-1.603-.36-2.53M6.375 14.53c.663.787 1.323 1.412 2.043 1.87M17.625 9.47c.72.458 1.38.917 2.043 1.87M12 4.5v.01M12 7.5v.01M12 10.5v.01M12 13.5v.01M12 16.5v.01M12 19.5v.01M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0" />
  </svg>
);
