import React, { Component } from 'react';
import {Row, Col, CardBody, CardGroup, Container } from 'reactstrap'
import InputField from "./InputFieldComponent";
import { ListGroup } from 'reactstrap';

import {provincia} from "../data/items_filtro";
import Label from "reactstrap/es/Label";
import config from "../config";
import ModalPage from "./Moddal";
import {MDBCol, MDBRow} from "mdbreact";


class AddCards extends Component {
     constructor (props) {
           super(props);
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
                address: '',
                url_images: [],
                url_aux: '',
                key_value: [],
                values: [],
                value2_aux: '',
                startDate: new Date(),
                key_aux: '',
                value_aux: '',
                new_auction: true,
                modal: false,
                modal_ok: true
           };

           this.handleDataAdd = this.handleDataAdd.bind(this);
           this.handleDataAdd2 = this.handleDataAdd2.bind(this);
           this.handleDataAdd3 = this.handleDataAdd3.bind(this);
           this.handleDataAdd4 = this.handleDataAdd4.bind(this);
           this.handleInputChange = this.handleInputChange.bind(this);
           this.handleSubmit = this.handleSubmit.bind(this);
           this.deletArgs = this.deletArgs.bind(this);
           this.get_auction_data = this.get_auction_data.bind(this);
           this.get_auction_data();
           this.toggle = this.toggle.bind(this);
     }

     get_auction_data () {
         let auction_id = window.location.pathname.replace('/new/', '')
         if (auction_id === '/new')
             return
         fetch(
             config["api"]['BACKEND_ENDPOINT']+'/api/newauction?auction_id='+auction_id,
             {
                 mode: 'cors',
                 method: 'GET',
             }
         ).then(data => {return data.json()}
         ).then(res => {
                 this.setState({...res['data'],new_auction: false})
             }
         ).catch(e => {
                 console.log("error:", e);
             }
         )
     }

     handleSubmit(e) {
         e.preventDefault();
         fetch(
             config["api"]['BACKEND_ENDPOINT'] +'/api/newauction',
             {
                 headers: {
                     'Content-Type': 'text/json',
                 },
                 mode: 'cors',
                 method: this.state.new_auction ? 'POST' : 'PUT',

                 body: JSON.stringify(this.state.new_auction ? {...this.state} : {
                     auction_id: window.location.pathname.replace('/new/', ''),
                     ...this.state
                 })
             }
         ).then(data => {
            if (data.status !== 200) {
                this.setState({
                    modal_ok: !this.state.modal_ok
                })
            }
            return data.json()
     }
         ).then(res => {this.toggle()}
         ).catch(error => {
                 console.log("Fail");
             }
         )
      }


     handleInputChange(e) {
         const {value, name} = e.target;
         this.setState({
            [name]: value
         });
     }

    handleDataAdd(e) {
        let k = this.state.key_aux;
        let v = this.state.value_aux;
        this.setState({
            'key_value': [...this.state['key_value'], [k, v]],
            key_aux: '',
            value_aux: '',
        });
    }

    handleDataAdd3(e) {
        let i = this.state.url_aux;
            this.setState({
                'url_images': [...this.state['url_images'], i],
                url_aux:'',

            });
        }

    handleDataAdd4(e) {
        let i = this.state.value2_aux;
        this.setState({
            'values': [...this.state['values'], i],
            'value2_aux': ''
        });

    }

    handleDataAdd2(e) {

        const {value, name} = e.target;
        if ( value.search('\n') !== -1){
            e.target.value='';
            this.setState({
                [name]: [...this.state[name], value]
            });
        }
    }
    validateForm() {
        return this.state.title.length > 0 &&
               this.state.base_price >= 0 &&
               this.state.start_date.length > 0 ;
    }

    deletArgs(index, name){
        var new_list = this.state[name]
        new_list.pop(index)
        this.setState({
            name: new_list,
        })
    }

    deletArgs2(index) {
        var new_index = this.state.key_value
        new_index.pop(index)
        this.setState({
            key_value: new_index
        })
    }


    toggle = (e) => {
        this.setState({
            modal: !this.state.modal
        });
        if (typeof e !== 'undefined')
            if (e.target.name === 'boton modal' && this.state.modal_ok)
                window.location.reload();
    }
    // changeHandler = event => {
    //     this.setState({ [event.target.name]: event.target.value });
    // };


 render() {
   return (
       <div  className="app flex-row align-items-center mt-4">
           <ModalPage toggle={this.toggle}
                      modal={this.state.modal}
                      body={this.state.modal_ok ? 'Subasta Guardada' : 'Error al guardar subasta '}/>
           <Container>
               <Row className="justify-content-center">
                   <Col md="8">
                       <CardGroup >
                         <div className="card p-4">
                           <CardBody className="text-center">
                               <form onSubmit={this.handleSubmit} className="card-body">
                                   <Row>
                                       <Col><h3 className="mt-2 mb-5">Nuevo articulo</h3></Col>
                                   </Row>
                                 <div className="form-group">
                                     <InputField name={"title"} label={"Titulo"} type={"text"} value={this.state.title} change={this.handleInputChange}/>
                                 </div>
                                 <div className="form-group">
                                     <InputField name={"subtitle"} label={"Subtitulo"} type={"text"} value={this.state.subtitle} change={this.handleInputChange}/>
                                 </div>
                                   <div className="form-group">
                                       <InputField label={"Moneda"} type={"text"} value={"Peso Argentino"} change={this.handleInputChange}/>
                                   </div>
                                   <div className="form-group">
                                       <InputField name={"base_price"} label={"Precio base"} type={"number"} value={this.state.base_price} change={this.handleInputChange}/>
                                   </div>
                                   <div className="form-group">
                                       <InputField name={"market_price"} label={"Precio de mercado"}
                                                   type={"number"} value={this.state.market_price}  change={this.handleInputChange}/>
                                   </div>
                                   <Row>
                                       <Col>
                                           <div className="form-group">
                                               <InputField name={"start_date"} label={"Fecha de inicio"} type={"date"} value={this.state.start_date} change={this.handleInputChange}/>
                                           </div>
                                       </Col>
                                       <Col>
                                           <div className="form-group">
                                               <InputField name={"start_hour"} label={"Hora de inicio"} type={"time"} value={this.state.start_hour} change={this.handleInputChange}/>
                                           </div>
                                       </Col>
                                   </Row>
                                   <Row>
                                       <Col>
                                           <div className="form-group">
                                               <InputField name={"end_date"} label={"Fecha de finalizacion"} type={"date"} value={this.state.end_date} change={this.handleInputChange}/>
                                           </div>
                                       </Col>
                                       <Col>
                                           <div className="form-group">
                                               <InputField name={"end_hour"} label={"Hora de finalizacion"} type={"time"} value={this.state.end_hour} change={this.handleInputChange}/>
                                           </div>
                                       </Col>
                                   </Row>
                                   <div className="form-group">
                                       <Label>Categoria general</Label>
                                       <select className="custom-select col-12"
                                               value={ this.state.category }
                                               onChange={this.handleInputChange}
                                               name='category'
                                       > {['Vehiculo', 'Inmueble', 'Mueble', 'Otro'].map((value)=>
                                           <option>{value}</option>
                                       )}
                                       </select>
                                   </div>
                                   <div className="form-group">
                                       <InputField name={"item_category"} label={"Categoria especifica"} type={"text"} value={this.state.item_category} change={this.handleInputChange}/>
                                   </div>
                                   <div className="form-group">
                                       <InputField name={"description"} label={"Descripcion"} type={"textarea"} value={this.state.description} change={this.handleInputChange}/>
                                   </div>
                                   <div className="form-group">
                                       <Label>Provincia</Label>
                                       <select className="custom-select col-12"
                                               value={this.state.province}
                                               onChange={this.handleInputChange}
                                               name='province'
                                       > {provincia.map((value)=>
                                           <option>{value}</option>
                                       )}
                                       </select>
                                   </div>

                                   <div className="form-group">
                                       <InputField name={"city"} label={"Ciudad"} type={"text"} value={this.state.city} change={this.handleInputChange}/>
                                   </div>

                                   <div className="form-group">
                                       <InputField name={"address"} label={"Direccion"} type={"text"} value={this.state.address} change={this.handleInputChange}/>
                                   </div>

                                   <div className="picture-uploader-controls">
                                       <Row >
                                           <Col className="col-8">
                                               <InputField
                                                  change={this.handleInputChange}
                                                  name={"url_aux"}
                                                  label={"Imagenes url"}
                                                  type={"text"}
                                                  value={this.state.url_aux}
                                                  ft={"Pegar url a imagen"}/>
                                           </Col>
                                           <Col className="mt-4 p-0 ml-5 ">
                                               <button className="btn btn-primary"
                                                       onClick={this.handleDataAdd3}
                                                       type="button"
                                                       disabled={this.state.url_aux === ''}
                                               >
                                                   Agregar
                                               </button>
                                           </Col>
                                       </Row>

                                      <ListGroup variant="flush" className="mb-4">
                                         {this.state.url_images.length > 0 ?
                                            this.state.url_images.map((url, index) =>
                                                   <MDBRow className='mt-2'>
                                                       <MDBCol>
                                                          <b className=" text-dark">Imagen {index}:</b>
                                                           <a className={''} href={url}>{'  ' + url.split('/').pop()}</a>
                                                       </MDBCol>
                                                       <MDBCol className='text-left'>
                                                           <a onClick={(e) => this.deletArgs(index, 'url_images')} >
                                                              <i style={{color: "#D44638"}} className="fa fa-times-circle" /></a>
                                                       </MDBCol>
                                                   </MDBRow>
                                            )
                                         :
                                            null
                                         }
                                      </ListGroup>
                                   </div>
                               <div className="picture-uploader-controls">
                                       <Row>
                                           <Col className='mr-0 pr-1'>
                                                <InputField name={"key_aux"} value={this.state.key_aux} label={"Dato"} type={"text"} change={this.handleInputChange} />
                                            </Col>
                                            <Col className='ml-0 pl-1'>
                                               <InputField name={"value_aux"} value={this.state.value_aux} label={"Info"} type={"text"} change={this.handleInputChange}/>
                                            </Col>
                                           <Col className="mt-5 p-0 ml-5 ">
                                               <button className="btn btn-primary mr-0"
                                                       onClick={this.handleDataAdd}
                                                       type="button"
                                                       disabled={this.state.key_aux === '' || this.state.value_aux === ''}
                                               >
                                                   Agregar
                                               </button>
                                           </Col>
                                       </Row>
                                       <ListGroup variant="flush" className="mb-4">
                                           {this.state.key_value.length > 0 ?
                                               Object.keys(this.state.key_value).map((tupla, index) =>
                                                   <Row className='mt-2'>
                                                       <Col>
                                                           Dato:<b className="text-dark">
                                                               {'  ' + this.state.key_value[index][0] }
                                                           </b>
                                                       </Col>
                                                       <Col >
                                                           Info:<b className="text-dark">
                                                               {'  ' + this.state.key_value[index][1] }
                                                           </b>
                                                       </Col>
                                                       <MDBCol className='text-left'>
                                                           <a onClick={(e) => this.deletArgs2(index, 'key_value')} >
                                                               <i style={{color: "#D44638"}} className="fa fa-times-circle" /></a>
                                                       </MDBCol>
                                                   </Row>
                                               )
                                               :
                                               null
                                           }
                                       </ListGroup>

                               </div>
                               <div className="picture-uploader-controls">
                                   <Row >
                                       <Col className="col-8">
                                           <InputField
                                               change={this.handleInputChange}
                                               name={"value2_aux"}
                                               label={"Caracteristicas"}
                                               type={"text"}
                                               value={this.state.value2_aux}
                                               ft={"Agregar caracteristicas induviduales con el boton"}/>
                                       </Col>
                                       <Col className="mt-4 p-0 ml-5 ">
                                           <button className="btn btn-primary"
                                                   onClick={this.handleDataAdd4}
                                                   type="button"
                                                   disabled={this.state.value2_aux === ''}
                                           >
                                               Agregar
                                           </button>
                                       </Col>
                                   </Row>

                                   <ListGroup variant="flush" className="mb-4">
                                       {this.state.values.length > 0 ?
                                           this.state.values.map((value, index) =>
                                               <MDBRow className='mt-2'>
                                                   <MDBCol>
                                                       {value}
                                                   </MDBCol>
                                                   <MDBCol className='text-left'>
                                                       <a onClick={(e) => this.deletArgs(index, 'values')} >
                                                           <i style={{color: "#D44638"}}  className="fa fa-times-circle" /></a>
                                                   </MDBCol>
                                               </MDBRow>
                                           )
                                           :
                                           null
                                       }
                                   </ListGroup>
                               </div>

                                <button type="submit" className="btn btn-info"  disabled={!this.validateForm()}>
                                    Agregar
                                 </button>
                               </form>
                             </CardBody>
                         </div>
                       </CardGroup>
                   </Col>
               </Row>
           </Container>
       </div>
   )
 }

}

export default AddCards;
