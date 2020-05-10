import React, { Component } from 'react';
import {
    UncontrolledCarousel,
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    CardSubtitle,
    CardFooter,
    Button } from 'reactstrap';

class CardItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            loginError: false,
        };
        this.items = this.props.items;
        this.title = this.props.title;
        this.subtitle = this.props.subtitle;
        this.footer = this.props.footer;
        this.href = this.props.href;
        //this.handleChange = this.handleChange.bind(this);
        //this.Auth = new AuthService();  TODO:  ver AuthService
    }

    render(){
        // TODO: setear fijo el tamaño de la imagen
        return (
            <Container>
                <Card >
                    <CardHeader >
                        <UncontrolledCarousel items={this.items} indicators={false} />
                    </CardHeader>
                    <CardBody>
                        <CardTitle>
                            { this.title || '' }
                        </CardTitle>
                        <CardSubtitle>
                            { this.subtitle || '' }
                        </CardSubtitle>
                        <br/>
                        <CardFooter className="text-muted">
                            <Row>
                                <Col>
                                    <a href={this.href || '#'}>
                                        <Button color={"success"}>Ver</Button>
                                    </a>
                                </Col>
                                <Col>
                                    <CardText>
                                        <small className="text-muted">{ this.footer || '' }</small>
                                    </CardText>
                                </Col>
                            </Row>
                        </CardFooter>
                    </CardBody>
                </Card>
            </Container>
        );
    }
}

export default CardItem;