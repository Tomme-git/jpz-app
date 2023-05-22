import React from 'react'
import { NavLink } from 'react-router-dom';

function Header() {
  const projectPath = window.location.pathname;

  return (
    <header>
      <nav>
        <NavLink to={`${projectPath}/page`} exact activeStyle={{ color: 'blue' }}>test lmao</NavLink>
      </nav>
    </header>
  )
}

export default Header;