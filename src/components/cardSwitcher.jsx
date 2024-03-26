import React, { useState, useEffect } from 'react';

const CardSwitcher = () => {
  const cardContents = [
    'Screen 1 Content: Welcome to the first screen!',
    'Screen 2 Content: Here\'s some info about the second screen.',
    'Screen 3 Content: And this is the third screen, with even more info.',
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to update state based on window width
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Call handleResize on mount to set initial value
    handleResize();

    // Add event listener for subsequent resize events
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
      <div style={{
          display: 'flex', height: '20rem', gap: '8%',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'center' : 'stretch',
          justifyContent: isMobile ? 'center' : 'space-between',
      }}>
      {/* Card on the left */}
          <div style={{
              width: isMobile ? '80%' : '38%', textDecoration: 'none', lineHeight: '1.4',
              padding: '1% 5% 5% 5%', borderRadius: '7px', color: 'white',
              background: 'var(--card-background-purple)',
              boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
              height: isMobile ? '40rem' : 'auto', fontFamily: 'inhert',
          }}>
        <p>{cardContents[currentCardIndex]}</p>
      </div>

      {/* Vertical divs acting as buttons on the right */}
          <div style={{
              display: 'flex',
              justifyContent: 'center', alignItems: 'center',
              width: '40%', gap: '4%', flexDirection: isMobile ? 'row' : 'column',
          }}>
        {cardContents.map((_, index) => (
          <div 
            key={index} 
            onClick={() => setCurrentCardIndex(index)}
                style={{
                    cursor: 'pointer', padding: '10%',
                    background: 'var(--card-background-purple)', borderRadius: '7px',
                    textAlign: 'center', boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    height: isMobile ? '2rem' : 'auto', fontFamily: 'inhert',
                }}
            role="button" // This helps with accessibility
            tabIndex={0} // This makes the div focusable, also for accessibility
            onPress={(e) => e.key === 'Enter' && setCurrentCardIndex(index)} // Allows keyboard navigation
          >
            Screen {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSwitcher;
