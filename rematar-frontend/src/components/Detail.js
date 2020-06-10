import React, {Component} from "react";
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBView,
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem
} from "mdbreact";
import {Button, Card, CardBody, CardFooter, CardGroup, Col, Container, Row, Table} from "reactstrap";
import SimpleMap from './SimpleMap';
// import DataAuction from "./DataLotsComponent";
import Timer from './TimerComponent';
import OffersLive from './OffersLiveComponent';


class Detail extends Component {
   constructor(props) {
       super(props);
       this.get_detail = this.get_detail.bind(this);
       this.state = {
           title: '',
           subtitle: '',
           base_price: 0,
           market_price: 0,
           currency: '',
           start_date: '',
           start_hour: '',
           end_date: '',
           end_hour: '',
           category: '',
           item_category: '',
           description: '',
           province: '',
           city: '',
           key_values: [],
           url_images: []
      }
      this.get_detail();
  }

   get_detail() {
       // let url = ;
       fetch(
           'http://0.0.0.0:5000/api'+window.location.pathname,
           {
               mode: 'cors',
               method: 'GET',
           }
       ).then(data => {return data.json()}
       ).then(res => {
               this.setState({
                   ...res['data']['auction'],
                   ...res['data']['item'],
                   'key_values': res['data']['key_values'].map((kv) => [kv['key'], kv['value']]),
                   'url_images': res['data']['url_images']
               })
           }
       ).catch(e => {
               console.log(e);
               alert('No se pudo guardar la subastas');
           }
       )
   }

   render() {
      let DescriptionText = (
         this.state.description.split('\n').map((item, i) =>
             <p className="dark-grey-text mb-lg-0 mb-md-5 mb-4" key={i}>
               { item }
             </p>
         ));

       let data_table = this.state.key_values.map((dato) => {
           return (

               <tr className="ml-5">
                   <th className="ml-5"><b>{ dato[0].toUpperCase() } :</b></th>
                   <th className="ml-5">{ dato[1] }</th>
               </tr>
           )
       });

      return (
         <MDBCard className="my-4 px-0 mx-auto shadow" style={{ fontWeight: 300, maxWidth: "90%" }}>
            <MDBCardBody style={{ paddingTop: 0 }}>
               <h2 className="h1-responsive font-weight-bold my-5 text-center">
                  { this.state.title }
               </h2>
               <h5 className="dark-grey-text mx-auto mb-5 w-75 text-center">
                  { this.state.title }
               </h5>
               <Timer />
               <MDBRow className="m-0 p-0">
                  <MDBCol className="m-0 p-0">
                     <div className="m-0 p-0">
                        <MDBView hover rounded className="z-depth-1-half mb-4 img-thumbnail " >
                           <MDBCarousel activeItem={0} length={this.state.url_images.length} showControls={true} showIndicators={true} thumbnails className="z-depth-1">
                              <MDBCarouselInner>
                                  {this.state.url_images.map((url, index) =>
                                      <MDBCarouselItem itemId={index}>
                                          <img className="d-block w-100"
                                               src={url['url']}
                                               alt="slide" />
                                      </MDBCarouselItem>
                                  )}
                              </MDBCarouselInner>
                           </MDBCarousel>
                        </MDBView>
                        <div className="d-flex justify-content-between">
                            <a href="#!" className="deep-orange-text">
                                <h5 className="font-weight-bold">
                                    <MDBIcon icon="book-open" className="pr-2" />
                                    Descripcion
                                </h5>
                            </a>

                            <p className="font-weight-bold dark-grey-text">
                                <MDBIcon far icon="clock" className="pr-2" />
                                Subasta desde {this.state.start_date} hasta {this.state.end_date}
                            </p>
                        </div>
                        <h6 className="font-weight-bold dark-grey-text mb-3 p-0">
                            {this.state.title}
                        </h6>
                        { DescriptionText }
                     </div>
                  </MDBCol>
                  <MDBCol className="m-0 p-0">
                      <div>
                          <Row>
                              <Col>
                                  {/*<DataAuction data={this.state.key_values}*/}
                                  {/*             title={this.state.title}*/}
                                  {/*             subtitle={this.state.subtitle}*/}
                                  {/*             precio={this.state.base_price}*/}
                                  {/*             children={this.state}*/}
                                  {/*/>*/}

                                  {/*==================   TODO: Borrar todo lo de abajo   ============*/}
                                    <div className="app flex-row align-items-center">
                                        <Container className="px-md-0 pl-md-4 pl-lg-4">
                                            <CardGroup>
                                                <Card className="p-0 shadow">
                                                    <br/>
                                                    <CardBody className="text-center">
                                                        <Row>
                                                            <Col>
                                                                <h3><b>Precio Actual</b></h3>
                                                                <h1 className="rounded-pill text-center border border-success bg-success">
                                                                    $ { this.state.base_price }
                                                                </h1>
                                                            </Col>
                                                        </Row>
                                                        <br/>
                                                        <Row>
                                                            <Col>
                                                                <h5>Tabla de información</h5>
                                                                <Table  responsive={true} className="text-left table-striped">
                                                                    <tbody>
                                                                    { data_table }
                                                                    </tbody>
                                                                </Table>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                    <CardFooter className="justify-content-center align-content-center text-center">
                                                        <Row>
                                                            <Col>
                                                                <Button className="btn btn-red btn-lg" onClick={this.Ofertar}>
                                                                    <b><h5>Ofertar con ${ this.state.base_price * 1.05 }</h5></b>
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </CardFooter>
                                                </Card>
                                            </CardGroup>
                                        </Container>
                                    </div>

                                  {/*==================   Hasta aca   ============*/}
                              </Col>
                          </Row>
                      </div>
                  </MDBCol>
               </MDBRow>

               <hr/>

               <MDBRow className="mt-5">
                   <MDBCol>
                      <OffersLive />
                   </MDBCol>
               </MDBRow>

               <MDBRow className="mt-5">
                  <MDBCol>
                    <SimpleMap />
                  </MDBCol>
               </MDBRow>

            </MDBCardBody>
         </MDBCard>
      );
   }
}


export default Detail;
