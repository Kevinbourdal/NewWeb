import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


const Head = ({login, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    let LoginTag = null;
    let RegisterTag = null;
    if (login==='false') {
        LoginTag = (
            <NavLink href={"/login"} style={{color: "white"}}>
                Login
            </NavLink>
        )
        RegisterTag = ( <NavLink href="registrarse" style={{color: "white"}} >Registrarse</NavLink> )
    } else if (login==='true') {
        LoginTag = (
            <NavLink className="text-right" onClick={onChange} style={{color: "white"}}>
                Logout
            </NavLink>
        )
    }

    return (
        <div  className="Head">
          <Navbar color="dark" light expand="mt" style={{background:"red"}}>
              <NavbarToggler style={{color: "danger"}} onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar >
                <NavItem>
                    <NavLink href="home" style={{color: "white"}} >Inicio</NavLink>
                </NavItem>
                <NavLink href="/contact" style={{color: "white"}} >Contactos</NavLink>
                <br/>
                { LoginTag }
                { RegisterTag }
                <NavLink href="/new" className="text-danger text-right">Agregar lote</NavLink>
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
