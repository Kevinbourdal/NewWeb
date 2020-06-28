import React, {Component} from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCardTitle,
    MDBCol,
    MDBListGroupItem,
    MDBTable,
} from 'mdbreact';
import { ofertas } from "../data/ofertasenvivo";
import AuthService from "../utils/AuthService";
import config from "../config";


class AcceptAuctions extends Component {

    constructor (props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            dni_type:'',
            dni:'',
            province: '',
            city: '',
            bdate:'',
            phone :'',
            email: '',
            offer_started: [],
        };
        this.Auth = new AuthService();
        this.username = this.Auth.getUsername();
        this.submitHandler = this.submitHandler.bind(this);
        this.get_tables = this.get_tables.bind(this);
        this.get_tables();
    }

    get_tables () {
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/offer/user?username='+this.username,
            {
                headers: {
                    'Content-Type': 'text/json',
                },
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
                this.setState({
                    offer_started: res['data']['offers']['started'],
                    offer_finished: res['data']['offers']['finished'],
                })
            }
        ).catch(e => {
                this.props.history.push('/mi_perfil');
            }
        )
    }


    submitHandler = () => {
        // recibimos los datos del backend
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/mi_perfil?username='+this.username,
            {
                headers: {
                    'Content-Type': 'text/json',
                },
                mode: 'cors',
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
                this.setState({...res['data']['user']})
                // Object.keys(res['data']['user'])
            }
        ).catch(e => {
                this.props.history.push('/mi_perfil');
            }
        )
    };
    deletArgs(index, name){
        var new_list = this.state[name]
        new_list.pop(index)
        this.setState({
            name: new_list,
        })
    }

    acceptArgs(index, name){
        var new_list = this.state[name]
        new_list.pop(index)
        this.setState({
            name: new_list,
        })
    }


    render() {
        if (this.state.firstname === '') {
            this.submitHandler()
        }
        return (
            <MDBCol >
                <MDBRow className="mt-4 ml-2 col-12 " style={{height:'400%'}}>
                    <MDBCol className=" mt-2 col-12 " >
                        <MDBCard >
                            <MDBCardBody className="" style={{ width: '100%' }} >
                                <h5>Ofertas para Aceptar</h5>
                                <hr />
                                <MDBTable hover responsive={true} className="table-striped">
                                    <thead className="thead-dark text-center">
                                    <tr className="">
                                        <th><b>#</b></th>
                                        <th><b>Nombre</b></th>
                                        <th><b>Apellido</b></th>
                                        <th><b>Oferta</b></th>
                                        <th><b>Puesto</b></th>
                                        <th><b>Subasta</b></th>
                                        <th><b>Hora</b></th>
                                        <th><b>Fecha oferta</b></th>
                                        <th><b>Opciones</b></th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-center ">
                                    {this.state.offer_started.map((offer, index) => {
                                        return (
                                            <tr className="ml-5 bg-light" style={{ color: "#000000" }}>
                                                <th className="ml-5">{index+1}</th>
                                                <td className="ml-5">{this.state.firstname}</td>
                                                <td className="ml-5">{this.state.lastname}</td>
                                                <td className="ml-5 "><b>$ {offer['offer']}</b></td>
                                                <td className="ml-5">{offer['position']}</td>
                                                <td className="ml-5">
                                                    <a href={'/detail/'+offer['auction_id']}><b>{offer['auction']}</b></a>
                                                </td>
                                                <td className="ml-5">{offer['date']}</td>
                                                <td className="ml-5">{offer['time']}</td>
                                                <MDBCol className='mt-2 text-left'>
                                                    <a className='btn green' style={{color:'black'}}
                                                       onClick={(e) => this.acceptArgs(index, 'offer_started')}>Aceptar</a>

                                                    <a className='btn danger-color-dark ml-2 ' style={{color:'black'}}
                                                       onClick={(e) => this.deletArgs(index, 'offer_started')} >Denegar</a>
                                                </MDBCol>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </MDBTable>
                            </MDBCardBody>
                        </MDBCard>
                        <hr />
                    </MDBCol>
                </MDBRow>
            </MDBCol>
        )
    }
}
export default AcceptAuctions;