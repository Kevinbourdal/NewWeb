import React, { Component } from 'react';
import {Row, Col, CardBody, CardGroup, Container } from 'reactstrap'
import InputField from "./InputFieldComponent";
import { ListGroup, ListGroupItem } from 'reactstrap';

import {provincia} from "../data/items_filtro";
import Label from "reactstrap/es/Label";


class AddCards extends Component {
     constructor () {
           super(Component);
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
                url_images: [],
                key_value: [],
                value: [],
                startDate: new Date(),
                key_aux: '',
                value_aux: '',
           };
           this.handleDataAdd = this.handleDataAdd.bind(this);
           this.handleDataAdd2 = this.handleDataAdd2.bind(this);
           this.handleDataAdd3 = this.handleDataAdd3.bind(this);
           this.handleInputChange = this.handleInputChange.bind(this);
           this.handleSubmit = this.handleSubmit.bind(this);
     }

     handleSubmit(e) {
         e.preventDefault();
         fetch(
             'http://0.0.0.0:5000/api/newauction',
             {
                 headers: {
                     'Content-Type': 'text/json',
                 },
                 mode: 'cors',
                 method: 'POST',
                 body: JSON.stringify({
                     ...this.state
                 })
             }
         ).then(data => {return data.json()}
         ).then(res => {alert("Articulo num " + res.data['id'] + "guardado!")}
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
            ['key_value']: [...this.state['key_value'], [k, v]],
            key_aux: '',
            value_aux: '',
        });
    }

    handleDataAdd3(e) {
        const {value, name} = e.target;
            e.target.value='';
            this.setState({
                [name]: [...this.state[name], value]
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

    // changeHandler = event => {
    //     this.setState({ [event.target.name]: event.target.value });
    // };

 render() {
   return (
       <div className="app flex-row align-items-center mt-4">
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
                                     <InputField name={"title"} label={"Titulo"} type={"text"} change={this.handleInputChange}/>
                                 </div>
                                 <div className="form-group">
                                     <InputField name={"subtitle"} label={"Subtitulo"} type={"text"}  change={this.handleInputChange}/>
                                 </div>
                                   <div className="form-group">
                                       <InputField label={"Moneda"} type={"text"} value={"Peso Argentino"} change={this.handleInputChange}/>
                                   </div>
                                   <div className="form-group">
                                       <InputField name={"base_price"} label={"Precio base"} type={"number"} change={this.handleInputChange}/>
                                   </div>
                                   <div className="form-group">
                                       <InputField name={"market_price"} label={"Precio de mercado"} type={"number"} change={this.handleInputChange}/>
                                   </div>
                                   <Row>
                                       <Col>
                                           <div className="form-group">
                                               <InputField name={"start_date"} label={"Fecha de inicio"} type={"date"} change={this.handleInputChange}/>
                                           </div>
                                       </Col>
                                       <Col>
                                           <div className="form-group">
                                               <InputField name={"start_hour"} label={"Hora de inicio"} type={"time"} change={this.handleInputChange}/>
                                           </div>
                                       </Col>
                                   </Row>
                                   <Row>
                                       <Col>
                                           <div className="form-group">
                                               <InputField name={"end_date"} label={"Fecha de finalizacion"} type={"date"} change={this.handleInputChange}/>
                                           </div>
                                       </Col>
                                       <Col>
                                           <div className="form-group">
                                               <InputField name={"end_hour"} label={"Hora de finalizacion"} type={"time"} change={this.handleInputChange}/>
                                           </div>
                                       </Col>
                                   </Row>
                                   <div className="form-group">
                                       <Label>Categoria general</Label>
                                       <select className="custom-select col-12"
                                               value={ this.state.category }
                                               onChange={this.handleInputChange}
                                               name='category'

                                       > {['Seleccione categoria','Vehiculo', 'Inmueble', 'Muebles', 'Otros'].map((value)=>
                                           <option>{value}</option>
                                       )}
                                       </select>
                                   </div>
                                   <div className="form-group">
                                       <InputField name={"item_category"} label={"Categoria especifica"} type={"text"} change={this.handleInputChange}/>
                                   </div>
                                   <div className="form-group">
                                       <InputField name={"description"} label={"Descripcion"} type={"textarea"} change={this.handleInputChange}/>
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
                                       <InputField name={"city"} label={"Ciudad"} type={"text"} change={this.handleInputChange}/>
                                   </div>

                                   <div className="picture-uploader-controls">
                                      <InputField name={"url_images"}
                                                  label={"Imagenes url"}
                                                  type={"text"}
                                                  change={this.handleDataAdd3}
                                                  ft={"Pegar url a imagen"}/>
                                      <ListGroup variant="flush" className="mb-4">
                                         {this.state.url_images.length > 0 ?
                                            this.state.url_images.map((url, index) =>
                                               <ListGroupItem tag="a" href={url} action><b className="text-dark">Imagen {index}:</b> { url.split('/').pop() }</ListGroupItem>
                                            )
                                         :
                                            null
                                         }
                                      </ListGroup>

                                   </div>
                               <div className="picture-uploader-controls">
                                       <Row>
                                           <Col>
                                                <InputField name={"key_aux"} value={this.state.key_aux} label={"Dato"} type={"textarea"} change={this.handleInputChange} />
                                            </Col>
                                            <Col>
                                               <InputField name={"value_aux"} value={this.state.value_aux} label={"Info"} type={"textarea"} change={this.handleInputChange}/>
                                            </Col>
                                           <Col className="mt-5 p-0 m-0">
                                               <button className="btn btn-primary" onClick={this.handleDataAdd} type="button">Agregar</button>
                                           </Col>
                                       </Row>
                                       <ListGroup variant="flush" className="mb-4">
                                           {this.state.key_value.length > 0 ?
                                               Object.keys(this.state.key_value).map((tupla, index) =>
                                                   <Row>
                                                       <Col>
                                                           <ListGroupItem>
                                                               <b className="text-dark">
                                                                   { this.state.key_value[index][0] }
                                                               </b>
                                                           </ListGroupItem>
                                                       </Col>
                                                       :
                                                       <Col>
                                                           <ListGroupItem >
                                                               { this.state.key_value[index][1] }
                                                           </ListGroupItem>
                                                       </Col>
                                                   </Row>
                                               )
                                               :
                                               null
                                           }
                                       </ListGroup>

                               </div>
                                   <div className="picture-uploader-controls">
                                       <InputField name={"value"} label={"Caracteristicas"} type={"textarea"} change={this.handleDataAdd2}/>
                                       <ListGroup variant="flush" className="mb-4">
                                           {this.state.value.length > 0 ?
                                               this.state.value.map((value, index) =>
                                                   <ListGroupItem action>
                                                       {index}: { value }
                                                   </ListGroupItem>
                                               )
                                               :
                                               null
                                           }
                                       </ListGroup>

                                   </div>
                                 <button type="submit" className="btn btn-danger" disabled={!this.validateForm()}>
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
