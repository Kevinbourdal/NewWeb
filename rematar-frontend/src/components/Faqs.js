import React, { useState }from "react";
import {Card, CardImg, CardText, CardBody,
  		CardTitle, CardSubtitle,Collapse, Button } from 'reactstrap';

const Faqs = () => {
	const [isOpen1, setIsOpen1] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);
	const [isOpen3, setIsOpen3] = useState(false);
  	const toggle1 = () => setIsOpen1(!isOpen1);
  	const toggle2 = () => setIsOpen2(!isOpen2);
  	const toggle3 = () => setIsOpen3(!isOpen3);

	return (
	    <div>
		  <Card>
	        <CardImg  src="https://www.bairescampus.com.ar/images/preguntas-frecuentes.png" alt="Card image cap" />
	        	<div class="card-img-overlay">
	        	<br/>
	        	<br/>
	        	<br/>
	        	<br/>
    				<h1  class="text-center">Preguntas Frecuentes</h1>
  					</div>
	      </Card>
	      <br/>
	      <Button className="btn btn-primary btn-lg btn-block" color="primary" onClick={toggle1} style={{ marginBottom: '1rem' }}>Por que deberia confiar en nosotros?</Button>
	      <Collapse isOpen={isOpen1}>
	        <Card>
	          <CardBody>
	          Aca encontraria usted una buena respuesta a la primera pregunta,
	          Aca encontraria usted una buena respuesta a la primera pregunta
	          Aca encontraria usted una buena respuesta a la primera pregunta
	          Aca encontraria usted una buena respuesta a la primera pregunta.
	          	<br/>
	          	<br/>
	          o No
	          </CardBody>
	        </Card>
	      </Collapse>
	      <br/>
	      <Button className="btn btn-primary btn-lg btn-block" color="primary" onClick={toggle2} style={{ marginBottom: '1rem' }}>Como hago para ofertar?</Button>
	      <Collapse isOpen={isOpen2}>
	        <Card>
	          <CardBody>
	          Aca encontraria usted una buena respuesta a la segunda pregunta,
	          Aca encontraria usted una buena respuesta a la segunda pregunta
	          Aca encontraria usted una buena respuesta a la segunda pregunta
	          Aca encontraria usted una buena respuesta a la segunda pregunta.
	          	<br/>
	          	<br/>
	          o No
	          </CardBody>
	        </Card>
	      </Collapse>
	      <br/>
	      <Button className="btn btn-primary btn-lg btn-block" color="primary" onClick={toggle3} style={{ marginBottom: '1rem' }}>Tercera pregunta</Button>
	      <Collapse isOpen={isOpen3}>
	        <Card>
	          <CardBody>
	          Aca encontraria usted una buena respuesta a la tercera pregunta,
	          Aca encontraria usted una buena respuesta a la tercera pregunta
	          Aca encontraria usted una buena respuesta a la tercera pregunta
	          Aca encontraria usted una buena respuesta a la tercera pregunta.
	          	<br/>
	          	<br/>
	          o No
	          </CardBody>
	        </Card>
	      </Collapse>
	    </div>

	  );

}
export default Faqs;
