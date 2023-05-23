import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

function Header() {
  const projectPath = window.location.pathname;

  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="header-wrapper">
        <p className="logo" style={{ fontSize: '30px' }}>Logo</p>
        <div className={`hamburger-icon ${open ? "follow-nav" : ""}`} onClick={() => setOpen(!open)}>
          <div className="line-wrapper">
            <div className={`hamburger-line ${open ? "first-line-smaller" : ""}`}></div>
            <div className={`hamburger-line ${open ? "second-line-smaller" : ""}`}></div>
            <div className={`hamburger-line`}></div>
          </div>
        </div>
      </div>
      <div className="header-bg"></div>
      <nav className={open ? "show-nav" : ""}>
        <NavLink to={`${projectPath}/page`}>Icon</NavLink>
        <NavLink to={`${projectPath}/page`}>Icon</NavLink>
        <NavLink to={`${projectPath}/page`}>Icon</NavLink>
        <NavLink to={`${projectPath}/page`}>Icon</NavLink>
      </nav>
    </header>
  )
}

export default Header;