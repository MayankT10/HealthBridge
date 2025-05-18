import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

export default function LoadingPage() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <main className="relative min-h-screen bg-[#f4f8fb] flex flex-col">
      {/* Marquee Text */}
      <div className="flex-1 flex items-center overflow-hidden">
        <div className="whitespace-nowrap animate-marquee">
          <span className="text-8xl font-bold mx-4 text-emerald-500">• HEALTH IN YOUR HANDS •</span>
          <span className="text-8xl font-bold mx-4 text-emerald-500">HEALTH IN YOUR HANDS •</span>
          <span className="text-8xl font-bold mx-4 text-emerald-500">HEALTH IN YOUR HANDS •</span>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/5 backdrop-blur-sm">
          <div className="bg-emerald-500 text-white px-8 py-3 rounded-full flex items-center gap-2 shadow-lg">
            <span className="font-medium">LOADING</span>
            <span className="w-8 text-right">{loadingProgress}%</span>
          </div>
        </div>
      )}
    </main>
  );
}