import React from "react";
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer } from "mdbreact";
import {Col, Row} from "reactstrap";
import DataLots from "./DataLotsComponent";
import {items} from "../data/Lote1";


const PrincipalPage = () => {

  return (
    <MDBCard
        className="my-4 px-0 mx-auto"
        style={{ fontWeight: 300, maxWidth: "90%" }}>
        <MDBCardBody style={{ paddingTop: 0 }}>
          <h2 className="h1-responsive font-weight-bold my-5 text-center">
            Terreno en villa del dique
          </h2>
          <h5 className="dark-grey-text mx-auto mb-5 w-75 text-center">
          LOTE 4 MZ "E" B°LA MILKA
          </h5>
          <MDBRow className="m-0 p-0">
            <MDBCol className="m-0 p-0">
              <div className="m-0 p-0">
                <MDBView hover rounded className="z-depth-1-half mb-4 img-thumbnail " >
                <MDBCarousel activeItem={1} length={3} showControls={true} showIndicators={true} thumbnails className="z-depth-1">
                    <MDBCarouselInner>
                      <MDBCarouselItem itemId="1">
                        <img className="d-block w-100" src="https://www.agroempresario.com.ar/img/upload/nuevos/nota/b8c0b0064cf4db460497.jpg"
                        alt="First slide" />
                      </MDBCarouselItem>
                      <MDBCarouselItem itemId="2">
                        <img className="d-block w-100" src="https://d2gue86ezsmq5i.cloudfront.net/eyJidWNrZXQiOiJyZXNlbS1hciIsImtleSI6IjQyNjAvMTgwMTMxOTc4MC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjg0MCwiaGVpZ2h0Ijo2MzAsImZpdCI6ImNvdmVyIiwid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlfX19"
                        alt="Second slide" />
                      </MDBCarouselItem>
                      <MDBCarouselItem itemId="3">
                        <img className="d-block w-100" src="https://d2gue86ezsmq5i.cloudfront.net/eyJidWNrZXQiOiJyZXNlbS1hciIsImtleSI6IjQyNjAvLTE4MTU0MjE1NDUuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4NDAsImhlaWdodCI6NjMwLCJmaXQiOiJjb3ZlciIsIndpdGhvdXRFbmxhcmdlbWVudCI6dHJ1ZX19fQ=="
                         alt="Third slide" />
                      </MDBCarouselItem>
                    </MDBCarouselInner>
                  </MDBCarousel>
                  <a href="#!">
                    <MDBMask overlay="white-slight" className="waves-light" />
                  </a>
                </MDBView>
                <div className="d-flex justify-content-between">
                  <a href="#!" className="deep-orange-text">
                    <h5 className="font-weight-bold">
                      <MDBIcon icon="utensils" className="pr-2" />
                      Descripcion
                    </h5>
                  </a>
                  <p className="font-weight-bold dark-grey-text">
                    <MDBIcon far icon="clock" className="pr-2" />
                  10/05/2020
                  </p>
                </div>
                <h6 className="font-weight-bold dark-grey-text mb-3 p-0">
                  <a href="#!">LOTE BALDIO y DESOCUPADO</a>
                </h6>
                <p className="dark-grey-text mb-lg-0 mb-md-5 mb-4">
                Lote 4 Manzana "E" - sup. 194,60m2

                frente a Cno. Interprovincial, fondo a calle José M. Drago, a 30m de calle Catamarca,   B°La Milka

                ciudad de SAN FRANCISCO

                EXHIBICION PERSONALIZADA A CONCERTAR CON EL MARTILLERO CARLOS ORTIZ HERNANDEZ

                LOS DIAS 12 y 13/03, de 9:30 a 16:30hs
                </p>
              </div>
            </MDBCol>
            <MDBCol className="m-0 p-0">
              <div>
                <Row>
                  <Col>
                    <DataLots data={items.data}
                              pretitle={items.pretitle}
                              title={items.title}
                              subtitle={items.subtitle}
                              precio={items.precio}
                    />
                  </Col>
                </Row>

              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>


  );

}
export default PrincipalPage;
