import React from "react";
import NavbarStyle from "./Navbar.styled";
import UpDoc from "../UploadDocument/UpDoc";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <NavbarStyle />
      <nav className="navbar">
        <div>
          <Link to="/" className="navbar-brand mb-0 h1">
            DOCUMENT LAB
          </Link>
        </div>
        <div>
          <UpDoc />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
