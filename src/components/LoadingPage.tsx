import React, { useEffect, useState } from 'react';

export default function LoadingPage() {
  const [text, setText] = useState('HEALTH IN YOUR HANDS');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % text.length);
    }, 150);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/health-pattern.svg')] opacity-5 animate-pulse"></div>
      <div className="relative w-full max-w-4xl px-4 z-10">
        <h1 className="text-[8vw] font-bold tracking-tighter leading-none text-emerald-800">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className={`inline-block transition-transform duration-200 ${index === currentIndex ? 'translate-y-[-20px] text-teal-500' : ''}`}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {char}
            </span>
          ))}
        </h1>
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-emerald-100 overflow-hidden rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 ease-in-out"
            style={{
              width: `${((currentIndex + 1) / text.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}