import React from "react";
import { BrowserRouter } from 'react-router-dom';
import {MDBInput, MDBNav, MDBNavItem, MDBNavLink, MDBIcon} from "mdbreact";

export default  () => (
    <BrowserRouter>
        <MDBNav  className="md-col-12 justify-center text-center elegant-color-dark " style={{  width:"100%"}}>
            <MDBNavItem className="col-md-3">
                <MDBNavLink  className="" style={{color:"white"}} to="#!">
                    <i className="fas fa-tractor" style={{color: "#1DA1F2"}}></i> Terrenos</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="col-md-3">
                <MDBNavLink className="" style={{color:"white"}} to="#!">
                    <i className="fas fa-home" style={{color: "#1DA1F2"}}></i> Casas</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem className="col-md-3">
                <MDBNavLink  className="" style={{color:"white"}} to="#!">
                    <i className="fas fa-car" style={{color: "#1DA1F2"}}></i> Autos</MDBNavLink>
            </MDBNavItem >
            <MDBNavItem className="col-md-3">
                <MDBNavLink className="" style={{color:"white"}} to="#!">
                    <i className="fas fa-motorcycle" style={{color: "#1DA1F2"}}></i> Motos
                </MDBNavLink>
            </MDBNavItem>
        </MDBNav>

    </BrowserRouter>
);