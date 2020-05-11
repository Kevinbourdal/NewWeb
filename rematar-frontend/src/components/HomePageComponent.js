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
            <div>
                <div className="container-fluid no-padding h-25">
                    <div className="row ">
                        <div className="col-md-12 p-0 m-0">
                            <CardImg  className="h-75" src="https://mobimg.b-cdn.net/pic/v2/gallery/preview/dorogi-gory-pejzazh-9109.jpg"/>
                            <CardImgOverlay className="text-white justify-content-center text-center align-text-bottom">
                                <div className="">
                                    <Row className="my-5">
                                        <small className="w-100 text-white">10 Lotes nuevos este mes</small>
                                    </Row>
                                    <Row className="my-5">
                                        <h1 className="w-100">Remates Calamuchita</h1>
                                    </Row>
                                    <Row className="my-5">
                                        <p className="w-100">Encontra las mejores inversion en los remates de terrenos, casas, Campos, etc..</p>
                                    </Row>
                                </div>
                            </CardImgOverlay>
                        </div>
                    </div>
                </div>
                <CardGallery itemslist={this.itemslist}/>
            </div>



        );
    }
}

export default HomePage;
