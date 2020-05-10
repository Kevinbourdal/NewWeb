import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";

const FooterPage = () => {
  return (

    <MDBFooter tag="div" style={{backgroundColor:"#006064"}} className="font-small mt-4">
      <MDBContainer style={{backgroundColor:"#0097a7"}} fluid className="text-center mt-2 text-md-left">
        <MDBRow>
          <MDBCol className="lg-3">
            <h4 className="text-uppercase mb-2 mt-3 font-weight-bold">Remates calamuchita</h4>
            <hr className="deep-purple mb-4 mt-0 d-inline-block mx-auto" style={{backgroundColor:"green", width: "60px" }}  />
            <p>
            Todos los derechos reservados
            </p>
          </MDBCol>

          <MDBCol className="lg-3">
          <h5 className="text-uppercase mb-2 mt-3 font-weight-bold">
            <strong>Contact</strong>
          </h5>
           <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{backgroundColor:"green", width: "60px" }} />
          <p>
            <i className="fa fa-home " /> Embalse de Calamuchita,Cordoba
          </p>
          <p>
            <i className="fa fa-envelope mr-2" /> info@example.com
          </p>
          <p>
            <i className="fa fa-phone mr-3" /> + 54 351-856975
          </p>
          <p>
            <i className="fa fa-print mr-3" /> + 54 351-2475869
          </p>
        </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="text-center">
        <ul className="list-unstyled list-inline">
          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-fb mx-1">
              <i className="fab fa-facebook-f">facebook</i>
            </a>
          </li>

          <li className="list-inline-item">
            <a className="btn-floating btn-sm btn-tw mx-1">
             <i className="fab fa-twitter white-text mr-lg-4"> twitter</i>
            </a>
          </li>
          <li className="list-inline-item">
          <svg class="bi bi-chat-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 008 15z"/>
</svg>
          </li>
          <a className="li-ic">
              <i className="fab fa-linkedin-in fa-lg white-text mr-md-4"> linkedin</i>
            </a>
        </ul>
      </div>
      <MDBIcon icon="camera-retro" />
      <div className="footer-copyright text-center py-3">

        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="Remates" style={{color:"black"}} > Remates Calamuchita </a>
        </MDBContainer>
      </div>
    </MDBFooter>

  );
}

export default FooterPage;
