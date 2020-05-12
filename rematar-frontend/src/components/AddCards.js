import React, { Component } from 'react';
import { Button, Form, Row, Col, Card, CardBody, CardGroup, Container } from 'reactstrap'
import InputField from "./InputFieldComponent";

import {AppNavbarBrand} from "@coreui/react";


class AddCards extends Component {
     constructor () {
           super();
           this.state = {
                title: '',
                price: -1,
                subtitle: '',
                description: '',
                type: 'lote'
           };
           this.handleInputChange = this.handleInputChange.bind(this);
           this.handleSubmit = this.handleSubmit.bind(this);
     }

 handleSubmit(e) {

  }

 handleInputChange(e) {
    const {value, name} = e.target;
    console.log(value, name);
    this.setState({
       [name]: value
     });
 }

    validateForm() {
        return this.state.title.length > 0 && this.state.price >= 0;
}

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
                                       <Col>
                                           <h3>Nuevo item</h3>
                                       </Col>
                                   </Row>
                                 <div className="form-group">
                                     <InputField name={"title"} label={"Titulo"} type={"text"} change={(e) => {
                                         this.handleInputChange(e);
                                     }}/>
                                 </div>
                                 <div className="form-group">
                                 </div>
                                 <div className="form-group">
                                     <InputField name={"subtitle"} label={"Subtitulo"} type={"text"}  change={(e) => {
                                         this.handleInputChange(e);
                                     }}/>
                                 </div>
                                   <div className="form-group">
                                       <InputField name={"price"} label={"Precio"} type={"num"} i="si"  change={(e) => {
                                           this.handleInputChange(e);
                                       }}/>
                                   </div>
                                   <div className="form-group">
                                       <InputField name={"description"} label={"Descripcion"} type={"textarea"}  change={(e) => {
                                           this.handleInputChange(e);
                                       }}/>
                                   </div>
                                 <div className="form-group">
                                     <label className="">Tipo</label>
                                   <select name="type"
                                           value="Campo"
                                           className="form-control"
                                           onChange={this.handleInputChange}
                                     ><option selected className="justify-content-center">
                                           Campo
                                       </option>
                                       <option>
                                           Casa
                                       </option>
                                       <option>
                                           Lote
                                       </option>
                                   </select>
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
