import { useAccessibility } from "../context/AccessibilityContext";

export default function AccessibilityToolbar() {
  const {
    dyslexicFont, setDyslexicFont,
    highContrast, setHighContrast,
    focusMode, setFocusMode,
  } = useAccessibility();

  return (
    <div className="a11y-toolbar" role="toolbar" aria-label="Accessibility settings">
      <button
        aria-pressed={dyslexicFont}
        onClick={() => setDyslexicFont(!dyslexicFont)}
      >
        {dyslexicFont ? "✓ " : ""}Dyslexic Font
      </button>
      <button
        aria-pressed={highContrast}
        onClick={() => setHighContrast(!highContrast)}
      >
        {highContrast ? "✓ " : ""}High Contrast
      </button>
      <button
        aria-pressed={focusMode}
        onClick={() => setFocusMode(!focusMode)}
      >
        {focusMode ? "✓ " : ""}Focus Mode
      </button>
    </div>
  );
}