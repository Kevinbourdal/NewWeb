import React, { Component } from 'react';
import {filtro} from '../data/items_filtro';
import {MDBInput, MDBCol, MDBRow, MDBBtn} from "mdbreact";


class FiltrosForHome extends Component{
  constructor(pros) {
    super();
    this.state = {
       filtro: filtro,
        precio:'',

  }
}


render() {
    let lugares = Object.keys(this.state.filtro).map((key) => {

      return (
        <div>
          <h4 className="ml-4">{key}</h4>

          {Object.values(this.state.filtro[key]).map((value) =>
              <div className="mt-2 ml-5"  >
                <h6>
                  <a href="#" className="text-muted" >
                     {value}
                  </a>
                </h6>
              </div>
          )}
        </div>
      );
      }
    )

      return(
        <div  style={{color:'black'}} className="mt-3 ml-3" >
               {lugares}
           <MDBRow>
               <MDBCol className="mr-1 ">
            <MDBInput
                background={"black"}
                name="precio"
                label='$ Desde'
                type='number'/>
               </MDBCol>
               <MDBCol className="mr-2 ">
                   <MDBInput
                       background={"black"}
                       name="precio"
                       label='$ Hasta'
                       type='number'/>
               </MDBCol>
           </MDBRow>
            <MDBBtn color="primary" className="ml-5 my-4">Filtrar</MDBBtn>
           </div>

 )}
 }
export default FiltrosForHome ;
