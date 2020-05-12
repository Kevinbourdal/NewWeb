import React, { Component } from 'react';
import { AppNavbarBrand } from '@coreui/react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Row, Col, Card, CardBody, CardGroup, Container } from 'reactstrap'
import InputField from "./InputFieldComponent";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            email: '',
            password: '',
            loginError: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.Auth = new AuthService();  TODO:  ver AuthService
    }
    handleChange = async (event) => {
        const { target } = event;
        const value = target.value;
        const { name } = target;
        await this.setState({
            [name]: value,
        });
    };

    handleSubmit = (event) => {
        this.setState({ login: true })
        this.props.onChange(event);
        /* TODO: Ver esto
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

	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

    render() {
	    console.log(this.props.login)
        if (this.props.login === 'true') {
            return <Redirect to={{pathname: '/home'}}/>;
        }
        return (
            <div className="app flex-row align-items-center mt-4">
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
                                                    full={{ src:"https://cdn.shopify.com/s/files/1/2245/4189/files/todoenremate-logo_x250.png?v=1548202790",
                                                            width: 200,
                                                            alt: 'Remates Calamuchita Logo' }}
                                                    />
                                                </Col>
                                            </Row>
                                            <p className="text-muted">
                                                <b>Login</b> - Remates Calamuchita
                                            </p>
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
                                                    <InputField label={'Contraseña'}  // TODO: las pass se ve en la url
                                                                type={"password"}
                                                                name={"password"}
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
                                                    <Button
                                                            color="primary btn-dark"
                                                            disabled={!this.validateForm()}
                                                    >
                                                        Entrar
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

export default Login;
