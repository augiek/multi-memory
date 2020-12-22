import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router-dom'
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const AppNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isToken, setToken] = useState(false);
  const [redirect, setRedirect] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // put this line into app.js and then pass as props into appnav

  useEffect(() => {
    // This useEffect using [] will only run 1 time after initial render/return
    // do this from app.js (maybe add useEffect) then pass the state-set value into buttons below
    const isLoggedIn = localStorage.getItem("auth-user") !== null
    setIsLoggedIn(true)
  }, []) 

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="info" light expand="sm">
        <NavbarBrand href="/">multiMemories</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/new">New Entry</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/archive">Archive</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/groups">Family Tree</NavLink>
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          <div>
            {props.username // try passing a prop from app.js
              ? <Button size="sm" href='/login'>Log out</Button>
              : <Button size="sm" href='/login'>Log in</Button>
            }
            {props.username
              ? <Button size="sm" href="/account">Account</Button>
              : <Button size="sm" href="/signup">Sign up</Button>
            }
          </div> 
        </Collapse>
      </Navbar>
    </div>
  );
}

// if (props.isLoggedIn) {
//   return (
//     <div>
//       <button onClick={props.handleLogout}>Logout</button>
//       <Redirect to='/'></Redirect>
//     </div>
//   )
// }

export default AppNav;