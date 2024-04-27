import React, { useState, useEffect } from 'react';

const CardSwitcher = () => {
  const cardContents = [
    'Screen 1 Content: Welcome to the first screen!',
    'Screen 2 Content: Here\'s some info about the second screen.',
    'Screen 3 Content: And this is the third screen, with even more info.',
  ];
  const cardSwitch = [
    'NTopology', 'Software Engineering Intern',
    'RPI SCOREC', 'Undergraduate Research',
    'Factset', 'Deep Learning Intern',
  ]

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
      <div style={{
          display: 'flex', height: '20rem', gap: '8%',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'center' : 'stretch',
          justifyContent: isMobile ? 'center' : 'space-between',
      }}>
          <div style={{
              width: isMobile ? '80%' : '38%', textDecoration: 'none', lineHeight: '1.4',
              padding: '1% 5% 5% 5%', borderRadius: '7px', color: 'white',
              background: 'var(--card-background-purple)',
              boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
              height: isMobile ? '40rem' : 'auto', fontFamily: 'inherit',
          }}>
        <p>{cardContents[currentCardIndex]}</p>
      </div>

          <div style={{
              display: 'flex',
              justifyContent: 'center', alignItems: 'center',
              width: isMobile ? '80%' : '40%' , gap: '4%', flexDirection: isMobile ? 'row' : 'column',
          }}>
        {cardContents.map((_, index) => (
          <div 
            key={index} 
            onClick={() => setCurrentCardIndex(index)}
                style={{
                    cursor: 'pointer', padding: '0 3%', width: isMobile && index === currentCardIndex ? '40%' : '20%',
                    background: 'var(--card-background-purple)', borderRadius: '7px',
                    textAlign: 'center', boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    height: isMobile ? '5rem' : 'auto',
                    fontFamily: 'inherit', fontSize: '1rem',
                    transition: 'width 0.3s ease'
                }}
            role="button"
            tabIndex={0}
          >
            <div>
              {cardSwitch[index * 2]}
            </div>
            {isMobile ? 
              (index === currentCardIndex && <div>{cardSwitch[index * 2 + 1]}</div>)
              :
              <div>{cardSwitch[index * 2 + 1]}</div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSwitcher;
