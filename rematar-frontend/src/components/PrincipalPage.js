import React from "react";
import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer } from "mdbreact";


const PrincipalPage = () => {

  return (
    <MDBCard
        className="my-5 px-5 mx-auto"
        style={{ fontWeight: 300, maxWidth: "90%" }}>
        <MDBCardBody style={{ paddingTop: 0 }}>
          <h2 className="h1-responsive font-weight-bold my-5 text-center">
            Terreno en villa del dique
          </h2>
          <h5 className="dark-grey-text mx-auto mb-5 w-75 text-center">
          LOTE 4 MZ "E" B°LA MILKA
          </h5>
          <MDBRow>
            <MDBCol md="12" lg="6">
              <div className="mb-4">
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

            <MDBCol md="12" lg="6">
              <div style={{
                borderBottom: "1px solid #e0e0e0",
                marginBottom: "1.5rem"
              }}>
                <MDBRow>
                  <MDBCol md="3">
                    <MDBView hover rounded className="z-depth-1-half mb-4">
                      <img
                        className="img-fluid"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTNrjw1sOj6Qn-NfEIGfKCOVe0UB7ZT0IO-MFQ-qq3YrZAWalsr&usqp=CAU"
                        alt=""
                      />
                      <a href="#!">
                        <MDBMask overlay="white-slight" className="waves-light" />
                      </a>
                    </MDBView>
                  </MDBCol>
                  <MDBCol md="9">
                    <p className="font-weight-bold dark-grey-text">
                      26/02/2018
                    </p>
                    <div className="d-flex justify-content-between">
                      <MDBCol size="11" className="text-truncate pl-0 mb-3">
                        <a href="#!" className="dark-grey-text">
                          At vero eos et accusamus et iusto odio dignissimos
                          ducimus qui blanditiis
                        </a>
                      </MDBCol>
                      <a href="#!">
                        <MDBIcon icon="angle-double-right" />
                      </a>
                    </div>
                  </MDBCol>
                </MDBRow>
              </div>

              <div style={{
                borderBottom: "1px solid #e0e0e0",
                marginBottom: "1.5rem"
              }}>
                <MDBRow>
                  <MDBCol md="3">
                    <MDBView hover rounded className="z-depth-2-half mb-4">
                      <img
                        className="img-fluid"
                        src="https://www.turismocordoba.com.ar/util/v2018/img/ini-cabanas-sierras.jpg"
                        alt=""
                      />
                      <a href="#!">
                        <MDBMask overlay="white-slight" className="waves-light" />
                      </a>
                    </MDBView>
                  </MDBCol>
                  <MDBCol md="9">
                    <p className="font-weight-bold dark-grey-text">
                      25/02/2018
                    </p>
                    <div className="d-flex justify-content-between">
                      <MDBCol size="11" className="text-truncate pl-0 mb-3">
                        <a href="#!" className="dark-grey-text">
                          Itaque earum rerum hic tenetur a sapiente delectus
                        </a>
                      </MDBCol>
                      <a href="#!">
                        <MDBIcon icon="angle-double-right" />
                      </a>
                    </div>
                  </MDBCol>
                </MDBRow>
              </div>

              <div style={{
                    borderBottom: "1px solid #e0e0e0",
                    marginBottom: "1.5rem"
                  }}>
                <MDBRow>
                  <MDBCol md="3">
                    <MDBView hover rounded className="z-depth-2-half mb-4">
                      <img
                        className="img-fluid"
                        src="https://live.staticflickr.com/1870/44353796801_4efde3e2a6_b.jpg"
                        alt=""
                      />
                      <a href="#!">
                        <MDBMask overlay="white-slight" className="waves-light" />
                      </a>
                    </MDBView>
                  </MDBCol>
                  <MDBCol md="9">
                    <p className="font-weight-bold dark-grey-text">
                      24/03/2018
                    </p>
                    <div className="d-flex justify-content-between">
                      <MDBCol size="11" className="text-truncate pl-0 mb-3">
                        <a href="#!" className="dark-grey-text">
                          Soluta nobis est eligendi optio cumque nihil impedit
                          quo minus
                        </a>
                      </MDBCol>
                      <a href="#!">
                        <MDBIcon icon="angle-double-right" />
                      </a>
                    </div>
                  </MDBCol>
                </MDBRow>
              </div>

              <div className="mb-4">
                <MDBRow>
                  <MDBCol md="3">
                    <MDBView hover rounded className="z-depth-1-half mb-4">
                      <img
                        className="img-fluid"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSCUwva-_MJf0aA7UdhmStIysDS3AmHoYpL9pMXvANGye9Yo_ok&usqp=CAU"
                        alt=""
                      />
                      <a href="#!">
                        <MDBMask overlay="white-slight" className="waves-light" />
                      </a>
                    </MDBView>
                  </MDBCol>
                  <MDBCol md="9">
                    <p className="font-weight-bold dark-grey-text">
                      23/02/2018
                    </p>
                    <div className="d-flex justify-content-between">
                      <MDBCol size="11" className="text-truncate pl-0 mb-3">
                        <a href="#!" className="dark-grey-text">
                          Duis aute irure dolor in reprehenderit in voluptate
                        </a>
                      </MDBCol>
                      <a href="#!">
                        <MDBIcon icon="angle-double-right" />
                      </a>
                    </div>
                  </MDBCol>
                </MDBRow>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>


  );

}
export default PrincipalPage;
