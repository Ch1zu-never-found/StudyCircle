import { createContext, useContext, useState, useEffect } from "react";

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  const [dyslexicFont, setDyslexicFont] = useState(
    localStorage.getItem("dyslexicFont") === "true"
  );
  const [highContrast, setHighContrast] = useState(
    localStorage.getItem("highContrast") === "true"
  );
  const [focusMode, setFocusMode] = useState(
    localStorage.getItem("focusMode") === "true"
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dyslexic-font", dyslexicFont);
    localStorage.setItem("dyslexicFont", dyslexicFont);
  }, [dyslexicFont]);

  useEffect(() => {
    document.body.classList.toggle("high-contrast", highContrast);
    localStorage.setItem("highContrast", highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.body.classList.toggle("focus-mode", focusMode);
    localStorage.setItem("focusMode", focusMode);
  }, [focusMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <AccessibilityContext.Provider
      value={{
        dyslexicFont, setDyslexicFont,
        highContrast, setHighContrast,
        focusMode, setFocusMode,
        darkMode, setDarkMode,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export const useAccessibility = () => useContext(AccessibilityContext);