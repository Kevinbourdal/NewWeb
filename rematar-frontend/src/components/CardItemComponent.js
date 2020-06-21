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
import {MDBCarousel, MDBCarouselInner, MDBCarouselItem} from "mdbreact";


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
            <Container  className="imagen-fluid">
                <Card className="btn m-0 p-0">
                    <CardHeader className="m-0 p-0" style={{ height: '250px'}}>
                        {/*<Row className="position-static" style={{width: '350px', height: '350px'}}>*/}
                        {/*    <Col>*/}
                                <MDBCarousel activeItem={1} length={0} showControls={false} showIndicators={false} thumbnails className="z-depth-1">
                                    <MDBCarouselInner >
                                            <MDBCarouselItem itemId={1} className='' style={{height: '250px'}}>
                                                <div    style={{height: '250px'}}>
                                                    <img className="w-100 my-1"
                                                         src={this.url_image || no_img}
                                                         alt="slide"

                                                    />
                                                </div>

                                            </MDBCarouselItem>
                                        {/*    TODO:  Agregar Caption con descripcion de la foto    */}
                                    </MDBCarouselInner>
                                </MDBCarousel>
                                {/*<UncontrolledCarousel*/}
                                {/*    items={[{src: this.url_image, key: 0}] || [{src: no_img, key: 0}]}*/}
                                {/*    controls={false}*/}
                                {/*    indicators={false}*/}
                                {/*    autoPlay={false}*/}
                                {/*    style={{width: '350px', height: '350px'}}*/}
                                {/*/>*/}
                        {/*    </Col>*/}
                        {/*</Row>*/}
                    </CardHeader>
                    <CardBody >
                        <CardTitle>
                            <a href={this.href || '#'} className="text-dark" type=""><h4><b>{ this.title || '' }</b></h4></a>
                        </CardTitle>
                        <CardSubtitle className="my-0" >
                            <b>{ this.subtitle || '' }</b>
                        </CardSubtitle>
                    </CardBody>
                    <CardFooter  className=" mb-0  pb-0" >
                        <div className="text-center">
                            <Col>
                                <a href={this.href || '#'}>
                                    <Button className="btn-md"
                                            color={'info'}
                                            style={{fontSize: "14px", color:'#424242'}}
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
