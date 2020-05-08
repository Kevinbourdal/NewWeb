import React, { Component } from 'react';
import { AppNavbarBrand } from '@coreui/react';
import InputField from './InputFieldComponent'
import { Button, FormGroup, Form, Row, Col, Card, CardBody, CardGroup, Container, DropdownItem, Alert } from 'reactstrap'

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

	handleSubmit = (event) => {
	    alert('Gracias por su contacto')
	    return false;
	/*
		event.preventDefault();
		this.setState({ isLoading: true });

		try {
			this.Auth.login(this.state.email, this.state.password)
				.then(() => {
					this.props.userHasAuthenticated(true);
					this.props.history.push('/');
				})
				.catch(() => {
					this.setState((prevState) => {
						return {
							...prevState,
							loginError: true,
						};
					});
				});
		} catch (e) {
			this.setState({ loginError: true });
		}
		this.setState({ isLoading: false });
	*/
	};

	handleChange = async (event) => {
		const { target } = event;
		const value = target.value;
		const { name } = target;
		await this.setState({
			[name]: value,
		});
	};

	validateForm() {
	    console.log(this.state.email, this.state.name, this.state.body)
		return this.state.email.length > 0 && this.state.name.length > 0 && this.state.body.length > 0;
	}

	render() {
	    return(
	         <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup >
                                <Card className="p-4">
                                    <CardBody className="text-center">
                                        <Form onSubmit={this.handleSubmit}>
                                            <Row>
                                                <Col>
                                                    <AppNavbarBrand
                                                    full={{ src:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQDsASM3t_PpN2htpuY37B25sKuiNV7PXvIDTOP6_wbHaHHLxdz&usqp=CAU",
                                                            width: 300,
                                                            alt: 'Remates Calamuchita Logo' }}
                                                    />
                                                </Col>
                                            </Row>
                                            <p className="text-muted">
                                                <b>Contact</b> - Remates Calamuchita
                                            </p>
                                            <Row>
                                                <Col>
                                                    <InputField label={'Nombre'}
                                                                type={"text"}
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
                                                                name={"phone"} i={'y'}
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
                                                        color="primary"
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