import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class TermsAndConditions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.props.toggle} style={{backgroundColor:'#0099CC',color: 'black'}}>
                        Términos y Condiciones
                    </MDBModalHeader>
                    <MDBModalBody  style={{color: 'black'}}>
                        <i className='app-body'>
                        Aca van a ir los Términos y Condiciones
                        Aca van a ir los Términos y Condiciones
                        </i>

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

export default TermsAndConditions;