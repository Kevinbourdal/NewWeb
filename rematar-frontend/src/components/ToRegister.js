import React from 'react';
import { AppNavbarBrand } from '@coreui/react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import {Col, Form, Row} from 'reactstrap';
import logo from '../img/logofull.png';
import logos from '../img/logosubastas.png';
import config from "../config";
import TermsAndConditions from "./TermsAndConditions";
import ModalPage from "./Moddal";

class ToRegister extends React.Component {
  constructor (props) {
      super(props);
          this.state = {
              username: '',
              email: '',
              password: '',
              repeat_pass:'',
              modal2: false,
              modal: false
          };
      this.validate_pass = this.validate_pass.bind(this);
      this.toggle = this.toggle.bind(this)
      this.toggle2 = this.toggle2.bind(this)
  }

  validate_pass () {
      if (this.state.password.length > 0 && this.state.repeat_pass.length > 0) {
          if (this.state.password !== this.state.repeat_pass) {
              return true
          }
      }
      return false
  }
     toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
        console.log(this.state)
    }

    toggle2 = () => {
        this.setState({
            modal2: !this.state.modal2
        });
        console.log(this.state)
    }
  submitHandler = event => {

      event.target.className += ' was-validated';
      event.preventDefault();  //No se que hace por eso lo comente
    // enviamos los datos al backend
    fetch(
        config["api"]['BACKEND_ENDPOINT']+'/api/register',
        {
          headers: {
              Accept: 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            ...this.state
          })
        }
    ).then(data => {return data.json()}
    ).then(res => {
        this.toggle()
        return this.props.history.push('/login');
    }).catch(error => {
        alert('')
        this.toggle()
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
       <ModalPage toggle={this.toggle} modal={this.state.modal} body={'Su registro ha sido exitoso'}/>
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
                                    <TermsAndConditions toggle={this.toggle2} modal={this.state.modal2} />
                                    <a onClick={this.toggle2}>
                                        Terminos y condiciones
                                    </a>
                                </label>
                                <div className='invalid-feedback'>
                                   Debe aceptar antes de enviar.
                                </div>
                             </div>
                             <div className="text-center my-4">
                                <MDBBtn className="ml-4 " color='info' type='submit' disabled={this.validate_pass()}>
                                    <Row>
                                        <img src ={logos} style={{width:"50px",height:"37px"}}></img>
                                        <b><h5 className='mt-2 mr-4'>Registrarse</h5></b>
                                    </Row>
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
