import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class Developer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.props.toggle} style={{backgroundColor:'#0099CC',color: 'black'}}>
                        Desarrolladores
                    </MDBModalHeader>
                    <MDBModalBody  style={{color: 'black'}}>
                        <i className="fas fa-code mr-2" />
                        <strong>Desarrolladores : </strong>Cristian Contrera, Kevin Lopez Bourdal<br/>
                        <i className="fa fa-envelope mr-2" />
                        <strong>Email : </strong>cristiancontrera95@gmail.com, kevin.bourdal@outlook.com<br/>
                        <i className="fab fa-whatsapp mr-2" />
                        <strong>Tel o whatsapp: </strong>351-2363716, 3546-476307<br/>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="info" onClick={this.props.toggle} className=''>
                            Ok!
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default Developer;