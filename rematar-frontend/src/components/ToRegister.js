import React from 'react';
import { AppNavbarBrand } from '@coreui/react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';


class ToRegister extends React.Component {
  state = {
    fname: '',
    lname: '',
    dni: '',
    email: '',
    password:'',
    province: '',
    city: ''
  };

  submitHandler = event => {
    //event.preventDefault();  No se que hace por eso lo comente
    event.target.className += ' was-validated';


    // enviamos los datos al backend
    fetch(
        "http://0.0.0.0:5000/api/register",
        {
          headers: {
            'Content-Type': 'text/json',
          },
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify({
            ...this.state
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
         <MDBRow className="justify-content-center">
         <MDBCol md="8" className="rounded shadow" style={{backgroundColor:"white"}}>
            <div >
               <MDBContainer className="text-center">
                  <MDBRow>
                     <MDBCol>
                        <AppNavbarBrand
                           full={{ src:"https://cdn.shopify.com/s/files/1/2245/4189/files/todoenremate-logo_x250.png?v=1548202790",
                              width: 200,
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
                        <div className='valid-feedback ml-3 pl-3'>Valido!!</div>
                     </MDBInput>

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
                     <MDBInput
                        icon='address-card'
                        value={this.state.dni}
                        onChange={this.changeHandler}
                        type='number'
                        id='materialFormRegisterPasswordEx4'
                        name='dni'
                        label='DNI'
                        outline
                        required
                     >
                        <div className='invalid-feedback ml-3 pl-3'>Ingrese una contraseña</div>
                        <div className='valid-feedback ml-3 pl-3'>Looks good!</div>
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
                        <div className='invalid-feedback ml-3 pl-3'>Ingrese una contraseña</div>
                        <div className='valid-feedback ml-3 pl-3'>Looks good!</div>
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

                     <MDBInput select className="browser-default custom-select"
                        icon='map-marked-alt'
                        value={this.state.city}
                        onChange={this.changeHandler}
                        type='text'
                        id='materialFormRegisterPasswordEx5'
                        name='province'
                        label='Provincia'
                        outline
                        required
                     >
                        <div className='invalid-feedback ml-3 pl-3'>Por favor, introduzca una ciudad válida.</div>
                        <div className='valid-feedback ml-3 pl-3'>Valido!!</div>
                     </MDBInput>
                     <MDBInput select className="browser-default custom-select"
                        icon='city'
                        value={this.state.state}
                        onChange={this.changeHandler}
                        type='text'
                        id='materialFormRegisterConfirmEx'
                        name='city'
                        label='Localidad'
                        outline
                        required
                     >
                        <div className='invalid-feedback ml-3 pl-3'>Por favor, introduzca una localidad válida.</div>
                        <div className='valid-feedback ml-3 pl-3'>Valido!!</div>
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
                        <MDBBtn className="ml-4 " color='danger' type='submit'>
                           Registrarse
                        </MDBBtn>
                     </div>
                  </form>
               </MDBContainer>
            </div>
         </MDBCol>
         </MDBRow>
         </MDBContainer>
      </div>
    );
  }
}

export default ToRegister;
