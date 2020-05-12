import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, } from "mdbreact";


const FooterPage = () => {
  return (

    <MDBFooter tag="div" style={{backgroundColor:"#006064"}} className=" mt-4 bg-danger text-white">
      <MDBContainer fluid className="text-center mt-2 text-md-left bg-dark">
        <MDBRow>
          <MDBCol className="lg-2">
            <h4 className="text-uppercase mb-2 mt-3 font-weight-bold">Remates calamuchita</h4>
            <hr className="accent-1 mb-3 mt-2 d-inline-block mx-auto" style={{backgroundColor:"green", width: "150px" }}  />
            <p>
            Todos los derechos reservados
            </p>
          </MDBCol>
          <g id="Capa_3" data-name="Capa 3">
            <polygon points="226.29 235.05 37.72 235.05 37.72 46.53 226.29 46.53 226.29 56.43 264.02 25.34 264.02 8.82 0 8.82 0 272.76 264.02 272.76 264.02 109.24 226.29 154.48 226.29 235.05"></polygon>
            <polygon points="86.78 84.89 72.22 100.77 165.28 208.03 327.35 13.61 314.58 0 165.28 122.84 86.78 84.89"></polygon>
          </g>

          <MDBCol md="3">
          <h5 className="text-uppercase mb-2 mt-3 font-weight-bold">
            <strong>Contact</strong>
          </h5>
           <hr className="accent-2 mb-2 mt-0 d-inline-block mx-auto" style={{backgroundColor:"green", width: "60px" }} />
           <div className="mr-4 ">
             <ul className="list-unstyled list-inline">
               <li className="list-inline-item">
                 <a href="https://www.facebook.com/" className="btn-floating btn-bg btn-fb mx-3 fa-2x">
                   <i className="fab fa-facebook-f"> </i>
                 </a>
               </li>
               <li className="list-inline-item">
                 <a href="https://twitter.com/login?lang=es"  className="btn-floating  btn-tw mx-3 fa-2x">
                   <i  className="fab fa-twitter"> </i>
                 </a>
               </li>
               <li  className="list-inline-item">
                 <a href="https://accounts.google.com/b/0/AddMailService" className=" btn-floating btn-gplus mx-3 fa-2x">
                   <i  className="fab fa-google-plus"> </i>
                 </a>
               </li>
             </ul>
           </div>
          <p>
            <i className="fa fa-home mr-2 " /> Embalse de Calamuchita,Cordoba
          </p>
          <p>
            <i className="fa fa-envelope mr-2" /> info@example.com
          </p>
          <p>
            <i className="fa fa-phone  mr-2" /> + 54 351-856975
          </p>
          <p>
            <i className="fa fa-print  mr-2" /> + 54 351-2475869
          </p>
        </MDBCol>
        </MDBRow>
      </MDBContainer>
        <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="Remates" style={{color:"black"}} > Remates Calamuchita </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;
