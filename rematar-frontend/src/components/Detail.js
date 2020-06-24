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
import Timer from './TimerComponent';
import OffersLive from './OffersLiveComponent';
import AuthService from "../utils/AuthService";
import config from "../config";
import logo from '../img/logosubastas.png'
import ModalPage from "./Moddal";


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
           modal: false
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
               'curr_price': res['data']['auction']['base_price']
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
                    'date': date.toLocaleDateString(),  //getFullYear()+'-'+date.getMonth()+'-'+date.getDay(),
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

               <tr className="ml-5" key={index}>
                   <th className="ml-5"><b>{ dato[0].toUpperCase() } :</b></th>
                   <th className="ml-5">{ dato[1] }</th>
               </tr>
           )
       });

       if (this.state.url_images.length === 0)
           this.setState({
               url_images: [{'url': no_img}]
           });

      return (
         <MDBCard className="my-4 px-0 mx-auto shadow" style={{ fontWeight: 60, maxWidth: "90%" , }}>

            <MDBCardBody style={{ height:'70%',paddingTop: 0 }}>
               <h2 className="h1-responsive mt-2 font-weight-bold my-1 text-center">
                  { this.state.title }
               </h2>
               <h5 className="dark-grey-text mx-auto text-center">
                  { this.state.subtitle }
               </h5>
                <MDBRow>
                    <i className="fas fa-map-marked-alt ml-3 mr-2"/>
                    <p><h6>
                        {this.state.province + ', ' +this.state.city + ', ' +this.state.address }
                    </h6></p>
                </MDBRow>
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
                        <hr />
                    </div>
                }

               <MDBRow className="p-0">
                  <MDBCol className="m-0 p-0">
                     <div className="m-0 p-0">
                      <ModalPage toggle={this.toggle} modal={this.state.modal} body={'Oferta Guardada'}/>
                        <MDBView hover rounded className="z-depth-1-half mb-4 img-thumbnail">
                           <MDBCarousel activeItem={1} length={this.state.url_images.length}
                                        showControls={true}  showIndicators={true} thumbnails={true}
                                        className="z-depth-1 w-100">
                               <MDBCarouselInner >
                                  {this.state.url_images.map((url, index) =>
                                      <MDBCarouselItem  itemId={index+1} >
                                          <img
                                              height={400}
                                              width={700}
                                              className="d-block w-100"
                                               src={url['url']}
                                               alt="slide" />
                                      </MDBCarouselItem>
                                  )}
                              {/*    TODO:  Agregar Caption con descripcion de la foto    */}
                              </MDBCarouselInner>
                           </MDBCarousel>
                        </MDBView>
                        <div className="d-flex justify-content-between">
                            <a className="deep-orange-text">
                                <h5 className="font-weight-bold">
                                    <MDBIcon icon="book-open" className="pr-2" />
                                    Descripcion
                                </h5>
                            </a>

                            <p className="font-weight-bold text-right dark-grey-text">
                                <MDBIcon far icon="clock" className="pr-2" />
                                Subasta desde {this.state.start_date.toLocaleString().split(' ')[0]} {this.state.start_hour}

                                <br/>
                                hasta {this.state.end_date.toLocaleString().split(' ')[0]} {this.state.end_hour}
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
                                                                <h1 className="rounded-pill text-center border grey darken-3" style={{color:'white'}} >
                                                                    $ { this.state.curr_price === this.state.base_price ?
                                                                    this.state.curr_price
                                                                        :
                                                                    (this.state.curr_price / config.PRICE_INCREASE).toFixed(2) }
                                                                </h1>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <h6><b>Precio Base</b></h6>
                                                                <h4 className="rounded-pill text-center border grey darken-3" style={{color:'white'}} >
                                                                    $ { this.state.base_price }
                                                                </h4>
                                                            </Col>
                                                            <Col>
                                                                <h6><b>Precio Mercado</b></h6>
                                                                <h4 className="rounded-pill text-center border grey darken-3" style={{color:'white'}} >
                                                                    $ { this.state.market_price }
                                                                </h4>
                                                            </Col>
                                                        </Row>
                                                        <br/>
                                                        <Row>
                                                            <Col>
                                                                <h5>Tabla de información</h5>
                                                                <Table  responsive={true} striped={true} className="text-left table-bordered table-info" >
                                                                    <tbody >
                                                                    { data_table }
                                                                    </tbody>
                                                                </Table>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                    <CardFooter className="justify-content-center align-content-center text-center">
                                                        <Row>
                                                            <Col>
                                                                <Button className="btn btn-lg"
                                                                        color={'info'}
                                                                        style={{color:'#424242'}}
                                                                        onClick={this.make_offer}
                                                                        disabled={!this.Auth.loggedIn() || (this.state.start_date > Date.now())}
                                                                        hidden={!this.Auth.loggedIn()}>
                                                                    <Row>
                                                                    <img src ={logo} style={{width:"60px",height:"44px"}}></img>
                                                                    <b><h5 className='mt-2'>
                                                                        Ofertar con ${
                                                                            // this.state.curr_price > this.state.base_price ?
                                                                            (this.state.curr_price).toFixed(2)
                                                                            // :
                                                                            // (this.state.base_price).toFixed(2)
                                                                        }
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
               <MDBRow className='my-5'>
                   <MDBCol>
                       <div>
                           <h5 className='my-4'>Caracteristicas</h5>
                           <Row className='ml-3'>
                           {this.state.values.map((value, index) =>
                                <p className='col-4 mt-2 text-left'><i className="fas fa-check-square mr-2"/>{value}</p>
                           )}
                           </Row>
                       </div>
                   </MDBCol>
               </MDBRow>
               <hr/>

               <MDBRow className="mt-5">
                   <MDBCol>
                      <OffersLive update_price={this.update_price}/>
                   </MDBCol>
               </MDBRow>

               {/*<MDBRow className="mt-5">*/}
               {/*   <MDBCol>*/}
               {/*     <SimpleMap />*/}
               {/*   </MDBCol>*/}
               {/*</MDBRow>*/}

            </MDBCardBody>
         </MDBCard>
      );
   }
}


export default Detail;
