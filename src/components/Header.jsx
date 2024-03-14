import '../styles/Header.css'; // Assuming you'll use an external CSS file for styling
import React from 'react';

const Header = () => {
  return (
      <header className = 'header'><nav className = 'navigation'>
      <div className='logo'>
        {/* <img class='logo-img' src='/logo-clear.png' alt="Logo" /> */ }
        <a href='/' > Josh Moskoff</a>
      </div>
      <div className='nav-buttons'>{/* Navigation buttons */}
        <button>Projects</button>
        <button>Experience</button>
        <button>Demos</button>
      </div></nav>
    </header>);
};

export default Header;
