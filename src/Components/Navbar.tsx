import React, { useState } from "react";
import {
  LeftContainer,
  LogoHolder,
  NavbarContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLink,
  NavbarLinkContainer,
  NavbarLinkExtended,
  OpenLinksButton,
  RightContainer,
} from "../styles/Navbar.styles";
import Logo from "../assets/logo.png";
// eslint-disable-next-line
import { BrowserRouter as Routes, Link } from "react-router-dom"; //  Routes is needed to use the "to" property

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  return (
    // TODO - Need to figure out how to add custom prop to style component for better mobile ux
    <NavbarContainer>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink>
              <Link to="/register">Register</Link>
            </NavbarLink>
            <NavbarLink>
              <Link to="/">Login</Link>
            </NavbarLink>
            <NavbarLink>
              <Link to="/home">Home</Link>
            </NavbarLink>
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <>&#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <LogoHolder src={Logo}></LogoHolder>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended>
            <Link to="/register">Register</Link>
          </NavbarLinkExtended>
          <NavbarLinkExtended>
            <Link to="/">Login</Link>
          </NavbarLinkExtended>
          <NavbarLinkExtended>
            <Link to="/home">Home</Link>
          </NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
