import React, { Component } from "react";
import {
    CardGroup,
    Container,
    Row,
    Col,
    Card,
    Table,
    CardHeader,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardFooter,
    Button } from 'reactstrap';

class DataLots extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;  // Array con pares (nombre: valor). Ej: [('lat/lon', '12.123/60.213'), ('luz', 'si'), ..]
        this.pretitle = this.props.pretitle;
        this.title = this.props.title;
        this.subtitle = this.props.subtitle;
        this.precio = this.props.precio;
    }

    render() {
        let data_table = this.data.map((dato, index) => {
            return (
                <tr>
                    <th scope="row">{ index }</th>
                    <th>{ dato[0] }</th>
                    <td>{ dato[1] }</td>
                </tr>
            )
        });

        /*
        let next_ofert = () => {
            return (
                <p>{ this.precio * 1.05 }</p>
                )
        }
         */
        //TODO: poner como ImgOverlay la siguente imagen del caroucel
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <CardGroup>
                        <Card className="p-4">
                            <CardHeader className="text-uppercase">
                                <h6><small className="text-muted text-sm-left">{ this.pretitle }</small></h6>
                                <Row>
                                    <Col>
                                        <CardTitle><h4>{ this.title }  </h4></CardTitle>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <CardSubtitle><small>{ this.subtitle }</small></CardSubtitle>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <br/>
                            <CardBody className="text-center">
                                <Row>
                                    <Col>
                                        <h3><b>Precio Actual</b></h3>
                                        <h1 className="rounded-pill text-center border border-success bg-success">
                                            $ { this.precio }
                                        </h1>
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col>
                                        <Table dark={true} responsive={true} className="text-left">
                                            <tbody>
                                                { data_table }
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter className="justify-content-center align-content-center text-center">
                                <Row>
                                    <Col>
                                        <Button className="btn btn-danger">
                                            Ofertar con ${ this.precio }
                                        </Button>
                                    </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </CardGroup>
                </Container>
            </div>
        );
    }
}

export default DataLots;