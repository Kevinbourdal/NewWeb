import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
} from 'reactstrap';


const Head = ({login, name, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    let Nametag = null;
    let LoginTag = null;
    let RegisterTag = null;
    let NewLotTag = null;
    if (login==='false') {
        LoginTag = (
            <NavLink href={"/login"} style={{color: "white"}}>
                Login
            </NavLink>
        )
        RegisterTag = ( <NavLink href="registrarse" style={{color: "white"}} >Registrarse</NavLink> )
    } else if (login==='true') {
        Nametag = (
            <NavLink href="Profile">
                <i className="fas fa-user">
                  <NavbarBrand className="mr-0 ml-2 text-center" style={{color: "white"}}><b>{ name }</b></NavbarBrand>
                </i>
            </NavLink>
        )
        LoginTag = (
            <NavLink className="text-left" onClick={onChange} style={{color: "white"}}>
                Logout
            </NavLink>
        )
        NewLotTag = (
            <NavLink href="/new" className="text-danger text-left">Agregar lote</NavLink>
        )
    }

    return (
        <div  className="Head">
           <Navbar color="dark" light expand="mt" style={{background:"red"}}>
               { Nametag }
              <NavbarToggler className="md-0" style={{color: "danger"}} onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                  <Nav className="mr-auto" navbar >
                     <NavItem>
                         <NavLink href="home" className="text-right mr-3" style={{color: "white"}} >Inicio</NavLink>
                     </NavItem>
                    <NavLink href="/contact" className="text-right mr-3" style={{color: "white"}} >Contactos</NavLink>
                     <br/>
                     { LoginTag }
                     { RegisterTag }
                     { NewLotTag }
                   </Nav>
             </Collapse>
        </Navbar>
        </div>
    );
}


export default Head;
