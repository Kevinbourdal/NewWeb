import React, { useState } from 'react';
import {Row, Card, CardImg, CardImgOverlay, Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption} from 'reactstrap';
import CardGallery from "./CardGalleryComponent";
import {MDBContainer, MDBRow, MDBBtn,MDBFormInline} from "mdbreact";

const HomePage = (props) => {
    let items = props.items['items'];
    let itemslist = props.itemslist;
    //this.itemslist = this.props.itemslist;
        //this.handleChange = this.handleChange.bind(this);
        //this.Auth = new AuthService();  TODO:  ver AuthService

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((items) => {
        return (
            <CarouselItem
                className="custom-tag"
                tag="div"
                key={items.key}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                <img src={items.src} className="w-header" style={{height: "100%", width: "100%"}} />
            </CarouselItem>
        );
    });
    // render() {
        //  <CardImg  className="h-100" src="https://mobimg.b-cdn.net/pic/v2/gallery/preview/dorogi-gory-pejzazh-9109.jpg"/>
        return (
            <div className="p-0 m-0">
                <div className="p-0 m-0" style={{ height: '600px'}}>
                    <div className="container-fluid no-padding h-25 p-0 m-0 ">

                        <div  style={{ height: '70vh' }} className="p-0 m-0">
                            <style>
                                {`.custom-tag {
                                      max-width: 100%;
                                      height: 600px;
                                      background: black;
                                    }`}
                            </style>
                                <Card style={{ width: "100%"}}>

                                <Carousel
                                    slide={false}
                                    activeIndex={activeIndex}
                                    next={next}
                                    previous={previous}>
                                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                                    {slides}
                                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                                </Carousel>

                                <CardImgOverlay className="text-white justify-content-center text-center align-text-bottom h-75 mt-5">
                                    <div className="">
                                        <Row className="my-5">
                                            <h3 className="w-100 text-white-100 mt-4">10 Lotes nuevos este mes</h3>
                                        </Row>
                                        <Row className="my-5">
                                            <h1 className="w-100" ><b className="">  Remates Calamuchita  </b></h1>
                                        </Row>

                                        <Row className="my-5">
                                            <MDBContainer  className=" mr-5">
                                                <MDBFormInline className="md-form ml-5">
                                                 <input className="form-control mr-sm-1 text-white"
                                                        style={{width:"80%"}}
                                                        type="text"
                                                        placeholder="Buscar"
                                                        aria-label="Search" />

                                                 <MDBBtn gradient="aqua" rounded size="sm" type="submit">
                                                    <b>Buscar</b>
                                                 </MDBBtn>
                                                </MDBFormInline>
                                            </MDBContainer>
                                        </Row>
                                        <Row className="my-5">
                                            <h2 className="w-100">Encontra las mejores inversion en los remates de terrenos, casas, Campos, etc..</h2>
                                        </Row>

                                    </div>
                                </CardImgOverlay>
                                </Card>

                        </div>
                    </div>
                </div>
                <div className="col">
                     <CardGallery itemslist={itemslist}/>
                </div>
            </div>
        );
    //}
}

export default HomePage;
