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
import {Button, Card, CardBody, CardFooter, CardGroup, Col, Container, Row, Table, Breadcrumb, BreadcrumbItem} from "reactstrap";
import Timer from './TimerComponent';
import OffersLive from './OffersLiveComponent';
import "../fixC.css";
import AuthService from "../utils/AuthService";
import config from "../config";
import logo from '../img/logosubastas.png'
import ModalPage from "./Moddal";
import {toNumber} from "reactstrap/es/utils";
import CardGallery from "./CardGalleryComponent";
import logos_pagos from "../img/formas_de_pago.png"
import NavFiltro from "./NavFiltro";


const no_img = 'https://www.capiovi.misiones.gov.ar/wp-content/uploads/2019/10/noimageavailable.png';


class Detail extends Component {
   constructor(props) {
       super(props);
       this.get_detail = this.get_detail.bind(this);
       this.state = {
           title: '',
           subtitle: '',
           base_price: 0,
           market_price: 0,
           curr_price: 0,
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
           address: '',
           key_values: [],
           url_images: [],
           values: [],
           modal: false,
       };

       this.Auth = new AuthService();
       this.username = this.Auth.getUsername();
       this.get_detail();
       this.make_offer = this.make_offer.bind(this);
       this.update_price = this.update_price.bind(this);
       this.toggle = this.toggle.bind(this);

  }

   get_detail() {
       // let url = ;
       fetch(
           config["api"]['BACKEND_ENDPOINT']+'/api'+window.location.pathname,
           {
               mode: 'cors',
               method: 'GET',
           }
       ).then(data => {return data.json()}
       ).then(res => {
           const start_date = new Date(res['data']['auction']['start_date'].split('-'))
           const end_date = new Date(res['data']['auction']['end_date'].split('-'))
           res['data']['auction']['start_date'] = start_date
           res['data']['auction']['end_date'] = end_date
           this.setState({
               ...res['data']['auction'],
               ...res['data']['item'],
               'key_values': res['data']['key_values'].map((kv) => [kv['key'], kv['value']]),
               'url_images': res['data']['url_images'],
               'values': res['data']['values'].map((value) => value['value']),
               'curr_price': res['data']['curr_price'] !== -1 ?
                   config.PRICE_INCREASE * res['data']['curr_price'] : res['data']['auction']['base_price']
           })
           }
       ).catch(e => {
               console.log(e);
               this.props.history.push('/home');
           }
       )
   }


