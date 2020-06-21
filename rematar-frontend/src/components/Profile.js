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
    MDBContainer
} from 'mdbreact';
import { ofertas } from "../data/ofertasenvivo";
import AuthService from "../utils/AuthService";
import config from "../config";


class Profile extends Component {

    constructor (props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            dni_type:'',
            dni:'',
            province: '',
            city: '',
            sex: '',
            bdate:'',
            phone :'',
            mStatus :'',
            address : '',
            email:''
        };
        this.Auth = new AuthService();
        this.username = this.Auth.getUsername();
        this.submitHandler = this.submitHandler.bind(this);
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


render() {
    if (this.state.firstname === '') {
        this.submitHandler()
    }
    return (
<div>
   <MDBRow className="mt-4 col-12 " style={{height:'400%'}}>
      <MDBCol style={{ maxWidth: "20rem"}} className="form-control-plaintext">
          <MDBCard>
             <MDBCardImage className="img-fluid" src="https://www.rasoyasociados.com/se/wp-content/uploads/2018/01/sin-imagen-2.png" />
             <MDBCardBody className="col-12">
                <MDBRow>
                    <MDBCol><MDBCardTitle >Perfil</MDBCardTitle></MDBCol>
                    <MDBCol className='text-right'>
                        <a href='/mi_perfil'style={{color: 'black'}}><i className="far fa-edit" /></a>
                    </MDBCol>
                </MDBRow>
                <MDBListGroupItem><i className="text-muted" /><b>{this.state.firstname}</b></MDBListGroupItem>
                <MDBListGroupItem><i className="text-muted" /><b>{this.state.lastname}</b></MDBListGroupItem>
                <MDBListGroupItem><i className="text-muted" /><b>{this.state.email}</b></MDBListGroupItem>
                <MDBListGroupItem><i className="text-muted" >Direccion:</i>{this.state.address}</MDBListGroupItem>
                <MDBListGroupItem><i className="text-muted" >Provinica:</i>{this.state.province}</MDBListGroupItem>
                <MDBListGroupItem><i className="text-muted" >Telefono:</i>{this.state.phone}</MDBListGroupItem>
            </MDBCardBody>
          </MDBCard>
     </MDBCol>
   <MDBCol className=" mt-2 col-9 " >
       <MDBCard >
         <MDBCardBody className="" style={{ width: '100%' }} >
             <h5>Ofertas activas</h5>
             <hr />
           <MDBTable hover responsive={true} className="table-striped">
               <thead className="thead-dark text-center">
                   <tr className="">
                       <th><b>#</b></th>
                       <th><b>Oferta</b></th>
                       <th><b>Puesto</b></th>
                       <th><b>Terreno</b></th>
                       <th><b>Preio actual</b></th>
                       <th><b>Hora</b></th>
                       <th><b>Fecha oferta</b></th>
                       <th><b>Fin de subasta</b></th>
                   </tr>
               </thead>
               <tbody className="text-center ">
               {ofertas.map((offer, index) => {
                   return index === 0 ?
                   <tr className="ml-5 bg-light" style={{ color: "#66D34B" }}>
                       <th className="ml-5">{index+1}</th>
                       <td className="ml-5 ">{offer['fname']}</td>
                       <td className="ml-5">{offer['lname']}</td>
                       <td className="ml-5"><b>{offer['amount']}</b></td>
                       <td className="ml-5">{offer['date']}</td>
                       <td className="ml-5">{offer['hour']}</td>
                       <td className="ml-5">{offer['diff']}</td>
                       <td className="ml-5">01-06-2020</td>
                   </tr>
                   :
                   <tr className="ml-5 bg-light  ">
                       <th className="ml-5">{index+1}</th>
                       <td className="ml-5">{offer['fname']}</td>
                       <td className="ml-5">{offer['lname']}</td>
                       <td className="ml-5"><b>{offer['amount']}</b></td>
                       <td className="ml-5">{offer['date']}</td>
                       <td className="ml-5">{offer['hour']}</td>
                       <td className="ml-5">{offer['diff']}</td>
                       <td className="ml-5">06-06-2020</td>
                   </tr>
               })}
               </tbody>
            </MDBTable>
             </MDBCardBody>
         </MDBCard>
       <hr />
       <MDBCard>
           <MDBCardBody className="" style={{ width: '100%' }} >
               <h5>Ofertas finalizadas</h5>
               <hr />
               <MDBTable hover responsive={true}  className="table-striped table-dark">
                   <thead  className="thead-dark text-center">
                   <tr className="">
                       <th ><b>#</b></th>
                       <th ><b>Oferta</b></th>
                       <th><b>Puesto</b></th>
                       <th><b>Terreno</b></th>
                       <th><b>Precio final</b></th>
                       <th><b>Hora</b></th>
                       <th><b>Fin de subasta</b></th>
                   </tr>
                   </thead >
                   <tbody className="text-center text-dark" style={{ backgroundColor: "#7BEC5D" }}>
                   { ofertas.map((offer, index) => {
                       return index % 3 === 0 || index === 4 ?
                           <tr className="ml-5 table-success">
                               <th className="ml-5"><b>{index + 1}</b></th>
                               <td className="ml-5 "><b>{offer['fname']}</b></td>
                               <td className="ml-5"><b>{offer['lname']}</b></td>
                               <td className="ml-5"><b><a href="/detail">{offer['amount']}</a></b></td>
                               <td className="ml-5"><b>{offer['date']}</b></td>
                               <td className="ml-5"><b>{offer['hour']}</b></td>
                               <td className="ml-5"><b>{offer['diff']}</b></td>
                           </tr>
                           :
                           <tr className="ml-5 table-danger">
                               <th className="ml-5"><b>{index + 1}</b></th>
                               <td className="ml-5"><b>{offer['fname']}</b></td>
                               <td className="ml-5"><b>{offer['lname']}</b></td>
                               <td className="ml-5"><b><a href="/detail">{offer['amount']}</a></b></td>
                               <td className="ml-5"><b>{offer['date']}</b></td>
                               <td className="ml-5"><b>{offer['hour']}</b></td>
                               <td className="ml-5"><b>{offer['diff']}</b></td>
                           </tr>
                   })}

                   </tbody>
               </MDBTable>
           </MDBCardBody>
       </MDBCard>
     </MDBCol>

   </MDBRow>
</div>

  )
}
}

export default Profile;
