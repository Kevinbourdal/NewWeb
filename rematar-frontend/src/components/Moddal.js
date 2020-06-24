import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ModalPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <MDBModalHeader style={{backgroundColor:'#0099CC',color: 'black'}} toggle={this.props.toggle}>Subastas en Web</MDBModalHeader>
                    <MDBModalBody>
                        <i className='app-body'>
                        {this.props.body}
                        </i>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="info" onClick={this.props.toggle}>Ok!</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default ModalPage;