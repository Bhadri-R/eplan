import React from 'react';
import './assets/scss/themes.scss';
import Route from './Routes';

function App() {
  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;




// import React, { useEffect } from 'react';
// import './assets/scss/themes.scss';
// import Route from './Routes';

// function App() {
//   useEffect(() => {
//     // ✅ Disable Right-Click
//     window.addEventListener('contextmenu', (e) => e.preventDefault());

//     // ✅ Disable Key Combinations (F12, Ctrl + Shift + I, Ctrl + U)
//     const handleKeyDown = (e) => {
//       if (
//         (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl + Shift + I
//         (e.ctrlKey && e.shiftKey && e.key === 'J') || // Ctrl + Shift + J
//         (e.ctrlKey && e.key === 'U') ||              // Ctrl + U
//         (e.key === 'F12')                            // F12
//       ) {
//         e.preventDefault();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);

//     // ✅ Disable React Developer Tools
//     if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
//       window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {};
//     }

//     // ✅ Block Debugger Using Infinite Loop
//     setInterval(() => {
//       debugger;
//     }, 100);

//     // ✅ Close Window if DevTools Opened
//     const checkDevTools = () => {
//       const element = new Image();
//       element.__defineGetter__('id', () => {
//         window.location.href = "about:blank"; // Redirect if DevTools opened
//       });
//       console.log(element);
//     };

//     setInterval(checkDevTools, 1000);

//     // ✅ Clean up event listeners on component unmount
//     return () => {
//       window.removeEventListener('contextmenu', (e) => e.preventDefault());
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   return (
//     <React.Fragment>
//       <Route />
//     </React.Fragment>
//   );
// }

// export default App;
