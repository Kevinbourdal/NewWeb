import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppNavbarBrand } from '@coreui/react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Row, Col, Card, CardBody, CardGroup, Container } from 'reactstrap'
import InputField from "./InputFieldComponent";
import AuthService from '../utils/AuthService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            loginError: false,
            isAuthenticated: this.Auth.loggedIn()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        try {
            this.Auth.login(this.state.email, this.state.password)
            .then(() => {
                this.setState({isAuthenticated: true})
            })
            .catch((e) => {
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
    };

	validateForm() {
	    // function to enable form button
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

    render() {
        if (this.state.isAuthenticated) {
            return <Redirect to={{ pathname: '/home' }}/>;
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
                                                <b>Login</b> - Subastas en web
                                            </p>
                                            <Row>
                                                <Col>
                                                    <InputField label={'Email'}
                                                                type={"email"}
                                                                ph ={'Ejemplo@hotmail.com'}
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
                                                                ph ={'**********'}
                                                                i={'y'}
                                                                change={(e) => {
                                                                    //this.validateEmail(e)
                                                                    this.handleChange(e);
                                                                }}
                                                     />
                                                </Col>
                                            </Row>
                                            {this.state.loginError ? (
                                                <Row>
                                                    <Col xs="12">
                                                        <p className="text-danger">
                                                            Error al hacer login, verificar usuario y contraseña
                                                        </p>
                                                    </Col>
                                                </Row>
                                            ) : null}
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

Login.propTypes = {
    userHasAuthenticated: PropTypes.func,
    history: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    location: PropTypes.object,
    saveAgentName: PropTypes.func,
};

export default Login;
