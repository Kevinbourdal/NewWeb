import React, { Component } from 'react';
import { CardDeck } from 'reactstrap';
import CardItem from "./CardItemComponent";
import Container from "reactstrap/es/Container";
import {MDBCol, MDBContainer, MDBRow} from "mdbreact";
import FiltrosForHome from "./FiltrosForHome";
import config from "../config";


class CardGallery extends Component {
    constructor(props) {
        super(props);
        this.get_items = this.get_items.bind(this);
        this.state = {
            isLoading: false,
            loginError: false,
            items_started: [],
            items_future: [],
        };
        this.categories = this.props.categories;
        this.apply_filters = this.apply_filters.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        //this.Auth = new AuthService();  TODO:  ver AuthService

        this.get_items()
    }

    get_items (filters) {
        filters = typeof filters !== 'undefined' ?  '?filters='+filters : '';
        console.log(filters)

        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/newauction'+filters,
            {
                mode: 'cors',
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
                console.log(res);
                this.setState({
                    items_started: res['data']['auctions']['started'],
                    items_future:  res['data']['auctions']['future'],
                })
                console.log(this.state.items);
                // Object.keys(res['data']['user'])
            }
        ).catch(e => {
                console.log(e);
                // this.props.history.push('/mi_perfil');
            }
        )
    }

    apply_filters (filters) {
        console.log(filters)
        let result = '';
        for (var i = 0; i < filters.length; i++) {
            result += filters[i] + '.'
        }
        if (result !== '')
            this.get_items(result.slice(0, -1))
        else
            this.get_items()
    }

    render() {
        console.log(this.state)
        return (

            <div>
            { this.categories === 'casas' || this.categories === 'home' || this.categories === 'autos' ?
                <div className="mt-3 container-fluid">
                    <MDBRow >
                        { this.categories === 'autos' ?
                            <div/>
                            :
                            <MDBRow className="col-sm-3 mt-3 col-md-2">
                                <MDBRow className="rounded-lg  info-color-dark">
                                    <FiltrosForHome submit={this.apply_filters}/>
                                </MDBRow>
                            </MDBRow>
                        }
                        <MDBCol className="mx-md-5 px-md-4">
                            <Container className="col-12">
                                <div className=" mt-0">
                                    <div hidden={this.state.items_started.length === 0}>
                                        <h3>Subastas Activas</h3>
                                        <hr />
                                        <CardDeck className="mx-md-1 col-12 px-md-1">
                                        {this.state.items_started.map((data, index) =>
                                            <div className="col-4  pr-2 pl-2" style={{maxWidth: '576px'}}>
                                                <div className="pt-3 pb-3 mr-0 ml-0">
                                                    <CardItem title={data['title']}
                                                              subtitle={data['subtitle']}
                                                              footer={'desde ' + data['start_date'] + ' hasta ' + data['end_date']}  //TODO: Dar formato a la fecha
                                                              href={'/detail/' + data['id']}
                                                              url_image={data['url_image']}  //TODO: cargar images desde la api
                                                    />
                                                </div>
                                            </div>
                                            )}
                                        </CardDeck>
                                    </div>
                                    <div hidden={this.state.items_future.length === 0}>
                                        <h3>Subastas Futuras</h3>
                                        <hr/>
                                        <CardDeck className="mx-md-1 col-12 px-md-1">
                                            {this.state.items_future.map((data, index) =>
                                                <div className="col-4  pr-2 pl-2" style={{maxWidth:'576px'}}>
                                                    <div className="pt-3 pb-3 mr-0 ml-0">
                                                        <CardItem title={data['title']}
                                                                  subtitle={data['subtitle']}
                                                                  footer={'desde '+data['start_date'] + ' hasta '+data['end_date']}  //TODO: Dar formato a la fecha
                                                                  href={'/detail/' + data['id']}
                                                                  url_image={data['url_image']}  //TODO: cargar images desde la api
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </CardDeck>
                                    </div>
                                </div>
                            </Container>
                        </MDBCol>
                    </MDBRow>
                </div>
                :
                <div><h1 className="my-5 text-center">NO hay items en la categoria</h1></div>
            }
            </div>
        );
    }
}

export default CardGallery;
