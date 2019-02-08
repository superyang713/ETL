import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem } from "react-bootstrap";

import "./Header.css";


const Header = props => 
    <div className="Header">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">ETL Project</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to="/resource">
              <NavItem>Resource</NavItem>
            </LinkContainer>

            {props.isAuthenticated
             ? <NavItem onClick={props.handleLogout}>Logout</NavItem>
             : <Fragment>
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
