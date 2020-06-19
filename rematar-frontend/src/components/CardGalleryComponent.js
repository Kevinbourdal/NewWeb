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
            items: [],
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
                    items: res['data']['auctions'],
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
    }

    render() {
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
                                <div className="">
                                    <div className=" mt-0">
                                        <CardDeck className="mx-md-1 col-12 px-md-1">
                                            {this.state.items.map((data, index) =>
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
