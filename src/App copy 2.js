import React, { useEffect } from 'react';
import './assets/scss/themes.scss';
import Route from './Routes';

function App() {
  const handleKeyDown = (e) => {
    if (
      (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl + Shift + I (DevTools)
      (e.ctrlKey && e.shiftKey && e.key === 'J') || // Ctrl + Shift + J (Console)
      (e.ctrlKey && e.shiftKey && e.key === 'C') || // Ctrl + Shift + C (Inspect Element)
      (e.ctrlKey && e.shiftKey && e.key === 'E') || // Ctrl + Shift + E (Network tab)
      (e.ctrlKey && e.key === 'U') ||               // Ctrl + U (View Source)
      (e.key === 'F12') ||                          // F12 (DevTools)
      (e.ctrlKey && e.key === 'F12') ||             // Ctrl + F12
      (e.altKey && e.key === 'F12') ||              // Alt + F12
      (e.ctrlKey && e.shiftKey && e.key === 'K') || // Ctrl + Shift + K (Firefox)
      (e.ctrlKey && e.key === 'S')                  // Ctrl + S (Save)
    ) {
      e.preventDefault();
    }
  };

  useEffect(() => {
 
    const disableContextMenu = (e) => e.preventDefault();
    window.addEventListener('contextmenu', disableContextMenu);
 
    window.addEventListener('keydown', handleKeyDown);
 
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
      for (let prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] =
          typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] === 'function'
            ? () => {}
            : null;
      }
    }

 
    const detectDevTools = () => {
      const threshold = 150;  
      const isDevToolsOpen =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold ||
        window.devTools && window.devTools.isOpen;

      if (isDevToolsOpen) {
        window.location.href = "about:blank";  
      }
    };
    const devToolsInterval = setInterval(detectDevTools, 1000);

 
    const protectConsole = () => {
      const originalConsole = window.console;
      window.console = {
        log: () => {},
        warn: () => {},
        error: () => {},
        info: () => {},
      };
      Object.defineProperty(window, 'console', {
        get: () => originalConsole,
        set: () => {},  
      });
    };
    protectConsole();
 
    return () => {
      window.removeEventListener('contextmenu', disableContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(devToolsInterval);
 
    };
  }, []);

  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;