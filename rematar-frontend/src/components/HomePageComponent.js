import React, { useState } from 'react';
import {Row, Carousel, CarouselItem, Card, CarouselIndicators, CarouselControl, CardImgOverlay} from 'reactstrap';
import CardGallery from "./CardGalleryComponent";
import {MDBContainer, MDBRow, MDBBtn, MDBFormInline,MDBCol} from "mdbreact";
import FiltrosForHome from './FiltrosForHome';
import NavFiltro from "./NavFiltro";

const HomePage = (props) => {
      let items = props.items['items'];
      let itemslist = props.itemslist;
      const [activeIndex, setActiveIndex] = useState(0);
      const [animating, setAnimating] = useState(false);

   //itemslist = props.itemslist;
   //handleChange = handleChange.bind(this);
   //Auth = new AuthService();  TODO:  ver AuthService

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

   const slides = items.map((item) => {
      return (
         <CarouselItem
            className="custom-tag"
            tag="div"
            key={item.key}
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
         >
            <img src={item.src} className="w-header" style={{height: "100%", width: "100%"}} />
         </CarouselItem>
      );
   });

        return (
         <div>
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
                           previous={previous}
                        >
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
                                       <input
                                          className="form-control mr-sm-1 text-white"
                                          style={{width:"80%"}}
                                          type="text"
                                          placeholder="Buscar"
                                          aria-label="Search"
                                       />
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
            <div>
               <MDBCol className="">
                  <MDBRow className="justify-content-center">
                     <NavFiltro/>
                  </MDBRow>
               </MDBCol>
            </div>
            <div className="mt-5 container-fluid"  >
               <div className="ml-5">
                  <h2><b>{ itemslist.length }  Lotes  disponibles: </b></h2>
               </div>
               <MDBRow >
                  <MDBCol className="col-md-3 mt-3 "  >
                     <section className="rounded-lg card "  style={{backgroundColor:'#bdbdbd ', width:"100%" , height: '100%'}} >
                        <FiltrosForHome />
                     </section>
                  </MDBCol>
                  <MDBCol className="ml-2 mr-4 ">
                     <CardGallery itemslist={itemslist}/>
                 </MDBCol>
               </MDBRow>
            </div>
         </div>
        );
}

export default HomePage;
