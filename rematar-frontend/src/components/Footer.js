import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";

const FooterPage = () => {
  return (

    <MDBFooter tag="div" style={{backgroundColor:"#006064"}} className="font-small mt-4">
      <MDBContainer style={{backgroundColor:"#0097a7"}} fluid className="text-center mt-2 text-md-left">
        <MDBRow>
          <MDBCol className="lg-2">
            <h4 className="text-uppercase mb-2 mt-3 font-weight-bold">Remates calamuchita</h4>
            <hr className="deep-purple mb-4 mt-0 d-inline-block mx-auto" style={{backgroundColor:"green", width: "60px" }}  />
            <p>
            Todos los derechos reservados
            </p>
          </MDBCol>

          <MDBCol md="3">
          <h5 className="text-uppercase mb-2 mt-3 font-weight-bold">
            <strong>Contact</strong>
          </h5>
           <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{backgroundColor:"green", width: "60px" }} />
          <p>
            <i className="fa fa-home  " /> Embalse de Calamuchita,Cordoba
          </p>
          <p>
            <i className="fa fa-envelope " /> info@example.com
          </p>
          <p>
            <i className="fa fa-phone " /> + 54 351-856975
          </p>
          <p>
            <i className="fa fa-print " /> + 54 351-2475869
          </p>
        </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="text-center">
           <ul className="list-unstyled list-inline">
             <li className="list-inline-item">
               <a className="btn-floating btn-sm btn-fb mx-1">
                 <i className="fab fa-facebook-f"> </i>
               </a>
             </li>
             <li className="list-inline-item">
               <a className="btn-floating btn-sm btn-tw mx-1">
                 <i className="fab fa-twitter"> </i>
               </a>
             </li>
             <li className="list-inline-item">
               <a className="btn-floating btn-sm btn-gplus mx-1">
                 <i className="fab fa-google-plus"> </i>
               </a>
             </li>
             <li className="list-inline-item">
               <a className="btn-floating btn-sm btn-li mx-1">
                 <i className="fab fa-linkedin-in"> </i>
               </a>
             </li>
             <li className="list-inline-item">
               <a className="btn-floating btn-sm btn-dribbble mx-1">
                 <i className="fab fa-dribbble"> </i>
               </a>
             </li>
           </ul>
         </div>
        <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="Remates" style={{color:"black"}} > Remates Calamuchita </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;
