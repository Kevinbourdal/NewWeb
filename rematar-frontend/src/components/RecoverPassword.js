import React from 'react';
import { AppNavbarBrand } from '@coreui/react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import {Form, Row} from 'reactstrap';
import logo from '../img/logofull.png';
import logos from '../img/logosubastas.png';
import config from "../config";
import TermsAndConditions from "./TermsAndConditions";
import ModalPage from "./Moddal";
import AuthService from "../utils/AuthService";

class RecoverPassword extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            modal2: false,
            modal: false,
            modal_ok: true,
            modal_msg: ''
        };
        this.toggle = this.toggle.bind(this)
        this.toggle2 = this.toggle2.bind(this)
        this.Auth = new AuthService();
    }

    toggle = (e) => {
        this.setState({
            modal: !this.state.modal,
        });
        if (typeof e !== 'undefined')
            if (e.target.name === 'boton modal'  && this.state.modal_ok)
                return this.props.history.push('/login');
    }

    toggle2 = () => {
        this.setState({
            modal2: !this.state.modal2
        });
    }
    submitHandler = event => {

        event.target.className += ' was-validated';
        event.preventDefault();  //No se que hace por eso lo comente
        // enviamos los datos al backend
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/register',
            {
                headers: {
                    Accept: 'application/json',
                    authorization: this.Auth.getToken(),
                },
                method: 'POST',
                body: JSON.stringify({
                    ...this.state
                })
            }
        ).then(data => {
                if (data.code !== 200)
                    this.setState({
                        modal_ok: !this.state.modal_ok
                    })
                return data.json()
            }
        ).then(res => {this.toggle()
        }).catch(error => {
                console.log("Fail" + error);
            }
        )
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div className="app flex-row align-items-center mt-5 mb-5">
                <ModalPage
                    toggle={this.toggle}
                    modal={this.state.modal}
                    body={this.state.modal_ok ?
                        'Su contraseña ha sido enviada a su mail'
                        :
                        'No se pudo encontrar el mail indicado'+this.state.modal_msg}/>
                <MDBContainer>
                    <div>
                        <MDBRow className="justify-content-center">
                            <MDBCol md="8" className="rounded shadow" style={{backgroundColor:"white"}}>
                                <div >
                                    <MDBContainer className="text-center">
                                        <MDBRow>
                                            <MDBCol>
                                                <AppNavbarBrand
                                                    full={{ src: logo,
                                                        width: 400,
                                                        alt: 'Remates Calamuchita Logo' }}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                        <h2 className="mt-4 ">
                                            Recuperar contraseña
                                        </h2>
                                    </MDBContainer>
                                    <MDBContainer className="col-md-11">
                                        <Form className='needs-validation' onSubmit={this.submitHandler}>
                                            <MDBInput
                                                icon='envelope-open'
                                                value={this.state.email}
                                                onChange={this.changeHandler}
                                                type='email'
                                                id='materialFormRegisterConfirmEx3'
                                                name='email'
                                                label='Email'
                                                outline
                                                required
                                            >
                                            </MDBInput>
                                                <label className='ml-4 custom-control-label' htmlFor='invalidCheck'>
                                                    <TermsAndConditions toggle={this.toggle2} modal={this.state.modal2} />
                                                    <a style={{textDecorationLine : 'underline'}} onClick={this.toggle2}>
                                                        Terminos y condiciones
                                                    </a>
                                                </label>
                                                <div className='invalid-feedback'>
                                                    Debe aceptar antes de enviar.
                                                </div>
                                            <div className="text-center my-4">
                                                <MDBBtn className="ml-4 " color='info' type='submit' >
                                                    <Row>
                                                        <img src ={logos} style={{width:"50px",height:"37px"}}></img>
                                                        <b><h5 className='mt-2 mr-4'>Enviar</h5></b>
                                                    </Row>
                                                </MDBBtn>
                                            </div>
                                        </Form>
                                    </MDBContainer>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default RecoverPassword;