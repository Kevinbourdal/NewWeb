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
import './CardItemComponent.css';

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
            <Container className="m-0 p-0 shadow imagen-fluid">
                <Card className="m-0 p-0">
                    <CardHeader className="m-0 p-0 shadow">
                        <Row  className="position-static">
                            <Col>
                                <UncontrolledCarousel items={[this.items[0]]} controls={false} indicators={false} autoPlay={false}/>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody >
                        <CardTitle>
                            <a href={this.href || '#'} className="text-dark" type=""><h4><b>{ this.title || '' }</b></h4></a>
                        </CardTitle>
                        <CardSubtitle>
                            <b>{ this.subtitle || '' }</b>
                        </CardSubtitle>
                        <br/>
                    </CardBody>
                    <CardFooter className="text-muted">
                        <div>
                            <Col>
                                <a href={this.href || '#'}>
                                    <Button className="btn-lg" color={"danger"}>Detalles</Button>
                                </a>
                            </Col>
                            <Col>
                                <CardText>
                                    <small className="text-muted">{ this.footer || '' }</small>
                                </CardText>
                            </Col>
                        </div>
                    </CardFooter>
                </Card>
            </Container>
        );
    }
}

export default CardItem;
