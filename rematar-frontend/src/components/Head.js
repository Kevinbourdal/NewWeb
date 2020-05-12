import React, { useState } from 'react';
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
  Row, Col
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
      <Navbar color="dark" light expand="mt" style={{background:"red"}}>
      <Row>

      <Col>
        <NavbarToggler style={{color: "danger"}} onClick={toggle} />
      </Col>

      </Row>
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar >
            <NavItem>
              <NavLink href="home" style={{color: "white"}} >Terrenos</NavLink>
            </NavItem>
            <NavLink href="contact" style={{color: "white"}} >Contactos</NavLink>
            <NavLink href="login" style={{color: "white"}} >{text}</NavLink>
            <NavLink href="registrarse" style={{color: "white"}} >Registrarse</NavLink>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
  }

export default Head;

/*
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
*/
