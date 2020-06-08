import React from 'react';
import { AppNavbarBrand } from '@coreui/react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import {Col, Form, Row} from 'reactstrap';
import {waitForDomChange} from "@testing-library/dom";


class ToRegister extends React.Component {
  constructor (props) {
      super(props);
          this.state = {
              username: '',
              email: '',
              password: '',
              repeat_pass:''
          };
      this.validate_pass = this.validate_pass.bind(this);
  }

  validate_pass () {
      if (this.state.password.length > 0 && this.state.repeat_pass.length > 0) {
          if (this.state.password !== this.state.repeat_pass) {
              return true
          }
      }
      return false
  }
  submitHandler = event => {
      event.target.className += ' was-validated';

      event.preventDefault();  //No se que hace por eso lo comente

    // enviamos los datos al backend
    fetch(
        'http://0.0.0.0:5000/api/register',
        {
          headers: {
              Accept: 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            ...this.state
          })
        }
    ).then(res => {
        return this.props.history.push('/login');
    }).catch(error => {
      console.log("Fail" + error);
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
                             Registrarse
                          </h2>
                       </MDBContainer>
                       <MDBContainer className="col-md-11">
                          <Form className='needs-validation' onSubmit={this.submitHandler}>
                             <MDBInput
                               icon='user'
                               value={this.state.fname}
                               name='username'
                               onChange={this.changeHandler}
                               type='text'
                               id='materialFormRegisterNameEx'
                               label='Nombre de usuario'
                               outline
                               required
                             >
                                <div className='invalid-feedback ml-3 pl-3'>Ingrese una contraseña</div>
                             </MDBInput>
                             <MDBInput
                                 icon='unlock'
                                 value={this.state.password}
                                 onChange={this.changeHandler}
                                 type='password'
                                 id='materialFormRegisterPasswordEx4'
                                 name='password'
                                 label='Contraseña'
                                 outline
                                 required

                             >
                             </MDBInput>
                              <MDBInput
                                  icon='unlock'
                                  value={this.state.repeat_pass}
                                  onChange={this.changeHandler}
                                  placeholder="Confirm Password"
                                  type='password'
                                  id='materialFormRegisterPasswordEx9'
                                  name='repeat_pass'
                                  label='Ingrese su Contraseña nuevamente'
                                  outline
                              >
                                  {this.validate_pass() ? (
                                      <Row>
                                          <Col xs="12">
                                              <p className="text-danger">
                                                  Error, verificar contraseña
                                              </p>
                                          </Col>
                                      </Row>
                                  ) : null}
                              </MDBInput>
                              <MDBInput
                                  icon='envelope-open'
                                  value={this.state.email}
                                  onChange={this.changeHandler}
                                  type='email'
                                  id='materialFormRegisterConfirmEx3'
                                  name='email'
                                  label='Email'
                                  outline
                                  required
                              >
                                  <small id='emailHelp' className='form-text text-muted'>
                                      Nunca compartiremos su correo electrónico con nadie más.
                                  </small>
                              </MDBInput>

                             <div className='custom-control custom-checkbox pl-3'>
                                <input
                                   className='custom-control-input'
                                   type='checkbox'
                                   value=''
                                   id='invalidCheck'
                                   required
                                />
                                <label className='custom-control-label' htmlFor='invalidCheck'>
                                   Acepto los <a href="https://www.facebook.com/legal/terms">términos y condiciones</a>
                                </label>
                                <div className='invalid-feedback'>
                                   Debe aceptar antes de enviar.
                                </div>
                             </div>
                             <div className="text-center my-4">
                                <MDBBtn className="ml-4 " color='danger' type='submit' disabled={this.validate_pass()}>
                                   Registrarse
                                </MDBBtn>
                             </div>
                          </Form>
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

export default ToRegister;
