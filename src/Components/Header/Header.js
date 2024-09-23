import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/songs">Songs</NavLink>
        </li>
        <li>
          <NavLink to="/choices">Choices</NavLink>
        </li>
        <li>
          <NavLink to="/draw">Draw</NavLink>
        </li>
        <li>
          <NavLink to="/drag">Drag</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
