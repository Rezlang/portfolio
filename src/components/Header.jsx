import '../styles/Header.css'; // Assuming you'll use an external CSS file for styling
import React from 'react';

const Header = () => {
  return (
      <header className = 'header'><nav className = 'navigation'>
        <a class='logo' href='/' > Josh Moskoff</a>
        <div class='nav-buttons logo'>{/* Navigation buttons */}
          <button>Projects</button>
          <button>Experience</button>
          <button>Demos</button>
        </div>
      </nav></header>);
};

export default Header;
