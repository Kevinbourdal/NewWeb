import React, { Component } from 'react';
import {Row, CardImg, CardImgOverlay} from 'reactstrap';
import CardGallery from "./CardGalleryComponent";
import {MDBContainer, MDBRow, MDBBtn, MDBFormInline,MDBCol} from "mdbreact";
import FiltrosForHome from './FiltrosForHome';
import NavFiltro from "./NavFiltro";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.items = this.props.items;
        this.itemslist = this.props.itemslist;
        //this.handleChange = this.handleChange.bind(this);
        //this.Auth = new AuthService();  TODO:  ver AuthService
    }

    render() {
        return (

            <div className="fixed-width">
                <div className="container-fluid no-padding h-25">
                    <div className="row ">
                        <div  style={{ height: '70vh' }} className="col-md-12 p-0 m-0">
                            <CardImg  className="h-100" src="https://mobimg.b-cdn.net/pic/v2/gallery/preview/dorogi-gory-pejzazh-9109.jpg"/>
                            <CardImgOverlay className="text-white justify-content-center text-center align-text-bottom h-75">
                                <div className="block">
                                    <Row className="my-3">
                                        <h3 className="w-100 text-white">10 Lotes nuevos este mes</h3>
                                    </Row>
                                    <Row className="my-1 ">
                                        <h1 className="w-100">Remates Calamuchita</h1>
                                        <MDBContainer  className=" mr-5 ">
                                        <MDBFormInline className="md-form ml-5  ">
                                           <input className="form-control mr-sm-1 text-white" style={{width:"80%"}} type="text" placeholder="Buscar" aria-label="Search" />

                                             <MDBBtn gradient="aqua" rounded size="sm" type="submit" className="mr-5">
                                               <b>Buscar</b>
                                             </MDBBtn>
                                       </MDBFormInline>
                                      </MDBContainer>
                                    </Row>
                                    <Row className="my-1">
                                        <h3 className="w-100">Encontra las mejores inversion en los remates de terrenos, casas, Campos, etc..</h3>
                                    </Row>
                                </div>
                            </CardImgOverlay>
                        </div>
                        <MDBCol >
                            <MDBRow className="justify-content-center">
                                <NavFiltro/>
                            </MDBRow>
                        </MDBCol>
                    </div>
                </div>




                <div className="mt-5 container-fluid"  >
                    <div className="ml-5">
                      <h2><b>{ this.itemslist.length }  Lotes  disponibles: </b></h2>
                    </div>
                    <MDBRow >
                    <MDBCol className="col-md-3 mt-3 "  >
                       <section className="rounded-lg card "  style={{backgroundColor:'#bdbdbd ', width:"100%" , height: '100%'}} >
                       <FiltrosForHome />
                       </section>
                     </MDBCol>
                     <MDBCol className="ml-2 mr-4 ">
                      <CardGallery itemslist={this.itemslist}/>
                    </MDBCol>
                </MDBRow>
            </div>

            </div>

        );
    }
}

export default HomePage;
