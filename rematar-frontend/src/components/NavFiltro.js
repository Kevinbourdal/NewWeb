import React from "react";
import { BrowserRouter } from 'react-router-dom';
import {MDBInput, MDBNav, MDBNavItem, MDBNavLink, MDBIcon} from "mdbreact";

export default  () => (
    <BrowserRouter>
        <MDBNav  className="md-col-12 justify-center text-center elegant-color-dark" style={{ width:"100%",  "min-height": "50px"}}>
            <MDBNavItem className="col-md-3 mt-2">
                <a className="" style={{color:"white"}} href="terrenos#filterbar">
                    <i className="fas fa-tractor" style={{color: "#1DA1F2"}}></i> Terrenos </a>
            </MDBNavItem>
            <MDBNavItem className="col-md-3 mt-2">
                <a href="casas#filterbar" style={{color:"white"}} ><i className="fas fa-home" style={{color: "#1DA1F2"}}></i> Casas</a>
            </MDBNavItem>
            <MDBNavItem className="col-md-3 mt-2 ">
                <a className="" style={{color:"white"}} href="autos#filterbar">
                    <i className="fas fa-car" style={{color: "#1DA1F2"}}></i> Autos </a>
            </MDBNavItem >
            <MDBNavItem className="col-md-3 mt-2 ">
                <a className="" style={{color:"white"}} href="motos#filterbar">
                    <i className="fas fa-motorcycle" style={{color: "#1DA1F2"}}></i> Motos </a>
            </MDBNavItem>
        </MDBNav>

    </BrowserRouter>
);