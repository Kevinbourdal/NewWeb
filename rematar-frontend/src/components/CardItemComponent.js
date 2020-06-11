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


const no_img = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101032/112815935-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6';


class CardItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            loginError: false,
        };
        this.url_image = this.props.url_image || no_img;
        this.title = this.props.title;
        this.subtitle = this.props.subtitle;
        this.footer = this.props.footer;
        this.href = this.props.href;
        //this.handleChange = this.handleChange.bind(this);
        //this.Auth = new AuthService();  TODO:  ver AuthService
        console.log('a', this.props)
    }

    render(){

        // TODO: setear fijo el tamaño de la imagen
        return (
            <Container  className="m-0 p-0 shadow imagen-fluid ">
                <Card className="btn m-0 p-0 ">
                    <CardHeader className="m-0 p-0 shadow ">
                        <Row className="position-static">
                            <Col>
                                <UncontrolledCarousel
                                    items={[{src: this.url_image, key: 0}] || [{src: no_img, key: 0}]}
                                    controls={false}
                                    indicators={false}
                                    autoPlay={false}
                                />
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
