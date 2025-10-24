// "use client";
// import { useState, useEffect } from 'react';

import Button from "../component/Button"

// export default function WindowSizeTracker() {
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight
//       });
//     };

//     // Add event listener
//     window.addEventListener('resize', handleResize);

//     // Cleanup: remove event listener
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []); // Empty dependency array = setup sekali saja

//   const getScreenType = () => {
//     if (windowSize.width < 768) return 'Mobile';
//     if (windowSize.width < 1024) return 'Tablet';
//     return 'Desktop';
//   };

//   return (
//     <div>
//       <h2>Window Size Tracker</h2>
//       <p>Width: {windowSize.width}px</p>
//       <p>Height: {windowSize.height}px</p>
//       <p>Screen Type: {getScreenType()}</p>
//     </div>
//   );
// }



// export default function Landing() {

//     const a = 123
//     return (
//         <Home nilai={a}/>
            
        
//     )
// }


// export default function Home({nilai}) {

    
//     return (
//         <Card nilai={nilai}></Card>
//     )
// }


// export default function Card({nilai}) {

   
//     return (
//         <Button nilai={nilai}/>
           
        
//     )
// }
