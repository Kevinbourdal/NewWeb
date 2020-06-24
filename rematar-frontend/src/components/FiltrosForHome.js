import React, { Component } from 'react';
import {MDBInput, MDBCol, MDBRow, MDBBtn,MDBIcon} from "mdbreact";
import config from "../config";
import {renderIntoDocument} from "react-dom/test-utils";
import Row from "reactstrap/es/Row";
import {object} from "prop-types";


class FiltrosForHome extends Component{
    constructor(pros) {
        super(pros);
        this.state = {
            filters: [],
            price_from: 0,
            price_until: 0,
            filters_selected: [],
            icons:{'Vehiculo':'car',
                    'Inmueble':'home',
                    'Muebles':'couch',
                    'Otros':'circle'}
        }
        this.filters_selected = [];
        this.submit = this.props.submit;
        this.get_filters = this.get_filters.bind(this);
        this.add_filter = this.add_filter.bind(this);
        this.submit_filters =  this.submit_filters.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
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

    add_filter (e, index) {
        let new_value = this.state.filters_selected
        new_value[index] = !new_value[index]
        this.setState(
            {filters_selected: new_value}
        )
        if (new_value[index])
            this.filters_selected = this.filters_selected.concat([e.target.name]);
        else
            this.filters_selected.pop([e.target.name]);
    }

    submit_filters () {
        this.submit(this.filters_selected, this.state.price_from, this.state.price_until);
    }

    changeHandler (e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        let lugares = Object.keys(this.state.filters).map((key) => {
            // this.state.filters_selected
            return (
                <div className="mb-5 ml-2">
                <Row>
                    <MDBCol>
                        <Row>
                            <MDBIcon className='mt-1' icon={this.state.icons[key]} />
                            <h4 className="ml-1 ">{key}</h4>
                        </Row>
                        <Row>
                            <hr className="accent-4 ml-1 mt-1 mr-5 grey lighten-5" style={{ width: "150px", maxWidth: "576px" }} />
                        </Row>
                    </MDBCol>
                </Row>
                    {Object.values(this.state.filters[key]).map((value, index) =>
                          <div className="mt-2 ml-3"  >
                            <h6>
                              <a id={index}
                                 style={{color: this.state.filters_selected[index] ? 'grey' : 'white'}}
                                 name={value}
                                 onClick={e => this.add_filter(e, index)}>
                                 {value}
                                 {/*TODO: agregar eso  */}
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
                <div >
                    <Row>
                    <MDBIcon className='mt-1 ml-2' icon='dollar-sign' />
                   <h4 className="ml-2 ">{"Pecios"}</h4>
                    </Row>
                        <hr className="accent-4 ml-0 mt-1 mr-5 grey lighten-5" style={{ width: "150px" }} />
                    </div>
                <MDBRow >
                    <MDBCol>
                        <MDBRow className="mr-4 ml-2 m-0 p-0 my-0 mt-1 ">
                            <MDBInput className="rounded-pill"
                                      // value={this.state.price_from}
                                      background={"white"}
                                      name="price_from"
                                      label='$ Desde'
                                      type='number'
                                      onChange={this.changeHandler}
                            />
                        </MDBRow>
                        <MDBRow className="mr-4 ml-2 m-0 p-0  ">
                            <MDBInput className="rounded-pill"
                                      // value={this.state.price_until}
                                      background={"white"}
                                      name="price_until"
                                      label='$ Hasta'
                                      type='number'
                                      onChange={this.changeHandler}
                            />
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
