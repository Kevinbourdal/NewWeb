import React, { Component } from 'react';
import { AppNavbarBrand } from '@coreui/react';
import InputField from './InputFieldComponent'
import { Button, Form, Row, Col, Card, CardBody, CardGroup, Container } from 'reactstrap'

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
		};
		this.handleChange = this.handleChange.bind(this);
		//this.Auth = new AuthService();

	}
    submitHandler = event => {
        //event.preventDefault();  No se que hace por eso lo comente
        event.target.className += ' was-validated';

       //Enviamos los datos al backend
        fetch(
            'http://0.0.0.0:5000/api/contact',
           {
               headers: {
               'Content-Type': 'text/json',
                },
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({
                    ...this.state
                })
           }
        ).then(data => {return data.json()}
        ).then(res => {alert("usuario num  " + res.data['id'])}
        ).catch(error => {
                console.log("Fail");
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

    validateForm() {
		return this.state.email.length > 0 && this.state.name.length > 0 && this.state.body.length > 0;
	}

	render() {
	    return(
	         <div className="app flex-row align-items-center mt-4">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup >
                                <Card className="p-4">
                                    <CardBody className="text-center">
                                        <Form onSubmit={this.submitHandler}>
                                                <Col className="mt-0 pt-0 p-0 ">
                                                    <AppNavbarBrand
                                                    full={{ src:"https://lh3.googleusercontent.com/toDsY_zxukkG2P6itxxUeywaIeVlsErQXIXo3RXpRP9N5UxVqTtOYmpKfRChQbBnYpMwh_wbjSOvNAw8Doa15QxttYBZO5xJp0oxxZUP5_P0EXGWYBhDdbUBTH932FktGV0G7GcZsHrtWGY0vVRYVhDBwqkaQKZTOSgaWaUSKhv01RBEJCGELruHfwi1lagpk0zfp8-M0hmhsvXVcPylcUSsxxzMn_0bYUoYfZu8l5G6QnepTX9cF8f8owvcS4Ir-FLcKlaozcGUbl1KSy7RUaF7pV0LkBLg6Jh7Exs_uVVIXTtTvM8yj-FaEiZjGJXBEwhSxdthHyRpfqltEWeHK_ro5cCRG8enZHJm1CHEyZq4SbVwgTPN1oRgwBjgiccGyiqVctPIusi4PMHbMEHDXadH6HkelJH1fKJvdRqHq_K7cEqHRmoRhAzPCm3JekMbbVQwWV9P8ihi4ixdRjbRUEdmexioGTq-Cw1nHugMDezGYSzyQCLGgmFFenJZn3PPjt28YNSaORaYKxfq3djc6ycuDHwwmyrcsRa9ZFrxiAAFtiCin6bJfrQKlzMHdNg7pJE-aHYRsrqD0D2Y20TF1sePnZOMJgae8qJOiv7Zn8kvpZDRd9cOB2MNcPU1etruokojn5VIjmotQyV_6BGKhaDPLJm81oGOCFZzGJWXQowv_79qQmqmVoE=w612-h637-no?authuser=0",
                                                            width: 300,
                                                            alt: 'Remates Calamuchita Logo' }}
                                                    />
                                                </Col>
                                            <p className="text-muted">
                                                <b>Contact</b> - Remates Calamuchita
                                            </p>
                                            <Row>
                                                <Col>
                                                    <InputField label={'Nombre  *'}
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
                                                    <Button

                                                        color="primary btn-danger"
                                                        disabled={!this.validateForm()}
                                                    >
                                                        Enviar
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
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
