import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavLink,
    NavbarBrand,
    Col,
    Row,
} from 'reactstrap';
import AuthService from "../../utils/AuthService";
import logo from '../../img/logofull.png'


class Header extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            name: null,
            isOpen: false,
            isAuthenticated: this.Auth.loggedIn()
        }
        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }
    toggle() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    logout (e) {
        this.toggle();
        this.setState({isAuthenticated: false});
        this.props.onLogout(e);
    }
    render() {
        return (
            <div className="Head">
                <Navbar color='dark' className="text-right my-0 py-0" light style={{background: "#00B9EB"}}>

                    <Col className="text-left p-0" href="home">
                        <a href="/home" className='ml-2 p-0' style={{color: "white"}}>
                            <img src={logo} alt="Logo" className="m-0 p-0" style={{ blockSize: "70px"}} />
                            {/*<b style={{ fontSize: "70px" }}>Subastas en Web</b>*/}
                        </a>
                    </Col>
                    { this.state.isAuthenticated ?
                        <NavLink className="text-left" href="/profile">
                            <NavbarBrand className="mr-2 ml-2 text-left" style={{color: "white"}}>
                                <Row>
                                    <Col><b>{ this.Auth.getUsername() }</b></Col>
                                    <Col><i className="fas fa-user-circle fa-stack-1x" /></Col>
                                </Row>
                            </NavbarBrand>
                        </NavLink>
                        :
                        null
                    }
                    <bc/>
                    <NavbarToggler className="ml-auto navbar-toggler-right" style={{background: "info"}} onClick={this.toggle} />

                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar >
                            <NavLink href="/home" className="mt-3 text-right" style={{color: "white"}} >Inicio</NavLink>
                            <NavLink href="/contact" className=" text-right" style={{color: "white"}} >Contacto</NavLink>
                            <NavLink href="/contact" className=" text-right" style={{color: "white"}} >Quiero Subastar mi Bien</NavLink>
                            <NavLink href="/faqs" className=" text-right" style={{color: "white"}} >FaQs</NavLink>
                            <br/>
                            { this.state.isAuthenticated ?
                                <NavLink className="text-right" onClick={this.logout} style={{color: "white"}}>
                                    <i className="fas fa-times-circle"/><b> Logout </b>
                                </NavLink>
                                :
                                <div>
                                    <NavLink href="/login" className="text-right " style={{color: "white"}}>Login</NavLink>
                                    <NavLink href="/register" className="text-right" style={{color: "white"}} >Registrarse</NavLink>
                                </div>
                            }
                            <hr className='hr-bold' color='white'/>
                            <NavLink href="/new" className="text-right" style={{color: "white"}} hidden={this.Auth.getRole() !== 'admin' || !this.Auth.loggedIn()}>
                                <i className="fas fa-plus-circle"/> <b color='danger'>Nueva subasta</b>
                            </NavLink>


                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}


export default Header;
