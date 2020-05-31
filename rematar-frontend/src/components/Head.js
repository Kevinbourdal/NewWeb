import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavLink,
  NavbarBrand,
} from 'reactstrap';
import {MDBCol, MDBIcon} from "mdbreact";


const Head = ({login, name, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    let Nametag = null;
    let LoginTag = null;
    let RegisterTag = null;
    let NewLotTag = null;
    if (login==='false') {
        LoginTag = (
            <NavLink href={"/login"} className="text-right " style={{color: "white"}}>
                Login
            </NavLink>
        )
        RegisterTag = ( <NavLink href="registrarse" className="text-right" style={{color: "white"}} >Registrarse</NavLink> )
    } else if (login==='true') {
        Nametag = (
            <NavLink className="text-left" href="Profile">
                <i className="fas fa-user">
                  <NavbarBrand className="mr-2 ml-2 text-left" style={{color: "white"}}><b>{ name }</b></NavbarBrand>
                </i>
            </NavLink>
        )
        LoginTag = (
            <NavLink className="text-right" onClick={onChange} style={{color: "white"}}>
                Logout
            </NavLink>
        )
        NewLotTag = (
            <NavLink href="/new" className="text-right text-danger">Agregar articulo</NavLink>
        )
    }

    return (
        <div  className="Head ">
           <Navbar color="dark" className="text-right" light style={{background:"red"}}>
               { Nametag }
               <MDBCol className="text-center" href="home">
                   <a href="home">
                      <MDBIcon icon="home" size="2x"  style={{color:"#1DA1F2"}}/>
                   </a>
               </MDBCol>
               <NavbarToggler className="ml-auto" style={{color: "danger"}} onClick={toggle} />

              <Collapse isOpen={isOpen}  navbar>
                  <Nav className="mr-auto" navbar >
                      <NavLink href="home" className="mt-3 text-right" style={{color: "white"}} >Inicio</NavLink>
                      <NavLink href="/contact" className=" text-right" style={{color: "white"}} >Contactos</NavLink>
                      <NavLink href="/faqs" className=" text-right" style={{color: "white"}} >FaQs</NavLink>
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
