import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const burgerRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      e.preventDefault();
      if (open && burgerRef.current && !burgerRef.current.contains(e.target)) {
        setOpen(!open);
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => { // cleanup
      document.removeEventListener("mousedown", checkIfClickedOutside);
    }
  }, [open]);

  return (
    <header>
      <div className="header-wrapper">
        <p className="logo" style={{ fontSize: '30px' }}>Logo</p>
        <div ref={burgerRef} className={`hamburger-icon ${open ? "follow-nav" : ""}`} onClick={() => setOpen(!open)}>
          <div className="line-wrapper">
            <div className={`hamburger-line ${open ? "first-line-smaller" : ""}`}></div>
            <div className={`hamburger-line`}></div>
            <div className={`hamburger-line ${open ? "third-line-smaller" : ""}`}></div>
          </div>
        </div>
      </div>
      <div className="header-bg"></div>
      <nav className={open ? "show-nav" : ""}>
        <NavLink to="/projects/jpz-app/">Hjem</NavLink>
        <NavLink to="/projects/jpz-app/wallet">Pung</NavLink>
        <NavLink to="/projects/jpz-app/">Icon</NavLink>
        <NavLink to="/projects/jpz-app/">Icon</NavLink>
        <div className="nav-bg"></div>
      </nav>
    </header>
  )
};

export default Header;