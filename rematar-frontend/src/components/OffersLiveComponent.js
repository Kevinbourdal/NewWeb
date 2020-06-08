import React, { Component } from 'react';
import { Card, CardBody, CardGroup, Col, Container, Row, Table } from "reactstrap";
import { items } from "../data/Lote1";
import AuthService from "../utils/AuthService";

class OffersLive extends Component {
    constructor(pros) {
        super(pros);
        this.state = {
            items: [],
            fname: '',
            lname:'',
            amount:'',
            date:'',
            hour:'',
            diff:'',
            username:''
        }
        this.Auth = new AuthService();
        this.submitHandler = this.submitHandler.bind(this);
    }

/*
    componentDidMount() {
        this.myInterval = setInterval(() => {
            let { items } = this.state;
            let aux = items[0];
            items[0] = items[2];
            items[0]['amount'] = aux['amount'] + 25000;
            items[0]['amount'] = 25000;
            items[2] = aux;
            this.setState( ({items}) => ({
                items: items,
            }));
        }, 10000)
    }
*/
    submitHandler = () => {
        // recibimos los datos del backend

        fetch(
            'http://0.0.0.0:5000/api/offer'+window.location.pathname,
            {
                headers: {
                    'Content-Type': 'text/json',
                },
                mode: 'cors',
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
                this.setState({...res['data']['offer']})

            }
        ).catch(e => {
            console.log("Fail");
                //this.props.history.push();
            }
        )
    };
    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        if (this.state.firstname === '') {
            this.submitHandler()
        }
        let data_table = this.state.items.map((offer, index) => {
            return (
                <tbody>
                    { index === 0 ?
                        <tr className="ml-5 bg-success">
                            <th className="ml-5">{index+1}</th>
                            <td className="ml-5 ">{offer[this.state.fname]}</td>
                            <td className="ml-5">{offer[this.state.lname]}</td>
                            <td className="ml-5"><b>{offer[this.state.amount]}</b></td>
                            <td className="ml-5">{offer[this.state.date]}</td>
                            <td className="ml-5">{offer[this.state.hour]}</td>
                            <td className="ml-5">+{offer[this.state.diff]}</td>
                        </tr>
                    :
                        <tr className="ml-5">
                            <th className="ml-5">{index+1}</th>
                            <td className="ml-5">{offer[this.state.fname]}</td>
                            <td className="ml-5">{offer[this.state.lname]}</td>
                            <td className="ml-5"><b>{offer[this.state.amount]}</b></td>
                            <td className="ml-5">{offer[this.state.date]}</td>
                            <td className="ml-5">{offer[this.state.hour]}</td>
                            <td className="ml-5">+{offer[this.state.diff]}</td>
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

/*

<Alert color="success" className="text-center">
    Tiempo restante:
    { minutes === 0 && seconds === 0
        ? <h1>Finalizado!</h1>
        : <h4 className="text-black-50">{days} dias - {hour}:{minutes < 10? `0${minutes}`:minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h4>
    }
</Alert>
            ---------
<Toast className="text-center">
                    <ToastHeader>

                    </ToastHeader>
                    <ToastBody>

                    </ToastBody>
                </Toast>

 */