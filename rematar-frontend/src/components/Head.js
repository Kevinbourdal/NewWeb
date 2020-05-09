
import React, { useState, Component } from 'react';
import {
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




const Head = (props, flag) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  let text = "";
  if(flag){
    text = "Login";
  }
  else{
    text ="Logout";
  }

  return (
    <div  className="Head">
      <Navbar color="dark" light expand="mt" style={{color: "white"}}>
        <NavbarBrand href="/" style={{color: "white"}}>Menu</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar >
            <NavItem>
              <NavLink href="/components/" style={{color: "white"}}>Terrenos</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="remates" style={{color: "white"}} >Remates</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar >
              <DropdownToggle nav={true} caret={true} style={{color: "white"}}>Options</DropdownToggle>
                <DropdownMenu className="bg-dark">
                  <DropdownItem  style={{color: "white"}}>
                    Menor valor
                  </DropdownItem>
                  <DropdownItem style={{color: "white"}}>
                    Mayor valor
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem style={{color: "white"}}>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>

          </Nav>
          <NavbarText className="login" style={{color: "white"}} >{text}</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
  }

export default Head;
