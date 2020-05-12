import React, { Component } from 'react';
import { UncontrolledCarousel, Container, Row, Col, CardImg, CardImgOverlay, CardTitle, CardText } from 'reactstrap';
import CardGallery from "./CardGalleryComponent";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.items = this.props.items;
        this.itemslist = this.props.itemslist;
        //this.handleChange = this.handleChange.bind(this);
        //this.Auth = new AuthService();  TODO:  ver AuthService
    }

    render() {
        console.log(this.items)
        return (
            <div className="/">
                <div className="container-fluid no-padding h-25">
                    <div className="row ">
                        <div  style={{ height: '70vh' }} className="col-md-12 p-0 m-0">
                            <CardImg  className="h-100" src="https://mobimg.b-cdn.net/pic/v2/gallery/preview/dorogi-gory-pejzazh-9109.jpg"/>
                            <CardImgOverlay className="text-white justify-content-center text-center align-text-bottom h-75">
                                <div className="">
                                    <Row className="my-5">
                                        <h3 className="w-100 text-white mt-4">10 Lotes nuevos este mes</h3>
                                    </Row>
                                    <Row className="my-5">
                                        <h1 className="w-100">Remates Calamuchita</h1>
                                    </Row>
                                    <Row className="my-5">
                                        <h3 className="w-100">Encontra las mejores inversion en los remates de terrenos, casas, Campos, etc..</h3>
                                    </Row>
                                </div>
                            </CardImgOverlay>
                        </div>
                    </div>
                </div>
                <div className="mt-5">

                <CardGallery itemslist={this.itemslist}/>

                </div>
            </div>



        );
    }
}

export default HomePage;
