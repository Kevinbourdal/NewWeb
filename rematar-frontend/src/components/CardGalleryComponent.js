import React, { Component } from 'react';
import { CardDeck } from 'reactstrap';
import CardItem from "./CardItemComponent";
import Container from "reactstrap/es/Container";
import {MDBCol, MDBRow} from "mdbreact";
import FiltrosForHome from "./FiltrosForHome";


class CardGallery extends Component {
    constructor(props) {
        super(props);
        this.get_items = this.get_items.bind(this);
        this.state = {
            isLoading: false,
            loginError: false,
            items: []
        };
        this.itemslist = this.props.itemslist;
        this.categories = this.props.categories;
        //this.handleChange = this.handleChange.bind(this);
        //this.Auth = new AuthService();  TODO:  ver AuthService
        this.get_items()
    }

    get_items () {
        fetch(
            'http://0.0.0.0:5000/api/newauction',
            {
                mode: 'cors',
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
                console.log(res);
                this.setState({items: res['data']['auctions']})
                // Object.keys(res['data']['user'])
            }
        ).catch(e => {
                console.log(e);
                // this.props.history.push('/mi_perfil');
            }
        )
    }

    render() {
        let items = [
            {
                src: 'https://mobimg.b-cdn.net/pic/v2/gallery/preview/dorogi-gory-pejzazh-9109.jpg',
                key: '1'
            },
            {
                src: 'https://wallpapercave.com/wp/LRB9LM1.jpg',
                key: '3'
            },
            {
                src: 'https://i.pinimg.com/originals/15/a7/a8/15a7a873c0e04fcfcae5c6be5365818f.jpg',
                key: '2'
            },
        ]
        return (
            <div>
            { this.categories === 'casas' || this.categories === 'home' || this.categories === 'autos' ?
                <div className="mt-5 container-fluid"  >
                    <div className="ml-5">
                        <h2><b>{ this.state.items.length } Articulos disponibles: </b></h2>
                    </div>
                    <MDBRow >
                        { this.categories === 'home' ?
                            <div/>
                            :
                            <MDBCol className="col-md-3 mt-3 ">
                                <section className="rounded-lg card elegant-color-dark " style={{width: "100%"}}>
                                    <FiltrosForHome/>
                                </section>
                            </MDBCol>
                        }
                        <MDBCol className="ml-2 mr-4 ">
                            <Container >

                                <div className="row">
                                    <div className="row mt-2">
                                        <CardDeck>
                                            {this.state.items.map((data, index) =>
                                                <div className="col-md-4 mr-0 ml-0 pr- pl-3">
                                                    <div className="mt-0 pt-3 pb-3 mr-0 ml-0">
                                                        <CardItem title={data['title']}
                                                                  subtitle={data['subtitle']}
                                                                  footer={'desde '+data['start_date'] + 'hasta '+data['end_date']}
                                                                  href={data['id']}
                                                                  items={items}
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
