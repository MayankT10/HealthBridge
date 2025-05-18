import React from 'react';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full backdrop-blur-md bg-white/30 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 py-6 px-4 shadow-inner border-t border-gray-200 dark:border-gray-700 transition-all duration-500">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left text-sm">
          &copy; {new Date().getFullYear()} <strong>HealthBridge</strong>. All rights reserved.
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black dark:hover:text-white transition-transform transform hover:scale-110"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-transform transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
        </div>

        <div className="text-xs text-center sm:text-right">
          Built with <FaHeart className="inline text-red-500 mx-1 animate-pulse" /> by Team HealthBridge
        </div>
      </div>
    </footer>
  );
}
