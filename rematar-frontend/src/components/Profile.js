import React from 'react';
import {MDBCard, MDBCardBody, MDBCardImage,MDBRow, MDBCardTitle, MDBCol, MDBListGroupItem, MDBTable } from 'mdbreact';
import { ofertas } from "../data/ofertasenvivo";


const Profile = () => {


  let data_table = ofertas.map((offer, index) => {
      return (
          <tbody className="text-center ">
              { index === 0 ?
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
              }
          </tbody>
      )
  });

    let data_table_finished = ofertas.map((offer, index) => {
        return (
            <tbody className="text-center text-dark" style={{ backgroundColor: "#7BEC5D" }}>
            { index % 3 === 0 || index === 4 ?
                <tr className="ml-5 table-success">
                    <th className="ml-5"><b>{index+1}</b></th>
                    <td className="ml-5 "><b>{offer['fname']}</b></td>
                    <td className="ml-5"><b>{offer['lname']}</b></td>
                    <td className="ml-5"><b><a href="/detail">{offer['amount']}</a></b></td>
                    <td className="ml-5"><b>{offer['date']}</b></td>
                    <td className="ml-5"><b>{offer['hour']}</b></td>
                    <td className="ml-5"><b>{offer['diff']}</b></td>
                </tr>
                :
                <tr className="ml-5 table-danger">
                    <th className="ml-5"><b>{index+1}</b></th>
                    <td className="ml-5"><b>{offer['fname']}</b></td>
                    <td className="ml-5"><b>{offer['lname']}</b></td>
                    <td className="ml-5"><b><a href="/detail">{offer['amount']}</a></b></td>
                    <td className="ml-5"><b>{offer['date']}</b></td>
                    <td className="ml-5"><b>{offer['hour']}</b></td>
                    <td className="ml-5"><b>{offer['diff']}</b></td>
                </tr>
            }
            </tbody>
        )
    });
  return (
      <div>
   <MDBRow className="mt-5 ml-1 ">
     <MDBCol style={{ maxWidth: "22rem" }}>
      <MDBCard>
        <MDBCardImage className="img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRDtWTHP7xJi_pW4PIXMutI94wDRz33U75VYV6sCToXjMUyMJF8&usqp=CAU"waves />
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
       <MDBCard>
         <MDBCardBody className="" style={{ width: '100%' }} >
             <h5>Ofertas activas</h5>
             <hr />
           <MDBTable hover responsive={true} className="table-striped">
               <thead  className="thead-dark text-center">
                   <tr className="">
                       <th ><b>#</b></th>
                       <th ><b>Oferta</b></th>
                       <th><b>Puesto</b></th>
                       <th><b>Terreno</b></th>
                       <th><b>Preio actual</b></th>
                       <th><b>Hora</b></th>
                       <th><b>Fecha oferta</b></th>
                       <th><b>Fin de subasta</b></th>
                   </tr>
               </thead>
                 { data_table }
            </MDBTable>
             </MDBCardBody>
         </MDBCard>
     </MDBCol>
   </MDBRow>
      <MDBRow className="m-5">
       <MDBCol className="">
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
                       { data_table_finished }
                   </MDBTable>
               </MDBCardBody>
           </MDBCard>
       </MDBCol>
    </MDBRow>
      </div>

  )

}

export default Profile;
