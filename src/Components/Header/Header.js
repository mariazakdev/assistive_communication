// Header.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><NavLink to="/songs">Songs</NavLink></li>
          <li><NavLink to="/choices">Choices</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
