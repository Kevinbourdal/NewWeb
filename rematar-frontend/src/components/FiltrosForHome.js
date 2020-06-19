import React, { Component } from 'react';
import {MDBInput, MDBCol, MDBRow, MDBBtn} from "mdbreact";
import config from "../config";


class FiltrosForHome extends Component{
    constructor(pros) {
        super(pros);
        this.state = {
            filters: [],
            price_from: '',
            price_until: '',
        }
        this.filters_selected = [];
        this.submit = this.props.submit;
        this.get_filters = this.get_filters.bind(this);
        this.add_filter = this.add_filter.bind(this);
        this.submit_filters =  this.submit_filters.bind(this);
        this.get_filters()
    }

    get_filters () {
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/filters',
            {
                mode: 'cors',
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
                this.setState({
                    'filters': res['data']['filters']
                });
            }
        ).catch(e => {
                console.log('error al obtener filtros');
            }
        )
    }

    add_filter (e) {
        this.filters_selected = this.filters_selected.concat([e.target.name]);
    }

    submit_filters () {
        console.log(this.filters_selected);
        this.submit(this.filters_selected);
    }


    render() {
        let lugares = Object.keys(this.state.filters).map((key) => {

            return (
                <div className="mb-5">
                  <h4 className="ml-1 ">{key}</h4>
                    <hr className="accent-4 ml-1 mt-1  mr-5 grey lighten-5" style={{ width: "150px" }} />
                      {Object.values(this.state.filters[key]).map((value) =>
                          <div className="mt-2 ml-3"  >
                            <h6>
                              <a style={{color:"white"}} name={value} onClick={e => this.add_filter(e)}>
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
                   <hr className="accent-2 ml-1 mb-0 mr-5 grey lighten-5" style={{ width: "150px" }} />
                </div>
                <MDBRow >
                    <MDBCol>
                     <MDBRow className="mr-4 ml-2 m-0 p-0 my-0 mt-1 ">
                        <MDBInput className="rounded-pill"
                            background={"white"}
                            name="price_from"
                            label='$ Desde'
                            type='number'/>
                      </MDBRow>
                      <MDBRow className="mr-4 ml-2 m-0 p-0  ">
                          <MDBInput className="rounded-pill"

                               background={"white"}
                               name="price_until"
                               label='$ Hasta'
                               type='number'/>
                      </MDBRow>
                    </MDBCol>
                </MDBRow>
                <div className="text-center mr-4 ">
                    <MDBBtn color="grey darken-3" style={{color:'white'}} className="my-4" type='submit' onClick={this.submit_filters}>
                        Filtrar
                    </MDBBtn>
                </div>
            </div>
        );
    }
 }


export default FiltrosForHome ;
