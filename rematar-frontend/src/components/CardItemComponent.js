import React, { Component } from 'react';
import {
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
import {MDBCarousel, MDBCarouselInner, MDBIcon, MDBCarouselItem} from "mdbreact";



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
    }

    componentWillReceiveProps(nextProps, nextContent) {
        if ( this.props.title !== nextProps.title ) {
            this.url_image = nextProps.url_image || no_img;
            this.title = nextProps.title;
            this.subtitle = nextProps.subtitle;
            this.footer = nextProps.footer;
            this.href = nextProps.href;
        }
    }

    render(){

        // TODO: setear fijo el tamaño de la imagen
        return (
                <Card className="imagen-fluid btn m-0 p-0">
                    <CardHeader className="m-0 p-0" style={{maxWidth: '576px',height: '230px'}}>
                        {/*<Row className="position-static" style={{width: '350px', height: '350px'}}>*/}
                        {/*    <Col>*/}
                                <MDBCarousel activeItem={1} length={0} showControls={false} showIndicators={false} thumbnails className="w-100">
                                    <MDBCarouselInner  >
                                            <MDBCarouselItem itemId={1} className='justify-content-center' style={{height: '230px', backgroundColor:'#F5F5F5'}}>
                                                <div className='m-auto justify-content-center shadow-sm'
                                                     style={{maxWidth: '240px', 'height': '230px'}}
                                                >
                                                    <img
                                                         width={'240px'}
                                                         height={'230px'}
                                                         className="w-100 my-auto img-hover-effect"
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
                    <CardBody className='mb-0 pb-0'>
                        <CardTitle className='mt-1'>
                            <a href={this.href || '#'} className="text-dark" type=""><h5 className='h4-responsive'><b >{ this.title || '' }</b></h5></a>
                        </CardTitle>
                        <CardSubtitle className="my-0 h6-responsive" >
                            <b className='w-responsive'>{ this.subtitle.toLowerCase() || '' }</b>
                        </CardSubtitle>
                        <CardText className="text-right">
                            <MDBIcon far icon="calendar-alt" />
                            <small className=""
                                   hidden={this.footer === ''}
                                   style={{fontSize: "11px"}}
                            >{ this.footer.toLowerCase() }</small>
                        </CardText>
                    </CardBody>
                    <CardFooter className="mb-0 pb-0 pl-2 bg-white" >
                        <div className="text-center">
                            <Col>
                                <a href={this.href || '#'}>
                                    <Button className="btn-md"
                                            color={'info'}
                                            style={{color:'#424242'}}
                                    >
                                        <Row>
                                            {/*<img src ={logos} style={{width:"40px",height:"29px"}}></img>*/}
                                            <b><h5 className='my-0 h5-responsive' unselectable={true}>Detalles</h5></b>
                                        </Row>
                                    </Button>
                                </a>
                            </Col>
                        </div>
                    </CardFooter>
                </Card>
        );
    }
}

export default CardItem;
