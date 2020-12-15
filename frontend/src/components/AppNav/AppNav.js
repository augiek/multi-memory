import React, { useState } from 'react';
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

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="info" light expand="sm">
        <NavbarBrand href="/">multiMemories</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="new/">New Entry</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="archive/">Archive</NavLink>
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
            {props.isLoggedIn
              ? <Button onClick={props.handleLogout}>Log out</Button>
              : <Button href='/login'>Log in</Button>
            }
            {props.isLoggedIn
              ? <Button href="/account">Account</Button>
              : <Button href="/signup">Sign up</Button>
            }
          </div> 
              {/* <Button size="sm" color="dark" href="/account">Login/Logout</Button>
              <Button size="sm" color="light" href="/account">Signup/Account</Button> */}
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

// import React, { Component } from 'react';
// // import { Link } from 'react-router-dom';
// import { Navbar, NavItem, NavLink } from 'reactstrap';
// // import navItems from '../../config/Sections.json';

// class AppNav extends Component {
//   render() {
//     return (
//       <Navbar color="light">
//         {/* {navItems.map((navItem) =>
//           <NavItem>
//             <NavLink to={`/archive/${navItem.value}`} >
//               { navItem.label }
//             </Link>
//           </NavItem>
//         )} */}
//         <NavItem>
//           <NavLink href="/">Home</NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink href="/">Archive</NavLink>
//         </NavItem>
//       </Navbar>
//     )
//   }
// }

export default AppNav;