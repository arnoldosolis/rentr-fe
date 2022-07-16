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
import { BrowserRouter as Routes, Link, useNavigate } from "react-router-dom"; //  Routes is needed to use the "to" property
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button } from "@mui/material";

const GET_SELF = gql`
  query getSelf {
    getSelf {
      id
      email
    }
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

function Navbar() {
  const navigate = useNavigate();
  const [extendNavbar, setExtendNavbar] = useState(false);
  const [logout, { loading: logoutLoading }] = useMutation(LOGOUT, {
    onCompleted() {
      navigate("/");
    },
    refetchQueries: [
      {
        query: GET_SELF,
      },
    ],
  });
  const { data, loading } = useQuery(GET_SELF);
  let body = null;
  if (loading) {
  }
  // user not logged in
  else if (!data.getSelf?.email) {
    // console.log(data.getSelf?.email);
    body = (
      <>
        <NavbarLink>
          <Link to="/register">Register</Link>
        </NavbarLink>
        <NavbarLink>
          <Link to="/">Login</Link>
        </NavbarLink>
      </>
    );
  }
  // user logged in
  else {
    body = (
      <>
        <NavbarLink>
          <Link to="/home">Home</Link>
        </NavbarLink>
        <NavbarLink>
          <Link to="/property">Properties</Link>
        </NavbarLink>
        <Button
          variant="contained"
          style={{ backgroundColor: "black" }}
          onClick={() => {
            logout();
          }}
          disabled={logoutLoading}
        >
          Logout
        </Button>
      </>
    );
  }
  return (
    // TODO - Need to figure out how to add custom prop to style component for better mobile ux
    <NavbarContainer>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            {body}
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
