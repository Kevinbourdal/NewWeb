import React, { Component } from 'react';
import {filtro} from '../data/items_filtro';
import {MDBInput, MDBCol, MDBRow, MDBBtn} from "mdbreact";


class FiltrosForHome extends Component{
    constructor(pros) {
        super(pros);
        this.state = {
            filtro: filtro,
            precio: '',
        }
    }


    render() {
        let lugares = Object.keys(this.state.filtro).map((key) => {

            return (
                <div className="mb-5">
                  <h4 className="ml-4 ">{key}</h4>
                    <hr className="accent-4 ml-1 mb-0 mr-5 danger-color" style={{ width: "150px" }} />
                      {Object.values(this.state.filtro[key]).map((value) =>
                          <div className="mt-2 ml-5"  >
                            <h6>
                              <a href="#" style={{color:"#bdbdbd"}} >
                                 {value}
                              </a>
                            </h6>
                          </div>
                      )}
                </div>
            );
        })

        return(
            <div style={{color:'white'}} className="mt-3 ml-3" >
                {lugares}
                <div className="">
                   <h4 className="ml-4 ">{"Pecios"}</h4>
                   <hr className="accent-4 ml-1 mb-0 mr-5 danger-color" style={{ width: "150px" }} />
                </div>
                <MDBRow >
                     <MDBCol className="mr-2 ml-2 ">
                        <MDBInput className="rounded-pill"
                            style={{height:"5vh"}}
                            background={"white"}
                            name="precio"
                            label='$ Desde'
                            type='number'/>
                      </MDBCol>
                      <MDBCol className="mr-4  ">
                          <MDBInput className="rounded-pill"
                               style={{height:"5vh"}}
                               background={"white"}
                               name="precio"
                               label='$ Hasta'
                               type='number'/>
                      </MDBCol>
                </MDBRow>
                <div className="text-center mr-4 ">
                    <MDBBtn color="primary" className="my-4">Filtrar</MDBBtn>
                </div>
            </div>
        );
    }
 }
 
export default FiltrosForHome ;
