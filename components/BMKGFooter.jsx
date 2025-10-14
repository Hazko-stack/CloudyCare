"use client";
import React from 'react';

const BMKGFooter = ({
  className = "",
  showUpdateInfo = true,
  showAppBranding = true,
  variant = "default"
}) => {
  const variants = {
    default: {
      container: "bg-accent border-t border-gray-200 py-6 mt-8 mb-24",
      wrapper: "max-w-7xl mx-auto px-4 text-center",
      mainText: "flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-600",
      link: "font-semibold text-blue-600 hover:text-blue-800 transition-colors",
      updateInfo: "text-xs text-gray-500",
      branding: "text-xs text-gray-400 mt-2"
    },
    minimal: {
      container: "py-4 mb-24",
      wrapper: "max-w-7xl mx-auto px-4 text-center",
      mainText: "flex items-center justify-center gap-2 text-xs text-gray-500",
      link: "font-medium text-blue-600 hover:text-blue-700 transition-colors",
      updateInfo: "text-xs text-gray-400",
      branding: "text-xs text-gray-300 mt-1"
    },
    compact: {
      container: "py-2 mb-24",
      wrapper: "max-w-7xl mx-auto px-2 text-center",
      mainText: "flex items-center justify-center gap-1 text-xs text-gray-500",
      link: "font-medium text-blue-600 hover:text-blue-700 transition-colors underline",
      updateInfo: "hidden",
      branding: "hidden"
    }
  };

  const styles = variants[variant] || variants.default;

  return (
    <footer className={`${styles.container} ${className}`}>
      <div className={styles.wrapper}>
        <div className={styles.mainText}>
          <div className="flex items-center gap-2">
            <span>Data cuaca dari</span>
            <a
              href="https://www.bmkg.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
              aria-label="Kunjungi website resmi BMKG"
            >
              BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)
            </a>
          </div>
          {showUpdateInfo && (
            <>
              <span className="hidden sm:inline text-gray-400">•</span>
              <span className={styles.updateInfo}>
                Data diperbarui 2 kali sehari
              </span>
            </>
          )}
        </div>
        {showAppBranding && (
          <p className={styles.branding}>
            CloudyCare - Weather Information Service
          </p>
        )}
      </div>
    </footer>
  );
};

export default BMKGFooter;