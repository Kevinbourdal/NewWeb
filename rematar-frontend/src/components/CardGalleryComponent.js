import React, { Component } from 'react';
import { CardDeck } from 'reactstrap';
import CardItem from "./CardItemComponent";
import Container from "reactstrap/es/Container";

class CardGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            loginError: false,
        };
        this.itemslist = this.props.itemslist;
        //this.handleChange = this.handleChange.bind(this);
        //this.Auth = new AuthService();  TODO:  ver AuthService
    }

    render() {
        return (
            <Container >
                <div className="row mt-5  width: 100%">
                    <div className="row">
                            <h2><b>{ this.itemslist.length } Lotes disponibles:</b></h2>
                    </div>
                </div>
                <div className="row">
                    <div className="row mt-5">
                        <CardDeck>
                        {this.itemslist.map((data, index) =>
                            <div className="col-md-4 mr-0 ml-0 pr- pl-3">
                                <div className="mt-0 pt-3 pb-3 mr-0 ml-0">
                                    <CardItem title={data['title']}
                                              subtitle={data['subtitle']}
                                              footer={data['footer']}
                                              href={data['href']}
                                              items={data['items']}
                                    ></CardItem>
                                </div>
                            </div>
                        )}
                        </CardDeck>
                    </div>
                </div>
            </Container>
        );
    }
}

export default CardGallery;
