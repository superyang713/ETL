import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem, Image } from "react-bootstrap";

import logo from  "../../asset/logo.png";
import "./Header.css";


const Header = props => 
    <div className="Header">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"><Image className="logo" src={logo}/></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {props.isAuthenticated
             ? <NavItem onClick={props.handleLogout}>Logout</NavItem>
             : <Fragment>
                 <LinkContainer to="/signup">
                   <NavItem>Sign Up</NavItem>
                 </LinkContainer>
                 <LinkContainer to="/login">
                   <NavItem>Login</NavItem>
                 </LinkContainer>
               </Fragment>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>;

export default Header;
