import React, { Component } from 'react';
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
            <Container>
                <div className="row mt-4">
                    <div className="row">
                        {this.itemslist.map((data, index) =>
                            <div className="col-md-4">
                                <div className="mt-4">
                                    <CardItem title={data['title']}
                                              subtitle={data['subtitle']}
                                              footer={data['footer']}
                                              href={data['href']}
                                              items={data['items']}
                                    ></CardItem>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        );
    }
}

export default CardGallery;