    make_offer(e) {
        // alert('Comprar la version pro.');
        let date = new Date();
        e.preventDefault()
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/offer'+window.location.pathname,
            {
                headers: {
                    "Content-Type": "text/plain",
                },
                method: 'POST',
                body: JSON.stringify({
                    'username': this.username,
                    'amount': (this.state.curr_price).toFixed(2),
                    'hour': date.getHours()+':'+date.getMinutes(),  //+':'+date.getSeconds()
                    'date': date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()
                })
            }
        ).then(data => {return data.json()}
        ).then(res => {
            this.toggle()}
        ).then(res => {
                // this.get_detail();
                // window.location.reload();
                // return false;
            }
        ).catch(e => {
                console.log(e);
                alert('No se pudo guardar la subastas');
            }
        )
    }

    update_price (price) {
       this.setState({
           curr_price: price * config.PRICE_INCREASE
       })
    }

    toggle = (e) => {
        this.setState({
            modal: !this.state.modal
        });
        if (typeof e !== 'undefined')
            if (e.target.name === 'boton modal')
                window.location.reload();
    }

   render() {

       let DescriptionText = (
          this.state.description.split('\n').map((item, i) =>
             <p className="dark-grey-text mb-lg-0 mb-md-5 mb-4" key={i}>
                { item }
             </p>
          ));

       let data_table = this.state.key_values.map((dato, index) => {
           return (
               <tr className="ml-5 col-6" key={index} >
                   <th className="my-0"><b className='ml-2 col-sm-auto'>{ dato[0].toUpperCase() }: </b></th>
                   <th className="my-0 ml-5">{ dato[1] }</th>
                   <td hidden={true} className="my-0 ml-5">{ dato[1] }</td>
               </tr>
           )
       });

       if (this.state.url_images.length === 0)
           this.setState({
               url_images: [{'url': no_img}]
           });

      return (
          <div  >
              <div  hidden={true} id="filterbar" className='mb-5 mt-0'>
                  <Col className="">
                      <Row className="justify-content-center" >
                          <NavFiltro in_detail={true} />
                      </Row>
                  </Col>
              </div>
              <div className='mx-5 px-4'>
                  <Breadcrumb className='mt-4' tag="div" listTag="div">
                      <h6 >
                          <Row>
                          <BreadcrumbItem className='text-dark' tag="a" href={"/home/"} >
                              Home
                          </BreadcrumbItem>
                          <BreadcrumbItem className='text-dark' tag="a" href={"/home/" + this.state.category} >
                              {this.state.category}
                          </BreadcrumbItem>
                          <BreadcrumbItem className='text-dark' tag="a" href="#">
                              {this.state.item_category}
                          </BreadcrumbItem>
                          </Row>
                      </h6>
                  </Breadcrumb>
              </div>

              <MDBCard className="mb-4 px-0 mx-auto shadow-none border-0" style={{ fontWeight: 60, maxWidth: "90%", backgroundColor:'#F5F5F5' }} >
            <MDBCardBody style={{ height:'70%',paddingTop: 0 }}>

               <h2 className="h1-responsive mt-0 font-weight-bold mb-3 text-center">
                  { this.state.title }
               </h2>
               <h5 className="dark-grey-text mx-auto text-center">
                  { this.state.subtitle }
               </h5>


               <MDBRow className="p-0 pl-2">
                  <MDBCol className="m-0 p-0 col-md-8 col-sm-12">
                     <div className="m-0 p-0">
                      <ModalPage toggle={this.toggle} modal={this.state.modal} body={'Oferta Guardada'}/>
                        <MDBView hover rounded className="mb-4 mt-0 shadow-none">
                           <MDBCarousel activeItem={1} length={this.state.url_images.length}
                                        showControls={true}  showIndicators={true} thumbnails={true}
                                        className="w-100" >
                               <MDBCarouselInner style={{backgroundColor:'#F5F5F5'}}>
                                  {this.state.url_images.map((url, index) =>
                                      <MDBCarouselItem itemId={index+1} className='justify-content-center'>
                                          <Row className='justify-content-center shadow-none m-auto'
                                               style={{'maxWidth': '700px', 'maxHeight': '500px'}}
                                          ><div className='mt-auto mb-auto mx-sm-auto '>
                                              <img className="d-inline-block align-content-center img-fluid"
                                                   src={url['url']}
                                                   alt="slide"
                                                   style={{
                                                       maxWidth: '700px',
                                                       maxHeight: '500px',
                                                       'min-width': '400px',
                                                       'min-height': '300px',
                                                   }}
                                                   sizes=''
                                              />
                                          </div>
                                          </Row>
                                      </MDBCarouselItem>
                                  )}
                              {/*    TODO:  Agregar Caption con descripcion de la foto    */}
                              </MDBCarouselInner>
                           </MDBCarousel>
                        </MDBView>
                        <div className="d-flex justify-content-between my-4" >
                            <h4 className="font-weight-bold dark-grey-text p-0 ">
                                {this.state.title}
                                <MDBRow className='mt-3'>
                                    <h6>
                                        <a href={'https://www.google.com.ar/maps/search/' + this.state.province+'-'+this.state.city+'-'+this.state.address}
                                           target="_blank"
                                           rel="noopener noreferrer"
                                           style={{color:"black"}}
                                        >
                                            <h6>
                                                <i className="fas fa-map-marked-alt ml-3 mr-2" style={{color: '#00A60A'}}/>
                                                {this.state.province + ', ' +this.state.city + ', ' +this.state.address }
                                            </h6>
                                        </a>
                                    </h6>
                                </MDBRow>
                            </h4>

                            <p className="font-weight-bold text-right dark-grey-text" unselectable={"on"}>
                                <MDBIcon far icon="clock" className="pr-2" unselectable={"on"}/>
                                Desde {this.state.start_date.toLocaleString().split(' ')[0]} {this.state.start_hour}

                                <br/>
                                Hasta {this.state.end_date.toLocaleString().split(' ')[0]} {this.state.end_hour}
                            </p>
                        </div>
                         <div>
                             <Row>
                             <Col className='col-8'>
                             <h5 className=" text-dark font-weight-bold">
                                 {/*<MDBIcon icon="book-open" className="pr-2" style={{color: '#000000'}}/>*/}
                                 Descripción
                             </h5>
                             </Col>
                         </Row>
                         </div>
                        { DescriptionText }
                     </div>
                  </MDBCol>
                  <MDBCol className="m-0 p-0 col-md-4 col-sm-12">
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
                                    <div className="app flex-row align-items-center mt-4">
                                        <Container className="px-md-0 pl-md-4 pl-lg-4">
                                            <CardGroup>
                                                <Card className="p-0 shadow-none border-0">
                                                    <br/>
                                                    <CardBody className="text-center pt-0">
                                                        <Row>
                                                            <Col>
                                                                <h3><b>Precio Actual</b></h3>
                                                                <h1 className="text-center" style={{color:'black'}} >
                                                                    $ { this.state.curr_price === this.state.base_price ?
                                                                    toNumber((this.state.curr_price).toFixed(2)).toLocaleString()
                                                                        :
                                                                    toNumber((this.state.curr_price / config.PRICE_INCREASE).toFixed(2)).toLocaleString() }
                                                                </h1>
                                                            </Col>
                                                        </Row>
                                                        <hr/>
                                                        <Row>
                                                            <Col>
                                                                { this.state.start_date < Date.now() ?
                                                                    <Timer end_hour={ this.state.end_hour } end_date={ this.state.end_date }/>
                                                                    :
                                                                    <div>
                                                                        <MDBRow>
                                                                            <MDBCol>
                                                                                <h3>Esta subasta aun no ha comenzado</h3>
                                                                            </MDBCol>
                                                                            <MDBCol className='text-right' hidden={this.Auth.getRole() !== 'admin'}>
                                                                                <a href={'/new'+window.location.pathname.replace('detail/', '')} style={{color: 'black'}}>
                                                                                    <i className="far fa-edit" /></a>
                                                                            </MDBCol>
                                                                        </MDBRow>
                                                                    </div>
                                                                }
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                        <Row hidden={true}>
                                                            <Col>
                                                                <h6><b style={{textDecorationLine : 'underline'}}>Precio Base</b></h6>
                                                                <h4 className="rounded-pill text-center" style={{color:'black'}} >
                                                                    $ { this.state.base_price.toLocaleString() }
                                                                </h4>
                                                            </Col>
                                                            <Col>
                                                                <h6><b style={{textDecorationLine : 'underline'}}>Precio Mercado</b></h6>
                                                                <h4 className="rounded-pill text-center " style={{color:'black'}} >
                                                                    $ { this.state.market_price }
                                                                </h4>
                                                            </Col>
                                                            <hr/>
                                                        </Row>
                                                        <Row className='mt-4'>
                                                            <Col>
                                                                <h5><b>Tabla de información</b></h5>
                                                                <Table responsive
                                                                       hover
                                                                       striped={true}
                                                                       className="text-left table-dark rounded"
                                                                       size={'sm'}
                                                                >
                                                                    <tbody className='rounded-top'>
                                                                    { data_table }
                                                                    </tbody>
                                                                </Table>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                    <CardFooter className="justify-content-center align-content-center text-center bg-white">
                                                        <Row >
                                                            <Col>
                                                                <Button className="btn btn-lg col-12"
                                                                        color={'info'}
                                                                        style={{color:'#424242'}}
                                                                        onClick={this.make_offer}
                                                                        disabled={!this.Auth.loggedIn() || (this.state.start_date > Date.now())}
                                                                        hidden={!this.Auth.loggedIn()}>
                                                                    <Row>
                                                                        <b><h5 className='mt-0 mb-0 h5-responsive'>
                                                                            <img src ={logo} style={{width:"50px", height:"38px"}}/>
                                                                            Ofertar con ${ toNumber((this.state.curr_price).toFixed(2)).toLocaleString() }

                                                                        </h5></b>
                                                                     </Row>
                                                                </Button>
                                                                <p className="text-muted"
                                                                   hidden={this.Auth.loggedIn()}>*Debes logearte
                                                                </p>
                                                                <p className="text-muted"
                                                                   hidden={this.state.start_date < Date.now()}>
                                                                    *La subaste aun no ha comenzado
                                                                </p>
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

                <Row className='mt-5 p-0'>
                    <Col className='col-md-8 col-sm-12' >
                        <div className='p-2 rounded-lg' style={{'background': '#000000'}}>
                            <h5 className='mt-3 text-white'>Subasta</h5>
                            <hr className='white mb-2'/>
                            <h6 className='mt-2 mb-4 text-left text-white pl-2'>
                                <h6>Martillero: <b className='ml-2 '> Sr Sebastián Ortiz MP 21222</b></h6>
                                <h6 className='my-2'><b className=''>Base $ { this.state.base_price.toLocaleString() }</b></h6>
                            </h6>
                        </div>
                    </Col>
                </Row>

               <MDBRow className='my-5'>
                   <MDBCol>
                       <div>
                           <h5 className='my-4'>Características</h5>
                           <Row className='ml-3'>
                           {this.state.values.map((value, index) =>
                                <p className='col-4 mt-2 text-left' unselectable={"on"}><i className="fas fa-check-square mr-2"/>{value}</p>
                           )}
                           </Row>
                       </div>
                   </MDBCol>
               </MDBRow>
               <hr/>

               <MDBRow className="mt-5">
                   <MDBCol className='col-12 px-0 mx-0'>
                      <OffersLive update_price={this.update_price}/>
                   </MDBCol>
               </MDBRow>

               <MDBRow className="mt-5">
                  <MDBCol>
                        {/*<SimpleMap />*/}
                  </MDBCol>
               </MDBRow>

            </MDBCardBody>
         </MDBCard>
              <hr className='my-5' />
              <div>
                  <CardGallery auctions={[]} in_detail={true}/>
              </div>

          </div>
      );
   }
}


export default Detail;
