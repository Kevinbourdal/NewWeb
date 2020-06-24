import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import logo from "../img/logosubastas.png";

class ModalPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <MDBModalHeader  style={{backgroundColor:'#0099CC',color: 'black'}} toggle={this.props.toggle}>
                        <img src ={logo} style={{width:"60px",height:"44px"}}/>
                        Subastas en Web
                    </MDBModalHeader>
                    <MDBModalBody className='text-center'>
                        {this.props.body}
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn name='boton modal' color="info" onClick={(e) => this.props.toggle(e)}>Ok!</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default ModalPage;