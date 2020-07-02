import React, { Component } from 'react';
import { AppNavbarBrand } from '@coreui/react';
import InputField from './InputFieldComponent'
import { Button, Row, Col, Card, CardBody, CardGroup, Container } from 'reactstrap'
import logo from '../img/logofull.png'
import config from "../config";
import logos from "../img/logosubastas.png";
import ModalPage from "./Moddal";


class Contact extends Component {
    constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			name: '',
			email: '',
			phone: '',
			body: '',
			loginError: false,
            modal: false
		};
		this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
		//this.Auth = new AuthService();
	}
    submitHandler = e => {
        //event.preventDefault();  No se que hace por eso lo comente
        e.target.className += ' was-validated';
        e.preventDefault();  // No se que have pero va como piña
       //Enviamos los datos al backend
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/contact',
           {
               headers: {
                   "Content-Type": "text/plain",
               },
                method: 'POST',
                body: JSON.stringify({
                    ...this.state
                })
           }
        ).then(() => {
            console.log('data')
            // return data.json()
        }
        ).then(res => {this.toggle()}
        ).catch(error => {console.log("Fail",error);

            }
        )
    }

	handleChange = async (event) => {
		const { target } = event;
		const value = target.value;
		const { name } = target;
		await this.setState({
			[name]: value,
		});
	};

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    validateForm() {
		return this.state.email.length > 0 &&
               this.state.name.length > 0 &&
               this.state.body.length > 0;
	}

	render() {
	    return(
	         <div className="app flex-row align-items-center mt-4">
              <ModalPage toggle={this.toggle} modal={this.state.modal} body={'Su consulta se ha enviado correctamente'}/>
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup >
                                <Card className="p-4">
                                    <CardBody className="text-center">
                                        <form onSubmit={this.submitHandler}>
                                            <Row>
                                                <Col>
                                                    <AppNavbarBrand
                                                        full={{ src: logo,
                                                            width: 300,
                                                            alt: 'Remates Calamuchita Logo' }}
                                                    />
                                                </Col>
                                            </Row>
                                            <p className="text-muted mt-1">
                                                <b>Contact</b>
                                            </p>
                                            <Row>
                                                <Col>
                                                    <InputField label={'Nombre'}
                                                                ph ={'Nombre y apellido'}
                                                                type={"name"}
                                                                name={"name"}
                                                                i={'y'}
                                                                change={(e) => {
                                                                    //this.validateEmail(e)
                                                                    this.handleChange(e);
                                                                }}
                                                     />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <InputField label={'Email'}
                                                                type={"email"}
                                                                name={"email"}
                                                                ph ={'Ejemplo@hotmail.com'}
                                                                i={'y'}
                                                                change={(e) => {
                                                                    //this.validateEmail(e)
                                                                    this.handleChange(e);
                                                                }}
                                                     />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <InputField label={'Celular'}
                                                                type={"number"}
                                                                name={"phone"}
                                                                ph ={'351-2389586'}
                                                                i={'y'}
                                                                change={(e) => {
                                                                    //this.validateEmail(e)
                                                                    this.handleChange(e);
                                                                }}
                                                     />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <InputField label={'Consulta'}
                                                                type={"textarea"}
                                                                ph={'Tu consulta'}
                                                                name={"body"} i={'y'}
                                                                change={(e) => {
                                                                    //this.validateEmail(e)
                                                                    this.handleChange(e);
                                                                }}
                                                     />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Button type={'submit'} color="info" disabled={!this.validateForm()}>
                                                        <Row>
                                                            <img src ={logos} style={{width:"53px",height:"38px"}}></img>
                                                            <b><h5 className='mt-2 mr-4'>Enviar</h5></b>
                                                        </Row>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
	    );
	}
}

export default Contact;
