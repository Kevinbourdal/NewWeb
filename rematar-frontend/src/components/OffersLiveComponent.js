import React, { Component } from 'react';
import { Card, CardBody, CardGroup, Col, Container, Row, Table } from "reactstrap";
import AuthService from "../utils/AuthService";

class OffersLive extends Component {
    constructor(pros) {
        super(pros);
        this.state = {
            offers: [],
        }
        this.Auth = new AuthService();
        this.get_table_data = this.get_table_data.bind(this);
        this.get_table_data();
    }

    get_table_data() {
        // recibimos los datos del backend

        fetch(
            'http://0.0.0.0:5000/api/offer'+window.location.pathname,
            {
                mode: 'cors',
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
                this.setState({...res['data']})

            }
        ).catch(e => {
            console.log("Fail:", e);
            alert("Can't load table");
            }
        )
    };

    render() {

        let data_table = this.state.offers.map((offer, index) => {
            return (
                <tbody>
                    { index === 0 ?
                        <tr className="ml-5 bg-success">
                            <th className="ml-5">{index+1}</th>
                            <td className="ml-5 ">{offer['fname']}</td>
                            <td className="ml-5">{offer['lname']}</td>
                            <td className="ml-5"><b>{offer['amount']}</b></td>
                            <td className="ml-5">{offer['date']}</td>
                            <td className="ml-5">{offer['hour']}</td>
                            <td className="ml-5">+{offer['diff']}</td>
                        </tr>
                    :
                        <tr className="ml-5">
                            <th className="ml-5">{index+1}</th>
                            <td className="ml-5">{offer['fname']}</td>
                            <td className="ml-5">{offer['lname']}</td>
                            <td className="ml-5"><b>{offer['amount']}</b></td>
                            <td className="ml-5">{offer['date']}</td>
                            <td className="ml-5">{offer['hour']}</td>
                            <td className="ml-5">+{offer['diff']}</td>
                        </tr>
                    }
                </tbody>
            )
        });
        return (
            <div className="app flex-row align-items-center">
                <Container className="px-md-0 pl-md-4 pl-lg-4">
                    <CardGroup>
                        <Card className="p-0 shadow">
                            <br/>
                            <CardBody className="text-center">
                                <Row>
                                    <Col>
                                        <h3><b>Ofertas</b></h3>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Table hover responsive={true}  className="mr-5 table-striped">
                                            <thead className="thead-dark text-center">
                                                <tr className="">
                                                    <th >#</th>
                                                    <th >First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Oferta</th>
                                                    <th>Fecha</th>
                                                    <th>Hora</th>
                                                    <th>Diferencia de suba</th>
                                                </tr>
                                            </thead>
                                              { data_table }
                                        </Table>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </CardGroup>
                </Container>
            </div>
        )
    }
}

export default OffersLive;
