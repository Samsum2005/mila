import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  // State for accessibility features
  const [fontSize, setFontSize] = useState(100); // Percentage
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);

  // Apply styles to the HTML root
  useEffect(() => {
    const root = document.documentElement;
    
    // 1. Font Scaling
    root.style.fontSize = `${fontSize}%`;

    // 2. High Contrast Mode
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    // 3. Grayscale Mode
    if (isGrayscale) {
      document.body.style.filter = 'grayscale(100%)';
    } else {
      document.body.style.filter = 'none';
    }
  }, [fontSize, isHighContrast, isGrayscale]);

  return (
    <AccessibilityContext.Provider value={{
      fontSize, setFontSize,
      isHighContrast, setIsHighContrast,
      isGrayscale, setIsGrayscale
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);