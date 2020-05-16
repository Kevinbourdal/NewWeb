import React from 'react';
import {MDBCard, MDBCardBody, MDBCardImage,MDBRow, MDBCardTitle, MDBCardText, MDBCol, MDBListGroupItem, MDBContainer, MDBTable } from 'mdbreact';
import { ofertas } from "../data/ofertasenvivo";


const Profile = () => {


  let data_table = ofertas.map((offer, index) => {
      return (
          <tbody className="text-center">
              { index === 0 ?
                  <tr className="ml-5 bg-success">
                      <th className="ml-5">{index+1}</th>
                      <td className="ml-5 ">{offer['fname']}</td>
                      <td className="ml-5">{offer['lname']}</td>
                      <td className="ml-5"><b>{offer['amount']}</b></td>
                      <td className="ml-5">{offer['date']}</td>
                      <td className="ml-5">{offer['hour']}</td>
                      <td className="ml-5">{offer['diff']}</td>
                  </tr>
              :
                  <tr className="ml-5">
                      <th className="ml-5">{index+1}</th>
                      <td className="ml-5">{offer['fname']}</td>
                      <td className="ml-5">{offer['lname']}</td>
                      <td className="ml-5"><b>{offer['amount']}</b></td>
                      <td className="ml-5">{offer['date']}</td>
                      <td className="ml-5">{offer['hour']}</td>
                      <td className="ml-5">{offer['diff']}</td>
                  </tr>
              }
          </tbody>
      )
  });

  return (
   <MDBRow className="mt-5 ml-1 ">
     <MDBCol style={{ maxWidth: "22rem" }}>
      <MDBCard>
        <MDBCardImage className="img-fluid" src="https://images-na.ssl-images-amazon.com/images/I/712LZZEzwdL._AC_SY879_.jpg"waves />
        <MDBCardBody>
          <MDBCardTitle >Perfil</MDBCardTitle>
         <MDBListGroupItem><i  className="text-muted" >Mail : </i> ejemplo@outlook.com</MDBListGroupItem>
         <MDBListGroupItem><i className="text-muted" >Nombre : </i> Charly </MDBListGroupItem>
         <MDBListGroupItem><i className="text-muted" >Apellido : </i> Brown </MDBListGroupItem>
         <MDBListGroupItem><i className="text-muted" >Fecha de nacimiento : </i> 18 marzo 1990</MDBListGroupItem>
         <MDBListGroupItem><i className="text-muted" >Vive en : </i>  Ciudad de cordoba</MDBListGroupItem>
        </MDBCardBody>
      </MDBCard>
     </MDBCol>
     <MDBCol className="">
           <MDBTable hover responsive={true} style={{width: '80%'}}  className="table-striped">
               <thead  className="thead-dark text-center">
                   <tr className="">
                       <th >#</th>
                       <th >Oferta</th>
                       <th>Puesto</th>
                       <th>Terreno</th>
                       <th>Preio actual</th>
                       <th>Hora</th>
                       <th>Fecha oferta</th>
                   </tr>
               </thead>
                 { data_table }
           </MDBTable>
     </MDBCol>
    </MDBRow>


  )

}

export default Profile;
