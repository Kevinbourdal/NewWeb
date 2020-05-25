import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';





class ToRegister extends React.Component {
  state = {
    fname: '',
    lname: '',
    email: '',
    password:'',
    province: '',
    state: ''
  };

  submitHandler = event => {
    event.preventDefault();
    event.target.className += ' was-validated';

}


  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="mt-5 ml-5 mr-5 mb-5 rounded " style={{backgroundColor:"#a5d6a7"}} >
        <MDBContainer className="ml-5 mt-5 ">
          <h2>
            Registrarse
          </h2>
        </MDBContainer>
        <form
          className='needs-validation'
          onSubmit={this.submitHandler}
          noValidate>


          <MDBRow className="ml-2 mr-2" >
            <MDBCol md='4'>
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
                <div className='valid-feedback ml-3 pl-3'>Valido!!</div>
                </MDBInput>
             </MDBCol>
            <MDBCol md='4'>
              <MDBInput
                icon='address-card'
                value={this.state.lname}
                name='lname'
                onChange={this.changeHandler}
                type='text'
                id='materialFormRegisterEmailEx2'
                label='Apellido/s'
                outline
                required
              >
                <div className='valid-feedback ml-3 pl-3'>Valido!!</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md='4'>
              <MDBInput
                icon='unlock'
                value={this.state.password}
                onChange={this.changeHandler}
                type='password'
                id='materialFormRegisterPasswordEx4'
                name='password'
                label='contraseña'
                outline
                required
              >
                <div className='invalid-feedback ml-3 pl-3'>
                  Ingrese una contraseña
                </div>
                <div className='valid-feedback ml-3 pl-3'>Looks good!</div>
              </MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBRow className="mr-2 ml-2">
          <MDBCol md='4'>
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
          </MDBCol>
            <MDBCol md='4'>
              <MDBInput select className="browser-default custom-select"
                icon='city'
                value={this.state.city}
                onChange={this.changeHandler}
                type='text'
                id='materialFormRegisterPasswordEx5'
                name='province'
                label='Provincia'
                outline
                required>

                <div className='invalid-feedback ml-3 pl-3'>
                  Por favor, introduzca una ciudad válida.
                </div>
                <div className='valid-feedback ml-3 pl-3'>Valido!!</div>
              </MDBInput>
            </MDBCol>
            <MDBCol md='4'>
              <MDBInput select className="browser-default custom-select"
                icon='map-marked-alt'
                value={this.state.state}
                onChange={this.changeHandler}
                type='text'
                id='materialFormRegisterConfirmEx'
                name='state'
                label='Localidad'
                outline
                required
              >
                <div className='invalid-feedback ml-3 pl-3'>
                  Por favor, introduzca una localidad válida.
                </div>
                <div className='valid-feedback ml-3 pl-3'>Valido!!</div>
              </MDBInput>
            </MDBCol>

          </MDBRow>
          <MDBCol md='4' className='mb-3 ml-4'>
            <div className='custom-control custom-checkbox pl-3'>
              <input
                className='custom-control-input'
                type='checkbox'
                value=''
                id='invalidCheck'
                required
              />

              <label className='custom-control-label' htmlFor='invalidCheck'>
                Acepto los términos y condiciones
              </label>
              <div className='invalid-feedback'>
                Debe aceptar antes de enviar.
              </div>
            </div>
          </MDBCol>
          <MDBBtn  className="ml-4 mt-2 my-3" color='primary' type='submit' onSubmit={this.submitHandler} >
            Registrarse
          </MDBBtn>
        </form>
      </div>
    );
  }
}

export default ToRegister;
