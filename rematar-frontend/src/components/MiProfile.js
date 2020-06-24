import React from 'react';
import { AppNavbarBrand } from '@coreui/react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import {provincia} from "../data/items_filtro";
import AuthService from "../utils/AuthService";
import logo from '../img/logofull.png'
import config from "../config";
import {wait} from "@testing-library/dom";


class MiProfile extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            dni_type: '',
            dni: '',
            province: '',
            city: '',
            sex: '',
            bdate: '',
            address: '',
            phone: '',
            mStatus: '',
            dni_types: ['DNI', 'CUIT', 'CUIL', 'LIBRETA CÍVICA', 'LIBRETA DE ENROLAMIENTO'],
            new_user: false,
        };
        this.Auth = new AuthService();
        this.username = this.Auth.getUsername();
        this.get_user_data = this.get_user_data.bind(this);
        this.get_user_data()
    }

    get_user_data () {
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/mi_perfil?username='+this.username,
            {
                mode: 'cors',
                method: 'GET',
            }
        ).then(data => {return data.json()}
        ).then(res => {
                this.setState({...res['data']['user']})
            }
        ).catch(e => {
                console.log("No user:", e);
                this.setState({new_user: true})
            }
        )
    }

    submitHandler = event => {
        //event.preventDefault();  No se que hace por eso lo comente
        event.target.className += ' was-validated';
        // enviamos los datos al backend
        event.preventDefault()
        fetch(
            config["api"]['BACKEND_ENDPOINT']+'/api/mi_perfil',
            {
                headers: {
                    Accept: 'application/json',
                },
                method: this.state.new_user ? 'POST' : 'PUT',
                body: JSON.stringify({
                    ...this.state,
                    username: this.username
                })
            }
        ).then(data => {alert("Informacion guardada")}
        ).catch(error => {
            console.log("Fail", error);
            // alert('error')
        });
        onwaiting(event)
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div className="app flex-row align-items-center mt-5 mb-5">
                <MDBContainer>
                    <div>
                        <MDBRow className="justify-content-center">
                            <MDBCol md="8" className="rounded shadow" style={{backgroundColor:"white"}}>
                                <div >
                                    <MDBContainer className="text-center">
                                        <MDBRow>
                                            <MDBCol>
                                                <AppNavbarBrand
                                                    full={{ src: logo,
                                                        width: 400,
                                                        alt: 'Remates Calamuchita Logo' }}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                        <p className="text-muted">
                                            Subastas en web
                                        </p>
                                        <h2 className="mt-5 ">
                                            Datos Personales
                                        </h2>
                                    </MDBContainer>
                                    <MDBContainer className="col-md-11">
                                        <form className='needs-validation' onSubmit={this.submitHandler}>
                                            <MDBInput
                                                icon='user'
                                                value={this.state.firstname}
                                                name='firstname'
                                                onChange={this.changeHandler}
                                                type='text'
                                                id='materialFormRegisterNameEx'
                                                label='Nombre/s'
                                                outline
                                                required
                                            >
                                                <div className='valid-feedback ml-3 pl-3 '>Valido!!</div>
                                            </MDBInput>
                                            <MDBInput
                                                icon='user'
                                                value={this.state.lastname}
                                                name='lastname'
                                                onChange={this.changeHandler}
                                                type='text'
                                                id='materialFormRegisterEmailEx2'
                                                label='Apellido/s'
                                                outline
                                                required
                                            >
                                            </MDBInput>
                                             <MDBRow className="ml-3 my-1">
                                                 <select className="p-0 mt-4 col-2 custom-select"
                                                         onChange={this.changeHandler}
                                                         value={this.state.dni_type}
                                                         name="dni_type">
                                                     {this.state.dni_types.map((value) =>
                                                         <option selected={value === this.state.dni_type} >
                                                             {value}
                                                         </option>
                                                     )}
                                                 </select>
                                                 <MDBCol className="col-10">
                                                       <MDBInput
                                                            className="mt-0"
                                                            icon='address-card'
                                                            value={this.state.dni}
                                                            onChange={this.changeHandler}
                                                            type='text'
                                                            id='materialFormRegisterPasswordEx4'
                                                            name='dni'
                                                            label='DNI'
                                                            outline
                                                            required
                                                       >
                                                       </MDBInput>
                                                 </MDBCol>
                                             </MDBRow>
                                            <MDBInput
                                                icon='id-badge'
                                                value={this.state.bdate}
                                                name='bdate'
                                                onChange={this.changeHandler}
                                                type='date'
                                                id='materialFormRegisterNameEx2'
                                                label='Fecha de Nacimiento'
                                                outline
                                                required
                                            >
                                                <div className='valid-feedback ml-3 pl-3 '>Valido!!</div>
                                            </MDBInput>
                                            <MDBRow >
                                            <MDBIcon icon="male" className=" ml-3 mr-2" size="2x" />
                                                <MDBCol className="col-sm-10 col-md-11 ml-2 p-0 m-0">
                                                    <select className="custom-select "
                                                            value={this.state.sex}
                                                            onChange={this.changeHandler}
                                                            name='sex'
                                                            id='materialFormRegisterEmailEx3'
                                                    ><option>sexo</option>
                                                        <option>Masculino</option>
                                                        <option>Femenino</option>
                                                    </select>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBInput
                                                icon='venus'
                                                value={this.state.mStatus}
                                                name='mStatus'
                                                onChange={this.changeHandler}
                                                type='text'
                                                id='materialFormRegisterEmailEx6'
                                                label='Estado civil'
                                                outline
                                                required
                                            />
                                            <MDBRow className="mt-4">
                                                <MDBIcon icon='city'className=" ml-2 mr-2  " size="1x" />
                                                <MDBCol className="col-sm-10 col-md-11 p-0 ml-2 m-0">
                                                    <select className="custom-select col-12"
                                                            value={this.state.province}
                                                            onChange={this.changeHandler}
                                                            name='province'
                                                            id='materialFormRegisterEmailEx3'
                                                    > {provincia.map((value)=>
                                                        <option>{value}</option>
                                                    )}
                                                    </select>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBInput select className="browser-default custom-select"
                                                      icon="building"
                                                      value={this.state.city}
                                                      onChange={this.changeHandler}
                                                      type='text'
                                                      id='materialFormRegisterConfirmEx'
                                                      name='city'
                                                      label='Localidad'
                                                      outline
                                                      required
                                            >
                                            </MDBInput>
                                            <MDBInput
                                                icon='location-arrow'
                                                value={this.state.address}
                                                name='address'
                                                onChange={this.changeHandler}
                                                type='text'
                                                id='materialFormRegisterEmailEx9'
                                                label='Dirección'
                                                outline
                                                required
                                            />
                                                <MDBInput
                                                    icon='mobile-alt'
                                                    value={this.state.phone}
                                                    name='phone'
                                                    onChange={this.changeHandler}
                                                    type='text'
                                                    id='materialFormRegisterEmailEx8'
                                                    label='teléfono'
                                                    outline
                                                    required
                                                >
                                            </MDBInput>
                                            <div className="text-center my-4">
                                                <MDBBtn className="ml-4 " color='danger' type='submit'>
                                                    Guardar
                                                </MDBBtn>
                                            </div>
                                        </form>
                                    </MDBContainer>
                                </div>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </MDBContainer>
            </div>
        );
    }
}

export default MiProfile;