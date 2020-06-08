import React from 'react';
import { AppNavbarBrand } from '@coreui/react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import {provincia} from "../data/items_filtro";

import AuthService from "../utils/AuthService";

class MiProfile extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            dni_type:'',
            dni:'',
            province: '',
            city: '',
            sex: '',
            bdate:'',
            address:'',
            phone:'',
            mStatus :'',
        };
        this.Auth = new AuthService();
        this.username = this.Auth.getUsername();

    }




    submitHandler = event => {
        //event.preventDefault();  No se que hace por eso lo comente
        event.target.className += ' was-validated';


        // enviamos los datos al backend
        fetch(
            'http://0.0.0.0:5000/api/mi_perfil',
            {
                headers: {
                    'Content-Type': 'text/json',
                },
                mode: 'cors',
                method: 'POST',
                body: JSON.stringify({
                    ...this.state,
                    username: this.username
                })
            }
        ).then(data => {return data.json()}
        ).then(res => {alert("usuario num  " + res.data['id'])}
        ).catch(error => {
                console.log("Fail");
            }
        )
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
                                                    full={{ src:"https://lh3.googleusercontent.com/aj3OSKuHEi1a-6gV30XQXko2sTIgWldChFcKZCmDu2EZ_6ejqtNciqO50eXHLBFu1CCR4mUYRAV0_X7BesV-M6-AczlMCiBHWxETOWsXUv4x2s0u7pdC86BeOvH2O0jC4sjxKeawd5OHe3wrlVDatPm2ozSTomqK00ubP8WI9EFb-22-cWqhegLbPl0VdDQ89drTmSHQKvL3KWyIzctX9rQVkUPBTyT3JkpU5CFA13i1HWMqxKwMWqBvxeVsAgMBnaXWbZZS6Q5it2G70PpaRswdNZA2z7Lk4HTx6mytKhvEQt_cnA90CdTJcKYH8h6VrxUfypq8qPVumSukbFw1-PVSZ1JSK-00Dez4yOq_s_xYU-Iao_V4TVO2ZAg3TKKdy6RMbuZo2CtgTxgbdkyT-F3E9TWOC1XYAJ2yQSG_1XrErGFy1M-14Qu7UUzaXto4jz42akURKe5juvdLFNliNVEmOulKg1hwiVV03FEJZHX535N3uxPElJm4lAFA41mTYQ4IwhoPWtR-mtQL4p7lVAmt2OunS-bV2t48nP36Y4B_Wojxxtitfu_GdM1RCclZirxvIBuCaNb4k_NYs1K5ZoMtDtBXPf__mnWOFuxjgeRJpa1FjdNo4mFlxYGd7obzlKewvLt2j4H48uexV1qKBs1RM9dcFzC1C6NjDKHnehvbss_W-wQgIls=w1366-h428-no?authuser=0",
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
                                                value={this.state.fname}
                                                name='fname'
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
                                                value={this.state.lname}
                                                name='lname'
                                                onChange={this.changeHandler}
                                                type='text'
                                                id='materialFormRegisterEmailEx2'
                                                label='Apellido/s'
                                                outline
                                                required
                                            >
                                            </MDBInput>
                                             <MDBRow className="ml-3 my-1 "  >
                                                    <select  className="p-0 mt-4 col-2 custom-select"
                                                             onChange={this.changeHandler}
                                                                value={this.state.dni_type}
                                                                name="dni_type">
                                                        <option>
                                                            SELECT
                                                        </option>
                                                        <option>
                                                                DNI
                                                            </option>
                                                            <option>
                                                               CUIT
                                                            </option>
                                                            <option>
                                                                CUIL
                                                            </option>
                                                        <option>
                                                            LIBRETA CÍVICA
                                                        </option>
                                                        <option>
                                                            LIBRETA DE ENROLAMIENTO
                                                        </option>
                                                        </select>
                                                 <MDBCol className="col-10">
                                                        <MDBInput
                                                            className="mt-0"
                                                            icon='address-card'
                                                            value={this.state.dni}
                                                            onChange={this.changeHandler}
                                                            type='number'
                                                            id='materialFormRegisterPasswordEx4'
                                                            name='dni'
                                                            label={this.state.dni_type}
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
                                                    type='number'
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