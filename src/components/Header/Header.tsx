import React from 'react'
import { NavLink } from 'react-router-dom'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink as ReactstrapNavLink } from 'reactstrap'
import useAuth from '../../hooks/useAuth';

function Header() {
  const { isAuthenticated, signOut } = useAuth();

  return (
    <div>
      <Navbar
        color="dark"
        dark
        expand="md"
        container
        light
      >
        <NavbarBrand href="/">
          My E-comm
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck(){}} />
        <Collapse navbar className="justify-content-end">
          <Nav navbar>
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/cart" className="nav-link">Cart</NavLink>

            {isAuthenticated ? (
              <ReactstrapNavLink role="button" onClick={signOut}> SignOut </ReactstrapNavLink>
            ) : (
              <NavLink to="/login" className="nav-link">Login</NavLink>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Header
