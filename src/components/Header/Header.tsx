import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Collapse, Nav, Navbar, NavbarToggler, NavLink as ReactstrapNavLink } from 'reactstrap'
import { useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { ICardSlice } from '../../interface';
import { MyRoutes } from '../../constants';

function Header() {
  const [openNav, setOpenNav] = useState(false)

  const { isAuthenticated, signOut } = useAuth();
  
  const cartItems = useSelector((state: ICardSlice) => {
    return state.cart.items
  });

  return (
    <div>
      <Navbar
        color="dark"
        dark
        expand="md"
        container
        light
      >
        <NavLink className="navbar-brand" to={MyRoutes.HOME}> My E-comm </NavLink>
        <NavbarToggler onClick={() => setOpenNav(prev => !prev)} />
        <Collapse isOpen={openNav} navbar className="justify-content-end">
          <Nav navbar>
            <NavLink to={MyRoutes.HOME} className="nav-link">Home</NavLink>

            <NavLink to={MyRoutes.CART} className="nav-link">
              Cart {cartItems.length > 0 && <>({cartItems.length})</>}
            </NavLink>

            {isAuthenticated ? (
              <ReactstrapNavLink role="button" onClick={signOut}> SignOut </ReactstrapNavLink>
            ) : (
              <NavLink to={MyRoutes.LOGIN} className="nav-link">Login</NavLink>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Header
