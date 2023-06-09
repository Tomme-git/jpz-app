import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../images/logo.png';
import WalletIcon from '../images/wallet.svg';
import TicketsIcon from '../images/tickets.svg';
import MapIcon from '../images/map.svg';
import YearCardIcon from '../images/yearcard.svg';

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
    document.addEventListener("click", checkIfClickedOutside);
    return () => { // cleanup
      document.removeEventListener("click", checkIfClickedOutside);
    }
  }, [open]);

  return (
    <header>
      <div className="header-wrapper">
        <NavLink to="/projects/jpz-app/">
          <img className="logo" src={Logo} height="40px" alt="Jyllands Park Zoo Logo" />
        </NavLink>
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
        <NavLink to="/projects/jpz-app/"><img src={YearCardIcon} width={35} alt="Årskort ikon" />Årskort</NavLink>
        <NavLink to="/projects/jpz-app/wallet"><img src={WalletIcon} width={35} alt="Pung ikon" />Pung</NavLink>
        <NavLink to="/projects/jpz-app/location"><img src={MapIcon} width={35} alt="Kort ikon" />Kort</NavLink>
        <NavLink to="/projects/jpz-app/tickets"><img src={TicketsIcon} width={35} alt="Klippekort ikon" />Klippekort</NavLink>
        <div className="nav-bg"></div>
      </nav>
    </header>
  );
};

export default Header;