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


const no_img = 'https://www.capiovi.misiones.gov.ar/wp-content/uploads/2019/10/noimageavailable.png';


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
            <Container className="m-0 p-0 shadow imagen-fluid">
                <Card className="btn m-0 p-0">
                    <CardHeader className="m-0 p-0 shadow">
                        <Row  className="position-static">
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
                    <CardFooter className="text-muted mb-0 pb-0">
                        <div className="text-center">
                            <Col>
                                <a href={this.href || '#'}>
                                    <Button className="btn-md"
                                            color={"danger"}
                                            style={{fontSize: "14px"}}
                                    >
                                        Detalles
                                    </Button>
                                </a>
                            </Col>

                            <CardText className="text-center">
                                <small className=""
                                       hidden={this.footer === ''}
                                       style={{fontSize: "11px"}}
                                >{ this.footer.toLowerCase() }</small>
                            </CardText>
                        </div>
                    </CardFooter>
                </Card>
            </Container>
        );
    }
}

export default CardItem;
